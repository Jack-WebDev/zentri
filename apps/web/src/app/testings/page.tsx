// "use client";

// import React, { useEffect, useMemo, useRef, useState } from "react";
// import {
//   Calendar as CalendarIcon,
//   Clock,
//   Users,
//   Globe,
//   Search as SearchIcon,
//   Plus,
//   Settings,
//   ChevronLeft,
//   ChevronRight,
//   Bell,
//   CreditCard,
//   Video,
//   Link as LinkIcon,
//   MapPin,
//   Repeat,
//   Check,
//   X,
//   Sparkles,
//   Filter,
//   Download,
//   Copy,
//   Trash2,
//   Move,
//   Scissors,
//   Layers,
//   SunMedium,
//   MoonStar,
//   FileUp,
//   FileDown,
//   BarChart3,
//   Share2,
//   AlignLeft
// } from "lucide-react";

// // shadcn/ui
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// import { Separator } from "@/components/ui/separator";

// // —————————————————————————————————————————————————————————
// // Types
// // —————————————————————————————————————————————————————————

// type Attendee = {
//   name: string;
//   email: string;
//   required?: boolean;
// };

// type Booking = {
//   id: string;
//   title: string;
//   start: Date;
//   end: Date;
//   location?: string;
//   type: "meeting" | "call" | "appointment" | "event";
//   resource?: string; // room / host
//   status: "confirmed" | "pending" | "tentative" | "cancelled";
//   attendees: Attendee[];
//   notes?: string;
//   color?: string; // Tailwind color token
//   isRecurring?: boolean;
//   parentId?: string; // series key
//   serviceId?: string; // ★ NEW: from catalog
//   paymentRequired?: boolean; // ★ NEW
//   intakeEnabled?: boolean; // ★ NEW
// };

// type Service = {
//   id: string;
//   name: string;
//   durationMin: number;
//   bufferBeforeMin?: number;
//   bufferAfterMin?: number;
//   defaultLocation?: string;
//   price?: number;
// };

// // —————————————————————————————————————————————————————————
// // Utilities (no external date libs — fast & local)
// // —————————————————————————————————————————————————————————

// const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
// const fmtDateKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
// const isSameDay = (a: Date, b: Date) =>
//   a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

// function addDays(date: Date, days: number) {
//   const d = new Date(date);
//   d.setDate(d.getDate() + days);
//   return d;
// }
// function addMinutes(date: Date, mins: number) {
//   const d = new Date(date);
//   d.setMinutes(d.getMinutes() + mins);
//   return d;
// }
// function startOfMonth(date: Date) {
//   return new Date(date.getFullYear(), date.getMonth(), 1);
// }
// function endOfMonth(date: Date) {
//   return new Date(date.getFullYear(), date.getMonth() + 1, 0);
// }
// function startOfWeek(date: Date) {
//   const d = new Date(date);
//   const day = (d.getDay() + 6) % 7; // Monday = 0
//   d.setDate(d.getDate() - day);
//   d.setHours(0, 0, 0, 0);
//   return d;
// }
// function endOfWeek(date: Date) {
//   const d = startOfWeek(date);
//   d.setDate(d.getDate() + 6);
//   d.setHours(23, 59, 59, 999);
//   return d;
// }
// function getMonthMatrix(current: Date) {
//   const start = startOfWeek(startOfMonth(current));
//   const end = endOfWeek(endOfMonth(current));
//   const days: Date[] = [];
//   let d = new Date(start);
//   while (d <= end) {
//     days.push(new Date(d));
//     d = addDays(d, 1);
//   }
//   return days;
// }
// function minutesBetween(a: Date, b: Date) {
//   return Math.max(0, Math.round((b.getTime() - a.getTime()) / 60000));
// }
// function clamp(n: number, min: number, max: number) {
//   return Math.min(max, Math.max(min, n));
// }
// function overlaps(a: Booking, b: Booking) {
//   return !(a.end <= b.start || a.start >= b.end);
// }
// function hasConflict(candidate: Booking, all: Booking[]) {
//   return all.some((b) => b.status !== "cancelled" && b.id !== candidate.id && overlaps(candidate, b));
// }
// function snap15(date: Date) {
//   const d = new Date(date);
//   d.setMilliseconds(0);
//   d.setSeconds(0);
//   const m = d.getMinutes();
//   d.setMinutes(m - (m % 15));
//   return d;
// }
// function rangeHours(start = 8, end = 18) {
//   return Array.from({ length: end - start + 1 }, (_, i) => start + i);
// }
// function sameLocation(a?: string, b?: string) {
//   const na = (a || "").trim().toLowerCase();
//   const nb = (b || "").trim().toLowerCase();
//   return na && nb && na === nb;
// }

// // TZ format helpers
// function fmtInTZ(date: Date, tz: string, opts?: Intl.DateTimeFormatOptions) {
//   return new Intl.DateTimeFormat(undefined, {
//     timeZone: tz,
//     hour: "2-digit",
//     minute: "2-digit",
//     ...(opts || {}),
//   }).format(date);
// }
// function fmtDateTimeInTZ(date: Date, tz: string) {
//   return new Intl.DateTimeFormat(undefined, {
//     timeZone: tz,
//     year: "numeric",
//     month: "short",
//     day: "2-digit",
//     hour: "2-digit",
//     minute: "2-digit",
//   }).format(date);
// }

// // Random pastel color picker
// const COLORS = [
//   "bg-rose-200 text-rose-950",
//   "bg-emerald-200 text-emerald-950",
//   "bg-indigo-200 text-indigo-950",
//   "bg-amber-200 text-amber-950",
//   "bg-fuchsia-200 text-fuchsia-950",
//   "bg-cyan-200 text-cyan-950",
//   "bg-lime-200 text-lime-950",
// ];
// const pickColor = (i: number) => COLORS[i % COLORS.length];

// // —————————————————————————————————————————————————————————
// // ICS export
// // —————————————————————————————————————————————————————————
// function toICS(b: Booking) {
//   const dt = (d: Date) =>
//     `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(
//       d.getUTCMinutes()
//     )}00Z`;
//   const attendees = b.attendees
//     .map((a) => `ATTENDEE;CN=${a.name};ROLE=${a.required ? "REQ-PARTICIPANT" : "OPT-PARTICIPANT"}:MAILTO:${a.email}`)
//     .join("\n");
//   return [
//     "BEGIN:VCALENDAR",
//     "VERSION:2.0",
//     "PRODID:-//OmniBook//EN",
//     "BEGIN:VEVENT",
//     `UID:${b.id}@omnibook`,
//     `DTSTAMP:${dt(new Date())}`,
//     `DTSTART:${dt(b.start)}`,
//     `DTEND:${dt(b.end)}`,
//     `SUMMARY:${b.title}`,
//     `LOCATION:${b.location || ""}`,
//     `DESCRIPTION:${(b.notes || "").replace(/\n/g, "\\n")}`,
//     attendees,
//     "END:VEVENT",
//     "END:VCALENDAR",
//   ].join("\n");
// }
// function downloadICS(b: Booking) {
//   const blob = new Blob([toICS(b)], { type: "text/calendar;charset=utf-8" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = `${b.title.replace(/\s+/g, "_")}.ics`;
//   a.click();
//   URL.revokeObjectURL(url);
// }
// function downloadICSBatch(items: Booking[], name = "omnibook") {
//   const content = items.map(toICS).join("\n");
//   const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = `${name}.ics`;
//   a.click();
//   URL.revokeObjectURL(url);
// }

// // —————————————————————————————————————————————————————————
// // Seed data + Service catalog (★ NEW)
// // —————————————————————————————————————————————————————————

// const seedServices: Service[] = [
//   { id: "svc_consult_30", name: "Consultation (30m)", durationMin: 30, bufferAfterMin: 10, defaultLocation: "Meet link", price: 49 },
//   { id: "svc_strategy_60", name: "Strategy Session (60m)", durationMin: 60, bufferBeforeMin: 10, bufferAfterMin: 10, defaultLocation: "Zoom", price: 149 },
//   { id: "svc_fitness_45", name: "Coaching (45m)", durationMin: 45, defaultLocation: "Gym", price: 39 },
// ];

