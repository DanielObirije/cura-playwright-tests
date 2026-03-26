import { Page } from "@playwright/test";

export type AppointmentData = {
  facility: string;
  readmission: boolean;
  program: "Medicare" | "Medicaid" | "None";
  comment?: string;
};

export class AppointmentPage {
  constructor(private readonly page: Page) {}

  async fillform(data: AppointmentData) {
    await this.page
      .locator("#combo_facility")
      .selectOption({ label: data.facility });

    if (data.readmission) {
      await this.page.locator("#chk_hospotal_readmission").check();
    }

    switch (data.program) {
      case "Medicare":
        await this.page.locator("#radio_program_medicare").check();
        break;
      case "Medicaid":
        await this.page.locator("#radio_program_medicaid").check();
        break;
      case "None":
        await this.page.locator("#radio_program_none").check();
        break;
    }

    if (data.comment) {
      await this.page.locator("#txt_comment").clear();
      await this.page.locator("#txt_comment").fill(data.comment);
    }
  }

  async pickDateAsUser(date: string) {
    const dataPicker = this.page.locator("#txt_visit_date");
    await dataPicker.click();
    await dataPicker.fill("");
    await dataPicker.type(date, { delay: 20 });
    await dataPicker.press("Tab");
  }

  async submit() {
    await this.page.locator("#btn-book-appointment").click();
  }

  async submitAndWaithForConfirmation() {
    await Promise.all([
      this.page.waitForURL(/#summary/),
      this.page.locator("#btn-book-appointment").click(),
    ]);
  }
}
