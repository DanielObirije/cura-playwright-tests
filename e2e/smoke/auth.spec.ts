import { test, Page, expect } from "../fixtures/page.fixtures";

test.describe("@smoke @auth Authentication basic test", () => {
  test("Users should be able to login and access the appointment page", async ({
    loginpage,
    page,
  }) => {
    await loginpage.goto();
    await loginpage.openLogin();
    await expect(page).toHaveURL(/#login/);
    await loginpage.login("John Doe", "ThisIsNotAPassword");
    await expect(page).toHaveURL(/#appointment/);
  });
});
