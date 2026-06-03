import chalk from 'chalk';
import { existsSync, copyFileSync } from 'fs';
import { resolve } from 'path';

export function init(examplePath: string, outPath: string): void {
  const absExample = resolve(examplePath);
  const absOut = resolve(outPath);

  if (!existsSync(absExample)) {
    console.error(chalk.red(`✗ ${examplePath} not found`));
    return;
  }

  if (existsSync(absOut)) {
    console.log(chalk.yellow(`⚠ ${outPath} already exists — skipped`));
    console.log(chalk.dim(`  Run: envpatch check  to validate it`));
    return;
  }

  copyFileSync(absExample, absOut);
  console.log(chalk.green(`✓ Created ${outPath} from ${examplePath}`));
  console.log(chalk.dim(`  Fill in the empty values, then run: envpatch check`));
}
