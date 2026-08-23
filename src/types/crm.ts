import type { Customer } from "@/types/customer";

export type LeadStage = "New" | "Contacted" | "Qualified" | "Proposal" | "Won";
export type LeadTemperature = "Hot" | "Warm" | "Cold";
export type DealStage = "Qualified" | "Proposal" | "Negotiation" | "Won" | "Lost";
export type TaskStatus = "Todo" | "In Progress" | "Done";
export type Priority = "High" | "Medium" | "Low";

export type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  stage: LeadStage;
  temperature: LeadTemperature;
  score: number;
  owner: string;
  source: string;
  customerId?: string;
};

export type Deal = {
  id: string;
  name: string;
  customerId: string;
  company: string;
  value: number;
  probability: number;
  stage: DealStage;
  closeDate: string;
  owner: string;
};

export type Task = {
  id: string;
  title: string;
  customerId?: string;
  company: string;
  dealId?: string;
  dueDate: string;
  priority: Priority;
  status: TaskStatus;
  owner: string;
};

export type Company = {
  id: string;
  name: string;
  industry: string;
  city: string;
  customerIds: string[];
  dealIds: string[];
  taskIds: string[];
  revenue: number;
  status: "Active" | "Prospect";
};

export type Activity = {
  id: string;
  title: string;
  type: "call" | "email" | "customer" | "deal" | "task";
  timestamp: string;
  entityId?: string;
};

export type SavedView = {
  id: string;
  name: string;
  filters: Record<string, unknown>;
};

export type CRMState = {
  customers: Customer[];
  leads: Lead[];
  deals: Deal[];
  tasks: Task[];
  companies: Company[];
  activities: Activity[];
  savedViews: SavedView[];
  pinnedCustomerIds: string[];
  recentlyViewed: string[];
  preferences: {
    theme: "dark" | "light";
    accent: string;
    density: "compact" | "comfortable" | "spacious";
    sidebarCollapsed: boolean;
    reducedMotion: boolean;
  };
};
