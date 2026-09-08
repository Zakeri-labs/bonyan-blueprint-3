import heroVilla from "@/assets/hero-villa.jpg";
import aboutReview from "@/assets/about-review.jpg";
import projMosque from "@/assets/proj-mosque.jpg";
import projSchool from "@/assets/proj-school.jpg";
import projCompound from "@/assets/proj-compound.jpg";
import projCommercial from "@/assets/proj-commercial.jpg";
import detailDrawings from "@/assets/detail-drawings.jpg";
import detailFacade from "@/assets/detail-facade.jpg";

import teamYaserAlAufi from "@/assets/Team picture/Yaser Salim Hamed Al Aufi.png";
import teamAjilKunnarMathias from "@/assets/Team picture/Ajil Kunnar Mathias.png";
import teamAtheeshNadesan from "@/assets/Team picture/Atheesh Nadesan.png";
import teamAghaShahid from "@/assets/Team picture/Agha Shahid.png";
import teamAhsanAli from "@/assets/Team picture/Ahsan Ali.png";
import teamJefrinMonish from "@/assets/Team picture/Jefrin Monish.png";
import teamPuvaneshRavi from "@/assets/Team picture/Puvanesh Ravi.png";
import teamRajeshAsirvatham from "@/assets/Team picture/Rajesh Asirvatham.png";
import teamMohammedIbrahimMirkar from "@/assets/Team picture/Mohammed Ibrahim Mirkar.png";
import teamSivaMurukesan from "@/assets/Team picture/Siva Murukesn.png";

import buildingConstruction01 from "@/assets/Picture of Projects/Building_Construction_01.png";
import buildingConstruction02 from "@/assets/Picture of Projects/Building_Construction_02.png";
import buildingConstruction03 from "@/assets/Picture of Projects/Building_Construction_03.png";
import constructionSupervision02 from "@/assets/Picture of Projects/Construction_Supervision_02.png";
import constructionSupervision03 from "@/assets/Picture of Projects/Construction_Supervision_03.png";
import constructionSupervision04 from "@/assets/Picture of Projects/Construction_Supervision_04.png";
import architectural1 from "@/assets/Picture of Projects/Architectural-1.png";
import architectural2 from "@/assets/Picture of Projects/Architectural-2.png";
import architectural3 from "@/assets/Picture of Projects/Architectural-3.png";

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
  managingDirector: teamYaserAlAufi,
};

export const CLIENT_AVATARS = [client1, client2, client3, client4, client5, client6];

/**
 * Photos for the Building Construction "Representative projects" cards on the
 * Portfolio page, in the same order as `portfolioPage.services` → `construction`
 * → `projects` in the dictionaries.
 */
export const BUILDING_CONSTRUCTION_IMAGES = [
  buildingConstruction01, // Admiral Oil & Gas Tools — fabrication factory
  buildingConstruction02, // Falcon Oil Field Service — office building
  buildingConstruction03, // Al Ufi — twin villa, Sumail
];

/**
 * Small photo set shown inside the first "Representative projects" card of the
 * Construction Supervision section (01 / 07): one image on top, two below.
 */
export const SUPERVISION_CARD_GALLERY = {
  top: constructionSupervision04,
  bottom: [constructionSupervision02, constructionSupervision03],
};

/**
 * Photos for the Architectural & Structural Design "Representative projects"
 * cards on the Portfolio page (03 / 07), in the same order as
 * `portfolioPage.services` → `design` → `projects` in the dictionaries.
 */
export const ARCHITECTURAL_IMAGES = [architectural1, architectural2, architectural3];

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
 * Sourced from `@/assets/Team picture/`; an empty string falls back to a placeholder.
 */
export const TEAM_PHOTOS = [
  teamYaserAlAufi, // Yasir Salim Hamed Al Aufi — Founder & CEO
  teamAghaShahid, // Agha Shahid — Technical Manager
  teamAtheeshNadesan, // Atheesh Nadesan — General Manager
  teamAjilKunnarMathias, // Ajil Kunnar Mathias — Construction Manager
];

/**
 * Org-chart portraits, keyed by the person `id` in `team.org` (dictionaries).
 * Sourced from `@/assets/Team picture/` (`.png`); a missing key falls back to a
 * placeholder icon. Add entries as portraits are provided.
 */
export const ORG_PHOTOS: Record<string, string> = {
  yasir: teamYaserAlAufi, // Yasir Salim Hamed Al Aufi
  ajil: teamAjilKunnarMathias, // Ajil Kunnar Mathias
  athesh: teamAtheeshNadesan, // Athesh Nadesan
  agha: teamAghaShahid, // Agha Shahid Yazdeb
  ahsan: teamAhsanAli, // Ahsan Ali
  jefrin: teamJefrinMonish, // Jefrin Monish
  puvanesh: teamPuvaneshRavi, // Puvanesh Ravi
  rajesh: teamRajeshAsirvatham, // Rajesh Asirvatham
  ibrahim: teamMohammedIbrahimMirkar, // Mohammad Ibrahim Mirkar
  siva: teamSivaMurukesan, // Siva Murukesan
};
