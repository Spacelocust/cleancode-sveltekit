import { expect, test } from '@playwright/test';

test('Can login, create and answer a card', async ({ page }) => {
  // Can go to the home page
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Welcome to the Leitner app' })).toBeVisible();
  // Can login
  await page.goto('/login');
  await page.fill('[name=username]', 'dallas');
  await page.fill('[name=password]', 'xxx');
  await page.click('[type=submit]');
  // TODO - This does not work because Playwright does not set the cookie from the response
  await page.waitForURL('http://localhost:5173');
  // Can create a card
  await page.goto('/cards');
  await page.click('text=Add a new card');
  await page.fill('[name=question]', 'What is the capital of France?');
  await page.fill('[name=answer]', 'Paris');
  await page.click('[type=submit]');
  // Can answer a card
  await page.goto('/cards/quizz');

  const questionCard = page.getByTestId('quizz-list').first();

  await expect(questionCard.getByText('What is the capital of France?')).toBeVisible();
  await questionCard.getByLabel('Your answer').fill('Paris');
  await questionCard.getByText('Submit').click();
  // Should have a success message
  await expect(page.locator('text=Answer is correct. Good job!').first()).toBeVisible();
});
