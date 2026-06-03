import { Command } from 'commander';
import { check } from './check';
import { diff } from './diff';
import { sync } from './sync';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../package.json') as { version: string };

const program = new Command();

program
  .name('envx')
  .description('Validate, diff, and sync .env files against .env.example')
  .version(version);

program
  .command('check')
  .description('Validate .env against .env.example')
  .option('--env <path>', '.env file path', '.env')
  .option('--example <path>', '.env.example file path', '.env.example')
  .action((opts: { env: string; example: string }) => {
    const exitCode = check(opts.env, opts.example);
    process.exit(exitCode);
  });

program
  .command('diff')
  .description('Show differences between .env and .env.example')
  .option('--env <path>', '.env file path', '.env')
  .option('--example <path>', '.env.example file path', '.env.example')
  .action((opts: { env: string; example: string }) => {
    diff(opts.env, opts.example);
  });

program
  .command('sync')
  .description('Add missing keys from .env.example to .env')
  .option('--env <path>', '.env file path', '.env')
  .option('--example <path>', '.env.example file path', '.env.example')
  .option('--dry-run', 'Preview changes without writing', false)
  .action((opts: { env: string; example: string; dryRun: boolean }) => {
    sync(opts.env, opts.example, opts.dryRun);
  });

program.parse();
