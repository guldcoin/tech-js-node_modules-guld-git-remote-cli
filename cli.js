#!/usr/bin/env node
// eslint-disable-file no-console
const program = require('commander')
const VERSION = require('./package.json').version
const { deleteRemote, addRemote } = require('guld-git-remote')

/* eslint-disable no-console */
program
  .name('guld-git-remote')
  .version(VERSION)
  .description('Manage git remotes the guld way.')
  // .option('-q, --quiet', '')
program
  .command('remove [name]')
  .alias('delete')
  .description('Remove one or all remotes from the given or current directory.')
  .action(async (rname, options) => {
    await deleteRemote(rname)
    console.log('ok')
  })
program
  .command('add [slug]')
  .description('Add one or all user branch remotes to the current directory.')
  .option('-u --user <user>', 'Add remotes for the given user. (default to all local branch)', '*')
  .option('-h --host <host>', 'Add remotes only for the given host.')
  .option('-p --protocol <protocol>', 'Use the given protocol for urls.', 'ssh')
  .action(async (slug, options) => {
    var user
    if (options.user && options.user !== '*') user = options.user
    await addRemote(user, slug, options.host, options.protocol)
    console.log('ok')
  })

program.parse(process.argv)
if (program.rawArgs.length === 2) program.help()
