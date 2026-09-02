import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { X, CalendarCheck } from "lucide-react";
import { SERVICES, BUSINESS } from "@/data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const TIME_SLOTS = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

const EMPTY = {
  client_name: "",
  phone: "",
  email: "",
  service_id: "",
  vehicle_info: "",
  preferred_date: "",
  preferred_time: "8:00 AM",
  notes: "",
};

const inputCls =
  "w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary placeholder:text-muted-foreground/60";

const Field = ({ label, children }) => (
  <label className="block">
    <span className="mb-1.5 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
      {label}
    </span>
    {children}
  </label>
);

export default function AppointmentModal({ open, onClose, presetService }) {
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setForm((f) => ({ ...EMPTY, service_id: presetService || f.service_id }));
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, presetService]);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const today = new Date().toISOString().split("T")[0];

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${API}/appointments`, form);
      toast.success("Request received — we'll call you to confirm your slot.");
      setForm(EMPTY);
      onClose();
    } catch (err) {
      toast.error(`Could not send request. Please call us at ${BUSINESS.phone}.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          data-testid="appointment-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] w-full max-w-lg overflow-y-auto border border-border bg-card"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-4 sm:px-8">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                  Service Request
                </p>
                <h3 className="mt-1 font-display text-lg font-bold uppercase">
                  Book your bay time
                </h3>
              </div>
              <button
                data-testid="appointment-close-btn"
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={submit} className="space-y-4 px-6 py-6 sm:px-8">
              <Field label="Service needed">
                <select
                  data-testid="appt-service-select"
                  required
                  value={form.service_id}
                  onChange={set("service_id")}
                  className={inputCls}
                >
                  <option value="" disabled>
                    Select a service…
                  </option>
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                  <option value="other">Something else / not sure</option>
                </select>
              </Field>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Your name">
                  <input
                    data-testid="appt-name-input"
                    required
                    value={form.client_name}
                    onChange={set("client_name")}
                    placeholder="Mike Peters"
                    className={inputCls}
                  />
                </Field>
                <Field label="Phone">
                  <input
                    data-testid="appt-phone-input"
                    required
                    type="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="(501) 555-0123"
                    className={inputCls}
                  />
                </Field>
              </div>

              <Field label="Email (optional)">
                <input
                  data-testid="appt-email-input"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="you@email.com"
                  className={inputCls}
                />
              </Field>

              <Field label="Vehicle (year / make / model)">
                <input
                  data-testid="appt-vehicle-input"
                  value={form.vehicle_info}
                  onChange={set("vehicle_info")}
                  placeholder="2019 Ford F-150"
                  className={inputCls}
                />
              </Field>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Preferred date (Mon–Fri)">
                  <input
                    data-testid="appt-date-input"
                    required
                    type="date"
                    min={today}
                    value={form.preferred_date}
                    onChange={set("preferred_date")}
                    className={inputCls}
                  />
                </Field>
                <Field label="Preferred time">
                  <select
                    data-testid="appt-time-select"
                    value={form.preferred_time}
                    onChange={set("preferred_time")}
                    className={inputCls}
                  >
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="What's going on? (optional)">
                <textarea
                  data-testid="appt-notes-input"
                  rows={3}
                  value={form.notes}
                  onChange={set("notes")}
                  placeholder="Grinding noise when braking, A/C blowing warm…"
                  className={`${inputCls} resize-none`}
                />
              </Field>

              <button
                data-testid="appt-submit-btn"
                type="submit"
                disabled={submitting}
                className="flex h-12 w-full items-center justify-center gap-2 bg-primary font-mono text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-700 disabled:opacity-60"
              >
                <CalendarCheck className="h-4 w-4" />
                {submitting ? "Sending…" : "Request Appointment"}
              </button>
              <p className="text-center font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                We confirm every request by phone · {BUSINESS.phone}
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
