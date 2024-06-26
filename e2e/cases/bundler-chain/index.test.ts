import { join } from 'node:path';
import { build, gotoPage } from '@e2e/helper';
import { expect, test } from '@playwright/test';

test('should allow to use tools.bundlerChain to set alias config', async ({
  page,
}) => {
  const rsbuild = await build({
    cwd: __dirname,
    runServer: true,
    rsbuildConfig: {
      tools: {
        bundlerChain: (chain) => {
          chain.resolve.alias.merge({
            '@common': join(__dirname, 'src/common'),
          });
        },
      },
    },
  });

  await gotoPage(page, rsbuild);
  await expect(page.innerHTML('#test')).resolves.toBe('Hello Rsbuild! 1');

  await rsbuild.close();
});
