import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

export function readEnvFile(filePath: string): Record<string, string> {
  const absPath = resolve(filePath);
  if (!existsSync(absPath)) return {};

  const content = readFileSync(absPath, 'utf-8');
  const result: Record<string, string> = {};

  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    result[key] = value;
  }

  return result;
}

export function isEmptyValue(value: string): boolean {
  return value === '' || value === '""' || value === "''";
}