// const seedBookings: Booking[] = (() => {
//   const now = new Date();
//   const today9 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0);
//   return [
//     {
//       id: "b1",
//       title: "Design Sync",
//       start: today9,
//       end: new Date(today9.getFullYear(), today9.getMonth(), today9.getDate(), 10, 0),
//       location: "Huddle Room A",
//       type: "meeting",
//       resource: "Room A",
//       status: "confirmed",
//       attendees: [
//         { name: "Kai", email: "kai@example.com", required: true },
//         { name: "Sam", email: "sam@example.com" },
//       ],
//       notes: "Sprint 42 visual QA",
//       color: pickColor(0),
//     },
//     {
//       id: "b2",
//       title: "Client Demo — NovaCorp",
//       start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13, 0),
//       end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 0),
//       location: "Zoom",
//       type: "call",
//       resource: "Kai",
//       status: "pending",
//       attendees: [
//         { name: "Ava", email: "ava@novacorp.com", required: true },
//         { name: "You", email: "you@company.com" },
//       ],
//       notes: "Share Q4 roadmap, record session",
//       color: pickColor(1),
//       isRecurring: true,
//       parentId: "series_b2",
//       serviceId: "svc_strategy_60",
//       paymentRequired: true,
//       intakeEnabled: true,
//     },
//     {
//       id: "b3",
//       title: "Wellness Hour",
//       start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 12, 0),
//       end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 13, 0),
//       location: "Gym",
//       type: "appointment",
//       resource: "Wellness Coach",
//       status: "tentative",
//       attendees: [{ name: "You", email: "you@company.com" }],
//       notes: "Breathwork + Mobility",
//       color: pickColor(2),
//       serviceId: "svc_fitness_45",
//     },
//   ];
// })();

// // —————————————————————————————————————————————————————————
// // Small UI helpers
// // —————————————————————————————————————————————————————————

// const Kbd: React.FC<{ children: React.ReactNode }> = ({ children }) => (
//   <span className="inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-xs font-mono text-muted-foreground">
//     {children}
//   </span>
// );

// const AvatarStack: React.FC<{ names: string[] }> = ({ names }) => (
//   <div className="flex -space-x-2">
//     {names.slice(0, 4).map((n, i) => (
//       <div
//         key={i}
//         className="inline-flex h-6 w-6 items-center justify-center rounded-full border bg-muted text-[10px] font-semibold"
//         title={n}
//       >
//         {n.slice(0, 2).toUpperCase()}
//       </div>
//     ))}
//     {names.length > 4 && (
//       <div className="inline-flex h-6 w-6 items-center justify-center rounded-full border bg-muted text-[10px] font-semibold">
//         +{names.length - 4}
//       </div>
//     )}
//   </div>
// );

// // —————————————————————————————————————————————————————————
// // Public mock helpers (★ NEW)
// // —————————————————————————————————————————————————————————
// function mockPublicLink(b: Booking) {
//   return `https://omnibook/public/${b.id}`;
// }
// function embedSnippet(profile = "you") {
//   return `<iframe src="https://omnibook/${profile}/book" style="width:100%;height:720px;border:0" title="Book with ${profile}"></iframe>`;
// }

// // —————————————————————————————————————————————————————————
// // Undo/Redo (★ NEW)
// // —————————————————————————————————————————————————————————
// function useHistory<T>(initial: T) {
//   const [past, setPast] = useState<T[]>([]);
//   const [present, setPresent] = useState<T>(initial);
//   const [future, setFuture] = useState<T[]>([]);
//   const set = (value: T | ((prev: T) => T)) => {
//     setPast((p) => [...p, present]);
//     setPresent((prev) => (value instanceof Function ? value(prev) : value));
//     setFuture([]);
//   };
//   const undo = () => {
//     setPast((p) => {
//       if (!p.length) return p;
//       const prev = p[p.length - 1];
//       setFuture((f) => [present, ...f]);
//       setPresent(prev);
//       return p.slice(0, -1);
//     });
//   };
//   const redo = () => {
//     setFuture((f) => {
//       if (!f.length) return f;
//       const next = f[0];
//       setPast((p) => [...p, present]);
//       setPresent(next);
//       return f.slice(1);
//     });
//   };
//   const canUndo = past.length > 0;
//   const canRedo = future.length > 0;
//   return { value: present, set, undo, redo, canUndo, canRedo };
// }

// // —————————————————————————————————————————————————————————
// // Main Component
// // —————————————————————————————————————————————————————————

// export default function OmniBook() {
//   const [theme, setTheme] = useState<"light" | "dark">("light"); // ★ NEW
//   const [current, setCurrent] = useState(new Date());
//   const [view, setView] = useState<"month" | "week" | "agenda">("week");
//   const bookingsState = useHistory<Booking[]>(loadFromStorage("omnibook_bookings", seedBookings));
//   const bookings = bookingsState.value;
//   const setBookings = bookingsState.set;

//   const [services, setServices] = useState<Service[]>(loadFromStorage("omnibook_services", seedServices));
//   const [query, setQuery] = useState("");
//   const [showCreate, setShowCreate] = useState(false);
//   const [smartSuggestOpen, setSmartSuggestOpen] = useState(false);

//   // Filters + tz + settings
//   const [filterType, setFilterType] = useState<Booking["type"] | "all">("all");
//   const [filterStatus, setFilterStatus] = useState<Booking["status"] | "all">("all");
//   const defaultTZ = typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC";
//   const [tz, setTz] = useState<string>(defaultTZ);

//   // org settings (★ NEW)
//   const [workStart, setWorkStart] = useState(9);
//   const [workEnd, setWorkEnd] = useState(17);
//   const [blackoutDates, setBlackoutDates] = useState<string[]>([]); // YYYY-MM-DD

//   // multi-select (Agenda)
//   const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

//   // keyboard shortcuts
//   useEffect(() => {
//     function onKey(e: KeyboardEvent) {
//       const tag = (e.target as HTMLElement)?.tagName;
//       if (tag === "INPUT" || tag === "TEXTAREA") return;
//       const k = e.key.toLowerCase();
//       if (k === "t") setCurrent(new Date());
//       if (k === "n") setShowCreate(true);
//       if (k === "/") {
//         e.preventDefault();
//         (document.getElementById("omnibook-search") as HTMLInputElement | null)?.focus();
//       }
//       if ((e.metaKey || e.ctrlKey) && k === "z") {
//         e.shiftKey ? bookingsState.redo() : bookingsState.undo();
//       }
//       if (k === "arrowleft") gotoWeek(-1);
//       if (k === "arrowright") gotoWeek(1);
//     }
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [bookingsState]);

//   useEffect(() => {
//     saveToStorage("omnibook_bookings", bookings);
//     saveToStorage("omnibook_services", services);
//   }, [bookings, services]);

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", theme === "dark");
//   }, [theme]);

//   const days = useMemo(() => getMonthMatrix(current), [current]);
//   const weekDays = useMemo(() => {
//     const start = startOfWeek(current);
//     return Array.from({ length: 7 }, (_, i) => addDays(start, i));
//   }, [current]);

//   const filtered = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     return bookings.filter((b) => {
//       if (filterType !== "all" && b.type !== filterType) return false;
//       if (filterStatus !== "all" && b.status !== filterStatus) return false;
//       if (!q) return true;
//       return (
//         b.title.toLowerCase().includes(q) ||
//         (b.location || "").toLowerCase().includes(q) ||
//         (b.resource || "").toLowerCase().includes(q) ||
//         b.attendees.some((a) => a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q))
//       );
//     });
//   }, [bookings, query, filterType, filterStatus]);

//   function gotoMonth(offset: number) {
//     const d = new Date(current);
//     d.setMonth(d.getMonth() + offset);
//     setCurrent(d);
//   }
//   function gotoWeek(offset: number) {
//     const d = new Date(current);
//     d.setDate(d.getDate() + offset * 7);
//     setCurrent(d);
//   }

//   function addBooking(b: Booking, pushHistory = true) {
//     // buffer + travel checks (★ NEW)
//     const extended = maybeAddBuffersAndTravel(b, bookings);
//     const result = [...extended, ...bookings];
//     if (pushHistory) setBookings(result);
//     else setBookings(() => result);
//   }

//   function updateBooking(id: string, patch: Partial<Booking>) {
//     setBookings((prev) =>
//       prev.map((b) => (b.id === id ? { ...b, ...patch } : b))
//     );
//   }

//   function duplicateBooking(b: Booking) {
//     const copy: Booking = { ...b, id: rid(), title: `${b.title} (copy)` };
//     addBooking(copy);
//   }

