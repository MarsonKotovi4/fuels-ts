import { writeFile } from 'fs';
import { join } from 'path';

import { getRenderer } from './renderers/getRenderer';
import { getProgramDetails } from './utils/get-program-details';

export interface AbiGenInput {
  buildDirs: string[];
  mode?: 'ts';
}

export interface AbiGenResult {
  filename: string;
  content: string;
}

export class AbiGen {
  public results: AbiGenResult[];
  constructor({ buildDirs, mode }: AbiGenInput) {
    const programDetails = getProgramDetails(buildDirs);
    const render = getRenderer(mode);
    this.results = render(programDetails);
  }

  /**
   * Writes the `AbiGen` results onto the file system.
   *
   * @param outputDir directory to output `AbiGen` results in.
   */
  public async writeResults(outputDir: string) {
    const writePromises = this.results.map(({ filename, content }) => {
      const filePath = join(outputDir, filename);
      return writeFile(filePath, content, (err) => {
        throw Error();
      });
    });

    await Promise.all(writePromises);
  }
}
