import { Page, expect } from "@playwright/test";

class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/");
  }

  async openLogin() {
    await this.page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(this.page.getByText("Login")).toBeVisible();
    await expect(
      this.page.getByText("Please login to make appointment."),
    ).toBeVisible();
    await this.page.getByLabel("username").waitFor({ state: "visible" });
    await this.page.getByLabel("password").waitFor({ state: "visible" });
    await expect(this.page.getByTestId("btn-login")).toBeVisible();
  }

  async login(username: string, password: string) {
    if (
      !(await this.page
        .getByLabel("username")
        .isVisible()
        .catch(() => false))
    ) {
      await this.openLogin();
    }

    await this.page.getByLabel("username").fill(username);
    await this.page.getByLabel("username").fill(password);
    await this.page.getByRole("button", { name: "login" }).click();
  }
}