//   function cancelBooking(id: string, series = false) {
//     setBookings((prev) =>
//       prev.map((b) => {
//         if (series && b.parentId && prev.find((x) => x.id === id)?.parentId === b.parentId) {
//           return { ...b, status: "cancelled" };
//         }
//         return b.id === id ? { ...b, status: "cancelled" } : b;
//       })
//     );
//   }

//   // suggestions (as before)
//   const suggestions = useMemo(() => {
//     const base = startOfWeek(current);
//     const slots: { start: Date; end: Date; score: number; label: string }[] = [];
//     for (let d = 0; d < 5; d++) {
//       for (let h = 9; h < 17; h++) {
//         const s = new Date(base.getFullYear(), base.getMonth(), base.getDate() + d, h, 15);
//         const e = new Date(base.getFullYear(), base.getMonth(), base.getDate() + d, h, 60);
//         const overlap = filtered.some((b) => !(e <= b.start || s >= b.end));
//         if (!overlap) {
//           const midday = Math.abs(h - 12);
//           const score = 100 - midday * 10 - d * 5;
//           const label = `${s.toLocaleDateString()} ${pad(s.getHours())}:${pad(s.getMinutes())}`;
//           slots.push({ start: s, end: e, score, label });
//         }
//       }
//     }
//     return slots.sort((a, b) => b.score - a.score).slice(0, 3);
//   }, [current, filtered]);

//   // analytics (★ NEW)
//   const analytics = useMemo(() => {
//     const conf = bookings.filter((b) => b.status !== "cancelled");
//     const hours = conf.reduce((sum, b) => sum + minutesBetween(b.start, b.end) / 60, 0);
//     const revenue = conf.reduce((sum, b) => {
//       const svc = services.find((s) => s.id === b.serviceId);
//       return sum + (svc?.price || 0);
//     }, 0);
//     return { count: conf.length, hours: Math.round(hours * 10) / 10, revenue };
//   }, [bookings, services]);

//   // drag state (★ NEW)
//   const dragRef = useRef<null | {
//     id?: string;
//     type: "create" | "move" | "resize-top" | "resize-bottom";
//     day: Date;
//     startY: number;
//     startDate: Date;
//     startEndDate?: Date;
//     origStart?: Date;
//     origEnd?: Date;
//   }>(null);

//   // heatmap for week
//   const heatmap = useMemo(() => {
//     const map: Record<string, number> = {};
//     const hours = rangeHours(8, 18);
//     for (const d of weekDays) {
//       for (const h of hours) {
//         const slotStart = new Date(d.getFullYear(), d.getMonth(), d.getDate(), h, 0);
//         const slotEnd = new Date(d.getFullYear(), d.getMonth(), d.getDate(), h + 1, 0);
//         const key = `${fmtDateKey(d)}-${h}`;
//         map[key] = bookings.filter((b) => !(slotEnd <= b.start || slotStart >= b.end)).length;
//       }
//     }
//     return map;
//   }, [weekDays, bookings]);

//   // persistence helpers
//   function exportJSON() {
//     const payload = JSON.stringify({ bookings, services }, null, 2);
//     const blob = new Blob([payload], { type: "application/json" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `omnibook_${Date.now()}.json`;
//     a.click();
//     URL.revokeObjectURL(url);
//   }
//   function importJSON(file: File) {
//     const reader = new FileReader();
//     reader.onload = () => {
//       try {
//         const obj = JSON.parse(String(reader.result || "{}"));
//         if (Array.isArray(obj.bookings)) setBookings(obj.bookings.map(hydrateBooking));
//         if (Array.isArray(obj.services)) setServices(obj.services);
//       } catch {
//         alert("Invalid file");
//       }
//     };
//     reader.readAsText(file);
//   }

//   // Week drag handlers (★ NEW)
//   function onWeekMouseDown(e: React.MouseEvent, day: Date) {
//     // create booking via drag
//     const y = e.nativeEvent.offsetY;
//     const startMin = 8 * 60 + Math.floor((y / 640) * (10 * 60)); // 8->18 visual map
//     const date = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0, 0);
//     date.setMinutes(startMin);
//     const start = snap15(date);
//     const end = addMinutes(start, 30);
//     const id = rid();
//     dragRef.current = {
//       id,
//       type: "create",
//       day,
//       startY: y,
//       startDate: start,
//       startEndDate: end,
//       origStart: start,
//       origEnd: end,
//     };
//     // optimistic draw
//     addBooking(
//       {
//         id,
//         title: "New Booking",
//         start,
//         end,
//         location: "TBD",
//         type: "meeting",
//         resource: "You",
//         status: "tentative",
//         attendees: [{ name: "You", email: "you@company.com" }],
//         notes: "",
//         color: pickColor(Math.floor(Math.random() * COLORS.length)),
//       },
//       true
//     );
//   }
//   function onWeekMouseMove(e: React.MouseEvent, day: Date) {
//     const d = dragRef.current;
//     if (!d) return;
//     const y = e.nativeEvent.offsetY;
//     const deltaMin = Math.floor(((y - d.startY) / 640) * (10 * 60));
//     if (d.type === "create" && d.id) {
//       const newEnd = addMinutes(d.startDate, Math.max(15, deltaMin + 30));
//       updateBooking(d.id, { end: snap15(newEnd) });
//     } else if (d.type.startsWith("resize") && d.id && d.origStart && d.origEnd) {
//       if (d.type === "resize-bottom") {
//         const newEnd = snap15(addMinutes(d.origEnd, deltaMin));
//         if (newEnd > d.origStart) updateBooking(d.id, { end: newEnd });
//       } else {
//         const newStart = snap15(addMinutes(d.origStart, deltaMin));
//         if (newStart < (d.origEnd as Date)) updateBooking(d.id, { start: newStart });
//       }
//     } else if (d.type === "move" && d.id && d.origStart && d.origEnd) {
//       const newStart = snap15(addMinutes(d.origStart, deltaMin));
//       const diff = minutesBetween(d.origStart, d.origEnd);
//       updateBooking(d.id, { start: newStart, end: addMinutes(newStart, diff) });
//     }
//   }
//   function onWeekMouseUp() {
//     dragRef.current = null;
//   }

//   // Travel time auto-blocks when adjacent locations differ (★ NEW)
//   function maybeAddBuffersAndTravel(b: Booking, all: Booking[]) {
//     const list: Booking[] = [b];
//     const svc = services.find((s) => s.id === b.serviceId);
//     if (svc?.bufferBeforeMin) {
//       list.push(bufferBlock(b, -svc.bufferBeforeMin, `${svc.name} buffer (before)`));
//     }
//     if (svc?.bufferAfterMin) {
//       list.push(bufferBlock(b, svc.bufferAfterMin, `${svc.name} buffer (after)`));
//     }
//     // travel vs closest neighbors
//     const sameDay = all.filter((x) => isSameDay(x.start, b.start) && x.status !== "cancelled").concat(b);
//     const sorted = sameDay.sort((a, c) => a.start.getTime() - c.start.getTime());
//     const i = sorted.findIndex((x) => x.id === b.id);
//     const prev = sorted[i - 1];
//     const next = sorted[i + 1];
//     const travelMin = 15; // simple heuristic
//     if (prev && !sameLocation(prev.location, b.location) && prev.end <= b.start) {
//       list.push({
//         id: rid(),
//         title: "Travel time",
//         start: addMinutes(prev.end, 0),
//         end: addMinutes(prev.end, travelMin),
//         location: "Transit",
//         type: "event",
//         resource: "You",
//         status: "confirmed",
//         attendees: [{ name: "You", email: "you@company.com" }],
//         notes: "Auto-added",
//         color: "bg-amber-200 text-amber-950",
//       });
//     }
//     if (next && !sameLocation(next.location, b.location) && b.end <= next.start) {
//       list.push({
//         id: rid(),
//         title: "Travel time",
//         start: addMinutes(b.end, 0),
//         end: addMinutes(b.end, travelMin),
//         location: "Transit",
//         type: "event",
//         resource: "You",
//         status: "confirmed",
//         attendees: [{ name: "You", email: "you@company.com" }],
//         notes: "Auto-added",
//         color: "bg-amber-200 text-amber-950",
//       });
//     }
//     return list;
//   }
//   function bufferBlock(b: Booking, offset: number, title: string): Booking {
//     const start = offset < 0 ? addMinutes(b.start, offset) : b.end;
//     const end = offset < 0 ? b.start : addMinutes(b.end, offset);
//     return {
//       id: rid(),
//       title,
//       start,
//       end,
//       location: "Buffer",
//       type: "event",
//       resource: b.resource,
//       status: "confirmed",
//       attendees: [{ name: "You", email: "you@company.com" }],
//       notes: "Auto buffer",
//       color: "bg-cyan-200 text-cyan-950",
//     };
//   }

