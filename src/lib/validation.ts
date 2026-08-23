import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().regex(/^\+?[0-9\s()-]{10,18}$/, "Enter a valid phone number"),
  company: z.string().trim().min(2, "Company is required"),
  status: z.enum(["Active", "Inactive", "Prospect", "Lead", "Archive"]),
  lastContact: z.string().min(1, "Last contact date is required"),
  notes: z.string().max(1000, "Notes are too long").default(""),
  dealValue: z.coerce.number().min(0, "Deal value cannot be negative").default(0),
  owner: z.string().min(2, "Owner is required").default("Kamal Kumar"),
  city: z.string().min(2, "City is required").default("Chennai"),
  health: z.coerce.number().min(0).max(100).default(80),
});
export type CustomerForm = z.infer<typeof customerSchema>;
