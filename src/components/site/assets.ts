import heroVilla from "@/assets/hero-villa.jpg";
import aboutReview from "@/assets/about-review.jpg";
import projMosque from "@/assets/proj-mosque.jpg";
import projSchool from "@/assets/proj-school.jpg";
import projCompound from "@/assets/proj-compound.jpg";
import projCommercial from "@/assets/proj-commercial.jpg";
import detailDrawings from "@/assets/detail-drawings.jpg";
import detailFacade from "@/assets/detail-facade.jpg";

import teamYaserAlAufi from "@/assets/Team picture/Yasir Salim Hamed Al Aufi.png";
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
import buildingConstruction04 from "@/assets/Picture of Projects/Building_Construction_04.png";
import buildingConstruction05 from "@/assets/Picture of Projects/Building_Construction_05.png";
import buildingConstruction06 from "@/assets/Picture of Projects/Building_Construction_06.png";
import constructionSupervision01 from "@/assets/Picture of Projects/Construction_Supervision_01.png";
import constructionSupervision02 from "@/assets/Picture of Projects/Construction_Supervision_02.png";
import constructionSupervision03 from "@/assets/Picture of Projects/Construction_Supervision_03.png";
import constructionServices from "@/assets/Picture of Projects/Construction_services.png";
import architectural1 from "@/assets/Picture of Projects/Architectural-1.png";
import architectural2 from "@/assets/Picture of Projects/Architectural-2.png";
import architectural3 from "@/assets/Picture of Projects/Architectural-3.png";
import supervisionVilla from "@/assets/Picture of Projects/portfolio/supervision-villa.jpg";
import supervisionVillaDetail01 from "@/assets/Picture of Projects/portfolio/supervision-villa-detail-01.png";
import supervisionVillaDetail02 from "@/assets/Picture of Projects/portfolio/supervision-villa-detail-02.png";
import managementCompound from "@/assets/Picture of Projects/portfolio/management-compound.jpg";
import managementCommercial from "@/assets/Picture of Projects/portfolio/management-commercial.jpg";
import managementCampus from "@/assets/Picture of Projects/portfolio/management-campus.jpg";
import mepCommercial from "@/assets/Picture of Projects/portfolio/mep-commercial.jpg";
import mepInstitutional from "@/assets/Picture of Projects/portfolio/mep-institutional.jpg";
import mepCompound from "@/assets/Picture of Projects/portfolio/mep-compound.jpg";
import quantityCommercial from "@/assets/Picture of Projects/portfolio/quantity-commercial.jpg";
import quantityCompound from "@/assets/Picture of Projects/portfolio/quantity-compound.jpg";
import quantityVillas from "@/assets/Picture of Projects/portfolio/quantity-villas.jpg";
import planningPark from "@/assets/Picture of Projects/portfolio/planning-park.jpg";
import planningLand from "@/assets/Picture of Projects/portfolio/planning-land.jpg";
import planningRealm from "@/assets/Picture of Projects/portfolio/planning-realm.jpg";
import mainConstruction from "@/assets/Picture of Projects/portfolio/main-construction.jpg";
import mainDesign from "@/assets/Picture of Projects/portfolio/main-design.jpg";
import mainManagement from "@/assets/Picture of Projects/portfolio/main-management.jpg";
import mainMep from "@/assets/Picture of Projects/portfolio/main-mep.jpg";
import mainQuantity from "@/assets/Picture of Projects/portfolio/main-quantity.jpg";
import mainPlanning from "@/assets/Picture of Projects/portfolio/main-planning.jpg";

import client1 from "@/assets/client-1.png";
import client2 from "@/assets/client-2.png";
import client3 from "@/assets/client-3.png";
import client4 from "@/assets/client-4.png";
import client5 from "@/assets/client-5.png";
import client6 from "@/assets/client-6.png";
import clientLogo01 from "@/assets/clients/client-01-supreme-judiciary-council.png";
import clientLogo02 from "@/assets/clients/client-02-ministry-of-labor.png";
import clientLogo03 from "@/assets/clients/client-03-telecommunications-regulatory-authority.png";
import clientLogo04 from "@/assets/clients/client-04-ministry-of-heritage-tourism.png";
import clientLogo05 from "@/assets/clients/client-05-ministry-housing-urban-planning.png";
import clientLogo06 from "@/assets/clients/client-06-ministry-agriculture-fisheries-water-resources.png";
import clientLogo07 from "@/assets/clients/client-07-asharqiyah-south-governorate.png";
import clientLogo08 from "@/assets/clients/client-08-ministry-transport-communications-information-technology.png";

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

/** Client marks used in the Portfolio-page scrolling logo strip. */
export const CLIENT_LOGOS = [
  { src: clientLogo01, alt: "Supreme Judiciary Council" },
  { src: clientLogo02, alt: "Ministry of Labour" },
  { src: clientLogo03, alt: "Telecommunications Regulatory Authority" },
  { src: clientLogo04, alt: "Ministry of Heritage and Tourism" },
  { src: clientLogo05, alt: "Ministry of Housing and Urban Planning" },
  { src: clientLogo06, alt: "Ministry of Agriculture, Fisheries and Water Resources" },
  { src: clientLogo07, alt: "A'Sharqiyah South Governorate" },
  { src: clientLogo08, alt: "Ministry of Transport, Communications and Information Technology" },
];

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
  top: constructionSupervision01,
  bottom: [constructionSupervision02, constructionSupervision03],
};

/**
 * Same layout as `SUPERVISION_CARD_GALLERY` (one image on top, two below), shown
 * inside the second "Representative projects" card of the Construction
 * Supervision section (01 / 07).
 */
export const SUPERVISION_CARD_GALLERY_2 = {
  top: buildingConstruction04,
  bottom: [buildingConstruction05, buildingConstruction06],
};

/** Additional contextual views for the Private Villa supervision project (01 / 07). */
export const SUPERVISION_CARD_GALLERY_3 = {
  top: supervisionVilla,
  bottom: [supervisionVillaDetail01, supervisionVillaDetail02],
};

/**
 * Photos for the Architectural & Structural Design "Representative projects"
 * cards on the Portfolio page (03 / 07), in the same order as
 * `portfolioPage.services` → `design` → `projects` in the dictionaries.
 */
export const ARCHITECTURAL_IMAGES = [architectural1, architectural2, architectural3];

/**
 * Project photography and project renderings for the remaining Portfolio cards.
 * The source material is drawn from the supplied company profiles: construction
 * projects for supervision, management, MEP and cost work; public-realm project
 * renderings for planning.
 */
export const PORTFOLIO_CARD_IMAGES: Partial<Record<string, Array<string | undefined>>> = {
  management: [managementCompound, managementCommercial, managementCampus],
  mep: [mepCommercial, mepInstitutional, mepCompound],
  quantity: [quantityCommercial, quantityCompound, quantityVillas],
  planning: [planningPark, planningLand, planningRealm],
};

/** Service card imagery, in the same order as the services in `en.ts`. */
export const SERVICE_IMAGES = [
  mainDesign, // design — residential project rendering from supplied profiles
  mainMep, // MEP — institutional project image from supplied profiles
  constructionServices, // supervision
  mainConstruction, // construction — completed villa from supplied profiles
  mainManagement, // management — built project from supplied profiles
  mainQuantity, // quantity — commercial project from supplied profiles
  mainPlanning, // planning — public-realm rendering from supplied brochure
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
