"use client";
import { useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerSchema, type CustomerForm as FormValues } from "@/lib/validation";
import type { Customer } from "@/types/customer";
import { Button, Input, Textarea, Select } from "@/components/ui";

export function CustomerForm({ initial, loading, onSubmit, onCancel }: { initial?: Customer | null; loading?: boolean; onSubmit: (values: FormValues) => Promise<void>; onCancel: () => void }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(customerSchema) as Resolver<FormValues>,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "Acme Corp",
      status: "Active",
      lastContact: new Date().toISOString().slice(0,10),
      notes: "",
      dealValue: 0,
      owner: "Kamal Kumar",
      city: "Chennai",
      health: 80,
    },
  });
  useEffect(() => {
    if (initial) {
      form.reset({
        name: initial.name,
        email: initial.email,
        phone: initial.phone,
        company: initial.company,
        status: initial.status,
        lastContact: initial.lastContact.slice(0,10),
        notes: initial.notes ?? "",
        dealValue: initial.dealValue ?? 0,
        owner: initial.owner ?? "Kamal Kumar",
        city: initial.city ?? "Chennai",
        health: initial.health ?? 80,
      });
    }
  }, [initial, form]);
  return <form onSubmit={form.handleSubmit(async (values) => onSubmit(values))} className="space-y-4">
    <div className="grid gap-4 sm:grid-cols-2">
      {(["name","email","phone","company","owner","city"] as const).map((name) => <label key={name} className="space-y-1.5 text-sm"><span className="text-slate-400 capitalize">{name}</span><Input {...form.register(name)} placeholder={name === "name" ? "Eleanor Henderson" : name === "email" ? "name@company.com" : ""} />{form.formState.errors[name] && <span className="text-xs text-red-300">{form.formState.errors[name]?.message}</span>}</label>)}
      <label className="space-y-1.5 text-sm"><span className="text-slate-400">Status</span><Select {...form.register("status")}><option>Active</option><option>Inactive</option><option>Prospect</option><option>Lead</option><option>Archive</option></Select></label>
      <label className="space-y-1.5 text-sm"><span className="text-slate-400">Last Contact</span><Input type="date" {...form.register("lastContact")} />{form.formState.errors.lastContact && <span className="text-xs text-red-300">{form.formState.errors.lastContact.message}</span>}</label>
      <label className="space-y-1.5 text-sm"><span className="text-slate-400">Deal Value</span><Input type="number" min="0" {...form.register("dealValue", { valueAsNumber: true })} /></label>
      <label className="space-y-1.5 text-sm"><span className="text-slate-400">Health Score</span><Input type="number" min="0" max="100" {...form.register("health", { valueAsNumber: true })} /></label>
    </div>
    <label className="space-y-1.5 text-sm"><span className="text-slate-400">Notes</span><Textarea {...form.register("notes")} placeholder="Customer notes, requirements and interactions..." />{form.formState.errors.notes && <span className="text-xs text-red-300">{form.formState.errors.notes.message}</span>}</label>
    <div className="flex justify-end gap-2"><Button type="button" variant="outline" onClick={onCancel}>Cancel</Button><Button type="submit" disabled={loading}>{loading ? "Saving..." : initial ? "Save Changes" : "Create Customer"}</Button></div>
  </form>;
}
