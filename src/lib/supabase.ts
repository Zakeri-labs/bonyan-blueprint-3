export const SUPABASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_URL) ||
  "https://ezfvoriqohiwgxwrmnyg.supabase.co";

export const SUPABASE_ANON_KEY =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6ZnZvcmlxb2hpd2d4d3JtbnlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4ODE5NTYsImV4cCI6MjEwMDQ1Nzk1Nn0.ySr0v6RgtRuqfF7FLE_9iTdbzZRa81zzDUljRmeakgg";

export const DESIGN_GALLERY_BUCKET = "design-gallery";

export type DesignImage = {
  id: string;
  storagePath: string;
  url: string;
  altAr: string | null;
  altEn: string | null;
  orderIndex: number;
};

export type DynamicDesign = {
  id: string;
  slug: string;
  code: string;
  categoryKey: string;
  titleAr: string;
  titleEn: string;
  summaryAr: string;
  summaryEn: string;
  descriptionAr: string;
  descriptionEn: string;
  floorsAr: string;
  floorsEn: string;
  builtAreaSqm: number | null;
  bedrooms: number | null;
  serviceAr: string;
  serviceEn: string;
  isBookable: boolean;
  imageUrl: string;
  images: DesignImage[];
  sortOrder: number;
};

export type DynamicCategory = {
  id: string;
  key: string;
  nameAr: string;
  nameEn: string;
  sortOrder: number;
};

export type SiteSettings = {
  organizationId: string;
  displayNameAr: string | null;
  displayNameEn: string | null;
  whatsappPhone: string | null;
  bookingTimezone: string;
  bookingWorkDays: number[];
  bookingDayStart: string;
  bookingDayEnd: string;
  bookingSlotMinutes: number;
  bookingMinNoticeHours: number;
  bookingDaysAhead: number;
};

/** Convert storage path to full public image URL. */
export function designImageUrl(storagePath: string): string {
  if (!storagePath) return "";
  if (storagePath.startsWith("/")) return storagePath;
  if (storagePath.startsWith("http://") || storagePath.startsWith("https://")) return storagePath;
  const base = SUPABASE_URL.replace(/\/+$/, "");
  return `${base}/storage/v1/object/public/${DESIGN_GALLERY_BUCKET}/${storagePath}`;
}

const reqHeaders = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
};

export async function fetchPublicGallery(): Promise<{
  site: SiteSettings | null;
  categories: DynamicCategory[];
  designs: DynamicDesign[];
} | null> {
  try {
    const base = SUPABASE_URL.replace(/\/+$/, "");

    const [sitesRes, catsRes, designsRes] = await Promise.all([
      fetch(`${base}/rest/v1/design_gallery_sites?select=*&is_enabled=eq.true&limit=1`, {
        headers: reqHeaders,
      }),
      fetch(`${base}/rest/v1/design_categories?select=*&order=sort_order.asc`, {
        headers: reqHeaders,
      }),
      fetch(
        `${base}/rest/v1/designs?select=id,category_id,slug,code,title_ar,title_en,summary_ar,summary_en,description_ar,description_en,floors_ar,floors_en,built_area_sqm,bedrooms,service_ar,service_en,is_bookable,status,sort_order,design_images(id,storage_path,alt_ar,alt_en,order_index)&status=eq.published&order=sort_order.asc`,
        { headers: reqHeaders },
      ),
    ]);

    if (!designsRes.ok) return null;

    const sitesData = sitesRes.ok ? await sitesRes.json() : [];
    const catsData = catsRes.ok ? await catsRes.json() : [];
    const designsData = await designsRes.json();

    const siteRow = sitesData[0] || null;
    const site: SiteSettings | null = siteRow
      ? {
          organizationId: siteRow.organization_id,
          displayNameAr: siteRow.display_name_ar ?? null,
          displayNameEn: siteRow.display_name_en ?? null,
          whatsappPhone: siteRow.whatsapp_phone ?? null,
          bookingTimezone: siteRow.booking_timezone ?? "Asia/Muscat",
          bookingWorkDays: Array.isArray(siteRow.booking_work_days)
            ? siteRow.booking_work_days.map(Number)
            : [0, 1, 2, 3, 4],
          bookingDayStart: (siteRow.booking_day_start ?? "09:00:00").slice(0, 5),
          bookingDayEnd: (siteRow.booking_day_end ?? "17:00:00").slice(0, 5),
          bookingSlotMinutes: Number(siteRow.booking_slot_minutes ?? 45),
          bookingMinNoticeHours: Number(siteRow.booking_min_notice_hours ?? 12),
          bookingDaysAhead: Number(siteRow.booking_days_ahead ?? 21),
        }
      : null;

    const categories: DynamicCategory[] = (catsData || []).map((row: any) => ({
      id: row.id,
      key: row.key,
      nameAr: row.name_ar,
      nameEn: row.name_en,
      sortOrder: row.sort_order ?? 0,
    }));

    const catKeyById = new Map<string, string>();
    for (const c of categories) {
      catKeyById.set(c.id, c.key);
    }

    const designs: DynamicDesign[] = (designsData || []).map((row: any) => {
      const rawImages: any[] = row.design_images ?? [];
      const images: DesignImage[] = rawImages
        .slice()
        .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0))
        .map((img) => ({
          id: img.id,
          storagePath: img.storage_path,
          url: designImageUrl(img.storage_path),
          altAr: img.alt_ar ?? null,
          altEn: img.alt_en ?? null,
          orderIndex: img.order_index ?? 0,
        }));

      const categoryKey = row.category_id ? catKeyById.get(row.category_id) || "villas" : "villas";
      const primaryImage = images[0]?.url || "/design-gallery/samples/bonyan/modern-villa-pool.webp";

      return {
        id: row.id,
        slug: row.slug,
        code: row.code,
        categoryKey,
        titleAr: row.title_ar,
        titleEn: row.title_en,
        summaryAr: row.summary_ar || "",
        summaryEn: row.summary_en || "",
        descriptionAr: row.description_ar || "",
        descriptionEn: row.description_en || "",
        floorsAr: row.floors_ar || "",
        floorsEn: row.floors_en || "",
        builtAreaSqm: row.built_area_sqm ? Number(row.built_area_sqm) : null,
        bedrooms: row.bedrooms ? Number(row.bedrooms) : null,
        serviceAr: row.service_ar || "",
        serviceEn: row.service_en || "",
        isBookable: Boolean(row.is_bookable),
        imageUrl: primaryImage,
        images,
        sortOrder: row.sort_order ?? 0,
      };
    });

    return { site, categories, designs };
  } catch (error) {
    console.error("fetchPublicGallery failed:", error);
    return null;
  }
}

