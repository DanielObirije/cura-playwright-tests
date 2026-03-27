export type AppointmentData = {
  facility: string;
  readmission: boolean;
  program: "Medicare" | "Medicaid" | "None";
  VisitDate: string;
  comment?: string;
};

export const appointmentData = {
  void(): AppointmentData {
    return {
      facility: "Hongkong CURA Healthcare Center",
      readmission: true,
      program: "Medicaid",
      VisitDate: "26/04/2026",
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

export const dateCases = [
  { name: "yesterday", offset: -1 },
  { name: "today", offset: 0 },
  { name: "tomorrow", offset: 1 },
  { name: "next year", offset: 365 },
];
