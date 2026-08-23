import { NextRequest, NextResponse } from "next/server";
import { customers } from "@/lib/mock-data";
import type { CustomerFilters, CustomerStatus } from "@/types/customer";

function filteredData(params: URLSearchParams) {
  const q = (params.get("q") || "").toLowerCase().trim();
  const page = Math.max(1, Number(params.get("page") || 1));
  const pageSize = Math.min(50, Math.max(1, Number(params.get("pageSize") || 10)));
  const sort = params.get("sort") || "name";
  const dir = params.get("dir") === "desc" ? -1 : 1;
  const statuses = (params.get("statuses") || "").split(",").filter(Boolean) as CustomerStatus[];
  const companies = (params.get("companies") || "").split(",").filter(Boolean);
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const phone = (params.get("phone") || "").toLowerCase();
  const email = (params.get("email") || "").toLowerCase();
  const minDeal = Number(params.get("minDeal") || 0);

  let rows = customers.filter((c) => {
    const haystack = `${c.name} ${c.email} ${c.company} ${c.phone}`.toLowerCase();
    if (q && !haystack.includes(q)) return false;
    if (statuses.length && !statuses.includes(c.status)) return false;
    if (companies.length && !companies.includes(c.company)) return false;
    if (phone && !c.phone.toLowerCase().includes(phone)) return false;
    if (email && !c.email.toLowerCase().includes(email)) return false;
    if (minDeal && c.dealValue < minDeal) return false;
    if (from && c.lastContact.slice(0, 10) < from) return false;
    if (to && c.lastContact.slice(0, 10) > to) return false;
    return true;
  });

  rows.sort((a, b) => {
    const av = sort === "lastContact" ? a.lastContact : sort === "dealValue" ? a.dealValue : String(a[sort as "name" | "email"]).toLowerCase();
    const bv = sort === "lastContact" ? b.lastContact : sort === "dealValue" ? b.dealValue : String(b[sort as "name" | "email"]).toLowerCase();
    return av < bv ? -dir : av > bv ? dir : 0;
  });

  const total = rows.length;
  const start = (page - 1) * pageSize;
  return { data: rows.slice(start, start + pageSize), total, page, pageSize };
}

export async function GET(req: NextRequest) {
  return NextResponse.json(filteredData(req.nextUrl.searchParams));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const item = { id: `cus-${Date.now()}`, ...body };
  customers.unshift(item);
  return NextResponse.json(item, { status: 201 });
}
