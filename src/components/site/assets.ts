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
  "/team/yaser-al-aufi.jpg", // Yaser Salim Hamed Al Aufi — Founder & CEO
  "/team/agha-shahid.jpg", // Agha Shahid — Technical Manager
  "/team/atheesh-nadesan.jpg", // Atheesh Nadesan — General Manager
  "/team/mohammadreza-zakeri.jpg", // Mohammadreza Zakeri — IT Manager
];
