#!/usr/bin/env node

import { spawnSync } from "child_process"

function getExePath() {
  const arch = process.arch;
  let os = process.platform as string;
  let extension = '';
  if (['win32', 'cygwin'].includes(process.platform)) {
    os = 'windows';
    extension = '.exe';
  }

  try {
    // Since the bin will be located inside `node_modules`, we can simply call require.resolve
    return require.resolve(`dump-${os}-${arch}/bin/dump${extension}`)
  } catch (e) {
    throw new Error(`Couldn't find dump binary inside node_modules for ${os}-${arch}`)
  }
}

function runDump() {
  const args = process.argv.slice(2)
  const processResult = spawnSync(getExePath(), args, { stdio: "inherit" })
  process.exit(processResult.status ?? 0)
}

runDump()