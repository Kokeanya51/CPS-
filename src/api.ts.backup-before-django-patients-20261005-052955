import type { Patient } from "./types";

const API_BASE = "/api";

export interface DjangoPatient {
  id: number;
  hospital_number: string;
  full_name: string;
  date_of_birth: string;
  gender: "Male" | "Female";
  phone_number: string;
  email: string;
  address: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  blood_group: string;
  genotype: string;
  created_at: string;
}

export async function getPatients(): Promise<Patient[]> {
  const response = await fetch(`${API_BASE}/patients/`);

  if (!response.ok) {
    throw new Error(`Failed to load patients: ${response.status}`);
  }

  const data: DjangoPatient[] = await response.json();

  return data.map((p) => {
    const names = p.full_name.trim().split(/\s+/);

    return {
      id: String(p.id),
      hospitalNumber: p.hospital_number,
      firstName: names[0] || "",
      lastName: names.slice(1).join(" ") || "",
      sex: p.gender,
      dateOfBirth: p.date_of_birth,
      phone: p.phone_number,
      address: p.address,
      nextOfKin: p.emergency_contact_name,
      bloodGroup: p.blood_group,
      genotype: p.genotype,
      createdAt: p.created_at,
    };
  });
}

export async function createPatient(patient: {
  hospitalNumber: string;
  firstName: string;
  lastName: string;
  sex: Patient["sex"];
  dateOfBirth: string;
  phone: string;
  address: string;
  nextOfKin: string;
  bloodGroup: string;
  genotype: string;
}) {
  const response = await fetch(`${API_BASE}/patients/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      hospital_number: patient.hospitalNumber,
      full_name: `${patient.firstName} ${patient.lastName}`.trim(),
      date_of_birth: patient.dateOfBirth,
      gender: patient.sex,
      phone_number: patient.phone,
      email: "",
      address: patient.address,
      emergency_contact_name: patient.nextOfKin,
      emergency_contact_phone: "",
      blood_group: patient.bloodGroup,
      genotype: patient.genotype,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create patient: ${response.status} ${errorText}`);
  }

  return response.json();
}
