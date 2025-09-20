/**
 * DubstepMad API Wrapper
 *
 * A TypeScript-first wrapper around the DubstepMad API,
 * inspired by the FrenchNoodles wrapper, with a focus on
 * clean design, strong typing, and maintainability.
 */

import { fetchImage } from "./utils.ts";
import { EndpointBuilder } from "./builder.ts";
import { MemeOptions, ImageFilterOptions, ApiResponse } from "./types.ts";

/* ----------------------- Meme Functions ----------------------- */
export const lisastage = (text: string) => fetchImage("lisastage", { text });
export const drake = (text1: string, text2: string) => fetchImage("drake", { text1, text2 });
export const worthless = (text: string) => fetchImage("worthless", { text });
export const presidentialalert = (text: string) => fetchImage("presidentialalert", { text });
export const spongebobburnpaper = (text: string) => fetchImage("spongebobburnpaper", { text });
export const changemymind = (text: string) => fetchImage("changemymind", { text });
export const awkwardmonkey = (text: string) => fetchImage("awkwardmonkey", { text });
export const randommeme = () => fetchImage("randommeme");

/* --------------------- Image Filters --------------------- */
export const blur = ({ image, amount }: ImageFilterOptions) => fetchImage("blur", { image, amount });
export const invert = (image: string) => fetchImage("invert", { image });
export const edges = (image: string) => fetchImage("edges", { image });
export const circle = (image: string) => fetchImage("circle", { image });
export const wide = ({ image, factor }: ImageFilterOptions) => fetchImage("wide", { image, factor });
export const uglyupclose = (image: string) => fetchImage("uglyupclose", { image });
export const clown = (image: string) => fetchImage("clown", { image });
export const rip = (image: string) => fetchImage("rip", { image });
export const affectbaby = (image: string) => fetchImage("affectbaby", { image });
export const trash = (image: string) => fetchImage("trash", { image });
export const boostercard = (image: string) => fetchImage("boostercard", { image });

/* --------------------- Builder Functions --------------------- */
export const balancecard = () => new EndpointBuilder("balancecard");
export const welcomebanner = () => new EndpointBuilder("welcomebanner");