//   // UI
//   return (
//     <TooltipProvider>
//       <div className="mx-auto w-full p-4 md:p-6">
//         {/* Top Bar */}
//         <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
//           <div className="flex items-center gap-2">
//             <Sparkles className="h-6 w-6" />
//             <h1 className="text-2xl font-bold tracking-tight">OmniBook</h1>
//             <Badge className="rounded-2xl">GOAT</Badge>
//           </div>
//           <div className="flex flex-1 flex-col gap-2 md:max-w-2xl">
//             <div className="flex items-center gap-2">
//               <div className="relative w-full">
//                 <SearchIcon className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   id="omnibook-search"
//                   placeholder="Search bookings, attendees, locations…"
//                   className="pl-9"
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                 />
//               </div>

//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Button variant="secondary" className="gap-2" onClick={() => setSmartSuggestOpen(true)}>
//                     <Sparkles className="h-4 w-4" />
//                     Smart
//                   </Button>
//                 </TooltipTrigger>
//                 <TooltipContent>AI time picks, conflict magic, travel-aware slots</TooltipContent>
//               </Tooltip>

//               <Dialog open={showCreate} onOpenChange={setShowCreate}>
//                 <DialogTrigger asChild>
//                   <Button className="gap-2">
//                     <Plus className="h-4 w-4" /> New
//                   </Button>
//                 </DialogTrigger>
//                 <CreateBookingDialog
//                   services={services}
//                   onCreate={(b, recurrenceCount) => {
//                     addBooking(b);
//                     if (b.isRecurring && recurrenceCount > 1) {
//                       for (let i = 1; i < recurrenceCount; i++) {
//                         const nb: Booking = {
//                           ...b,
//                           id: rid(),
//                           start: addDays(b.start, 7 * i),
//                           end: addDays(b.end, 7 * i),
//                           parentId: b.parentId || b.id,
//                         };
//                         addBooking(nb);
//                       }
//                     }
//                   }}
//                   onClose={() => setShowCreate(false)}
//                   tz={tz}
//                 />
//               </Dialog>

//               <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))} aria-label="Toggle theme">
//                 {theme === "light" ? <MoonStar className="h-5 w-5" /> : <SunMedium className="h-5 w-5" />}
//               </Button>

//               <Button variant="ghost" size="icon" className="rounded-full" onClick={() => window.print()} aria-label="Print agenda">
//                 <AlignLeft className="h-5 w-5" />
//               </Button>

//               <SettingsMenu
//                 services={services}
//                 setServices={setServices}
//                 workStart={workStart}
//                 setWorkStart={setWorkStart}
//                 workEnd={workEnd}
//                 setWorkEnd={setWorkEnd}
//                 blackoutDates={blackoutDates}
//                 setBlackoutDates={setBlackoutDates}
//                 onExport={exportJSON}
//                 onImport={importJSON}
//               />
//             </div>
//           </div>
//         </div>

//         {/* View Switcher */}
//         <Card className="overflow-hidden">
//           <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//             <div className="flex items-center gap-2">
//               <Button variant="ghost" size="icon" onClick={() => (view === "month" ? gotoMonth(-1) : gotoWeek(-1))} aria-label="Prev">
//                 <ChevronLeft className="h-5 w-5" />
//               </Button>
//               <div className="min-w-[240px] text-left">
//                 <div className="text-xl font-semibold">
//                   {current.toLocaleString(undefined, { month: "long", year: "numeric" })}
//                 </div>
//                 <div className="text-xs text-muted-foreground">Timezone: {tz} • Working {workStart}:00–{workEnd}:00</div>
//               </div>
//               <Button variant="ghost" size="icon" onClick={() => (view === "month" ? gotoMonth(1) : gotoWeek(1))} aria-label="Next">
//                 <ChevronRight className="h-5 w-5" />
//               </Button>
//               <Button variant="outline" className="ml-1" onClick={() => setCurrent(new Date())}>
//                 Today
//               </Button>
//             </div>

//             <div className="flex flex-col gap-2 md:flex-row md:items-center">
//               <div className="flex items-center gap-2">
//                 <Tabs value={view} onValueChange={(v) => setView(v as any)}>
//                   <TabsList>
//                     <TabsTrigger value="agenda">Agenda</TabsTrigger>
//                     <TabsTrigger value="week">Week</TabsTrigger>
//                     <TabsTrigger value="month">Month</TabsTrigger>
//                   </TabsList>
//                 </Tabs>
//                 <Separator orientation="vertical" className="mx-1 hidden h-6 md:block" />
//                 <div className="hidden items-center gap-3 md:flex">
//                   <SyncToggles />
//                 </div>
//               </div>

//               {/* Filters + TZ */}
//               <div className="flex flex-wrap items-center gap-2">
//                 <Badge variant="outline" className="gap-1"><Filter className="h-3.5 w-3.5" /> Filters</Badge>
//                 <Select value={filterType} onValueChange={(v) => setFilterType(v as any)}>
//                   <SelectTrigger className="w-[140px]"><SelectValue placeholder="Type" /></SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All types</SelectItem>
//                     <SelectItem value="meeting">Meeting</SelectItem>
//                     <SelectItem value="call">Call</SelectItem>
//                     <SelectItem value="appointment">Appointment</SelectItem>
//                     <SelectItem value="event">Event</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as any)}>
//                   <SelectTrigger className="w-[150px]"><SelectValue placeholder="Status" /></SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All status</SelectItem>
//                     <SelectItem value="confirmed">Confirmed</SelectItem>
//                     <SelectItem value="pending">Pending</SelectItem>
//                     <SelectItem value="tentative">Tentative</SelectItem>
//                     <SelectItem value="cancelled">Cancelled</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <Select value={tz} onValueChange={setTz}>
//                   <SelectTrigger className="w-[220px]"><SelectValue placeholder="Timezone" /></SelectTrigger>
//                   <SelectContent>
//                     {[Intl.DateTimeFormat().resolvedOptions().timeZone, "UTC", "America/New_York", "Europe/London", "Europe/Berlin", "Africa/Johannesburg", "Asia/Tokyo", "Australia/Sydney"]
//                       .filter((v, i, arr) => arr.indexOf(v) === i)
//                       .map((z) => (<SelectItem key={z} value={z}>{z}</SelectItem>))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//           </CardHeader>

//           <Separator />

//           <CardContent className="p-0">
//             {view === "month" && (
//               <div key="month" className="p-3 md:p-6">
//                 <MonthGrid days={days} current={current} bookings={filtered} />
//               </div>
//             )}
//             {view === "week" && (
//               <div key="week" className="p-3 md:p-6 select-none">
//                 <WeekTimeline
//                   days={weekDays}
//                   allBookings={filtered}
//                   tz={tz}
//                   heatmap={heatmap}
//                   onMouseDown={onWeekMouseDown}
//                   onMouseMove={onWeekMouseMove}
//                   onMouseUp={onWeekMouseUp}
//                   onStartMove={(b, mode) => {
//                     dragRef.current = {
//                       id: b.id,
//                       type: mode,
//                       day: b.start,
//                       startY: 0,
//                       startDate: b.start,
//                       origStart: b.start,
//                       origEnd: b.end,
//                     };
//                   }}
//                 />
//               </div>
//             )}
//             {view === "agenda" && (
//               <div key="agenda" className="p-3 md:p-6">
//                 <AgendaList
//                   bookings={filtered}
//                   tz={tz}
//                   selectedIds={selectedIds}
//                   setSelectedIds={setSelectedIds}
//                   onICS={downloadICS}
//                   onDuplicate={duplicateBooking}
//                   onCancel={cancelBooking}
//                 />
//               </div>
//             )}
//           </CardContent>

//           <Separator />

