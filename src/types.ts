import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import type { SvgComponent } from "astro/types";

export type Page =
  | "home"
  | "offerings"
  | "compete"
  | "kids"
  | "membership"
  | "about"
  | "coaches";

export type PageConfig = {
  title: string;
};

export type FaqConfig = {
  title: string;
  Content: AstroComponentFactory | string;
};

export type PageTabConfig = {
  label: string;
  contentId: string;
};

export type PointsRowConfig = {
  Icon: SvgComponent;
  text: string;
}[];

export type CoachProfileConfig = {
  img: string;
  name: string;
  title: "head" | "coach";
  description: string[];
};
