import type { Customer } from "@/types/customer";
import type { Activity, Company, CRMState, Deal, Lead, Task } from "@/types/crm";
import { customers as seedCustomers } from "@/lib/mock-data";

const KEY = "nexora-crm-state-v2";

const companyNames = ["Acme Corp", "Innovatech", "Globex", "Nexora Labs", "Vertex Systems", "Orbit Works"];
const industries = ["Technology", "Finance", "Healthcare", "Retail", "Education", "Manufacturing"];
const owners = ["Sarah Chen", "Kamal Kumar", "Alex Morgan", "Priya Shah"];
const sources = ["Website", "Referral", "Social", "Campaign"];
const leadStages: Lead["stage"][] = ["New", "Contacted", "Qualified", "Proposal", "Won"];
const dealStages: Deal["stage"][] = ["Qualified", "Proposal", "Negotiation", "Won", "Lost"];

export function buildSeedState(input: Customer[] = seedCustomers): CRMState {
  const leads: Lead[] = input.slice(0, 60).map((c, i) => ({
    id: `lead-${c.id}`,
    name: c.name,
    company: c.company,
    email: c.email,
    phone: c.phone,
    stage: leadStages[i % leadStages.length],
    temperature: i % 3 === 0 ? "Hot" : i % 3 === 1 ? "Warm" : "Cold",
    score: 58 + ((i * 11) % 41),
    owner: c.owner,
    source: sources[i % sources.length],
    customerId: c.id,
  }));

  const deals: Deal[] = input.slice(0, 42).map((c, i) => ({
    id: `deal-${c.id}`,
    name: `${c.company} Enterprise Deal`,
    customerId: c.id,
    company: c.company,
    value: c.dealValue * (1 + (i % 4) * 0.25),
    probability: [35, 55, 72, 88][i % 4],
    stage: dealStages[i % dealStages.length],
    closeDate: new Date(Date.now() + ((i % 40) + 1) * 86400000).toISOString().slice(0, 10),
    owner: c.owner,
  }));

  const tasks: Task[] = input.slice(0, 55).map((c, i) => ({
    id: `task-${c.id}`,
    title: ["Follow up with customer", "Send proposal", "Schedule demo", "Update customer information", "Review deal"][i % 5],
    customerId: c.id,
    company: c.company,
    dealId: deals[i % deals.length]?.id,
    dueDate: new Date(Date.now() + ((i % 12) - 3) * 86400000).toISOString().slice(0, 10),
    priority: i % 4 === 0 ? "High" : i % 3 === 0 ? "Medium" : "Low",
    status: i % 5 === 0 ? "Done" : i % 4 === 0 ? "In Progress" : "Todo",
    owner: c.owner,
  }));

  const companies: Company[] = companyNames.map((name, i) => {
    const companyCustomers = input.filter((c) => c.company === name);
    const companyDeals = deals.filter((d) => d.company === name);
    const companyTasks = tasks.filter((t) => t.company === name);
    return {
      id: `company-${i + 1}`,
      name,
      industry: industries[i % industries.length],
      city: companyCustomers[0]?.city ?? "Chennai",
      customerIds: companyCustomers.map((c) => c.id),
      dealIds: companyDeals.map((d) => d.id),
      taskIds: companyTasks.map((t) => t.id),
      revenue: companyDeals.reduce((sum, d) => sum + d.value, 0),
      status: i % 3 === 0 ? "Prospect" : "Active",
    };
  });

  const activities: Activity[] = [
    { id: "act-1", title: "Eleanor — Call logged", type: "call", timestamp: "12 min ago" },
    { id: "act-2", title: "Acme — Proposal sent", type: "email", timestamp: "42 min ago" },
    { id: "act-3", title: "John — Customer added", type: "customer", timestamp: "1 hr ago" },
    { id: "act-4", title: "Enterprise Deal — Updated", type: "deal", timestamp: "2 hrs ago" },
    { id: "act-5", title: "Follow-up task — Completed", type: "task", timestamp: "3 hrs ago" },
  ];

  return {
    customers: input,
    leads,
    deals,
    tasks,
    companies,
    activities,
    savedViews: [
      { id: "view-vip", name: "VIP Customers", filters: { minDeal: "80000" } },
      { id: "view-hot", name: "Hot Leads", filters: { status: "Lead" } },
      { id: "view-risk", name: "At Risk", filters: { health: "<70" } },
    ],
    pinnedCustomerIds: input.slice(0, 3).map((c) => c.id),
    recentlyViewed: input.slice(0, 5).map((c) => c.id),
    preferences: { theme: "dark", accent: "indigo", density: "comfortable", sidebarCollapsed: false, reducedMotion: false },
  };
}

export function readState(): CRMState {
  if (typeof window === "undefined") return buildSeedState();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) {
      const state = buildSeedState();
      window.localStorage.setItem(KEY, JSON.stringify(state));
      return state;
    }
    const parsed = JSON.parse(raw) as CRMState;
    if (!parsed.customers || !parsed.leads || !parsed.deals) throw new Error("Invalid saved state");
    return parsed;
  } catch {
    const state = buildSeedState();
    window.localStorage.setItem(KEY, JSON.stringify(state));
    return state;
  }
}

export function writeState(state: CRMState) {
  if (typeof window !== "undefined") window.localStorage.setItem(KEY, JSON.stringify(state));
  return state;
}

export function resetState() {
  const state = buildSeedState();
  writeState(state);
  return state;
}

export function exportState() {
  return JSON.stringify(readState(), null, 2);
}
