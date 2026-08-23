"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { buildSeedState, readState, resetState, writeState } from "@/lib/crm-store";
import type { CRMState, Company, Deal, Lead, Task } from "@/types/crm";
import type { Customer, CustomerPayload } from "@/types/customer";

export const crmQueryKey = ["nexora-crm"];

export function useCRMData() {
  return useQuery<CRMState>({
    queryKey: crmQueryKey,
    queryFn: async () => readState(),
    staleTime: 30_000,
    gcTime: 10 * 60_000,
  });
}

function updateState(updater: (state: CRMState) => CRMState) {
  return writeState(updater(readState()));
}

export function useCRMMutations() {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: crmQueryKey });

  const createCustomer = useMutation({
    mutationFn: async (payload: CustomerPayload) => {
      const id = `cus-${Date.now()}`;
      const customer: Customer = { ...payload, id };
      updateState((s) => ({ ...s, customers: [customer, ...s.customers], recentlyViewed: [id, ...s.recentlyViewed].slice(0, 10) }));
      return customer;
    },
    onSuccess: invalidate,
  });

  const updateCustomer = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: Partial<Customer> }) => {
      updateState((s) => ({ ...s, customers: s.customers.map((c) => (c.id === id ? { ...c, ...payload } : c)) }));
      return id;
    },
    onSuccess: invalidate,
  });

  const deleteCustomer = useMutation({
    mutationFn: async (id: string) => {
      updateState((s) => ({ ...s, customers: s.customers.filter((c) => c.id !== id), pinnedCustomerIds: s.pinnedCustomerIds.filter((x) => x !== id) }));
      return id;
    },
    onSuccess: invalidate,
  });

  const deleteLead = useMutation({
    mutationFn: async (id: string) => { updateState((s) => ({ ...s, leads: s.leads.filter((x) => x.id !== id) })); return id; },
    onSuccess: invalidate,
  });

  const updateLead = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<Lead> }) => updateState((s) => ({ ...s, leads: s.leads.map((x) => (x.id === id ? { ...x, ...patch } : x)) })),
    onSuccess: invalidate,
  });

  const deleteDeal = useMutation({
    mutationFn: async (id: string) => { updateState((s) => ({ ...s, deals: s.deals.filter((x) => x.id !== id) })); return id; },
    onSuccess: invalidate,
  });

  const updateDeal = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<Deal> }) => updateState((s) => ({ ...s, deals: s.deals.map((x) => (x.id === id ? { ...x, ...patch } : x)) })),
    onSuccess: invalidate,
  });

  const deleteTask = useMutation({
    mutationFn: async (id: string) => { updateState((s) => ({ ...s, tasks: s.tasks.filter((x) => x.id !== id) })); return id; },
    onSuccess: invalidate,
  });

  const updateTask = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<Task> }) => updateState((s) => ({ ...s, tasks: s.tasks.map((x) => (x.id === id ? { ...x, ...patch } : x)) })),
    onSuccess: invalidate,
  });

  const createLead = useMutation({
    mutationFn: async (lead: Omit<Lead, "id">) => {
      const created = { ...lead, id: `lead-${Date.now()}` };
      updateState((s) => ({ ...s, leads: [created, ...s.leads] }));
      return created;
    },
    onSuccess: invalidate,
  });

  const createDeal = useMutation({
    mutationFn: async (deal: Omit<Deal, "id">) => {
      const created = { ...deal, id: `deal-${Date.now()}` };
      updateState((s) => ({ ...s, deals: [created, ...s.deals] }));
      return created;
    },
    onSuccess: invalidate,
  });

  const createTask = useMutation({
    mutationFn: async (task: Omit<Task, "id">) => {
      const created = { ...task, id: `task-${Date.now()}` };
      updateState((s) => ({ ...s, tasks: [created, ...s.tasks] }));
      return created;
    },
    onSuccess: invalidate,
  });

  const createCompany = useMutation({
    mutationFn: async (company: Omit<Company, "id">) => {
      const created = { ...company, id: `company-${Date.now()}` };
      updateState((s) => ({ ...s, companies: [created, ...s.companies] }));
      return created;
    },
    onSuccess: invalidate,
  });

  const deleteCompany = useMutation({
    mutationFn: async (id: string) => { updateState((s) => ({ ...s, companies: s.companies.filter((x) => x.id !== id) })); return id; },
    onSuccess: invalidate,
  });

  const updateCompany = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<Company> }) => updateState((s) => ({ ...s, companies: s.companies.map((x) => (x.id === id ? { ...x, ...patch } : x)) })),
    onSuccess: invalidate,
  });

  const setPinnedCustomers = useMutation({
    mutationFn: async (ids: string[]) => updateState((s) => ({ ...s, pinnedCustomerIds: ids })),
    onSuccess: invalidate,
  });

  const setRecentlyViewed = useMutation({
    mutationFn: async (ids: string[]) => updateState((s) => ({ ...s, recentlyViewed: ids.slice(0, 10) })),
    onSuccess: invalidate,
  });

  const savePreferences = useMutation({
    mutationFn: async (preferences: CRMState["preferences"]) => updateState((s) => ({ ...s, preferences })),
    onSuccess: invalidate,
  });

  const saveView = useMutation({
    mutationFn: async (view: CRMState["savedViews"][number]) => updateState((s) => ({ ...s, savedViews: [...s.savedViews.filter((v) => v.id !== view.id), view] })),
    onSuccess: invalidate,
  });

  const resetDemo = useMutation({ mutationFn: async () => resetState(), onSuccess: invalidate });

  return { createCustomer, updateCustomer, deleteCustomer, createLead, updateLead, deleteLead, createDeal, updateDeal, deleteDeal, createTask, updateTask, deleteTask, createCompany, updateCompany, deleteCompany, setPinnedCustomers, setRecentlyViewed, savePreferences, saveView, resetDemo };
}
