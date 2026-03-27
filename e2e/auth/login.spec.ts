import { test, Page, expect } from "../fixtures/page.fixtures";

test.describe("Authentication › Sign In", () => {
  test.describe("@smoke @auth Successful login flow", () => {
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

  test.describe("@regression @auth Failed login scenarios", () => {
    const LOGIN_ERROR_MESSAGE =
      "Login failed! Please ensure the username and password are valid.";
    const expectedFiledResult = async (page: Page) => {
      await expect(page).toHaveURL("profile.php#login");
      await expect(page.locator(".text-danger")).toHaveText(
        LOGIN_ERROR_MESSAGE,
      );
    };

    test.beforeEach(async ({ loginpage }) => {
      await loginpage.goto();
      await loginpage.openLogin();
    });

    test("should not log in when password is incorrectn", async ({
      loginpage,
      page,
    }) => {
      await loginpage.login("John Doe", "password");
      await expectedFiledResult(page);
    });

    test("should not log in when username is incorrect", async ({
      loginpage,
      page,
    }) => {
      await loginpage.login("jeff oconner", "ThisIsNotAPassword");
      await expectedFiledResult(page);
    });

    test("should not log in when username and password are empty", async ({
      loginpage,
      page,
    }) => {
      await loginpage.login("", "");
      await expectedFiledResult(page);
    });
  });
});
