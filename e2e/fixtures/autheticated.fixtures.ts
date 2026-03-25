import { AppointmentPage } from "../../Pages/AppointmentPage";
import { expect, test as base } from "@playwright/test";

type Fixtures = {
  appointmentpage: AppointmentPage;
};

export const test = base.extend<Fixtures>({
  appointmentpage: async ({ page }, use) => {
    await use(new AppointmentPage(page));
  },
  page: async ({ page }, use) => {
    await page.goto("/");
    await page.locator("#btn-make-appointment").click({ noWaitAfter: true });
    await page.waitForURL("/profile.php#login");
    await page.locator("#txt-username").fill("John Doe");
    await page.locator("#txt-password").fill("ThisIsNotAPassword");
    await page.locator("#btn-login").click();
    await expect(page).toHaveURL("#appointment");
    await page.getByLabel("combo_facility").waitFor({ state: "visible" });

    await use(page);
  },
});

export { expect } from "@playwright/test";
