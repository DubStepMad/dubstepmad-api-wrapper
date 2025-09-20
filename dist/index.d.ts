interface ImageFilterOptions {
    image: string;
    amount?: number;
    factor?: number;
}

declare class EndpointBuilder {
    private endpoint;
    private params;
    private baseUrl;
    constructor(endpoint: string, baseUrl?: string);
    setBackground(url: string): this;
    setAvatar(url: string): this;
    setTitle(title: string): this;
    setSubtitle(subtitle: string): this;
    setTextColor(color: string): this;
    setParam(key: string, value: string | number | boolean): this;
    build(): Promise<Buffer>;
}

/**
 * DubstepMad API Wrapper
 *
 * A TypeScript-first wrapper around the DubstepMad API,
 * inspired by the FrenchNoodles wrapper, with a focus on
 * clean design, strong typing, and maintainability.
 */

declare const lisastage: (text: string) => Promise<Buffer<ArrayBufferLike>>;
declare const drake: (text1: string, text2: string) => Promise<Buffer<ArrayBufferLike>>;
declare const worthless: (text: string) => Promise<Buffer<ArrayBufferLike>>;
declare const presidentialalert: (text: string) => Promise<Buffer<ArrayBufferLike>>;
declare const spongebobburnpaper: (text: string) => Promise<Buffer<ArrayBufferLike>>;
declare const changemymind: (text: string) => Promise<Buffer<ArrayBufferLike>>;
declare const awkwardmonkey: (text: string) => Promise<Buffer<ArrayBufferLike>>;
declare const randommeme: () => Promise<Buffer<ArrayBufferLike>>;
declare const blur: ({ image, amount }: ImageFilterOptions) => Promise<Buffer<ArrayBufferLike>>;
declare const invert: (image: string) => Promise<Buffer<ArrayBufferLike>>;
declare const edges: (image: string) => Promise<Buffer<ArrayBufferLike>>;
declare const circle: (image: string) => Promise<Buffer<ArrayBufferLike>>;
declare const wide: ({ image, factor }: ImageFilterOptions) => Promise<Buffer<ArrayBufferLike>>;
declare const uglyupclose: (image: string) => Promise<Buffer<ArrayBufferLike>>;
declare const clown: (image: string) => Promise<Buffer<ArrayBufferLike>>;
declare const rip: (image: string) => Promise<Buffer<ArrayBufferLike>>;
declare const affectbaby: (image: string) => Promise<Buffer<ArrayBufferLike>>;
declare const trash: (image: string) => Promise<Buffer<ArrayBufferLike>>;
declare const boostercard: (image: string) => Promise<Buffer<ArrayBufferLike>>;
declare const balancecard: () => EndpointBuilder;
declare const welcomebanner: () => EndpointBuilder;

export { affectbaby, awkwardmonkey, balancecard, blur, boostercard, changemymind, circle, clown, drake, edges, invert, lisastage, presidentialalert, randommeme, rip, spongebobburnpaper, trash, uglyupclose, welcomebanner, wide, worthless };
