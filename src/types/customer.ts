export type CustomerStatus = "Active" | "Inactive" | "Prospect" | "Lead" | "Archive";

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: CustomerStatus;
  lastContact: string;
  notes: string;
  dealValue: number;
  owner: string;
  city: string;
  health: number;
};

export type CustomerFilters = {
  statuses: CustomerStatus[];
  companies: string[];
  from: string;
  to: string;
  phone: string;
  email: string;
  minDeal: string;
};

export type CustomerPayload = Omit<Customer, "id">;
