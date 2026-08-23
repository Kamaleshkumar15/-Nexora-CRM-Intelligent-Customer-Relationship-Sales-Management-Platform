"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Bell, Bot, CalendarDays, Check, Download, FileSpreadsheet, Mail, ShieldCheck, Sparkles, Upload, Users, X, Zap } from "lucide-react";
import { Badge, Button, Card, Input, Modal, Select, Textarea } from "@/components/ui";
import type { Company, Deal, Lead, Task } from "@/types/crm";
import type { Customer, CustomerPayload } from "@/types/customer";
import type { CustomerFilters } from "@/types/customer";
import { money, formatDate } from "@/lib/utils";

type ProTab = "AI" | "Import / Export" | "Alerts" | "Audit" | "Calendar" | "Email" | "Admin";
type AuditEntry = { id: string; action: string; actor: string; time: string; entity?: string };
type UserRecord = { id: string; name: string; email: string; role: "Admin" | "Manager" | "Sales Representative" | "Viewer"; active: boolean };
type CalendarEvent = { id: string; title: string; date: string; time: string; customer?: string };

const AUDIT_KEY = "nexora-pro-audit-v1";
const USERS_KEY = "nexora-pro-users-v1";
const CAL_KEY = "nexora-pro-calendar-v1";
const defaultUsers: UserRecord[] = [
  { id: "u1", name: "Kamal Kumar", email: "kamal@nexora.local", role: "Admin", active: true },
  { id: "u2", name: "Sarah Chen", email: "sarah@nexora.local", role: "Manager", active: true },
  { id: "u3", name: "Alex Morgan", email: "alex@nexora.local", role: "Sales Representative", active: true },
  { id: "u4", name: "John Smith", email: "john@nexora.local", role: "Viewer", active: false },
];

function useStored<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw) as T);
    } catch {}
  }, [key]);
  const update = (next: T) => {
    setValue(next);
    try { window.localStorage.setItem(key, JSON.stringify(next)); } catch {}
  };
  return [value, update] as const;
}

function csvCell(value: unknown) { return `"${String(value ?? "").replaceAll('"', '""')}"`; }
function downloadText(name: string, text: string, type: string) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = name;
  a.click();
  window.setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export function ProToolbar({ onOpen }: { onOpen: (tab: ProTab) => void }) {
  return <Card className="flex flex-wrap items-center gap-2 p-3">
    <div className="mr-1 flex items-center gap-2 text-sm font-semibold"><Sparkles className="h-4 w-4 text-indigo-300"/> Pro Workspace</div>
    <Button size="sm" variant="outline" onClick={() => onOpen("AI")}><Bot className="h-4 w-4"/> AI Assistant</Button>
    <Button size="sm" variant="outline" onClick={() => onOpen("Import / Export")}><FileSpreadsheet className="h-4 w-4"/> Data Tools</Button>
    <Button size="sm" variant="outline" onClick={() => onOpen("Alerts")}><Bell className="h-4 w-4"/> Smart Alerts</Button>
    <Button size="sm" variant="outline" onClick={() => onOpen("Audit")}><ShieldCheck className="h-4 w-4"/> Audit Log</Button>
    <Button size="sm" variant="outline" onClick={() => onOpen("Calendar")}><CalendarDays className="h-4 w-4"/> Calendar</Button>
    <Button size="sm" variant="outline" onClick={() => onOpen("Email")}><Mail className="h-4 w-4"/> Email</Button>
    <Button size="sm" variant="outline" onClick={() => onOpen("Admin")}><Users className="h-4 w-4"/> Users & Roles</Button>
  </Card>;
}

