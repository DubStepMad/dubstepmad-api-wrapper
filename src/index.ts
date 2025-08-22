/**
 * DubstepMad API Wrapper
 * 
 * A TypeScript-first wrapper around the DubstepMad API,
 * inspired by the FrenchNoodles wrapper, with a focus on 
 * clean design, strong typing, and maintainability.
 */

import { MemeOptions, ImageFilterOptions, ApiResponse } from "./types";
import { fetchImage } from "./utils";
import { EndpointBuilder } from "./builder";

export class DubstepMadAPI {
  private readonly baseUrl: string;

  constructor(baseUrl: string = "https://dubstepmad.com/api/endpoints") {
    this.baseUrl = baseUrl;
  }

  /* ----------------------- Meme Endpoints ----------------------- */

  lisastage(text: string): ApiResponse {
    return fetchImage("lisastage", { text }, this.baseUrl);
  }

  drake(text1: string, text2: string): ApiResponse {
    return fetchImage("drake", { text1, text2 }, this.baseUrl);
  }

  worthless(text: string): ApiResponse {
    return fetchImage("worthless", { text }, this.baseUrl);
  }

  presidentialalert(text: string): ApiResponse {
    return fetchImage("presidentialalert", { text }, this.baseUrl);
  }

  spongebobburnpaper(text: string): ApiResponse {
    return fetchImage("spongebobburnpaper", { text }, this.baseUrl);
  }

  changemymind(text: string): ApiResponse {
    return fetchImage("changemymind", { text }, this.baseUrl);
  }

  awkwardmonkey(text: string): ApiResponse {
    return fetchImage("awkwardmonkey", { text }, this.baseUrl);
  }

  randommeme(): ApiResponse {
    return fetchImage("randommeme", {}, this.baseUrl);
  }

  /* --------------------- Image Filters --------------------- */

  blur({ image, amount }: ImageFilterOptions): ApiResponse {
    return fetchImage("blur", { image, amount }, this.baseUrl);
  }

  invert(image: string): ApiResponse {
    return fetchImage("invert", { image }, this.baseUrl);
  }

  edges(image: string): ApiResponse {
    return fetchImage("edges", { image }, this.baseUrl);
  }

  circle(image: string): ApiResponse {
    return fetchImage("circle", { image }, this.baseUrl);
  }

  wide({ image, factor }: ImageFilterOptions): ApiResponse {
    return fetchImage("wide", { image, factor }, this.baseUrl);
  }

  uglyupclose(image: string): ApiResponse {
    return fetchImage("uglyupclose", { image }, this.baseUrl);
  }

  clown(image: string): ApiResponse {
    return fetchImage("clown", { image }, this.baseUrl);
  }

  rip(image: string): ApiResponse {
    return fetchImage("rip", { image }, this.baseUrl);
  }

  affectbaby(image: string): ApiResponse {
    return fetchImage("affectbaby", { image }, this.baseUrl);
  }

  trash(image: string): ApiResponse {
    return fetchImage("trash", { image }, this.baseUrl);
  }

  boostercard(image: string): ApiResponse {
    return fetchImage("boostercard", { image }, this.baseUrl);
  }

  /* --------------------- Builder Endpoints --------------------- */

  balancecard(): EndpointBuilder {
    return new EndpointBuilder("balancecard", this.baseUrl);
  }

  welcomebanner(): EndpointBuilder {
    return new EndpointBuilder("welcomebanner", this.baseUrl);
  }
}

export default DubstepMadAPI;
