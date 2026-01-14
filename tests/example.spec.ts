import { test } from "@playwright/test";

test("run for desktop", async ({ page }) => {
  test.setTimeout(60 * 60 * 1000); // set timeout to 1 hour

  const sessionId = process.env.SESSION_ID;
  const displayName = process.env.DISPLAY_NAME;

  await page.goto(
    `https://sdk-app.pages.dev/?sessionId=${sessionId}&displayName=${displayName}`
  );
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Start Session" }).click();

  await page.waitForFunction(
    () => {
      return (window as any).isUsingTurn === true;
    },
    { timeout: 30 * 60 * 1000 }
  );

  await page.waitForTimeout(5 * 1000);
  await page.screenshot({ path: "fullpage.png", fullPage: true });

  // wait for half hour
  await page.waitForTimeout(30 * 60 * 1000);

  await page.waitForTimeout(10 * 1000);
  await page.getByRole("button", { name: "Leave session" }).click();
});