//           <CardFooter className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
//             <div className="flex items-center gap-2 text-sm text-muted-foreground">
//               <Kbd>G</Kbd><span> jump to date • </span>
//               <Kbd>/</Kbd><span> search • </span>
//               <Kbd>N</Kbd><span> new • </span>
//               <Kbd>T</Kbd><span> today • </span>
//               <Kbd>⌘/Ctrl+Z</Kbd><span> undo • </span>
//               <Kbd>⇧+Z</Kbd><span> redo</span>
//             </div>
//             <div className="flex flex-wrap items-center gap-2">
//               <Badge variant="secondary" className="gap-1"><BarChart3 className="h-3.5 w-3.5" /> {analytics.count} events • {analytics.hours}h • ${analytics.revenue}</Badge>
//               <Badge variant="secondary" className="gap-1"><Bell className="h-3.5 w-3.5" /> Reminders</Badge>
//               <Badge variant="secondary" className="gap-1"><CreditCard className="h-3.5 w-3.5" /> Payments</Badge>
//               <Badge variant="secondary" className="gap-1"><Video className="h-3.5 w-3.5" /> Auto-Meet Link</Badge>
//               <Badge variant="secondary" className="gap-1"><Globe className="h-3.5 w-3.5" /> Multi-TZ</Badge>
//             </div>
//           </CardFooter>
//         </Card>

//         {/* Smart Suggestions Drawer */}
//         <Drawer open={smartSuggestOpen} onOpenChange={setSmartSuggestOpen}>
//           <DrawerContent>
//             <DrawerHeader>
//               <DrawerTitle className="flex items-center gap-2">
//                 <Sparkles className="h-5 w-5" /> Smart Suggestions
//               </DrawerTitle>
//             </DrawerHeader>
//             <div className="grid gap-4 p-4 md:grid-cols-3">
//               <Card>
//                 <CardHeader className="pb-2">
//                   <div className="text-sm font-medium text-muted-foreground">Top picks this week</div>
//                   <div className="text-lg font-semibold">High-acceptance time windows</div>
//                 </CardHeader>
//                 <CardContent className="flex flex-col gap-3">
//                   {suggestions.map((s, i) => (
//                     <div key={i} className="flex items-center justify-between rounded-xl border p-3">
//                       <div>
//                         <div className="font-medium">{s.label}</div>
//                         <div className="text-xs text-muted-foreground">~45 min • commute-friendly • no conflicts</div>
//                       </div>
//                       <Button
//                         size="sm"
//                         onClick={() => {
//                           setShowCreate(true);
//                           localStorage.setItem("omni_prefill", JSON.stringify({ start: s.start.toISOString(), end: s.end.toISOString(), title: "Suggested meeting" }));
//                         }}
//                       >
//                         Use
//                       </Button>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="pb-2">
//                   <div className="text-sm font-medium text-muted-foreground">Automations</div>
//                   <div className="text-lg font-semibold">One-click workflows</div>
//                 </CardHeader>
//                 <CardContent className="grid gap-3">
//                   <AutomationTile icon={<Bell className="h-4 w-4" />} title="Auto-remind attendees" desc="Send SMS 24h & 1h before, auto-reschedule on no-show" />
//                   <AutomationTile icon={<CreditCard className="h-4 w-4" />} title="Collect deposits" desc="Hold card until meeting starts, refund if cancelled in 24h" />
//                   <AutomationTile icon={<Video className="h-4 w-4" />} title="Attach meeting links" desc="Generate Zoom/Meet links, embed in invites and reminders" />
//                 </CardContent>
//               </Card>

//               {/* Public page preview (mock) */}
//               <Card>
//                 <CardHeader className="pb-2">
//                   <div className="text-sm font-medium text-muted-foreground">Public Page</div>
//                   <div className="text-lg font-semibold">Booking Experience</div>
//                 </CardHeader>
//                 <CardContent className="flex flex-col gap-2">
//                   <div className="text-sm text-muted-foreground">
//                     Visitors pick a service, answer intake (if enabled), pay (if required), receive ICS + email.
//                   </div>
//                   <div className="rounded-lg border p-3 text-xs">
//                     <div className="mb-2 font-medium">Embed snippet</div>
//                     <pre className="overflow-x-auto">{embedSnippet("you")}</pre>
//                   </div>
//                   <Button
//                     variant="outline"
//                     className="gap-2"
//                     onClick={() => {
//                       navigator.clipboard?.writeText(embedSnippet("you"));
//                       alert("Embed code copied!");
//                     }}
//                   >
//                     <Share2 className="h-4 w-4" /> Copy embed
//                   </Button>
//                 </CardContent>
//               </Card>
//             </div>
//             <div className="flex items-center justify-between border-t p-4">
//               <div className="text-sm text-muted-foreground">Tip: Use buffers + working hours for effortless cadence.</div>
//               <Button variant="outline" size="sm" onClick={() => setSmartSuggestOpen(false)}>Close</Button>
//             </div>
//           </DrawerContent>
//         </Drawer>
//       </div>
//     </TooltipProvider>
//   );
// }

// // —————————————————————————————————————————————————————————
// // Subcomponents
// // —————————————————————————————————————————————————————————

// function SettingsMenu({
//   services,
//   setServices,
//   workStart,
//   setWorkStart,
//   workEnd,
//   setWorkEnd,
//   blackoutDates,
//   setBlackoutDates,
//   onExport,
//   onImport,
// }: {
//   services: Service[];
//   setServices: (s: Service[]) => void;
//   workStart: number;
//   setWorkStart: (n: number) => void;
//   workEnd: number;
//   setWorkEnd: (n: number) => void;
//   blackoutDates: string[];
//   setBlackoutDates: (a: string[]) => void;
//   onExport: () => void;
//   onImport: (f: File) => void;
// }) {
//   const fileRef = useRef<HTMLInputElement | null>(null);
//   return (
//     <>
//       <Button variant="ghost" size="icon" className="rounded-full" aria-label="Settings" onClick={() => (document.getElementById("settings-dialog-trigger") as HTMLButtonElement)?.click()}>
//         <Settings className="h-5 w-5" />
//       </Button>
//       <Dialog>
//         <DialogTrigger asChild><button id="settings-dialog-trigger" hidden /></DialogTrigger>
//         <DialogContent className="sm:max-w-2xl">
//           <DialogHeader>
//             <DialogTitle className="flex items-center gap-2"><Settings className="h-5 w-5" /> Settings</DialogTitle>
//           </DialogHeader>
//           <div className="grid gap-6">
//             {/* Working hours */}
//             <div className="grid gap-2">
//               <div className="font-medium">Working hours</div>
//               <div className="grid grid-cols-2 gap-2">
//                 <div className="grid gap-1.5">
//                   <Label>Start</Label>
//                   <Select value={String(workStart)} onValueChange={(v) => setWorkStart(Number(v))}>
//                     <SelectTrigger><SelectValue /></SelectTrigger>
//                     <SelectContent>{Array.from({ length: 24 }).map((_, h) => <SelectItem key={h} value={String(h)}>{pad(h)}:00</SelectItem>)}</SelectContent>
//                   </Select>
//                 </div>
//                 <div className="grid gap-1.5">
//                   <Label>End</Label>
//                   <Select value={String(workEnd)} onValueChange={(v) => setWorkEnd(Number(v))}>
//                     <SelectTrigger><SelectValue /></SelectTrigger>
//                     <SelectContent>{Array.from({ length: 24 }).map((_, h) => <SelectItem key={h} value={String(h)}>{pad(h)}:00</SelectItem>)}</SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             </div>

//             {/* Blackout dates */}
//             <div className="grid gap-2">
//               <div className="font-medium">Blackout dates</div>
//               <Input
//                 placeholder="YYYY-MM-DD, YYYY-MM-DD"
//                 value={blackoutDates.join(", ")}
//                 onChange={(e) => setBlackoutDates(e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
//               />
//               <div className="text-xs text-muted-foreground">No bookings allowed on these dates (soft block).</div>
//             </div>

