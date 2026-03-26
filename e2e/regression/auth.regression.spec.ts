import { test, expect } from "../fixtures/page.fixtures";
import { Page } from "../fixtures/page.fixtures";

test.describe("@regression @auth Auth nagative cases", () => {
  const textError =
    "Login failed! Please ensure the username and password are valid.";
  const expectedFiledResult = async (page: Page) => {
    await expect(page).toHaveURL("profile.php#login");
    await expect(page.locator(".text-danger")).toHaveText(textError);
  };

  test.beforeEach(async ({ loginpage }) => {
    await loginpage.goto();
  });

  test("verify valid username and invalid password fails login", async ({
    loginpage,
    page,
  }) => {
    await loginpage.openLogin();
    await loginpage.login("John Doe", "password");
    await expectedFiledResult(page);
  });

  test("verify invalid username and valid password fails login", async ({
    loginpage,
    page,
  }) => {
    await loginpage.openLogin();
    await loginpage.login("jeff oconner", "ThisIsNotAPassword");
    await expectedFiledResult(page);
  });

  test("verify empty username and  password input  failslogin", async ({
    loginpage,
    page,
  }) => {
    await loginpage.openLogin();
    await loginpage.login("", "");
    await expectedFiledResult(page);
  });
});
