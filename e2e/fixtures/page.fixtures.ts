import { LoginPage } from "../../Pages/LoginPage";
import { AppointmentPage } from "../../Pages/AppointmentPage";
import { expect, test as base, type Page } from "@playwright/test";

type PageFixtures = {
  loginpage: LoginPage;
  appointmentpage: AppointmentPage;
};

export const test = base.extend<PageFixtures>({
  loginpage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  appointmentpage: async ({ page }, use) => {
    await use(new AppointmentPage(page));
  },
});

export { expect };
export type { Page };