//             {/* Services catalog */}
//             <div className="grid gap-2">
//               <div className="flex items-center justify-between">
//                 <div className="font-medium">Services</div>
//                 <Button size="sm" variant="outline" onClick={() => setServices((p) => [...p, { id: rid(), name: "New Service", durationMin: 30 }])}>
//                   <Plus className="h-4 w-4" /> Add
//                 </Button>
//               </div>
//               <div className="grid gap-2">
//                 {services.map((s, i) => (
//                   <div key={s.id} className="grid grid-cols-6 items-center gap-2 rounded-lg border p-2">
//                     <Input value={s.name} onChange={(e) => setServices(editAt(services, i, { name: e.target.value }))} className="col-span-2" />
//                     <Input type="number" value={s.durationMin} onChange={(e) => setServices(editAt(services, i, { durationMin: Number(e.target.value) }))} />
//                     <Input type="number" placeholder="buf before" value={s.bufferBeforeMin || 0} onChange={(e) => setServices(editAt(services, i, { bufferBeforeMin: Number(e.target.value) }))} />
//                     <Input type="number" placeholder="buf after" value={s.bufferAfterMin || 0} onChange={(e) => setServices(editAt(services, i, { bufferAfterMin: Number(e.target.value) }))} />
//                     <Input placeholder="location" value={s.defaultLocation || ""} onChange={(e) => setServices(editAt(services, i, { defaultLocation: e.target.value }))} />
//                     <Input type="number" placeholder="price" value={s.price || 0} onChange={(e) => setServices(editAt(services, i, { price: Number(e.target.value) }))} />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Import / Export */}
//             <div className="flex items-center gap-2">
//               <Button className="gap-2" variant="outline" onClick={onExport}><FileDown className="h-4 w-4" /> Export JSON</Button>
//               <input ref={fileRef} type="file" accept="application/json" hidden onChange={(e) => e.target.files?.[0] && onImport(e.target.files[0])} />
//               <Button className="gap-2" variant="outline" onClick={() => fileRef.current?.click()}><FileUp className="h-4 w-4" /> Import JSON</Button>
//             </div>
//           </div>
//           <DialogFooter><Button variant="outline">Close</Button></DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

// function SyncToggles() {
//   return (
//     <div className="flex items-center gap-4">
//       <div className="flex items-center gap-2">
//         <Switch id="ggl" defaultChecked />
//         <Label htmlFor="ggl" className="flex items-center gap-1 text-sm"><CalendarIcon className="h-4 w-4" /> Google</Label>
//       </div>
//       <div className="flex items-center gap-2">
//         <Switch id="out" />
//         <Label htmlFor="out" className="flex items-center gap-1 text-sm"><CalendarIcon className="h-4 w-4" /> Outlook</Label>
//       </div>
//       <div className="flex items-center gap-2">
//         <Switch id="apple" />
//         <Label htmlFor="apple" className="flex items-center gap-1 text-sm"><CalendarIcon className="h-4 w-4" /> Apple</Label>
//       </div>
//     </div>
//   );
// }

// const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// function MonthGrid({ days, current, bookings }: { days: Date[]; current: Date; bookings: Booking[] }) {
//   const byDay = useMemo(() => {
//     const map = new Map<string, Booking[]>();
//     for (const b of bookings) {
//       const k = fmtDateKey(b.start);
//       if (!map.has(k)) map.set(k, []);
//       map.get(k)!.push(b);
//     }
//     return map;
//   }, [bookings]);

//   return (
//     <div className="grid grid-cols-7 gap-1">
//       {dayNames.map((d) => (
//         <div key={d} className="px-2 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
//           {d}
//         </div>
//       ))}
//       {days.map((d, i) => {
//         const isOtherMonth = d.getMonth() !== current.getMonth();
//         const key = fmtDateKey(d);
//         const items = byDay.get(key) || [];
//         return (
//           <div key={i} className={`min-h-[120px] rounded-xl border p-2 transition ${isOtherMonth ? "bg-muted/30" : "bg-background"}`}>
//             <div className="mb-1 flex items-center justify-between">
//               <span className={`text-sm ${isOtherMonth ? "text-muted-foreground" : "font-medium"}`}>{d.getDate()}</span>
//               <span className="text-[10px] text-muted-foreground">{items.length} • events</span>
//             </div>
//             <div className="flex flex-col gap-1">
//               {items.slice(0, 3).map((b, idx) => (
//                 <div key={idx} className={`flex items-center justify-between rounded-md px-2 py-1 text-xs ${b.color || pickColor(idx)} ${b.status === "cancelled" ? "opacity-50 line-through" : ""}`}>
//                   <span className="truncate font-medium">{b.title}</span>
//                   <span className="ml-2 shrink-0">{pad(b.start.getHours())}:{pad(b.start.getMinutes())}</span>
//                 </div>
//               ))}
//               {items.length > 3 && <div className="text-xs text-muted-foreground">+{items.length - 3} more…</div>}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// // WeekTimeline with drag + resize handles (★ NEW)
// function WeekTimeline({
//   days,
//   allBookings,
//   tz,
//   heatmap,
//   onMouseDown,
//   onMouseMove,
//   onMouseUp,
//   onStartMove,
// }: {
//   days: Date[];
//   allBookings: Booking[];
//   tz: string;
//   heatmap: Record<string, number>;
//   onMouseDown: (e: React.MouseEvent, day: Date) => void;
//   onMouseMove: (e: React.MouseEvent, day: Date) => void;
//   onMouseUp: () => void;
//   onStartMove: (b: Booking, mode: "move" | "resize-top" | "resize-bottom") => void;
// }) {
//   const hours = rangeHours(8, 18);
//   function dayBookings(day: Date) {
//     return allBookings.filter((b) => isSameDay(b.start, day));
//   }
//   const maxHeat = Math.max(1, ...Object.values(heatmap));

//   return (
//     <div className="grid grid-cols-[60px_1fr] gap-2 md:grid-cols-[80px_1fr]">
//       {/* Hours gutter */}
//       <div className="-mt-6 hidden flex-col md:flex">
//         <div className="h-6" />
//         {hours.map((h) => (
//           <div key={h} className="h-16 pr-2 text-right text-xs text-muted-foreground">
//             {pad(h)}:00
//           </div>
//         ))}
//       </div>

//       {/* Days */}
//       <div className="grid grid-cols-7 gap-2" onMouseUp={onMouseUp}>
//         {days.map((d, i) => (
//           <div key={i} className="relative rounded-xl border overflow-hidden" onMouseDown={(e) => onMouseDown(e, d)} onMouseMove={(e) => onMouseMove(e, d)}>
//             <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-xl bg-background/80 p-2 backdrop-blur">
//               <div className="text-sm font-semibold">
//                 {d.toLocaleDateString(undefined, { weekday: "short" })} {d.getDate()}
//               </div>
//               <Badge variant="outline" className="gap-1">
//                 <Users className="h-3.5 w-3.5" /> {dayBookings(d).reduce((n, b) => n + b.attendees.length, 0)}
//               </Badge>
//             </div>

//             {/* Heatmap bg + hour lines */}
//             <div className="relative h-[800px] p-2">
//               {hours.map((h) => {
//                 const k = `${fmtDateKey(d)}-${h}`;
//                 const v = heatmap[k] || 0;
//                 const alpha = Math.min(0.25, (v / maxHeat) * 0.25);
//                 return (
//                   <div key={h} className="absolute left-0 right-0 border-t" style={{ top: (h - 8) * 64, height: 64, background: alpha ? `rgba(0,0,0,${alpha})` : "transparent" }} />
//                 );
//               })}

//               {dayBookings(d).map((b, idx) => {
//                 const startMin = b.start.getHours() * 60 + b.start.getMinutes();
//                 const endMin = b.end.getHours() * 60 + b.end.getMinutes();
//                 const top = clamp(((startMin - 8 * 60) / (10 * 60)) * 640, 0, 640);
//                 const height = clamp(((endMin - startMin) / (10 * 60)) * 640, 20, 640);
//                 const conflict = hasConflict(b, allBookings);
//                 return (
//                   <div
//                     key={b.id}
//                     className={`group absolute left-2 right-2 overflow-hidden rounded-xl border p-2 shadow ${b.color || pickColor(idx)} ${b.status === "cancelled" ? "opacity-50" : ""} cursor-grab active:cursor-grabbing`}
//                     style={{ top, height }}
//                     title={`${b.title} • ${fmtInTZ(b.start, tz)}–${fmtInTZ(b.end, tz)}${conflict ? " • ⚠ conflict" : ""}`}
//                     onMouseDown={(e) => { e.stopPropagation(); onStartMove(b, "move"); }}
//                   >
//                     {/* resize handles */}
//                     <div className="absolute inset-x-2 top-0 h-2 cursor-n-resize opacity-0 group-hover:opacity-100" onMouseDown={(e) => { e.stopPropagation(); onStartMove(b, "resize-top"); }} />
//                     <div className="absolute inset-x-2 bottom-0 h-2 cursor-s-resize opacity-0 group-hover:opacity-100" onMouseDown={(e) => { e.stopPropagation(); onStartMove(b, "resize-bottom"); }} />

