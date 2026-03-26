import { AppointmentData } from "../../Pages/AppointmentPage";

export const appointmentData = {
  void(): AppointmentData {
    return {
      facility: "Hongkong CURA Healthcare Center",
      readmission: true,
      program: "Medicaid",
      comment: `Test e2e ${Date.now()}`,
    };
  },
};

export function curaDatePlus(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);

  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
}