export async function fetchPublicDesign(slug: string): Promise<DynamicDesign | null> {
  try {
    const base = SUPABASE_URL.replace(/\/+$/, "");
    const res = await fetch(
      `${base}/rest/v1/designs?select=id,category_id,slug,code,title_ar,title_en,summary_ar,summary_en,description_ar,description_en,floors_ar,floors_en,built_area_sqm,bedrooms,service_ar,service_en,is_bookable,status,sort_order,design_images(id,storage_path,alt_ar,alt_en,order_index)&slug=eq.${encodeURIComponent(slug)}&status=eq.published&limit=1`,
      { headers: reqHeaders },
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || !data.length) return null;
    const row = data[0];

    const rawImages: any[] = row.design_images ?? [];
    const images: DesignImage[] = rawImages
      .slice()
      .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0))
      .map((img) => ({
        id: img.id,
        storagePath: img.storage_path,
        url: designImageUrl(img.storage_path),
        altAr: img.alt_ar ?? null,
        altEn: img.alt_en ?? null,
        orderIndex: img.order_index ?? 0,
      }));

    return {
      id: row.id,
      slug: row.slug,
      code: row.code,
      categoryKey: "villas",
      titleAr: row.title_ar,
      titleEn: row.title_en,
      summaryAr: row.summary_ar || "",
      summaryEn: row.summary_en || "",
      descriptionAr: row.description_ar || "",
      descriptionEn: row.description_en || "",
      floorsAr: row.floors_ar || "",
      floorsEn: row.floors_en || "",
      builtAreaSqm: row.built_area_sqm ? Number(row.built_area_sqm) : null,
      bedrooms: row.bedrooms ? Number(row.bedrooms) : null,
      serviceAr: row.service_ar || "",
      serviceEn: row.service_en || "",
      isBookable: Boolean(row.is_bookable),
      imageUrl: images[0]?.url || "",
      images,
      sortOrder: row.sort_order ?? 0,
    };
  } catch (error) {
    console.error("fetchPublicDesign failed:", error);
    return null;
  }
}

export type MeetingBookingPayload = {
  requestKey?: string;
  clientName: string;
  whatsappPhone: string;
  email?: string;
  projectType: string;
  landStatus: string;
  wilayat?: string;
  landAreaSqm?: string;
  startTimeline: string;
  ideaText?: string;
  meetingMode: string;
  slotStart?: string | null;
  slotEnd?: string | null;
  designSlug?: string | null;
  designCode?: string | null;
  designTitleAr?: string | null;
  designTitleEn?: string | null;
  path: "same" | "modified" | "idea";
  locale: "ar" | "en";
};

export async function submitMeetingBooking(payload: MeetingBookingPayload): Promise<{
  ok: boolean;
  id?: string;
  error?: string;
}> {
  try {
    const base = SUPABASE_URL.replace(/\/+$/, "");

    // 1. Try Supabase RPC submit_design_meeting_booking
    const rpcRes = await fetch(`${base}/rest/v1/rpc/submit_design_meeting_booking`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload }),
    });

    if (rpcRes.ok) {
      const data = await rpcRes.json();
      if (data && typeof data === "object" && data.ok) {
        return { ok: true, id: data.id };
      }
      if (data?.error) {
        return { ok: false, error: data.error };
      }
    }

    // 2. Fallback: app endpoint if deployed
    const apiRes = await fetch("https://app.bonyanec.com/api/designs/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => null);

    if (apiRes && apiRes.ok) {
      const data = await apiRes.json();
      if (data && data.ok) {
        return { ok: true, id: data.data?.id };
      }
    }

    return { ok: false, error: "Booking submission failed" };
  } catch (error) {
    console.error("submitMeetingBooking exception:", error);
    return { ok: false, error: error instanceof Error ? error.message : "Network error" };
  }
}

