// SPDX-FileCopyrightText: © 2022 Uri Shaked <uri@wokwi.com>
// SPDX-License-Identifier: MIT

import { writeFileSync } from 'fs';
import fetch from 'node-fetch';

async function main() {
  const req = await fetch('http://downloads.arduino.cc/libraries/library_index.json');
  const { libraries } = await req.json();
  const result = {
    libraries: Array.from(new Set(libraries.map((lib) => lib.name))),
  };
  writeFileSync('docs/arduino.json', JSON.stringify(result));
}

main().catch(console.error);