//                     <div className="flex items-center justify-between text-xs">
//                       <span className="font-semibold flex items-center gap-1">{b.title} {b.isRecurring && <Repeat className="h-3 w-3" />}</span>
//                       <span>{fmtInTZ(b.start, tz)}–{fmtInTZ(b.end, tz)}</span>
//                     </div>
//                     <div className="mt-1 flex items-center justify-between text-[10px]">
//                       <div className="flex flex-wrap items-center gap-2">
//                         <Badge variant="outline" className="gap-1"><MapPin className="h-3 w-3" /> {b.location || "TBD"}</Badge>
//                         {b.paymentRequired && <Badge variant="outline" className="gap-1"><CreditCard className="h-3 w-3" /> paid</Badge>}
//                         {conflict && <Badge className="gap-1">⚠ conflict</Badge>}
//                       </div>
//                       <AvatarStack names={b.attendees.map((a) => a.name)} />
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // Agenda with multi-select + batch actions (★ NEW)
// function AgendaList({
//   bookings,
//   tz,
//   selectedIds,
//   setSelectedIds,
//   onICS,
//   onDuplicate,
//   onCancel,
// }: {
//   bookings: Booking[];
//   tz: string;
//   selectedIds: Set<string>;
//   setSelectedIds: (s: Set<string>) => void;
//   onICS: (b: Booking) => void;
//   onDuplicate: (b: Booking) => void;
//   onCancel: (id: string, series?: boolean) => void;
// }) {
//   const sorted = [...bookings].sort((a, b) => a.start.getTime() - b.start.getTime());

//   const selected = sorted.filter((b) => selectedIds.has(b.id));
//   const allSelectedCancelled = selected.every((b) => b.status === "cancelled");

//   return (
//     <>
//       <div className="mb-2 flex items-center gap-2">
//         <Badge variant="outline" className="gap-2">
//           <Layers className="h-3.5 w-3.5" /> {selected.length} selected
//         </Badge>
//         <Button size="sm" variant="outline" disabled={!selected.length} onClick={() => downloadICSBatch(selected, "omnibook_selected")} className="gap-2">
//           <Download className="h-4 w-4" /> Export ICS
//         </Button>
//         <Button size="sm" variant="outline" disabled={!selected.length} onClick={() => selected.forEach(onDuplicate)} className="gap-2">
//           <Copy className="h-4 w-4" /> Duplicate
//         </Button>
//         <Button size="sm" variant="ghost" disabled={!selected.length || allSelectedCancelled} onClick={() => selected.forEach((b) => onCancel(b.id))} className="gap-2 text-red-600">
//           <Trash2 className="h-4 w-4" /> Cancel
//         </Button>
//       </div>

//       <ScrollArea className="h-[600px] pr-4">
//         <div className="grid gap-3">
//           {sorted.map((b) => {
//             const conflict = hasConflict(b, bookings);
//             const checked = selectedIds.has(b.id);
//             return (
//               <Card key={b.id} className={`border-l-4 ${conflict ? "border-red-500" : ""}`} style={{ borderLeftColor: "hsl(var(--primary))" }}>
//                 <CardContent className="flex items-center justify-between gap-3 p-4">
//                   <div className="flex items-start gap-3">
//                     <input
//                       aria-label="Select booking"
//                       type="checkbox"
//                       checked={checked}
//                       onChange={(e) => {
//                         const next = new Set(selectedIds);
//                         e.target.checked ? next.add(b.id) : next.delete(b.id);
//                         setSelectedIds(next);
//                       }}
//                       className="mt-1"
//                     />
//                     <div className="min-w-0">
//                       <div className="flex flex-wrap items-center gap-2">
//                         <Badge variant="secondary" className="gap-1">
//                           <Clock className="h-3.5 w-3.5" />
//                           {fmtDateTimeInTZ(b.start, tz)} – {fmtInTZ(b.end, tz)}
//                         </Badge>
//                         <Badge variant="outline" className="gap-1">
//                           <MapPin className="h-3 w-3" /> {b.location || "TBD"}
//                         </Badge>
//                         <Badge variant="outline" className="gap-1">
//                           <CalendarIcon className="h-3 w-3" /> {b.type}
//                         </Badge>
//                         {b.status !== "confirmed" && <Badge className="gap-1">{b.status}</Badge>}
//                         {b.intakeEnabled && <Badge variant="outline" className="gap-1"><AlignLeft className="h-3 w-3" /> intake</Badge>}
//                         {b.paymentRequired && <Badge variant="outline" className="gap-1"><CreditCard className="h-3 w-3" /> pay</Badge>}
//                         {conflict && <Badge className="gap-1">⚠ conflict</Badge>}
//                       </div>
//                       <div className={`mt-1 truncate text-base font-semibold ${b.status === "cancelled" ? "line-through opacity-60" : ""}`}>
//                         {b.title}
//                       </div>
//                       <div className="text-sm text-muted-foreground">{b.notes}</div>
//                     </div>
//                   </div>

//                   <div className="flex shrink-0 items-center gap-2">
//                     <AvatarStack names={b.attendees.map((a) => a.name)} />
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <Button variant="secondary" className="gap-2" onClick={() => { navigator.clipboard?.writeText(mockPublicLink(b)); alert("Link copied!"); }}>
//                           <LinkIcon className="h-4 w-4" /> Share
//                         </Button>
//                       </TooltipTrigger>
//                       <TooltipContent>Copy booking link</TooltipContent>
//                     </Tooltip>
//                     <Button variant="outline" className="gap-2" onClick={() => onICS(b)}>
//                       <Download className="h-4 w-4" /> ICS
//                     </Button>
//                     <Button variant="outline" className="gap-2" onClick={() => onDuplicate(b)}>
//                       <Copy className="h-4 w-4" /> Duplicate
//                     </Button>
//                     <div className="relative">
//                       <Button variant="ghost" className="gap-2 text-red-600" onClick={() => onCancel(b.id)}>
//                         <Trash2 className="h-4 w-4" /> Cancel
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>
//       </ScrollArea>
//     </>
//   );
// }

// // Automations tile
// function AutomationTile({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
//   return (
//     <div className="flex items-start gap-3 rounded-xl border p-3">
//       <div className="flex h-8 w-8 items-center justify-center rounded-lg border bg-muted/40">{icon}</div>
//       <div className="min-w-0">
//         <div className="font-medium">{title}</div>
//         <div className="text-sm text-muted-foreground">{desc}</div>
//       </div>
//       <div className="ml-auto flex items-center gap-2">
//         <Switch id={`sw-${title}`} />
//         <Label htmlFor={`sw-${title}`} className="text-sm">Enable</Label>
//       </div>
//     </div>
//   );
// }

// // Create Booking Dialog (services, payment, intake, recurrence count)
// function CreateBookingDialog({
//   services,
//   onCreate,
//   onClose,
//   tz,
// }: {
//   services: Service[];
//   onCreate: (b: Booking, recurrenceCount: number) => void;
//   onClose: () => void;
//   tz: string;
// }) {
//   const prefill = (() => {
//     try {
//       const raw = localStorage.getItem("omni_prefill");
//       if (!raw) return null;
//       const v = JSON.parse(raw);
//       return v as { start?: string; end?: string; title?: string } | null;
//     } catch {
//       return null;
//     }
//   })();

//   const [title, setTitle] = useState(prefill?.title || "Strategy Check-in");
//   const [date, setDate] = useState(() => new Date(prefill?.start || new Date().toISOString()));
//   const [duration, setDuration] = useState(45);
//   const [type, setType] = useState<Booking["type"]>("meeting");
//   const [location, setLocation] = useState("Auto-generated link");
//   const [isRecurring, setIsRecurring] = useState(false);
//   const [recurrenceCount, setRecurrenceCount] = useState(4);
//   const [attendees, setAttendees] = useState<string>("ava@acme.com, ben@team.com");
//   const [notes, setNotes] = useState<string>("Created in OmniBook");
//   const [serviceId, setServiceId] = useState<string>("");
//   const [paymentRequired, setPaymentRequired] = useState(false);
//   const [intakeEnabled, setIntakeEnabled] = useState(false);

//   useEffect(() => {
//     if (!serviceId) return;
//     const svc = services.find((s) => s.id === serviceId);
//     if (!svc) return;
//     setDuration(svc.durationMin);
//     if (svc.defaultLocation) setLocation(svc.defaultLocation);
//     if (svc.price && svc.price > 0) setPaymentRequired(true);
//     if (svc.name.toLowerCase().includes("strategy")) setIntakeEnabled(true);
//   }, [serviceId, services]);

