export const MEETING_PATHS = ["same", "modified", "idea"] as const;
export type MeetingPath = (typeof MEETING_PATHS)[number];

export const PROJECT_TYPES = ["villa", "residential_complex", "commercial", "other"] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];

export const LAND_STATUSES = ["owned_ready", "purchasing", "no_land"] as const;
export type LandStatus = (typeof LAND_STATUSES)[number];

export const START_TIMELINES = ["within_3_months", "within_year", "exploring"] as const;
export type StartTimeline = (typeof START_TIMELINES)[number];

export const MEETING_MODES = ["remote", "office", "call_me"] as const;
export type MeetingMode = (typeof MEETING_MODES)[number];

export const IDEA_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
] as const;
export const IDEA_FILE_MAX_BYTES = 10 * 1024 * 1024; // 10MB
export const IDEA_FILE_MAX_COUNT = 3;

export type Slot = { start: string; end: string; time: string };
export type BookingDay = { date: string; weekday: number; slots: Slot[] };

export type BookingSettings = {
  timeZone: string;
  /** 0 = Sunday … 6 = Saturday */
  workDays: number[];
  dayStart: string;
  dayEnd: string;
  slotMinutes: number;
  minNoticeHours: number;
  daysAhead: number;
};

export const DEFAULT_BOOKING_SETTINGS: BookingSettings = {
  timeZone: "Asia/Muscat",
  workDays: [0, 1, 2, 3, 4], // Sunday to Thursday
  dayStart: "09:00",
  dayEnd: "17:00",
  slotMinutes: 45,
  minNoticeHours: 12,
  daysAhead: 21,
};

function minutesOf(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

function hhmm(minutes: number): string {
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

export function zonedParts(instant: Date, timeZone: string) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "short",
    })
      .formatToParts(instant)
      .map((part) => [part.type, part.value]),
  );
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    time: `${parts.hour}:${parts.minute}`,
    weekday: weekdays.indexOf(parts.weekday as string),
    seconds: Number(parts.second),
  };
}

function offsetMinutes(instant: Date, timeZone: string): number {
  const p = zonedParts(instant, timeZone);
  const [y, m, d] = p.date.split("-").map(Number);
  const [h, min] = p.time.split(":").map(Number);
  const asUtc = Date.UTC(y || 0, (m || 1) - 1, d || 1, h || 0, min || 0, p.seconds || 0);
  return Math.round((asUtc - Math.floor(instant.getTime() / 1000) * 1000) / 60000);
}

export function zonedTimeToUtc(date: string, time: string, timeZone: string): Date {
  const [y, m, d] = date.split("-").map(Number);
  const [h, min] = time.split(":").map(Number);
  const guess = Date.UTC(y || 0, (m || 1) - 1, d || 1, h || 0, min || 0);
  let instant = new Date(guess - offsetMinutes(new Date(guess), timeZone) * 60000);
  instant = new Date(guess - offsetMinutes(instant, timeZone) * 60000);
  return instant;
}

export function addDays(date: string, days: number): string {
  const [y, m, d] = date.split("-").map(Number);
  const next = new Date(Date.UTC(y || 0, (m || 1) - 1, (d || 1) + days));
  return `${next.getUTCFullYear()}-${String(next.getUTCMonth() + 1).padStart(2, "0")}-${String(next.getUTCDate()).padStart(2, "0")}`;
}

export type BusyInterval = { start: string | Date; end: string | Date };

export function generateAvailableDays(
  settings: BookingSettings = DEFAULT_BOOKING_SETTINGS,
  now = new Date(),
  busy: BusyInterval[] = [],
): BookingDay[] {
  const today = zonedParts(now, settings.timeZone).date;
  const earliest = now.getTime() + settings.minNoticeHours * 3600_000;
  const open = minutesOf(settings.dayStart);
  const close = minutesOf(settings.dayEnd);
  const days: BookingDay[] = [];

  for (let offset = 0; offset < settings.daysAhead; offset += 1) {
    const date = addDays(today, offset);
    const weekday = zonedParts(
      zonedTimeToUtc(date, "12:00", settings.timeZone),
      settings.timeZone,
    ).weekday;
    if (!settings.workDays.includes(weekday)) continue;

    const slots: Slot[] = [];
    for (
      let minute = open;
      minute + settings.slotMinutes <= close;
      minute += settings.slotMinutes
    ) {
      const start = zonedTimeToUtc(date, hhmm(minute), settings.timeZone);
      const seen = zonedParts(start, settings.timeZone);
      if (seen.date !== date || seen.time !== hhmm(minute)) continue;
      const end = new Date(start.getTime() + settings.slotMinutes * 60_000);
      const startMs = start.getTime();
      const endMs = end.getTime();
      if (startMs < earliest) continue;

      const isBusy = busy.some((b) => {
        const bStart = new Date(b.start).getTime();
        const bEnd = new Date(b.end).getTime();
        return startMs < bEnd && endMs > bStart;
      });
      if (isBusy) continue;

      slots.push({
        start: start.toISOString(),
        end: end.toISOString(),
        time: hhmm(minute),
      });
    }
    days.push({ date, weekday, slots });
  }
  return days;
}

const LOCALE_TAG = { ar: "ar-OM-u-nu-latn", en: "en-GB" };
const TIME_TAG = { ar: "ar-OM-u-nu-latn", en: "en-US" };

export function dayChip(
  date: string,
  locale: "ar" | "en",
): { weekday: string; day: string; month: string } {
  const noon = new Date(`${date}T12:00:00Z`);
  const part = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(LOCALE_TAG[locale], { timeZone: "UTC", ...options }).format(noon);
  return {
    weekday: part({ weekday: "short" }),
    day: part({ day: "numeric" }),
    month: part({ month: "short" }),
  };
}

export function timeLabel(iso: string, locale: "ar" | "en", timeZone = "Asia/Muscat"): string {
  return new Intl.DateTimeFormat(TIME_TAG[locale], {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(iso));
}

export function meetingWhen(iso: string, locale: "ar" | "en", timeZone = "Asia/Muscat"): string {
  const date = new Intl.DateTimeFormat(LOCALE_TAG[locale], {
    timeZone,
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(iso));
  return `${date}${locale === "ar" ? "، " : ", "}${timeLabel(iso, locale, timeZone)}`;
}
