import chalk from 'chalk';
import { existsSync } from 'fs';
import { readEnvFile, isEmptyValue } from './utils';

export function check(envPath: string, examplePath: string): number {
  if (!existsSync(examplePath)) {
    console.error(chalk.red(`✗ ${examplePath} not found`));
    return 1;
  }

  if (!existsSync(envPath)) {
    console.error(chalk.red(`✗ ${envPath} not found`));
    console.error(chalk.dim(`  Hint: cp ${examplePath} ${envPath}`));
    return 1;
  }

  const env = readEnvFile(envPath);
  const example = readEnvFile(examplePath);

  const missing: string[] = [];
  const empty: string[] = [];

  for (const key of Object.keys(example)) {
    if (!(key in env)) {
      missing.push(key);
    } else if (isEmptyValue(env[key])) {
      empty.push(key);
    }
  }

  if (missing.length === 0 && empty.length === 0) {
    console.log(chalk.green(`✓ ${envPath} is valid`));
    return 0;
  }

  if (missing.length > 0) {
    console.log(chalk.red(`✗ Missing keys (${missing.length}):`));
    for (const key of missing) {
      console.log(`  ${chalk.red('-')} ${key}`);
    }
  }

  if (empty.length > 0) {
    if (missing.length > 0) console.log('');
    console.log(chalk.yellow(`⚠ Empty values (${empty.length}):`));
    for (const key of empty) {
      console.log(`  ${chalk.yellow('~')} ${key}`);
    }
  }

  const total = missing.length + empty.length;
  console.log(`\n${chalk.red(`${total} issue${total > 1 ? 's' : ''} found`)}`);
  return 1;
}
