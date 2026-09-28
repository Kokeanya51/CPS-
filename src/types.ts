export type Role = "Super Admin" | "Clinician" | "Pharmacist" | "Lab Staff" | "Reception";

export interface Patient {
  id: string;
  hospitalNumber: string;
  firstName: string;
  lastName: string;
  sex: "Male" | "Female";
  dateOfBirth: string;
  phone: string;
  address: string;
  nextOfKin: string;
  bloodGroup: string;
  genotype: string;
  createdAt: string;
}

export interface Visit {
  id: string;
  patientId: string;
  date: string;
  complaint: string;
  assessment: string;
  treatment: string;
  clinician: string;
  status: "Open" | "Completed";
}

export interface FollowUp {
  id: string;
  patientId: string;
  date: string;
  purpose: string;
  notes: string;
  status: "Pending" | "Completed";
}

export interface Drug {
  id: string;
  name: string;
  batch: string;
  expiry: string;
  quantity: number;
  reorderLevel: number;
}

export interface LabRequest {
  id: string;
  patientId: string;
  test: string;
  date: string;
  result: string;
  status: "Requested" | "Processing" | "Completed";
}

export interface ANCRecord {
  id: string;
  patientId: string;
  bookingDate: string;
  gravida: string;
  para: string;
  gestationalAge: string;
  riskNotes: string;
  nextAppointment: string;
}