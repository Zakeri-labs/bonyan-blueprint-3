export type DesignCategory = {
  key: string
  nameAr: string
  nameEn: string
}

export type Design = {
  slug: string
  code: string
  categoryKey: string
  titleAr: string
  titleEn: string
  summaryAr: string
  summaryEn: string
  descriptionAr: string
  descriptionEn: string
  floorsAr: string
  floorsEn: string
  builtAreaSqm: number | null
  bedrooms: number | null
  serviceAr: string
  serviceEn: string
  isBookable: boolean
  imageUrl: string
}

export const DESIGN_CATEGORIES: DesignCategory[] = [
  { key: "villas", nameAr: "فلل سكنية", nameEn: "Villas" },
  { key: "residential-complexes", nameAr: "مجمعات سكنية", nameEn: "Residential Complexes" },
  { key: "mixed-use", nameAr: "مشاريع متعددة الاستخدام", nameEn: "Mixed-Use" },
  { key: "educational", nameAr: "مبانٍ تعليمية وإدارية", nameEn: "Educational & Offices" },
  { key: "public-spaces", nameAr: "مساحات عامة وتخطيط", nameEn: "Public Spaces" },
]

export const DESIGNS: Design[] = [
  {
    slug: "modern-villa-pool",
    code: "BD-101",
    categoryKey: "villas",
    titleAr: "فيلا عصرية بمسبح",
    titleEn: "Modern villa with pool",
    summaryAr: "طابقان + سطح · مسبح",
    summaryEn: "Two floors + roof · Pool",
    descriptionAr: "واجهات بيضاء بلمسات خشبية ومسبح خارجي. يُعدَّل التصميم حسب أرضك وميزانيتك واشتراطات البلدية.",
    descriptionEn: "White facades with timber accents and an outdoor pool. The design is adapted to your plot, budget and municipality requirements.",
    floorsAr: "سطح + 2",
    floorsEn: "Roof + 2",
    builtAreaSqm: 520,
    bedrooms: 5,
    serviceAr: "تصميم + 3D",
    serviceEn: "Design + 3D",
    isBookable: true,
    imageUrl: "/design-gallery/samples/bonyan/modern-villa-pool.webp",
  },
  {
    slug: "simple-lines-villa",
    code: "BD-102",
    categoryKey: "villas",
    titleAr: "فيلا بخطوط بسيطة",
    titleEn: "Clean-lines villa",
    summaryAr: "طابقان · واجهة بيضاء",
    summaryEn: "Two floors · White facade",
    descriptionAr: "كتل بسيطة وواجهة هادئة بلمسات حجرية، مناسبة للأراضي المتوسطة.",
    descriptionEn: "Simple massing and a calm facade with stone accents, suited to mid-size plots.",
    floorsAr: "أرضي + أول",
    floorsEn: "Ground + first",
    builtAreaSqm: 380,
    bedrooms: 4,
    serviceAr: "تصميم + 3D",
    serviceEn: "Design + 3D",
    isBookable: true,
    imageUrl: "/design-gallery/samples/bonyan/simple-lines-villa.webp",
  },
  {
    slug: "stone-facade-villa",
    code: "BD-103",
    categoryKey: "villas",
    titleAr: "فيلا بواجهة حجرية",
    titleEn: "Stone-facade villa",
    summaryAr: "طابق واحد · إطلالة جبلية",
    summaryEn: "Single storey · Mountain view",
    descriptionAr: "واجهة حجرية بإضاءة دافئة وإطلالة مفتوحة على الجبل.",
    descriptionEn: "A stone facade with warm lighting and an open view of the mountains.",
    floorsAr: "أرضي",
    floorsEn: "Ground",
    builtAreaSqm: 450,
    bedrooms: 4,
    serviceAr: "تصميم + 3D",
    serviceEn: "Design + 3D",
    isBookable: true,
    imageUrl: "/design-gallery/samples/bonyan/stone-facade-villa.webp",
  },
  {
    slug: "attached-villas-complex",
    code: "BD-201",
    categoryKey: "residential-complexes",
    titleAr: "مجمع فلل متلاصقة",
    titleEn: "Attached villas complex",
    summaryAr: "وحدات متكررة · مواقف خاصة",
    summaryEn: "Repeated units · Private parking",
    descriptionAr: "فلل متلاصقة بواجهات منحنية ومشربيات، لكل وحدة موقف خاص وسطح.",
    descriptionEn: "Attached villas with curved facades and mashrabiya screens; every unit has private parking and a roof terrace.",
    floorsAr: "سطح + 2",
    floorsEn: "Roof + 2",
    builtAreaSqm: 310,
    bedrooms: 4,
    serviceAr: "تصميم + 3D",
    serviceEn: "Design + 3D",
    isBookable: true,
    imageUrl: "/design-gallery/samples/bonyan/attached-villas-complex.webp",
  },
  {
    slug: "mixed-use-complex",
    code: "BD-301",
    categoryKey: "mixed-use",
    titleAr: "مجمع متعدد الاستخدامات",
    titleEn: "Mixed-use complex",
    summaryAr: "سكني وتجاري · واجهة خضراء",
    summaryEn: "Residential and retail · Green facade",
    descriptionAr: "برج منحني بشرفات مزروعة، يجمع المحلات التجارية والوحدات السكنية.",
    descriptionEn: "A curved tower with planted balconies combining retail and residential units.",
    floorsAr: "9 طوابق",
    floorsEn: "9 floors",
    builtAreaSqm: 12000,
    bedrooms: null,
    serviceAr: "تصميم + 3D",
    serviceEn: "Design + 3D",
    isBookable: true,
    imageUrl: "/design-gallery/samples/bonyan/mixed-use-complex.webp",
  },
  {
    slug: "university-office-building",
    code: "BD-401",
    categoryKey: "educational",
    titleAr: "مبنى مكاتب جامعي",
    titleEn: "University office building",
    summaryAr: "مشروع مرجعي",
    summaryEn: "Reference project",
    descriptionAr: "مبنى إداري جامعي بواجهة مشربية وساحة مائية.",
    descriptionEn: "A university administration building with a mashrabiya facade and a water court.",
    floorsAr: "أرضي + 2",
    floorsEn: "Ground + 2",
    builtAreaSqm: 5000,
    bedrooms: null,
    serviceAr: "تصميم + 3D",
    serviceEn: "Design + 3D",
    isBookable: false,
    imageUrl: "/design-gallery/samples/bonyan/university-office-building.webp",
  },
  {
    slug: "al-murtafa-beach-sur",
    code: "BD-501",
    categoryKey: "public-spaces",
    titleAr: "تطوير شاطئ المرتفع، ولاية صور",
    titleEn: "Al Murtafa beach development, Sur",
    summaryAr: "مشروع حكومي مرجعي",
    summaryEn: "Government reference project",
    descriptionAr: "ممشى بحري ومسارات للدراجات ومرافق عامة على الواجهة البحرية.",
    descriptionEn: "A seafront promenade with cycling paths and public facilities.",
    floorsAr: "",
    floorsEn: "",
    builtAreaSqm: null,
    bedrooms: null,
    serviceAr: "تصميم + 3D",
    serviceEn: "Design + 3D",
    isBookable: false,
    imageUrl: "/design-gallery/samples/bonyan/al-murtafa-beach-sur.webp",
  },
  {
    slug: "saham-public-park",
    code: "BD-502",
    categoryKey: "public-spaces",
    titleAr: "حديقة صحم العامة",
    titleEn: "Saham public park",
    summaryAr: "مشروع حكومي مرجعي",
    summaryEn: "Government reference project",
    descriptionAr: "حديقة عامة بمسارات مشي وملاعب ومناطق ألعاب للأطفال.",
    descriptionEn: "A public park with walking paths, sports courts and children's play areas.",
    floorsAr: "",
    floorsEn: "",
    builtAreaSqm: null,
    bedrooms: null,
    serviceAr: "تصميم + 3D",
    serviceEn: "Design + 3D",
    isBookable: false,
    imageUrl: "/design-gallery/samples/bonyan/saham-public-park.webp",
  },
]