//   function submit() {
//     const start = date;
//     const end = new Date(start.getTime() + duration * 60000);
//     const id = rid();
//     const booking: Booking = {
//       id,
//       title,
//       start,
//       end,
//       location,
//       type,
//       resource: "You",
//       status: "confirmed",
//       attendees: attendees.split(",").map((s) => s.trim()).filter(Boolean).map((email) => ({ name: email.split("@")[0], email })),
//       notes,
//       color: pickColor(Math.floor(Math.random() * COLORS.length)),
//       isRecurring,
//       parentId: isRecurring ? id : undefined,
//       serviceId: serviceId || undefined,
//       paymentRequired,
//       intakeEnabled,
//     };
//     onCreate(booking, isRecurring ? Math.max(1, recurrenceCount) : 1);
//     localStorage.removeItem("omni_prefill");
//     onClose();
//   }

//   return (
//     <DialogContent className="sm:max-w-2xl">
//       <DialogHeader>
//         <DialogTitle className="flex items-center gap-2"><Plus className="h-5 w-5" /> New Booking</DialogTitle>
//       </DialogHeader>
//       <div className="grid gap-4">
//         {/* Service & Type */}
//         <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
//           <div className="grid gap-1.5 md:col-span-2">
//             <Label>Title</Label>
//             <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What is this about?" />
//           </div>
//           <div className="grid gap-1.5">
//             <Label>Type</Label>
//             <Select value={type} onValueChange={(v) => setType(v as any)}>
//               <SelectTrigger><SelectValue placeholder="Choose type" /></SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="meeting">Meeting</SelectItem>
//                 <SelectItem value="call">Call</SelectItem>
//                 <SelectItem value="appointment">Appointment</SelectItem>
//                 <SelectItem value="event">Event</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
//           <div className="grid gap-1.5">
//             <Label>Service</Label>
//             <Select value={serviceId} onValueChange={setServiceId}>
//               <SelectTrigger><SelectValue placeholder="Optional" /></SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="">None</SelectItem>
//                 {services.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="grid gap-1.5">
//             <Label>Start ({tz})</Label>
//             <Input
//               type="datetime-local"
//               value={`${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`}
//               onChange={(e) => setDate(new Date(e.target.value))}
//             />
//           </div>
//           <div className="grid gap-1.5">
//             <Label>Duration</Label>
//             <Select value={String(duration)} onValueChange={(v) => setDuration(Number(v))}>
//               <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//               <SelectContent>
//                 {[15, 30, 45, 60, 90, 120].map((m) => <SelectItem key={m} value={String(m)}>{m} min</SelectItem>)}
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
//           <div className="grid gap-1.5">
//             <Label>Location</Label>
//             <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Map pin or meeting link" />
//           </div>
//           <div className="grid gap-1.5">
//             <Label>Attendees</Label>
//             <Input value={attendees} onChange={(e) => setAttendees(e.target.value)} placeholder="name@email, other@org" />
//           </div>
//         </div>

//         <div className="grid gap-1.5">
//           <Label>Notes</Label>
//           <Input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional details…" />
//         </div>

//         <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
//           <ToggleWithBadge icon={<Bell className="h-4 w-4" />} label="Reminders" defaultOn />
//           <ToggleWithBadge icon={<CreditCard className="h-4 w-4" />} label="Require payment" on={paymentRequired} setOn={setPaymentRequired} />
//           <ToggleWithBadge icon={<AlignLeft className="h-4 w-4" />} label="Intake form" on={intakeEnabled} setOn={setIntakeEnabled} />
//         </div>

//         <div className="flex items-center justify-between rounded-xl border p-3">
//           <div>
//             <div className="font-medium">Recurring?</div>
//             <div className="text-sm text-muted-foreground">Repeat weekly</div>
//           </div>
//           <div className="flex items-center gap-3">
//             <Select value={String(recurrenceCount)} onValueChange={(v) => setRecurrenceCount(Number(v))} disabled={!isRecurring}>
//               <SelectTrigger className="w-[100px]"><SelectValue placeholder="Count" /></SelectTrigger>
//               <SelectContent>{[2, 4, 8, 12].map((n) => <SelectItem key={n} value={String(n)}>{n} weeks</SelectItem>)}</SelectContent>
//             </Select>
//             <Switch checked={isRecurring} onCheckedChange={setIsRecurring} />
//           </div>
//         </div>

//         <div className="rounded-md bg-muted/50 p-2 text-xs text-muted-foreground">
//           Preview: {fmtDateTimeInTZ(date, tz)} • {duration}m • {location}
//         </div>
//       </div>

//       <DialogFooter className="gap-2">
//         <Button variant="ghost" onClick={onClose}><X className="mr-2 h-4 w-4" /> Cancel</Button>
//         <Button onClick={submit} className="gap-2"><Check className="h-4 w-4" /> Create</Button>
//       </DialogFooter>
//     </DialogContent>
//   );
// }

// function ToggleWithBadge({ icon, label, defaultOn, on, setOn }: { icon: React.ReactNode; label: string; defaultOn?: boolean; on?: boolean; setOn?: (v: boolean) => void; }) {
//   const [local, setLocal] = useState(defaultOn ?? true);
//   const active = setOn ? on! : local;
//   const toggle = setOn || setLocal;
//   return (
//     <button onClick={() => toggle(!active)} className={`flex items-center justify-between rounded-xl border p-3 transition hover:shadow ${active ? "bg-primary/5" : "bg-background"}`}>
//       <div className="flex items-center gap-2">
//         <div className="flex h-8 w-8 items-center justify-center rounded-lg border bg-muted/40">{icon}</div>
//         <div className="font-medium">{label}</div>
//       </div>
//       <Badge variant={active ? "default" : "outline"} className="gap-1">
//         {active ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />} {active ? "On" : "Off"}
//       </Badge>
//     </button>
//   );
// }

// // —————————————————————————————————————————————————————————
// // Helpers
// // —————————————————————————————————————————————————————————

// function rid() {
//   return `b_${Math.random().toString(36).slice(2, 8)}`;
// }
// function editAt<T extends object>(arr: T[], i: number, patch: Partial<T>) {
//   return arr.map((v, idx) => (idx === i ? { ...v, ...patch } : v));
// }
// function hydrateBooking(b: any): Booking {
//   return { ...b, start: new Date(b.start), end: new Date(b.end) };
// }
// function loadFromStorage<T>(key: string, fallback: T): T {
//   try {
//     const raw = localStorage.getItem(key);
//     if (!raw) return fallback;
//     const val = JSON.parse(raw);
//     if (key === "omnibook_bookings") return (val as any[]).map(hydrateBooking) as any;
//     return val;
//   } catch {
//     return fallback;
//   }
// }
// function saveToStorage(key: string, value: any) {
//   try {
//     localStorage.setItem(key, JSON.stringify(value));
//   } catch {}
// }

// // —————————————————————————————————————————————————————————
// // Lightweight self-tests
// // —————————————————————————————————————————————————————————
// (function runOmniBookSelfTests() {
//   if (typeof window === "undefined") return;
//   const w: any = window as any;
//   if (w.__OMNIBOOK_TESTED__) return;
//   w.__OMNIBOOK_TESTED__ = true;
//   try {
//     console.assert(pad(3) === "03", "pad");
//     const d = new Date("2024-01-10T00:00:00");
//     const d2 = addDays(d, 5);
//     console.assert(d2.getDate() === 15, "addDays");
//     console.assert(isSameDay(new Date("2024-05-01"), new Date("2024-05-01T23:59:59")), "isSameDay");
//     console.assert(clamp(5, 0, 3) === 3 && clamp(-1, 0, 3) === 0, "clamp");
//     console.assert(minutesBetween(new Date("2024-01-01T00:00:00Z"), new Date("2024-01-01T00:10:00Z")) === 10, "minutesBetween");
//     const fk = fmtDateKey(new Date("2024-02-03T12:00:00"));
//     console.assert(/^\d{4}-\d{2}-\d{2}$/.test(fk) && fk === "2024-02-03", "fmtDateKey");
//     const mm = getMonthMatrix(new Date("2024-02-10"));
//     console.assert(mm.length % 7 === 0 && mm.length >= 28, "getMonthMatrix");
//     console.assert(Array.isArray(seedBookings) && seedBookings.length >= 1, "seed");
//   } catch (e) {
//     console.warn("OmniBook self-tests warning:", e);
//   }
// })();

export default function page() {
  return <div>page</div>;
}
