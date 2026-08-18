import { useId, useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n";
import { Btn } from "./ui";

type Field = "name" | "phone" | "email" | "type" | "message";
type Errors = Partial<Record<Field, string>>;

export function InquiryForm({ light = false }: { light?: boolean }) {
  const { t } = useT();
  const uid = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const inputCls = cn(
    "min-h-11 w-full rounded-xs border bg-transparent px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20",
    light
      ? "border-ivory-border text-ink placeholder:text-ink-muted"
      : "border-input text-foreground",
  );
  const labelCls = cn(
    "mb-2 block text-[0.6875rem] font-bold uppercase tracking-widest",
    light ? "text-ink-muted" : "text-muted-foreground",
  );

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const type = String(data.get("type") ?? "");
    const message = String(data.get("message") ?? "").trim();

    if (name.length < 2) next.name = t.form.errors.name;
    if (!/^[+()\-\s\d]{7,20}$/.test(phone)) next.phone = t.form.errors.phone;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = t.form.errors.email;
    if (!type) next.type = t.form.errors.type;
    if (message.length < 10) next.message = t.form.errors.message;
    return next;
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const next = validate(new FormData(form));
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setStatus("sending");
    window.setTimeout(() => {
      setStatus("done");
      form.reset();
    }, 700);
  }

  const errorText = (f: Field) =>
    errors[f] ? (
      <p id={`${uid}-${f}-error`} className="mt-2 text-xs text-destructive">
        {errors[f]}
      </p>
    ) : null;

  const aria = (f: Field) =>
    errors[f]
      ? ({ "aria-invalid": true, "aria-describedby": `${uid}-${f}-error` } as const)
      : ({} as const);

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn("border p-6 md:p-8", light ? "border-ivory-border" : "border-border bg-card")}
    >
      <h3 className={cn("font-display text-lg font-bold", light && "text-ink")}>{t.form.title}</h3>
      <p className={cn("mt-1 text-sm", light ? "text-ink-muted" : "text-muted-foreground")}>
        {t.form.subtitle}
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor={`${uid}-name`}>
            {t.form.name}
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            className={inputCls}
            placeholder={t.form.namePh}
            {...aria("name")}
          />
          {errorText("name")}
        </div>
        <div>
          <label className={labelCls} htmlFor={`${uid}-phone`}>
            {t.form.phone}
          </label>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            dir="ltr"
            className={cn(inputCls, "text-start")}
            placeholder={t.form.phonePh}
            {...aria("phone")}
          />
          {errorText("phone")}
        </div>
        <div>
          <label className={labelCls} htmlFor={`${uid}-email`}>
            {t.form.email}
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            dir="ltr"
            className={cn(inputCls, "text-start")}
            placeholder={t.form.emailPh}
            {...aria("email")}
          />
          {errorText("email")}
        </div>
        <div>
          <label className={labelCls} htmlFor={`${uid}-type`}>
            {t.form.type}
          </label>
          <select
            id={`${uid}-type`}
            name="type"
            defaultValue=""
            className={cn(inputCls, light ? "bg-ivory" : "bg-card")}
            {...aria("type")}
          >
            <option value="" disabled>
              {t.form.typePh}
            </option>
            {t.form.types.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {errorText("type")}
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor={`${uid}-message`}>
            {t.form.message}
          </label>
          <textarea
            id={`${uid}-message`}
            name="message"
            rows={4}
            className={cn(inputCls, "resize-y")}
            placeholder={t.form.messagePh}
            {...aria("message")}
          />
          {errorText("message")}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Btn type="submit" arrow className="w-full sm:w-auto">
          {status === "sending" ? t.form.sending : t.form.submit}
        </Btn>
        {status === "done" && (
          <p
            role="status"
            className="flex items-center gap-2 text-sm text-primary"
            aria-live="polite"
          >
            <CheckCircle2 aria-hidden="true" className="size-4" />
            {t.form.success}
          </p>
        )}
      </div>
    </form>
  );
}
