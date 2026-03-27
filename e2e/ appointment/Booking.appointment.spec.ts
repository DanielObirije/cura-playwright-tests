import { test, expect } from "../fixtures/autheticated.fixtures";
import {
  appointmentData,
  curaDatePlus,
  dateCases,
} from "../helpers/appointmentData";

test.describe("Appointment Booking", () => {
  test.describe("@smoke Successful booking flow", () => {
    test("should successfully book an appointment with valid data and display confirmation details", async ({
      appointmentpage,
      page,
    }) => {
      const data = appointmentData.void();
      await appointmentpage.fillform(data);
      await appointmentpage.pickDateAsUser(data.VisitDate);
      await appointmentpage.submitAndWaithForConfirmation();
      await appointmentpage.confirmdata(data);
    });
  });

  test.describe("@regression  Appointment data edge case", () => {
    for (const c of dateCases) {
      test(`should allow booking with ${c.name} date scenario`, async ({
        appointmentpage,
        page,
      }) => {
        const data = appointmentData.void();
        const inputDate = curaDatePlus(c.offset);

        await page.goto("/#appointment");
        await appointmentpage.fillform(data);
        await appointmentpage.pickDateAsUser(inputDate);
        await appointmentpage.submitAndWaithForConfirmation();
        await appointmentpage.confirmdata(data);
        await expect(page.locator("#visit_date")).toHaveText(inputDate);
      });
    }

    test("should prevent submission when visit date is not selected", async ({
      page,
    }) => {
      await page.goto("#appointment");
      await page.click("#btn-book-appointment");
      await expect(page).toHaveURL(/#appointment/);
    });
  });
});
