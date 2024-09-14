import * as core from "@actions/core";
import * as github from "@actions/github";
import { LinearClient } from "@linear/sdk";
import type { PullRequestEditedEvent } from "@octokit/webhooks-definitions/schema";

/*
  This script should run for `pull_request` updates and will edit their
  descriptions, adding markdown comments like the one below:

  <!-- LINEAR
   - Closes TS-648
   - Closes TS-648
   - Part of TS-648
  /LINEAR -->

*/

// 1. Ensuring workflow only runs for `pull_request/edit`
if (github.context.eventName === "edit") {
  core.setFailed(`Context 'eventName' must be 'edit'.`);
}

// 2. Setup Octokit and Linear SDK
const { GITHUB_TOKEN, LINEAR_TOKEN } = process.env;

const octokit = github.getOctokit(GITHUB_TOKEN as string);
const linear = new LinearClient({ apiKey: LINEAR_TOKEN });

// 3. Deconstructing repo and payload from workflow context
const REPO = github.context.repo;
const PAYLOAD = github.context.payload as PullRequestEditedEvent;
const { pull_request: PR } = PAYLOAD as PullRequestEditedEvent;

// 4. Helper for removing linear comment from text
function removeLinearComment(contents) {
  const tag = "LINEAR";
  const lineaerCommentsReg = new RegExp(
    `^<!-- ${tag}[\\s\\S]*/${tag} -->$`,
    "gm",
  );
  return contents.replace(lineaerCommentsReg, "");
}

// 5. Helper for assembling linear comment
async function assembleLinearComment(contents) {
  const magicComments: string[] = [];

  const ghLinearKeywords = {
    close: "Closes",
    closes: "Closes",
    closed: "Closes",
    fix: "Closes",
    fixes: "Closes",
    fixed: "Closes",
    resolve: "Closes",
    resolves: "Closes",
    resolved: "Closes",
    "relates to": "Part of",
  };

  const issueKeywordNumberReg = /^[\s]*-[\s]*([^\s]+).+#([0-9]+)/gm;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    // Match all keyword mentions individually
    const regexMatch = issueKeywordNumberReg.exec(contents);

    // Abort when done
    if (!regexMatch) {
      break;
    }

    // Deconstruct what we want
    const [keyword, ghIssueNumber] = regexMatch.slice(1);

    // Find related GH issue
    const { data: ghIssue } = await octokit.rest.issues.get({
      ...REPO,
      issue_number: Number(ghIssueNumber),
    });

    // Find related Linear issue
    const res = await linear.searchIssues(ghIssue.title, { first: 1 });

    // Flag error if not found
    if (!res.totalCount) {
      magicComments.push(` - Not found: #${ghIssueNumber}  — ${ghIssue.title}`);
    }

    // Otherwise add magic word mention
    const linearIssueId = res.nodes[0].identifier;
    const linearMagicWord = ghLinearKeywords[keyword.toLowerCase()];

    magicComments.push(` - ${linearMagicWord} ${linearIssueId}`);
  }

  // Assemble and return entier comment
  const comment = ["<!-- LINEAR", ...magicComments, "/LINEAR -->"].join("\n");

  return comment;
}

// 6. Action
await (async () => {
  const rawContents = PR.body;

  const cleanContents = removeLinearComment(rawContents);
  const linearComment = await assembleLinearComment(cleanContents);

  const body = [linearComment, cleanContents].join("\n");

  await octokit.rest.pulls.update({
    owner: PAYLOAD.repository.owner.login,
    repo: PAYLOAD.repository.name,
    pull_number: PR.number,
    body,
  });
})();
