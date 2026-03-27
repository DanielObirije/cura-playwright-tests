import { Page, expect } from "@playwright/test";
import { AppointmentData } from "../e2e/helpers/appointmentData";

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

  async confirmdata(data: AppointmentData) {
    await expect(this.page).toHaveURL("appointment.php#summary");
    await expect(this.page.locator("h2")).toHaveText(
      "Appointment Confirmation",
    );
    await expect(this.page.locator(".lead")).toHaveText(
      "Please be informed that your appointment has been booked as following:",
    );
    await expect(this.page.locator("#facility")).toHaveText(data.facility);
    await expect(this.page.locator("#program")).toHaveText(data.program);
    await expect(this.page.locator("#hospital_readmission")).toHaveText(
      data.readmission ? "Yes" : "No",
    );
    if (data.comment) {
      await expect(this.page.locator("#comment")).toHaveText(data.comment);
    }
  }
}
