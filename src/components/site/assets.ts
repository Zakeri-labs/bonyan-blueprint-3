import heroVilla from "@/assets/hero-villa.jpg";
import aboutReview from "@/assets/about-review.jpg";
import projMosque from "@/assets/proj-mosque.jpg";
import projSchool from "@/assets/proj-school.jpg";
import projCompound from "@/assets/proj-compound.jpg";
import projCommercial from "@/assets/proj-commercial.jpg";
import detailDrawings from "@/assets/detail-drawings.jpg";
import detailFacade from "@/assets/detail-facade.jpg";
import managingDirector from "@/assets/managing-director.jpg";

import client1 from "@/assets/client-1.png";
import client2 from "@/assets/client-2.png";
import client3 from "@/assets/client-3.png";
import client4 from "@/assets/client-4.png";
import client5 from "@/assets/client-5.png";
import client6 from "@/assets/client-6.png";

/** Replace any image here to swap it everywhere it is used. */
export const IMAGES = {
  hero: heroVilla,
  about: aboutReview,
  mosque: projMosque,
  school: projSchool,
  compound: projCompound,
  commercial: projCommercial,
  drawings: detailDrawings,
  facade: detailFacade,
  villa: heroVilla,
  managingDirector,
};

export const CLIENT_AVATARS = [client1, client2, client3, client4, client5, client6];

/** Service card imagery, in the same order as the services in `en.ts`. */
export const SERVICE_IMAGES = [
  detailDrawings, // design
  detailFacade, // mep
  aboutReview, // supervision
  heroVilla, // construction
  projCompound, // management
  projCommercial, // quantity
  projSchool, // planning
];

/** Portfolio imagery, in the same order as the five portfolio categories. */
export const PORTFOLIO_IMAGES = [heroVilla, projSchool, projMosque, projCompound, projCommercial];

/**
 * Leadership portraits, in the same order as `team.members` in the dictionaries.
 * Files live in `/public/team/`; an empty string falls back to a placeholder.
 */
export const TEAM_PHOTOS = [
  "/team/yaser-al-aufi.jpg", // Yasir Salim Hamed Al Aufi — Founder & CEO
  "/team/agha-shahid.jpg", // Agha Shahid — Technical Manager
  "/team/atheesh-nadesan.jpg", // Atheesh Nadesan — General Manager
  "/team/ajil-kunnar-mathias.jpg", // Ajil Kunnar Mathias — Construction Manager
];

/**
 * Org-chart portraits, keyed by the person `id` in `team.org` (dictionaries).
 * Files live in `/public/team/`; a missing key falls back to a placeholder icon.
 * Add entries as portraits are provided.
 */
export const ORG_PHOTOS: Record<string, string> = {
  yasir: "/team/yaser-al-aufi.jpg", // Yasir Salim Hamed Al Aufi
  ajil: "/team/ajil-kunnar-mathias.jpg", // Ajil Kunnar Mathias
  athesh: "/team/atheesh-nadesan.jpg", // Athesh Nadesan
  agha: "/team/agha-shahid.jpg", // Agha Shahid Yazdeb
  ibrahim: "/team/mohammad-ibrahim-mirkar.jpg", // Mohammad Ibrahim Mirkar
  puvanesh: "/team/puvanesh-ravi.jpg", // Puvanesh Ravi
  siva: "/team/siva-murukesan.jpg", // Siva Murukesan
  ahsan: "/team/ahsan-ali.jpg", // Ahsan Ali
  jefrin: "/team/jefrin-monish.jpg", // Jefrin Monish
};
