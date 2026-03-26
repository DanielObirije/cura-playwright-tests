import { test, expect } from "../fixtures/autheticated.fixtures";
import { appointmentData } from "../helpers/appointmentData";

test.describe("@regression Appointment confirmation consistency", () => {
  test("verify users can not book appointment without filling appointment fileds", async ({
    page,
  }) => {
    await page.goto("#appointment");
    await page.click("#btn-book-appointment");
    await expect(page).toHaveURL(/#appointment/);
  });

  test("verify submition of valid appointment data", async ({
    appointmentpage,
    page,
  }) => {
    const data = appointmentData.void();
    const visitDate = "26/04/2026";
    await appointmentpage.fillform(data);
    await appointmentpage.pickDateAsUser(visitDate);
    await appointmentpage.submitAndWaithForConfirmation();

    await expect(page).toHaveURL("appointment.php#summary");
    await expect(page.locator("h2")).toHaveText("Appointment Confirmation");
    await expect(page.locator(".lead")).toHaveText(
      "Please be informed that your appointment has been booked as following:",
    );
    await expect(page.locator("#facility")).toHaveText(data.facility);
    await expect(page.locator("#program")).toHaveText(data.program);
    await expect(page.locator("#hospital_readmission")).toHaveText(
      data.readmission ? "Yes" : "No",
    );
    if (data.comment) {
      await expect(page.locator("#comment")).toHaveText(data.comment);
    }
  });
});
