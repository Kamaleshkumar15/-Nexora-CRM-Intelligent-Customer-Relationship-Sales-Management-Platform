import { Card } from "@/components/ui";
export function StatCard({ label, value, delta, icon }: { label: string; value: string; delta: string; icon: string }) {
  return <Card className="p-5"><div className="flex items-start justify-between"><div><p className="text-xs uppercase tracking-widest text-slate-500">{label}</p><p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p><p className={`mt-2 text-xs ${delta.startsWith("-") ? "text-red-300" : "text-emerald-300"}`}>{delta} vs previous period</p></div><span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-500/10 text-lg">{icon}</span></div></Card>;
}
