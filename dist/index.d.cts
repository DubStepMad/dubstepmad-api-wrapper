interface Track {
    id: number;
    title: string;
    artist: string;
    duration: number;
}
interface DJ {
    id: number;
    name: string;
    show: string;
}
declare class DubstepMadAPI {
    private baseUrl;
    constructor(baseUrl?: string);
    private get;
    getTracks(): Promise<Track[]>;
    getDjs(): Promise<DJ[]>;
}

export { type DJ, type Track, DubstepMadAPI as default };
