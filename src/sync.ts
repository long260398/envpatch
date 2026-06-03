import chalk from 'chalk';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { readEnvFile } from './utils';

export function sync(envPath: string, examplePath: string, dryRun: boolean): void {
  if (!existsSync(examplePath)) {
    console.error(chalk.red(`✗ ${examplePath} not found`));
    return;
  }

  const absEnvPath = resolve(envPath);
  const absExamplePath = resolve(examplePath);

  if (!existsSync(absEnvPath)) {
    const content = readFileSync(absExamplePath, 'utf-8');
    if (!dryRun) {
      writeFileSync(absEnvPath, content, 'utf-8');
      console.log(chalk.green(`✓ Created ${envPath} from ${examplePath}`));
    } else {
      console.log(chalk.yellow(`[dry-run] Would create ${envPath} from ${examplePath}`));
    }
    return;
  }

  const env = readEnvFile(envPath);
  const example = readEnvFile(examplePath);
  const missing = Object.keys(example).filter(key => !(key in env));

  if (missing.length === 0) {
    console.log(chalk.green(`✓ ${envPath} is already in sync`));
    return;
  }

  if (dryRun) {
    console.log(chalk.yellow(`[dry-run] Would add ${missing.length} key${missing.length > 1 ? 's' : ''} to ${envPath}:`));
    for (const key of missing) {
      console.log(`  ${chalk.yellow('+')} ${key}=${example[key]}`);
    }
    return;
  }

  const toAppend = missing.map(key => `${key}=${example[key]}`).join('\n');
  const current = readFileSync(absEnvPath, 'utf-8');
  const newContent = current.endsWith('\n')
    ? current + toAppend + '\n'
    : current + '\n' + toAppend + '\n';

  writeFileSync(absEnvPath, newContent, 'utf-8');

  console.log(chalk.green(`Added ${missing.length} key${missing.length > 1 ? 's' : ''} to ${envPath}:`));
  for (const key of missing) {
    console.log(`  ${chalk.green('+')} ${key}=${example[key]}`);
  }
}
