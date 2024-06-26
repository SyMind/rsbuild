import { join } from 'node:path';
import { dev, gotoPage } from '@e2e/helper';
import { expect, test } from '@playwright/test';

const fixtures = __dirname;

test('writeToDisk default', async ({ page }) => {
  const rsbuild = await dev({
    cwd: join(fixtures, 'basic'),
    rsbuildConfig: {
      output: {
        distPath: {
          root: 'dist-write-to-disk-default',
        },
      },
    },
  });

  await gotoPage(page, rsbuild);

  const locator = page.locator('#test');
  await expect(locator).toHaveText('Hello Rsbuild!');

  await rsbuild.close();
});

test('writeToDisk false', async ({ page }) => {
  const rsbuild = await dev({
    cwd: join(fixtures, 'basic'),
    rsbuildConfig: {
      output: {
        distPath: {
          root: 'dist-write-to-disk-false',
        },
      },
      dev: {
        writeToDisk: false,
      },
    },
  });

  await gotoPage(page, rsbuild);

  const locator = page.locator('#test');
  await expect(locator).toHaveText('Hello Rsbuild!');

  await rsbuild.close();
});

test('writeToDisk true', async ({ page }) => {
  const rsbuild = await dev({
    cwd: join(fixtures, 'basic'),
    rsbuildConfig: {
      output: {
        distPath: {
          root: 'dist-write-to-disk',
        },
      },
      dev: {
        writeToDisk: true,
      },
    },
  });

  await gotoPage(page, rsbuild);

  const test = page.locator('#test');
  await expect(test).toHaveText('Hello Rsbuild!');

  await rsbuild.close();
});
