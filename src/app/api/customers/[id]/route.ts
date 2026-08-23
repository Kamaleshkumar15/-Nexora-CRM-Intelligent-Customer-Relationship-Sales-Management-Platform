import { NextRequest, NextResponse } from "next/server";
import { customers } from "@/lib/mock-data";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const index = customers.findIndex((c) => c.id === id);
  if (index < 0) return NextResponse.json({ message: "Customer not found" }, { status: 404 });
  customers[index] = { ...customers[index], ...body };
  return NextResponse.json(customers[index]);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const index = customers.findIndex((c) => c.id === id);
  if (index < 0) return NextResponse.json({ message: "Customer not found" }, { status: 404 });
  const [deleted] = customers.splice(index, 1);
  return NextResponse.json(deleted);
}
