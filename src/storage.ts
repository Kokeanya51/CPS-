import type { ANCRecord, Drug, FollowUp, LabRequest, Patient, Visit } from "./types";

const keys = {
  patients: "macoki_patients",
  visits: "macoki_visits",
  followups: "macoki_followups",
  drugs: "macoki_drugs",
  labs: "macoki_labs",
  anc: "macoki_anc"
};

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const storage = {
  patients: {
    all: () => read<Patient[]>(keys.patients, []),
    save: (p: Patient) => write(keys.patients, [p, ...storage.patients.all()]),
    update: (p: Patient) => write(keys.patients, storage.patients.all().map(x => x.id === p.id ? p : x)),
    remove: (id: string) => write(keys.patients, storage.patients.all().filter(x => x.id !== id))
  },
  visits: {
    all: () => read<Visit[]>(keys.visits, []),
    save: (v: Visit) => write(keys.visits, [v, ...storage.visits.all()])
  },
  followups: {
    all: () => read<FollowUp[]>(keys.followups, []),
    save: (f: FollowUp) => write(keys.followups, [f, ...storage.followups.all()])
  },
  drugs: {
    all: () => read<Drug[]>(keys.drugs, []),
    save: (d: Drug) => write(keys.drugs, [d, ...storage.drugs.all()]),
    update: (d: Drug) => write(keys.drugs, storage.drugs.all().map(x => x.id === d.id ? d : x))
  },
  labs: {
    all: () => read<LabRequest[]>(keys.labs, []),
    save: (l: LabRequest) => write(keys.labs, [l, ...storage.labs.all()])
  },
  anc: {
    all: () => read<ANCRecord[]>(keys.anc, []),
    save: (a: ANCRecord) => write(keys.anc, [a, ...storage.anc.all()])
  },
  seed: () => {
    if (storage.patients.all().length === 0) {
      storage.patients.save({
        id: crypto.randomUUID(), hospitalNumber: "MAC-0001", firstName: "Chidinma",
        lastName: "Sample", sex: "Female", dateOfBirth: "1998-05-14", phone: "08000000000",
        address: "Ikwuano, Abia State", nextOfKin: "Sample Contact", bloodGroup: "O+",
        genotype: "AA", createdAt: new Date().toISOString()
      });
    }
    if (storage.drugs.all().length === 0) {
      storage.drugs.save({ id: crypto.randomUUID(), name: "Paracetamol 500mg", batch: "MC-PARA-01", expiry: "2027-08-31", quantity: 120, reorderLevel: 20 });
      storage.drugs.save({ id: crypto.randomUUID(), name: "Amoxicillin 500mg", batch: "MC-AMOX-01", expiry: "2027-03-31", quantity: 65, reorderLevel: 15 });
    }
  }
};