import type { Customer } from "@/types/customer";

const companies = ["Acme Corp", "Innovatech", "Globex", "Nexora Labs", "Vertex Systems", "Orbit Works"];
const cities = ["Chennai", "Coimbatore", "Bengaluru", "Hyderabad", "Pune", "Mumbai"];
const owners = ["Sarah Chen", "Kamal Kumar", "Alex Morgan", "Priya Shah"];
const statuses: Customer["status"][] = ["Active", "Inactive", "Prospect", "Lead", "Archive"];

export const customers: Customer[] = Array.from({ length: 150 }, (_, i) => {
  const company = companies[i % companies.length];
  const status = statuses[i % statuses.length];
  const first = ["Eleanor", "John", "Sarah", "David", "Maya", "Arun", "Priya", "Daniel"][i % 8];
  const last = ["Henderson", "Doe", "Wilson", "Brown", "Shah", "Kumar", "Thomas", "Lee"][i % 8];
  return {
    id: `cus-${String(i + 1).padStart(3, "0")}`,
    name: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}${i}@example.com`,
    phone: `+91 98${String(10000000 + i).slice(0, 8)}`,
    company,
    status,
    lastContact: new Date(Date.now() - (i % 45) * 86400000).toISOString(),
    notes: i % 3 === 0 ? "Interested in premium plan and requested a follow-up." : "Regular customer interaction.",
    dealValue: 25000 + (i % 18) * 12500,
    owner: owners[i % owners.length],
    city: cities[i % cities.length],
    health: 55 + ((i * 7) % 45),
  };
});
