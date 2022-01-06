// SPDX-FileCopyrightText: © 2022 Uri Shaked <uri@wokwi.com>
// SPDX-License-Identifier: MIT

import { writeFileSync } from 'fs';
import fetch from 'node-fetch';

/**
 * @typedef {{
 *   name: string;
 *   version: string;
 *   author: string;
 *   maintainer: string;
 *   sentence: string;
 *   paragraph: string;
 *   website: string;
 *   category: string;
 *   architectures: string[];
 *   types: string[];
 *   repository: string;
 *   url: string;
 *   archiveFileName: string;
 *   size: number;
 *   checksum: string;
 * }} ILibrariesEntry
 */

/**
 * @typedef {{  libraries: ILibrariesEntry[] }} ILibraryJson
 */

async function main() {
  const req = await fetch('http://downloads.arduino.cc/libraries/library_index.json');
  const { libraries } = /** @type {ILibraryJson} */ (await req.json());
  const result = {
    libraries: Array.from(new Set(libraries.map((lib) => lib.name))).sort(),
  };
  writeFileSync('docs/arduino.json', JSON.stringify(result));
  console.log(`Total of ${result.libraries.length} arduino libraries.`);
}

main().catch(console.error);
