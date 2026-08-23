"use client";
import { useMemo } from "react";
import { useCRMData } from "@/hooks/useCrmData";
import type { Customer, CustomerFilters } from "@/types/customer";

type Params = { q: string; page: number; pageSize: number; sort: string; dir: "asc" | "desc"; filters: CustomerFilters };

export function useCustomers(params: Params) {
  const query = useCRMData();
  const result = useMemo(() => {
    const all = query.data?.customers ?? [];
    const q = params.q.trim().toLowerCase();
    let rows = all.filter((c) => {
      const searchable = `${c.name} ${c.email} ${c.company} ${c.phone}`.toLowerCase();
      if (q && !searchable.includes(q)) return false;
      if (params.filters.statuses.length && !params.filters.statuses.includes(c.status)) return false;
      if (params.filters.companies.length && !params.filters.companies.includes(c.company)) return false;
      if (params.filters.phone && !c.phone.toLowerCase().includes(params.filters.phone.toLowerCase())) return false;
      if (params.filters.email && !c.email.toLowerCase().includes(params.filters.email.toLowerCase())) return false;
      if (params.filters.minDeal && c.dealValue < Number(params.filters.minDeal)) return false;
      if (params.filters.from && c.lastContact.slice(0, 10) < params.filters.from) return false;
      if (params.filters.to && c.lastContact.slice(0, 10) > params.filters.to) return false;
      return true;
    });
    rows.sort((a: Customer, b: Customer) => {
      let cmp = 0;
      if (params.sort === "dealValue") {
        cmp = a.dealValue - b.dealValue;
      } else {
        const av = String(a[params.sort as keyof Customer] ?? "").toLowerCase();
        const bv = String(b[params.sort as keyof Customer] ?? "").toLowerCase();
        cmp = av < bv ? -1 : av > bv ? 1 : 0;
      }
      return params.dir === "asc" ? cmp : -cmp;
    });
    const total = rows.length;
    const start = (params.page - 1) * params.pageSize;
    return { data: rows.slice(start, start + params.pageSize), total, page: params.page, pageSize: params.pageSize };
  }, [query.data, params]);
  return { ...query, data: result };
}

export { useCRMMutations as useCustomerMutations } from "@/hooks/useCrmData";
