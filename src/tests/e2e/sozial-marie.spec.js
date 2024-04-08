import { expect, test } from '@playwright/test';

// This date and delay are hardcoded in the app and should be updated manually
// from src/components/SozialMarie/date-range.js
const SM_VOTING_ENDS = 'Wed Apr 17 2024 00:00:00 GMT+0200';
const delayToNotShowBefore = 0;

test.describe('Sozial Marie', () => {
  const votingEnds = new Date(SM_VOTING_ENDS);
  const doNotRunAnyTests = new Date() > votingEnds;
  test.skip(doNotRunAnyTests, 'Voting is expired');
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Voting', () => {
    // https://playwright.dev/docs/test-annotations#conditionally-skip-a-test
    test.skip(new Date() > votingEnds, 'Voting is expired');
    test('has voting button', async ({ page }) => {
      await page.reload();
      await page.waitForTimeout(delayToNotShowBefore);
      await expect(page.getByLabel('vote')).toBeVisible();
    });
  });
});
