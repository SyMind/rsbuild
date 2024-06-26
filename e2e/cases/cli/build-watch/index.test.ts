import { exec } from 'node:child_process';
import path from 'node:path';
import { awaitFileExists } from '@e2e/helper';
import { expect, test } from '@playwright/test';
import { fse } from '@rsbuild/shared';

test('should support watch mode for build command', async () => {
  const indexFile = path.join(__dirname, 'src/index.js');
  const distIndexFile = path.join(__dirname, 'dist/static/js/index.js');
  await fse.remove(indexFile);
  await fse.remove(distIndexFile);

  fse.outputFileSync(indexFile, `console.log('hello!');`);

  const process = exec('npx rsbuild build --watch', {
    cwd: __dirname,
  });

  await awaitFileExists(distIndexFile);
  expect(fse.readFileSync(distIndexFile, 'utf-8')).toContain('hello!');
  await fse.remove(distIndexFile);

  fse.outputFileSync(indexFile, `console.log('hello2!');`);
  await awaitFileExists(distIndexFile);
  expect(fse.readFileSync(distIndexFile, 'utf-8')).toContain('hello2!');

  process.kill();
});
