import chalk from 'chalk';
import { existsSync } from 'fs';
import { readEnvFile, isEmptyValue } from './utils';

export function diff(envPath: string, examplePath: string): void {
  if (!existsSync(examplePath)) {
    console.error(chalk.red(`✗ ${examplePath} not found`));
    return;
  }

  const env = existsSync(envPath) ? readEnvFile(envPath) : {};
  const example = readEnvFile(examplePath);

  const allKeys = new Set([...Object.keys(example), ...Object.keys(env)]);

  console.log(chalk.bold(`\n  ${envPath} vs ${examplePath}`));
  console.log(chalk.dim('  ' + '─'.repeat(44)));

  let issueCount = 0;

  for (const key of allKeys) {
    const inExample = key in example;
    const inEnv = key in env;
    const value = inEnv ? env[key] : '';
    const isEmpty = isEmptyValue(value);

    if (inExample && inEnv && !isEmpty) {
      console.log(`  ${chalk.green('✓')} ${key}`);
    } else if (inExample && !inEnv) {
      console.log(`  ${chalk.red('✗')} ${key}  ${chalk.dim('(missing)')}`);
      issueCount++;
    } else if (inExample && isEmpty) {
      console.log(`  ${chalk.yellow('~')} ${key}  ${chalk.dim('(empty)')}`);
      issueCount++;
    } else if (!inExample && inEnv) {
      console.log(`  ${chalk.dim('·')} ${key}  ${chalk.dim('(not in example)')}`);
    }
  }

  console.log('');
  if (issueCount === 0) {
    console.log(chalk.green('  No differences found\n'));
  } else {
    console.log(chalk.red(`  ${issueCount} issue${issueCount > 1 ? 's' : ''} found — run: envx sync\n`));
  }
}
