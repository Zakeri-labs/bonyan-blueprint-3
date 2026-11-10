import { useId, useMemo, useRef, useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  CalendarCheck,
  Check,
  CheckCircle2,
  FileText,
  Loader2,
  MapPin,
  MessageCircle,
  Paperclip,
  Phone,
  Video,
  X,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { useT, CONTACT } from "@/i18n";
import { SiteLayout } from "../SiteLayout";
import { DESIGNS, type Design } from "@/data/designs";
import { fetchPublicGallery, fetchPublicDesign } from "@/lib/supabase";
import {
  DEFAULT_BOOKING_SETTINGS,
  generateAvailableDays,
  dayChip,
  timeLabel,
  meetingWhen,
  PROJECT_TYPES,
  LAND_STATUSES,
  START_TIMELINES,
  MEETING_MODES,
  IDEA_FILE_TYPES,
  IDEA_FILE_MAX_BYTES,
  IDEA_FILE_MAX_COUNT,
  type MeetingMode,
  type MeetingPath,
  type ProjectType,
  type LandStatus,
  type StartTimeline,
} from "@/data/booking";
import { OMAN_GOVERNORATES, findWilayat } from "@/data/wilayat";
import { cn } from "@/lib/utils";

const OTHER = "__other__";

type Fields = {
  clientName: string;
  whatsappPhone: string;
  email: string;
  projectType: ProjectType | "";
  landStatus: LandStatus | "";
  wilayatKey: string;
  wilayatOther: string;
  landAreaSqm: string;
  startTimeline: StartTimeline | "";
  ideaText: string;
};

type UploadedFile = {
  id: string;
  name: string;
  file: File;
  size: number;
};

export function BookingPage({
  designSlug,
  initialPath,
}: {
  designSlug?: string;
  initialPath?: MeetingPath;
}) {
  const { t, locale, dir } = useT();
  const isAr = locale === "ar";
  const dg = t.designGallery;
  const b = dg.booking;
  const formId = useId();
  const topRef = useRef<HTMLDivElement>(null);
  const BackIcon = isAr ? ArrowRight : ArrowLeft;

  const [design, setDesign] = useState<Design | null>(() => {
    return designSlug ? DESIGNS.find((d) => d.slug === designSlug) ?? null : null;
  });

  useEffect(() => {
    if (!designSlug) return;
    fetchPublicDesign(designSlug).then((d) => {
      if (d) setDesign(d);
    });
  }, [designSlug]);

  const [bookingSettings, setBookingSettings] = useState(DEFAULT_BOOKING_SETTINGS);

  useEffect(() => {
    fetchPublicGallery().then((res) => {
      if (!res?.site) return;
      setBookingSettings({
        timeZone: res.site.bookingTimezone,
        workDays: res.site.bookingWorkDays,
        dayStart: res.site.bookingDayStart,
        dayEnd: res.site.bookingDayEnd,
        slotMinutes: res.site.bookingSlotMinutes,
        minNoticeHours: res.site.bookingMinNoticeHours,
        daysAhead: res.site.bookingDaysAhead,
      });
    });
  }, []);

  const path: MeetingPath = design
    ? initialPath === "modified"
      ? "modified"
      : "same"
    : "idea";

  const [step, setStep] = useState<1 | 2>(1);
  const [fields, setFields] = useState<Fields>({
    clientName: "",
    whatsappPhone: "",
    email: "",
    projectType: (design ? "villa" : "") as ProjectType | "",
    landStatus: "",
    wilayatKey: "",
    wilayatOther: "",
    landAreaSqm: design?.builtAreaSqm ? String(design.builtAreaSqm) : "",
    startTimeline: "",
    ideaText: "",
  });

  const [honeypot, setHoneypot] = useState("");
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields | "meetingMode" | "slot", string>>>({});
  const [mode, setMode] = useState<MeetingMode>("office");
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // Available days & slots from live booking settings
  const availableDays = useMemo(() => {
    return generateAvailableDays(bookingSettings);
  }, [bookingSettings]);

  const activeDay = useMemo(() => {
    if (selectedDay) {
      return availableDays.find((d) => d.date === selectedDay) ?? availableDays[0] ?? null;
    }
    return availableDays[0] ?? null;
  }, [availableDays, selectedDay]);

  // Set default day when opening step 2
  const currentDayDate = activeDay?.date ?? "";

  const setField = (key: keyof Fields) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const val = e.target.value;
    setFields((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const scrollTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const validateStepOne = (): boolean => {
    const nextErrors: Partial<Record<keyof Fields, string>> = {};
    if (!fields.clientName.trim() || fields.clientName.trim().length < 2) {
      nextErrors.clientName = b.errors.tooShort;
    }

    const cleanPhone = fields.whatsappPhone.replace(/[\s\-+]/g, "");
    if (!cleanPhone || cleanPhone.length < 7) {
      nextErrors.whatsappPhone = b.errors.invalidPhone;
    }

    if (!fields.projectType) {
      nextErrors.projectType = b.errors.invalidChoice;
    }

    if (!fields.landStatus) {
      nextErrors.landStatus = b.errors.invalidChoice;
    }

    if (!fields.startTimeline) {
      nextErrors.startTimeline = b.errors.invalidChoice;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateStepTwo = (): boolean => {
    const nextErrors: Partial<Record<keyof Fields | "meetingMode" | "slot", string>> = {};
    if (!mode) {
      nextErrors.meetingMode = b.errors.invalidChoice;
    }

    if (mode === "remote") {
      if (!fields.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
        nextErrors.email = b.errors.invalidEmail;
      }
    }

    if (mode !== "call_me" && !selectedSlot) {
      nextErrors.slot = b.errors.required;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = (e: FormEvent) => {
    e.preventDefault();
    if (validateStepOne()) {
      setStep(2);
      scrollTop();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const chosen = e.target.files;
    if (!chosen?.length) return;

    const remaining = IDEA_FILE_MAX_COUNT - files.length;
    if (chosen.length > remaining) {
      setFileError(b.errors.tooManyFiles);
    }

    const newFiles: UploadedFile[] = [];
    for (let i = 0; i < Math.min(chosen.length, remaining); i++) {
      const f = chosen[i]!;
      if (!(IDEA_FILE_TYPES as readonly string[]).includes(f.type)) {
        setFileError(b.errors.fileType);
        continue;
      }
      if (f.size > IDEA_FILE_MAX_BYTES) {
        setFileError(b.errors.fileSize);
        continue;
      }
      newFiles.push({
        id: Math.random().toString(36).substring(2, 9),
        name: f.name,
        file: f,
        size: f.size,
      });
    }

    setFiles((prev) => [...prev, ...newFiles]);
    e.target.value = "";
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot detection
    if (!validateStepTwo()) return;

    setSubmitting(true);

    const wilayatLabel =
      fields.wilayatKey === OTHER
        ? fields.wilayatOther
        : findWilayat(fields.wilayatKey)?.[isAr ? "ar" : "en"] || fields.wilayatKey;

    const requestKey =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
            (Number(c) ^ (Math.random() * 16 >> (Number(c) / 4))).toString(16),
          );

    const bookingPayload = {
      requestKey,
      clientName: fields.clientName,
      whatsappPhone: fields.whatsappPhone,
      email: fields.email,
      projectType: fields.projectType,
      landStatus: fields.landStatus,
      wilayat: wilayatLabel,
      landAreaSqm: fields.landAreaSqm,
      startTimeline: fields.startTimeline,
      ideaText: fields.ideaText,
      meetingMode: mode,
      slotStart: mode === "call_me" ? null : selectedSlot,
      designSlug: design?.slug || null,
      path,
      locale,
    };

    // Send to central API on app.bonyanec.com
    try {
      await fetch("https://app.bonyanec.com/api/designs/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      }).catch(() => null);
    } catch {
      // Graceful fallback to client confirmation
    }

    setSubmitting(false);
    setConfirmed(true);
    scrollTop();
  };

  // WhatsApp confirmation text generator
  const getWhatsAppConfirmationHref = () => {
    const wilayatLabel =
      fields.wilayatKey === OTHER
        ? fields.wilayatOther
        : findWilayat(fields.wilayatKey)?.[isAr ? "ar" : "en"] || fields.wilayatKey;

    const timeFormatted = selectedSlot
      ? meetingWhen(selectedSlot, locale, DEFAULT_BOOKING_SETTINGS.timeZone)
      : null;

    const modeLabel =
      mode === "remote"
        ? isAr
          ? "مكالمة فيديو (Google Meet)"
          : "Video Call (Google Meet)"
        : mode === "office"
          ? isAr
            ? "في مكتب بنيان (المعبيلة)"
            : "At Bonyan Office (Mabela)"
          : isAr
            ? "اتصال هاتفي"
            : "Phone Call";

    const lines = isAr
      ? [
          `*طلب حجز موعد جديد — بنيان للاستشارات الهندسية*`,
          `------------------------------`,
          `• *الاسم:* ${fields.clientName}`,
          `• *الهاتف:* ${fields.whatsappPhone}`,
          fields.email ? `• *البريد:* ${fields.email}` : null,
          design ? `• *التصميم:* ${design.titleAr} (${design.code})` : `• *نوع الطلب:* فكرة خاصة`,
          `• *طابع الطلب:* ${path === "modified" ? "مع تعديلات" : path === "same" ? "نفس التصميم" : "فكرة جديدة"}`,
          `• *طريقة الاجتماع:* ${modeLabel}`,
          timeFormatted ? `• *الموعد المقترح:* ${timeFormatted}` : null,
          `• *نوع المشروع:* ${b.projectTypes[fields.projectType as ProjectType] || fields.projectType}`,
          `• *وضع الأرض:* ${b.landStatuses[fields.landStatus as LandStatus] || fields.landStatus}`,
          wilayatLabel ? `• *الموقع:* ${wilayatLabel}` : null,
          fields.landAreaSqm ? `• *المساحة:* ${fields.landAreaSqm} م²` : null,
          fields.ideaText ? `• *ملاحظات:* ${fields.ideaText}` : null,
          files.length ? `• *المرفقات:* ${files.length} ملفات مرفقة جاهزة للمشاركة` : null,
        ].filter(Boolean)
      : [
          `*New Meeting Booking Request — Bonyan Engineering*`,
          `------------------------------`,
          `• *Name:* ${fields.clientName}`,
          `• *Phone:* ${fields.whatsappPhone}`,
          fields.email ? `• *Email:* ${fields.email}` : null,
          design ? `• *Design:* ${design.titleEn} (${design.code})` : `• *Request:* Custom Concept`,
          `• *Meeting Mode:* ${modeLabel}`,
          timeFormatted ? `• *Proposed Time:* ${timeFormatted}` : null,
          `• *Project Type:* ${b.projectTypes[fields.projectType as ProjectType] || fields.projectType}`,
          `• *Land Status:* ${b.landStatuses[fields.landStatus as LandStatus] || fields.landStatus}`,
          wilayatLabel ? `• *Location:* ${wilayatLabel}` : null,
          fields.landAreaSqm ? `• *Land Area:* ${fields.landAreaSqm} m²` : null,
          fields.ideaText ? `• *Notes:* ${fields.ideaText}` : null,
        ].filter(Boolean);

    return `https://wa.me/96894114511?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const backGalleryHref = isAr ? "/architecture_designs" : "/en/architecture_designs";
  const backDesignHref = design
    ? isAr
      ? `/architecture_designs/${design.slug}`
      : `/en/architecture_designs/${design.slug}`
    : backGalleryHref;

  return (
    <SiteLayout>
      <div ref={topRef} className="container-site py-12 md:py-20" dir={dir}>
        <div className="mx-auto max-w-2xl">
          {/* Back link */}
          <Link
            to={backDesignHref}
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary cursor-pointer"
          >
            <BackIcon className="size-4" aria-hidden="true" />
            <span>{design ? (isAr ? "العودة لتفاصيل التصميم" : "Back to design details") : dg.back}</span>
          </Link>

          {/* CONFIRMATION SCREEN */}
          {confirmed ? (
            <div className="rounded-xs border border-primary/40 bg-panel/80 p-8 text-center shadow-xl backdrop-blur-md">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/20 text-primary mb-6 ring-8 ring-primary/10">
                <CheckCircle2 className="size-10" />
              </div>

              <h1 className="font-display text-2xl font-bold md:text-3xl text-foreground">
                {mode === "call_me" ? b.callMeTitle : b.confirmedTitle}
              </h1>

              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {mode === "call_me" ? b.callMeBody : b.inviteSent}
              </p>

              {/* Summary Card */}
              <div className="mt-8 rounded-xs border border-border bg-background/50 p-6 text-start">
                <div className="flex items-center gap-3 border-b border-border pb-4">
                  {design?.imageUrl ? (
                    <img
                      src={design.imageUrl}
                      alt=""
                      className="size-14 rounded-xs object-cover border border-border"
                    />
                  ) : (
                    <div className="flex size-14 items-center justify-center rounded-xs bg-primary/15 text-primary">
                      <Sparkles className="size-7" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-display text-base font-bold text-foreground">
                      {design ? (isAr ? design.titleAr : design.titleEn) : b.ideaHeading}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {design ? (
                        <>
                          <span dir="ltr">{design.code}</span> ·{" "}
                          {path === "modified" ? b.pathModified : b.pathSame}
                        </>
                      ) : (
                        b.ideaSubheading
                      )}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-xs leading-relaxed text-muted-foreground">
                  {selectedSlot && mode !== "call_me" ? (
                    <p className="font-semibold text-foreground text-sm">
                      📅 {meetingWhen(selectedSlot, locale, DEFAULT_BOOKING_SETTINGS.timeZone)}
                    </p>
                  ) : null}
                  <p>
                    📍 {mode === "office" ? b.officeAt.replace("{address}", "مكتب بنيان — المعبيلة الصناعية، مسقط") : mode === "remote" ? "عبر Google Meet" : "مكالمة هاتفية"}
                  </p>
                  <p>👤 {fields.clientName} ({fields.whatsappPhone})</p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <a
                  href={getWhatsAppConfirmationHref()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xs bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-500 shadow-md cursor-pointer"
                >
                  <MessageCircle className="size-4" />
                  <span>{b.chatWhatsapp}</span>
                </a>

                <Link
                  to={backGalleryHref}
                  className="inline-flex min-h-11 items-center justify-center rounded-xs border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary cursor-pointer"
                >
                  {b.backToGallery}
                </Link>
              </div>
            </div>
          ) : (
            /* WIZARD FORM */
            <div className="flex flex-col gap-6">
              {/* Header Card */}
              <div className="rounded-xs border border-border bg-panel/70 p-4">
                <div className="flex items-center gap-4">
                  {design?.imageUrl ? (
                    <img
                      src={design.imageUrl}
                      alt=""
                      className="size-16 shrink-0 rounded-xs object-cover border border-border"
                    />
                  ) : (
                    <div className="flex size-16 shrink-0 items-center justify-center rounded-xs bg-primary/15 text-primary">
                      <Sparkles className="size-8" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-primary">{b.step.replace("{step}", String(step))}</p>
                    <h2 className="font-display text-lg font-bold text-foreground truncate">
                      {design ? (isAr ? design.titleAr : design.titleEn) : b.ideaHeading}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {design ? (
                        <>
                          <span dir="ltr">{design.code}</span> ·{" "}
                          <span className="font-medium text-foreground">
                            {path === "modified" ? b.pathModified : b.pathSame}
                          </span>
                        </>
                      ) : (
                        b.ideaSubheading
                      )}
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4 grid grid-cols-2 gap-2" aria-hidden="true">
                  <span className="h-1 rounded-full bg-primary" />
                  <span className={cn("h-1 rounded-full transition-colors", step === 2 ? "bg-primary" : "bg-border")} />
                </div>
              </div>

              {/* STEP 1: ABOUT & PROJECT */}
              {step === 1 ? (
                <form noValidate onSubmit={handleNext} className="flex flex-col gap-6">
                  <div>
                    <h1 className="font-display text-2xl font-bold text-foreground">
                      {b.aboutTitle}
                    </h1>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {isAr
                        ? "ساعدنا على فهم احتياجاتك لنقدم لك أفضل استشارة هندسية ومعمارية."
                        : "Help us understand your requirements so we can prepare the best consultation."}
                    </p>
                  </div>

                  {/* Honeypot field */}
                  <div className="sr-only" aria-hidden="true">
                    <input
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      name="website"
                    />
                  </div>

                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor={`${formId}-name`} className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {b.name} <span className="text-destructive">*</span>
                    </label>
                    <input
                      id={`${formId}-name`}
                      type="text"
                      required
                      placeholder={b.namePlaceholder}
                      value={fields.clientName}
                      onChange={setField("clientName")}
                      className={cn(
                        "min-h-11 rounded-xs border bg-card/40 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20",
                        errors.clientName ? "border-destructive" : "border-border",
                      )}
                    />
                    {errors.clientName ? (
                      <p className="text-xs text-destructive">{errors.clientName}</p>
                    ) : null}
                  </div>

                  {/* WhatsApp phone */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor={`${formId}-phone`} className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {b.whatsapp} <span className="text-destructive">*</span>
                    </label>
                    <input
                      id={`${formId}-phone`}
                      type="tel"
                      dir="ltr"
                      required
                      placeholder="+968 9XXXXXXX"
                      value={fields.whatsappPhone}
                      onChange={setField("whatsappPhone")}
                      className={cn(
                        "min-h-11 rounded-xs border bg-card/40 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 text-start",
                        errors.whatsappPhone ? "border-destructive" : "border-border",
                      )}
                    />
                    <p className="text-[11px] text-muted-foreground">{b.whatsappHint}</p>
                    {errors.whatsappPhone ? (
                      <p className="text-xs text-destructive">{errors.whatsappPhone}</p>
                    ) : null}
                  </div>

                  {/* Project Type */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {b.projectType} <span className="text-destructive">*</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {PROJECT_TYPES.map((typeKey) => {
                        const isSelected = fields.projectType === typeKey;
                        return (
                          <button
                            key={typeKey}
                            type="button"
                            onClick={() => {
                              setFields((prev) => ({ ...prev, projectType: typeKey }));
                              if (errors.projectType) setErrors((prev) => ({ ...prev, projectType: undefined }));
                            }}
                            className={cn(
                              "inline-flex min-h-10 items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-medium transition-all cursor-pointer",
                              isSelected
                                ? "border-primary bg-primary text-primary-foreground font-bold shadow-sm"
                                : "border-border bg-card/30 text-muted-foreground hover:border-border hover:text-foreground",
                            )}
                          >
                            {isSelected ? <Check className="size-3.5" /> : null}
                            <span>{b.projectTypes[typeKey]}</span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.projectType ? (
                      <p className="text-xs text-destructive">{errors.projectType}</p>
                    ) : null}
                  </div>

                  {/* Land status */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {b.landStatus} <span className="text-destructive">*</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {LAND_STATUSES.map((statusKey) => {
                        const isSelected = fields.landStatus === statusKey;
                        return (
                          <button
                            key={statusKey}
                            type="button"
                            onClick={() => {
                              setFields((prev) => ({ ...prev, landStatus: statusKey }));
                              if (errors.landStatus) setErrors((prev) => ({ ...prev, landStatus: undefined }));
                            }}
                            className={cn(
                              "inline-flex min-h-10 items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-medium transition-all cursor-pointer",
                              isSelected
                                ? "border-primary bg-primary text-primary-foreground font-bold shadow-sm"
                                : "border-border bg-card/30 text-muted-foreground hover:border-border hover:text-foreground",
                            )}
                          >
                            {isSelected ? <Check className="size-3.5" /> : null}
                            <span>{b.landStatuses[statusKey]}</span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.landStatus ? (
                      <p className="text-xs text-destructive">{errors.landStatus}</p>
                    ) : null}
                  </div>

                  {/* Wilayat & Land Area */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Wilayat */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor={`${formId}-wilayat`} className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {b.wilayat} <span className="text-[11px] font-normal opacity-60">({b.optional})</span>
                      </label>
                      <select
                        id={`${formId}-wilayat`}
                        value={fields.wilayatKey}
                        onChange={setField("wilayatKey")}
                        className="min-h-11 rounded-xs border border-border bg-card/40 px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary"
                      >
                        <option value="" className="bg-panel text-foreground">{b.wilayatPlaceholder}</option>
                        {OMAN_GOVERNORATES.map((gov) => (
                          <optgroup key={gov.en} label={isAr ? gov.ar : gov.en} className="bg-panel font-bold text-primary">
                            {gov.wilayat.map((w) => (
                              <option key={w.key} value={w.key} className="bg-panel text-foreground">
                                {isAr ? w.ar : w.en}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                        <option value={OTHER} className="bg-panel text-foreground">{b.wilayatOther}</option>
                      </select>

                      {fields.wilayatKey === OTHER ? (
                        <input
                          type="text"
                          placeholder={b.wilayatOtherPlaceholder}
                          value={fields.wilayatOther}
                          onChange={setField("wilayatOther")}
                          className="mt-1 min-h-10 rounded-xs border border-border bg-card/40 px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                        />
                      ) : null}
                    </div>

                    {/* Area */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor={`${formId}-area`} className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {b.landArea} <span className="text-[11px] font-normal opacity-60">({b.optional})</span>
                      </label>
                      <input
                        id={`${formId}-area`}
                        type="text"
                        dir="ltr"
                        inputMode="numeric"
                        placeholder="600"
                        value={fields.landAreaSqm}
                        onChange={setField("landAreaSqm")}
                        className="min-h-11 rounded-xs border border-border bg-card/40 px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* Start timeline */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {b.startTimeline} <span className="text-destructive">*</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {START_TIMELINES.map((timeKey) => {
                        const isSelected = fields.startTimeline === timeKey;
                        return (
                          <button
                            key={timeKey}
                            type="button"
                            onClick={() => {
                              setFields((prev) => ({ ...prev, startTimeline: timeKey }));
                              if (errors.startTimeline) setErrors((prev) => ({ ...prev, startTimeline: undefined }));
                            }}
                            className={cn(
                              "inline-flex min-h-10 items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-medium transition-all cursor-pointer",
                              isSelected
                                ? "border-primary bg-primary text-primary-foreground font-bold shadow-sm"
                                : "border-border bg-card/30 text-muted-foreground hover:border-border hover:text-foreground",
                            )}
                          >
                            {isSelected ? <Check className="size-3.5" /> : null}
                            <span>{b.timelines[timeKey]}</span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.startTimeline ? (
                      <p className="text-xs text-destructive">{errors.startTimeline}</p>
                    ) : null}
                  </div>

                  {/* Custom Idea / Modified Details & Files */}
                  {path === "idea" || path === "modified" ? (
                    <div className="flex flex-col gap-4 border-t border-border pt-4">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor={`${formId}-idea`} className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          {b.ideaText} <span className="text-[11px] font-normal opacity-60">({b.optional})</span>
                        </label>
                        <textarea
                          id={`${formId}-idea`}
                          rows={3}
                          placeholder={b.ideaPlaceholder}
                          value={fields.ideaText}
                          onChange={setField("ideaText")}
                          className="rounded-xs border border-border bg-card/40 p-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      </div>

                      {/* File upload */}
                      <div className="flex flex-col gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          {b.files} <span className="text-[11px] font-normal opacity-60">({b.optional})</span>
                        </span>

                        {files.length > 0 ? (
                          <div className="space-y-2">
                            {files.map((f) => (
                              <div
                                key={f.id}
                                className="flex items-center justify-between rounded-xs border border-border bg-card/40 px-3 py-2 text-xs"
                              >
                                <div className="flex items-center gap-2 truncate">
                                  <FileText className="size-4 shrink-0 text-primary" />
                                  <span className="truncate text-foreground">{f.name}</span>
                                  <span className="text-muted-foreground shrink-0">
                                    ({Math.round(f.size / 1024)} KB)
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeFile(f.id)}
                                  className="text-muted-foreground transition-colors hover:text-destructive cursor-pointer p-1"
                                >
                                  <X className="size-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : null}

                        {files.length < IDEA_FILE_MAX_COUNT ? (
                          <label className="flex w-fit cursor-pointer items-center gap-2 rounded-xs border border-dashed border-border bg-card/20 px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary">
                            <Paperclip className="size-4" />
                            <span>{b.addFile}</span>
                            <input
                              type="file"
                              multiple
                              accept={IDEA_FILE_TYPES.join(",")}
                              onChange={handleFileChange}
                              className="sr-only"
                            />
                          </label>
                        ) : null}

                        <p className="text-[11px] text-muted-foreground">{b.filesHint}</p>
                        {fileError ? <p className="text-xs text-destructive">{fileError}</p> : null}
                      </div>
                    </div>
                  ) : null}

                  {/* Buttons */}
                  <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                    <Link
                      to={backDesignHref}
                      className="inline-flex min-h-11 items-center justify-center rounded-xs border border-border bg-card/30 px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary cursor-pointer text-center"
                    >
                      {b.back}
                    </Link>

                    <button
                      type="submit"
                      className="inline-flex min-h-11 items-center justify-center rounded-xs bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 shadow-md cursor-pointer text-center"
                    >
                      {b.next}
                    </button>
                  </div>
                </form>
              ) : (
                /* STEP 2: MEETING MODE & TIME */
                <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div>
                    <h1 className="font-display text-2xl font-bold text-foreground">
                      {b.meetingTitle}
                    </h1>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {isAr
                        ? "اختر الأسلوب والموعد المناسب لك لمناقشة مشروعك مع فريقنا الهندسي."
                        : "Select your preferred mode and appointment time to discuss your project."}
                    </p>
                  </div>

                  {/* Meeting modes */}
                  <div className="grid grid-cols-3 gap-3">
                    {MEETING_MODES.map((modeKey) => {
                      const isSelected = mode === modeKey;
                      const Icon =
                        modeKey === "remote" ? Video : modeKey === "office" ? MapPin : Phone;
                      return (
                        <button
                          key={modeKey}
                          type="button"
                          onClick={() => {
                            setMode(modeKey);
                            if (errors.meetingMode) setErrors((prev) => ({ ...prev, meetingMode: undefined }));
                          }}
                          className={cn(
                            "flex flex-col items-center justify-center gap-1.5 rounded-xs border p-3.5 text-center transition-all cursor-pointer min-h-24",
                            isSelected
                              ? "border-primary bg-primary/10 ring-1 ring-primary"
                              : "border-border bg-card/30 text-muted-foreground hover:border-primary/50 hover:text-foreground",
                          )}
                        >
                          <Icon className={cn("size-5", isSelected ? "text-primary" : "text-muted-foreground")} />
                          <span className={cn("text-xs font-bold", isSelected ? "text-foreground" : "")}>
                            {b.modes[modeKey]}
                          </span>
                          <span className="text-[10px] text-muted-foreground/75 leading-tight">
                            {modeKey === "office" ? (isAr ? "مكتبنا بالمعبيلة" : "Mabela Office") : b.modeHints[modeKey]}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Remote / Office slot picker */}
                  {mode === "remote" || mode === "office" ? (
                    <div className="flex flex-col gap-6 border-t border-border pt-4">
                      {/* Email field */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor={`${formId}-email`} className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          {b.email} {mode === "remote" ? <span className="text-destructive">*</span> : <span className="text-[11px] font-normal opacity-60">({b.optional})</span>}
                        </label>
                        <input
                          id={`${formId}-email`}
                          type="email"
                          dir="ltr"
                          placeholder="name@example.com"
                          value={fields.email}
                          onChange={setField("email")}
                          className={cn(
                            "min-h-11 rounded-xs border bg-card/40 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary",
                            errors.email ? "border-destructive" : "border-border",
                          )}
                        />
                        {mode === "remote" ? (
                          <p className="text-[11px] text-primary/80">{b.emailRemoteHint}</p>
                        ) : null}
                        {errors.email ? <p className="text-xs text-destructive">{errors.email}</p> : null}
                      </div>

                      {/* Pick Day */}
                      <div className="flex flex-col gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          {b.pickDay} <span className="text-destructive">*</span>
                        </span>

                        <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]">
                          {availableDays.map((d) => {
                            const isSelected = (selectedDay || currentDayDate) === d.date;
                            const chip = dayChip(d.date, locale);
                            return (
                              <button
                                key={d.date}
                                type="button"
                                onClick={() => {
                                  setSelectedDay(d.date);
                                  setSelectedSlot("");
                                }}
                                className={cn(
                                  "flex min-w-16 shrink-0 flex-col items-center rounded-xs border p-2 text-center transition-all cursor-pointer",
                                  isSelected
                                    ? "border-primary bg-primary text-primary-foreground font-bold shadow-sm"
                                    : "border-border bg-card/30 text-muted-foreground hover:border-primary/50 hover:text-foreground",
                                )}
                              >
                                <span className="text-[11px] opacity-80">{chip.weekday}</span>
                                <span className="text-base font-bold leading-tight">{chip.day}</span>
                                <span className="text-[10px] opacity-70">{chip.month}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Pick Time Slot */}
                      <div className="flex flex-col gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          {b.pickTime} <span className="text-destructive">*</span>
                        </span>

                        {activeDay && activeDay.slots.length > 0 ? (
                          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                            {activeDay.slots.map((s) => {
                              const isSelected = selectedSlot === s.start;
                              return (
                                <button
                                  key={s.start}
                                  type="button"
                                  onClick={() => {
                                    setSelectedSlot(s.start);
                                    if (errors.slot) setErrors((prev) => ({ ...prev, slot: undefined }));
                                  }}
                                  className={cn(
                                    "flex min-h-10 items-center justify-center rounded-xs border px-2 text-xs font-semibold transition-all cursor-pointer",
                                    isSelected
                                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                                      : "border-border bg-card/30 text-muted-foreground hover:border-primary hover:text-foreground",
                                  )}
                                >
                                  <span dir="ltr">{timeLabel(s.start, locale, DEFAULT_BOOKING_SETTINGS.timeZone)}</span>
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-xs text-muted-foreground">{b.noSlotsDay}</p>
                        )}

                        <p className="text-[11px] text-muted-foreground mt-1">{b.timeZoneNote}</p>
                        {errors.slot ? <p className="text-xs text-destructive">{errors.slot}</p> : null}
                      </div>
                    </div>
                  ) : (
                    /* Call me mode */
                    <div className="rounded-xs border border-primary/30 bg-primary/10 p-4 text-xs text-foreground/90 leading-relaxed">
                      <p>{b.callMeNote}</p>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setStep(1);
                        scrollTop();
                      }}
                      className="inline-flex min-h-11 items-center justify-center rounded-xs border border-border bg-card/30 px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary cursor-pointer text-center"
                    >
                      {b.back}
                    </button>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xs bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 shadow-md cursor-pointer text-center disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          <span>{b.sending}</span>
                        </>
                      ) : (
                        <>
                          <CalendarCheck className="size-4" />
                          <span>{mode === "call_me" ? b.submitCallMe : b.submit}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </SiteLayout>
  );
}
