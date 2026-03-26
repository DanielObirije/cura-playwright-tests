import { test, expect } from "../fixtures/autheticated.fixtures";
import { curaDatePlus, appointmentData } from "../helpers/appointmentData";

const dateCases = [
  { name: "yesterday", offset: -1 },
  { name: "today", offset: 0 },
  { name: "tomorrow", offset: 1 },
  { name: "next year", offset: 365 },
];

for (const c of dateCases) {
  test(`vist data ${c.name}`, async ({ page, appointmentpage }) => {
    await page.goto("#appointment");
    await appointmentpage.fillform(appointmentData.void());
    await appointmentpage.pickDateAsUser(curaDatePlus(c.offset));
    await appointmentpage.submitAndWaithForConfirmation();
  });
}

test.describe("@regression @date Appointment data edge cases", () => {
  const data = appointmentData.void();
  for (const c of dateCases) {
    test(`vist date ${c.name}`, async ({ appointmentpage, page }) => {
      const inputDate = curaDatePlus(c.offset);

      await page.goto("/#appointment");
      await appointmentpage.fillform(data);
      await appointmentpage.pickDateAsUser(inputDate);
      await appointmentpage.submitAndWaithForConfirmation();

      await expect(page).toHaveURL("appointment.php#summary");
      await expect(page.locator("#visit_date")).toHaveText(inputDate);
    });
  }

  test("cannot submit appointment without visit date", async ({
    appointmentpage,
    page,
  }) => {
    await page.goto("/#appointment");
    await appointmentpage.fillform(data);
    await appointmentpage.submit();
    await expect(page).not.toHaveURL(/#summary/);
  });
});