export function ProSuite({
  open,
  tab,
  onClose,
  customers,
  leads,
  deals,
  tasks,
  companies,
  onNavigate,
  onNotify,
  onImportCustomers,
  onApplyFilters,
}: {
  open: boolean;
  tab: ProTab;
  onClose: () => void;
  customers: Customer[];
  leads: Lead[];
  deals: Deal[];
  tasks: Task[];
  companies: Company[];
  onNavigate: (section: string) => void;
  onNotify: (message: string) => void;
  onImportCustomers: (rows: CustomerPayload[]) => Promise<void>;
  onApplyFilters: (filters: CustomerFilters) => void;
}) {
  const [active, setActive] = useState<ProTab>(tab);
  const [audit, setAudit] = useStored<AuditEntry[]>(AUDIT_KEY, [
    { id: "a1", action: "Workspace initialized", actor: "System", time: "Today, 09:00 AM" },
    { id: "a2", action: "Customer status changed", actor: "Sarah Chen", time: "Today, 10:21 AM", entity: "Eleanor Henderson" },
    { id: "a3", action: "Deal updated", actor: "Kamal Kumar", time: "Today, 10:32 AM", entity: "Acme Enterprise Deal" },
  ]);
  const [users, setUsers] = useStored<UserRecord[]>(USERS_KEY, defaultUsers);
  const [events, setEvents] = useStored<CalendarEvent[]>(CAL_KEY, [
    { id: "e1", title: "Acme proposal review", date: new Date(Date.now() + 86400000).toISOString().slice(0, 10), time: "02:30 PM", customer: customers[0]?.name },
  ]);
  const [aiQuery, setAiQuery] = useState("");
  const [aiResult, setAiResult] = useState<string[]>([]);
  const [importRows, setImportRows] = useState<CustomerPayload[]>([]);
  const [importErrors, setImportErrors] = useState<string[]>([]);
  const [duplicateCount, setDuplicateCount] = useState(0);
  const [importing, setImporting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [emailTo, setEmailTo] = useState(customers[0]?.email ?? "");
  const [emailSubject, setEmailSubject] = useState("Nexora CRM follow-up");
  const [emailBody, setEmailBody] = useState("Hello,\n\nFollowing up on our recent conversation.\n\nRegards,\nNexora CRM");
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState(new Date().toISOString().slice(0, 10));
  const [eventTime, setEventTime] = useState("10:00 AM");
  const [eventCustomer, setEventCustomer] = useState(customers[0]?.name ?? "");
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Sales Representative" as UserRecord["role"] });
  const [tags, setTags] = useState(["VIP", "Enterprise", "High Value", "New", "At Risk", "Follow-up"]);
  const [newTag, setNewTag] = useState("");
  const [automationEnabled, setAutomationEnabled] = useState(true);

  useEffect(() => setActive(tab), [tab]);

  const alerts = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return [
      { level: "red", text: `${tasks.filter(t => t.dueDate < today && t.status !== "Done").length} overdue tasks`, action: () => onNavigate("Tasks") },
      { level: "amber", text: `${customers.filter(c => c.health < 70).length} customers at risk`, action: () => onNavigate("Customers") },
      { level: "orange", text: `${leads.filter(l => l.temperature === "Hot").length} hot leads need follow-up`, action: () => onNavigate("Leads") },
      { level: "green", text: `${deals.filter(d => d.closeDate <= today && d.stage !== "Won" && d.stage !== "Lost").length} deals closing now`, action: () => onNavigate("Deals") },
      { level: "blue", text: `${events.length} scheduled meetings`, action: () => setActive("Calendar") },
    ];
  }, [customers, leads, deals, tasks, events, onNavigate]);

  const runAI = () => {
    const q = aiQuery.trim().toLowerCase();
    if (!q) { setAiResult(["Try: inactive customers", "Try: customers not contacted in 30 days", "Try: highest deal value", "Try: high priority leads", "Try: summarize Eleanor"]); return; }
    if (q.includes("inactive")) {
      const rows = customers.filter(c => c.status === "Inactive").slice(0, 8);
      setAiResult([`Found ${customers.filter(c => c.status === "Inactive").length} inactive customers.`, ...rows.map(c => `${c.name} • ${c.company} • ${c.email}`)]);
      onApplyFilters({ statuses: ["Inactive"], companies: [], from: "", to: "", phone: "", email: "", minDeal: "" });
      return;
    }
    if (q.includes("30 day") || q.includes("30 days") || q.includes("not contacted")) {
      const cutoff = Date.now() - 30 * 86400000;
      const rows = customers.filter(c => new Date(c.lastContact).getTime() < cutoff).slice(0, 8);
      setAiResult([`Found ${rows.length} sample customers with no recent contact.`, ...rows.map(c => `${c.name} • last contact ${formatDate(c.lastContact)}`)]);
      onNavigate("Customers");
      return;
    }
    if (q.includes("highest deal") || q.includes("largest deal") || q.includes("highest value")) {
      const top = [...deals].sort((a, b) => b.value - a.value).slice(0, 6);
      setAiResult(["Top deal opportunities:", ...top.map(d => `${d.name} • ${money(d.value)} • ${d.probability}% probability`)]);
      onNavigate("Deals");
      return;
    }
    if (q.includes("high priority") || q.includes("priority lead")) {
      const top = leads.filter(l => l.temperature === "Hot").sort((a, b) => b.score - a.score).slice(0, 6);
      setAiResult(["Hot/high-priority leads:", ...top.map(l => `${l.name} • score ${l.score} • ${l.company}`)]);
      onNavigate("Leads");
      return;
    }
    const named = customers.find(c => `${c.name} ${c.company}`.toLowerCase().includes(q.replace("summarize", "").trim()));
    if (q.includes("summar") && named) {
      setAiResult([`AI summary for ${named.name}:`, `${named.name} works with ${named.company} as an active CRM record.`, `Health score: ${named.health}/100. Deal value: ${money(named.dealValue)}.`, `Last contact: ${formatDate(named.lastContact)}.`, named.health < 70 ? "Recommendation: re-engage immediately and create a follow-up task." : "Recommendation: continue engagement and move the current opportunity forward."]);
      return;
    }
    setAiResult(["I could not match that request in the local demo dataset.", "Try an example from the quick commands below."]);
  };

  const parseCsv = (text: string) => {
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) return { rows: [] as CustomerPayload[], errors: ["CSV needs a header row and at least one record."] };
    const headers = lines[0].split(",").map(h => h.trim().toLowerCase().replaceAll(" ", ""));
    const get = (cells: string[], names: string[]) => { const i = headers.findIndex(h => names.includes(h)); return i >= 0 ? cells[i]?.trim() ?? "" : ""; };
    const rows: CustomerPayload[] = []; const errors: string[] = [];
    for (let i = 1; i < lines.length && rows.length < 500; i++) {
      const cells = lines[i].split(",").map(v => v.trim().replace(/^"|"$/g, ""));
      const name = get(cells, ["name", "customer", "customername"]); const email = get(cells, ["email", "emailaddress"]); const phone = get(cells, ["phone", "phonenumber"]); const company = get(cells, ["company", "companyname"]);
      if (!name || !email || !company) { errors.push(`Row ${i + 1}: name, email and company are required.`); continue; }
      if (!/^\S+@\S+\.\S+$/.test(email)) { errors.push(`Row ${i + 1}: invalid email ${email}.`); continue; }
      rows.push({ name, email, phone: phone || "+91 9000000000", company, status: (get(cells, ["status"]) as Customer["status"]) || "Prospect", lastContact: new Date().toISOString(), notes: get(cells, ["notes"]) || "Imported through Nexora CRM", dealValue: Number(get(cells, ["dealvalue", "value"])) || 0, owner: get(cells, ["owner", "accountowner"]) || "Kamal Kumar", city: get(cells, ["city"]) || "Chennai", health: Math.min(100, Math.max(0, Number(get(cells, ["health", "healthscore"])) || 70)) });
    }
    const keys = new Set(customers.map(c => `${c.email.toLowerCase()}|${c.phone}`));
    const duplicates = rows.filter(r => keys.has(`${r.email.toLowerCase()}|${r.phone}`) || customers.some(c => c.name.toLowerCase() === r.name.toLowerCase() && c.company.toLowerCase() === r.company.toLowerCase())).length;
    return { rows, errors, duplicates };
  };

  const handleFile = (file: File) => { const reader = new FileReader(); reader.onload = () => { const result = parseCsv(String(reader.result ?? "")); setImportRows(result.rows); setImportErrors(result.errors); setDuplicateCount(result.duplicates ?? 0); }; reader.readAsText(file); };
  const importNow = async () => { if (!importRows.length) return; setImporting(true); try { await onImportCustomers(importRows); setAudit([{ id: crypto.randomUUID(), action: `Imported ${importRows.length} customers`, actor: "Kamal Kumar", time: new Date().toLocaleString() }, ...audit]); onNotify(`Imported ${importRows.length} customers`); setImportRows([]); setImportErrors([]); } finally { setImporting(false); } };
  const exportCustomers = (kind: "csv" | "json") => {
    if (kind === "json") downloadText("nexora-customers.json", JSON.stringify(customers, null, 2), "application/json");
    else downloadText("nexora-customers.csv", [["Name","Email","Phone","Company","Status","Health","Deal Value","Last Contact","Owner"], ...customers.map(c => [c.name,c.email,c.phone,c.company,c.status,c.health,c.dealValue,c.lastContact,c.owner])].map(r => r.map(csvCell).join(",")).join("\n"), "text/csv");
    onNotify(`Exported ${customers.length} customers as ${kind.toUpperCase()}`);
  };
  const addEvent = () => { if (!eventTitle.trim()) return; const next = [{ id: crypto.randomUUID(), title: eventTitle.trim(), date: eventDate, time: eventTime, customer: eventCustomer }, ...events]; setEvents(next); setAudit([{ id: crypto.randomUUID(), action: "Meeting scheduled", actor: "Kamal Kumar", time: new Date().toLocaleString(), entity: eventTitle }, ...audit]); setEventTitle(""); onNotify("Meeting scheduled"); };
  const sendEmail = () => { if (!emailTo.trim()) return; window.location.href = `mailto:${encodeURIComponent(emailTo)}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`; setAudit([{ id: crypto.randomUUID(), action: "Email composer opened", actor: "Kamal Kumar", time: new Date().toLocaleString(), entity: emailTo }, ...audit]); onNotify("Email composer opened"); };
  const addUser = () => { if (!newUser.name.trim() || !newUser.email.trim()) return; setUsers([{ id: crypto.randomUUID(), ...newUser, active: true }, ...users]); setNewUser({ name: "", email: "", role: "Sales Representative" }); onNotify("User added"); };

  return <Modal open={open} title={`Nexora Pro Center • ${active}`} onClose={onClose}>
    <div className="mb-5 flex flex-wrap gap-2">{(["AI","Import / Export","Alerts","Audit","Calendar","Email","Admin"] as ProTab[]).map(t => <Button key={t} size="sm" variant={active === t ? "default" : "outline"} onClick={() => setActive(t)}>{t}</Button>)}</div>
    {active === "AI" && <div className="space-y-4"><Card className="border-indigo-400/20 bg-indigo-500/5 p-5"><div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-500/15 text-indigo-300"><Bot/></div><div><h3 className="font-semibold">AI CRM Assistant</h3><p className="text-xs text-slate-500">Local, deterministic CRM intelligence using your connected demo data.</p></div></div><div className="mt-4 flex gap-2"><Input value={aiQuery} onChange={e => setAiQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && runAI()} placeholder="Ask: show inactive customers..."/><Button onClick={runAI}>Run</Button></div><div className="mt-3 flex flex-wrap gap-2">{["Show inactive customers","Highest deal value","High priority leads","Summarize Eleanor"].map(q => <button key={q} onClick={() => { setAiQuery(q); setTimeout(runAI, 0); }} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/[.05]">{q}</button>)}</div></Card><Card className="p-5"><h4 className="font-semibold">Result</h4><div className="mt-3 space-y-2 text-sm">{aiResult.length ? aiResult.map((r, i) => <p key={i} className={i === 0 ? "font-medium text-indigo-200" : "text-slate-300"}>{r}</p>) : <p className="text-slate-500">Run a query to see CRM intelligence.</p>}</div></Card></div>}
    {active === "Import / Export" && <div className="space-y-4"><div className="grid gap-4 md:grid-cols-3"><Card className="p-5 md:col-span-2"><div className="flex items-center justify-between"><div><h3 className="font-semibold">CSV Import</h3><p className="text-xs text-slate-500">Validate, detect duplicates, preview, then import.</p></div><Button onClick={() => fileRef.current?.click()}><Upload className="h-4 w-4"/> Choose CSV</Button><input ref={fileRef} hidden type="file" accept=".csv,text/csv" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}/></div>{importRows.length > 0 && <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="rounded-xl bg-emerald-500/5 p-3"><p className="text-xs text-slate-500">Valid</p><p className="text-xl font-semibold text-emerald-300">{importRows.length}</p></div><div className="rounded-xl bg-amber-500/5 p-3"><p className="text-xs text-slate-500">Duplicates</p><p className="text-xl font-semibold text-amber-300">{duplicateCount}</p></div><div className="rounded-xl bg-red-500/5 p-3"><p className="text-xs text-slate-500">Invalid rows</p><p className="text-xl font-semibold text-red-300">{importErrors.length}</p></div></div>}{importErrors.length > 0 && <div className="mt-4 space-y-1 text-xs text-red-300">{importErrors.slice(0, 8).map(x => <p key={x}>{x}</p>)}</div>}{importRows.length > 0 && <div className="mt-4 flex justify-end"><Button disabled={importing} onClick={importNow}><Check className="h-4 w-4"/> {importing ? "Importing..." : `Import ${importRows.length}`}</Button></div>}</Card><Card className="p-5"><h3 className="font-semibold">Export</h3><div className="mt-4 space-y-2"><Button className="w-full" variant="outline" onClick={() => exportCustomers("csv")}><Download className="h-4 w-4"/> CSV</Button><Button className="w-full" variant="outline" onClick={() => exportCustomers("json")}><Download className="h-4 w-4"/> JSON</Button><p className="pt-2 text-xs text-slate-500">Excel-compatible CSV is included for spreadsheet workflows.</p></div></Card></div><Card className="p-5"><h3 className="font-semibold">Duplicate rules</h3><div className="mt-3 grid gap-2 md:grid-cols-3 text-xs text-slate-400"><Badge>Email exact match</Badge><Badge>Phone exact match</Badge><Badge>Name + company match</Badge></div></Card></div>}
    {active === "Alerts" && <div className="space-y-4"><Card className="p-5"><div className="flex items-center justify-between"><div><h3 className="font-semibold">Smart Alerts</h3><p className="text-xs text-slate-500">Action-oriented alerts from customers, leads, deals, tasks and meetings.</p></div><Badge><Zap className="mr-1 h-3 w-3"/> Live</Badge></div><div className="mt-4 space-y-2">{alerts.map((a, i) => <button key={i} onClick={a.action} className="flex w-full items-center gap-3 rounded-xl border border-white/[.07] p-3 text-left hover:bg-white/[.04]"><span className={`h-2.5 w-2.5 rounded-full ${a.level === "red" ? "bg-red-400" : a.level === "amber" ? "bg-amber-400" : a.level === "orange" ? "bg-orange-400" : a.level === "green" ? "bg-emerald-400" : "bg-sky-400"}`}/><span className="flex-1 text-sm">{a.text}</span><span className="text-xs text-indigo-300">Open →</span></button>)}</div></Card><Card className="p-5"><h3 className="font-semibold">Automation Rules</h3><div className="mt-3 grid gap-3 md:grid-cols-2"><label className="flex items-center justify-between rounded-xl border border-white/[.07] p-3 text-sm"><span>Last contact &gt; 14 days → follow-up task</span><input type="checkbox" checked={automationEnabled} onChange={e => setAutomationEnabled(e.target.checked)}/></label><label className="flex items-center justify-between rounded-xl border border-white/[.07] p-3 text-sm"><span>Deal value &gt; ₹25K → manager review</span><input type="checkbox" defaultChecked/></label></div></Card></div>}
    {active === "Audit" && <div className="space-y-4"><Card className="p-5"><div className="flex items-center justify-between"><div><h3 className="font-semibold">Enterprise Audit Log</h3><p className="text-xs text-slate-500">Who changed what and when.</p></div><Button size="sm" variant="outline" onClick={() => setAudit([])}>Clear</Button></div><div className="mt-4 space-y-2">{audit.map(a => <div key={a.id} className="rounded-xl border border-white/[.07] p-3"><div className="flex items-start justify-between gap-3"><p className="text-sm font-medium">{a.action}</p><span className="text-[11px] text-slate-500">{a.time}</span></div><p className="mt-1 text-xs text-slate-500">By {a.actor}{a.entity ? ` • ${a.entity}` : ""}</p></div>)}</div></Card></div>}
    {active === "Calendar" && <div className="space-y-4"><Card className="p-5"><h3 className="font-semibold">Schedule Meeting</h3><div className="mt-4 grid gap-3 md:grid-cols-2"><label className="text-xs text-slate-500">Title<Input className="mt-1" value={eventTitle} onChange={e => setEventTitle(e.target.value)} placeholder="Product demo"/></label><label className="text-xs text-slate-500">Customer<Select className="mt-1 w-full" value={eventCustomer} onChange={e => setEventCustomer(e.target.value)}>{customers.slice(0, 50).map(c => <option key={c.id}>{c.name}</option>)}</Select></label><label className="text-xs text-slate-500">Date<Input className="mt-1" type="date" value={eventDate} onChange={e => setEventDate(e.target.value)}/></label><label className="text-xs text-slate-500">Time<Input className="mt-1" value={eventTime} onChange={e => setEventTime(e.target.value)} placeholder="02:30 PM"/></label></div><Button className="mt-4" onClick={addEvent}><CalendarDays className="h-4 w-4"/> Schedule</Button></Card><Card className="p-5"><h3 className="font-semibold">Upcoming Meetings</h3><div className="mt-3 space-y-2">{events.map(e => <div key={e.id} className="flex items-center gap-3 rounded-xl border border-white/[.07] p-3"><CalendarDays className="h-4 w-4 text-indigo-300"/><div className="flex-1"><p className="text-sm font-medium">{e.title}</p><p className="text-xs text-slate-500">{e.date} • {e.time}{e.customer ? ` • ${e.customer}` : ""}</p></div><Button size="sm" variant="ghost" onClick={() => setEvents(events.filter(x => x.id !== e.id))}>Remove</Button></div>)}</div></Card></div>}
    {active === "Email" && <div className="space-y-4"><Card className="p-5"><h3 className="font-semibold">CRM Email Composer</h3><p className="text-xs text-slate-500">Uses the user's local mail client via mailto; no external credentials required.</p><div className="mt-4 space-y-3"><label className="text-xs text-slate-500">To<Input className="mt-1" value={emailTo} onChange={e => setEmailTo(e.target.value)}/></label><label className="text-xs text-slate-500">Subject<Input className="mt-1" value={emailSubject} onChange={e => setEmailSubject(e.target.value)}/></label><label className="text-xs text-slate-500">Message<Textarea className="mt-1 min-h-40" value={emailBody} onChange={e => setEmailBody(e.target.value)}/></label><Button onClick={sendEmail}><Mail className="h-4 w-4"/> Open Mail Client</Button></div></Card></div>}
    {active === "Admin" && <div className="space-y-4"><Card className="p-5"><div className="flex items-center justify-between"><div><h3 className="font-semibold">Users & Role-Based Access</h3><p className="text-xs text-slate-500">Admin, Manager, Sales Representative and Viewer permissions.</p></div><Badge>{users.filter(u => u.active).length} active</Badge></div><div className="mt-4 grid gap-2">{users.map(u => <div key={u.id} className="grid gap-2 rounded-xl border border-white/[.07] p-3 md:grid-cols-[1fr_1fr_180px_auto]"><div><p className="text-sm font-medium">{u.name}</p><p className="text-xs text-slate-500">{u.email}</p></div><Select value={u.role} onChange={e => setUsers(users.map(x => x.id === u.id ? { ...x, role: e.target.value as UserRecord["role"] } : x))}><option>Admin</option><option>Manager</option><option>Sales Representative</option><option>Viewer</option></Select><Badge className={u.active ? "text-emerald-300" : "text-red-300"}>{u.active ? "Active" : "Disabled"}</Badge><Button size="sm" variant="outline" onClick={() => setUsers(users.map(x => x.id === u.id ? { ...x, active: !x.active } : x))}>{u.active ? "Disable" : "Enable"}</Button></div>)}</div><div className="mt-4 grid gap-2 md:grid-cols-[1fr_1fr_180px_auto]"><Input placeholder="Name" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })}/><Input placeholder="Email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })}/><Select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value as UserRecord["role"] })}><option>Admin</option><option>Manager</option><option>Sales Representative</option><option>Viewer</option></Select><Button onClick={addUser}>Add User</Button></div></Card><div className="grid gap-4 md:grid-cols-2"><Card className="p-5"><h3 className="font-semibold">Customer Tags</h3><div className="mt-3 flex flex-wrap gap-2">{tags.map(t => <Badge key={t}>{t}<button className="ml-2" onClick={() => setTags(tags.filter(x => x !== t))}><X className="h-3 w-3"/></button></Badge>)}</div><div className="mt-3 flex gap-2"><Input value={newTag} onChange={e => setNewTag(e.target.value)} placeholder="Create tag"/><Button onClick={() => { if(newTag.trim()) { setTags([...tags, newTag.trim()]); setNewTag(""); } }}>Add</Button></div></Card><Card className="p-5"><h3 className="font-semibold">Permission Matrix</h3><div className="mt-3 overflow-auto"><table className="w-full text-xs"><thead><tr className="text-slate-500"><th className="p-2 text-left">Action</th><th>Add</th><th>Edit</th><th>Delete</th><th>Export</th></tr></thead><tbody>{[["Admin","✓","✓","✓","✓"],["Manager","✓","✓","✓","✓"],["Sales Representative","✓","✓","—","✓"],["Viewer","—","—","—","—"]].map(r => <tr key={r[0]} className="border-t border-white/[.06]"><td className="p-2">{r[0]}</td><td className="text-center text-emerald-300">{r[1]}</td><td className="text-center text-emerald-300">{r[2]}</td><td className="text-center text-amber-300">{r[3]}</td><td className="text-center text-indigo-300">{r[4]}</td></tr>)}</tbody></table></div></Card></div></div>}
  </Modal>;
}

export type { ProTab };
