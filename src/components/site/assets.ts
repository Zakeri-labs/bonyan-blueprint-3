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

/** Service card imagery, in the same order as the six services. */
export const SERVICE_IMAGES = [
  detailFacade,
  detailDrawings,
  aboutReview,
  projCompound,
  projSchool,
  projCommercial,
];

/** Portfolio imagery, in the same order as the five portfolio categories. */
export const PORTFOLIO_IMAGES = [
  heroVilla,
  projSchool,
  projMosque,
  projCompound,
  projCommercial,
];
