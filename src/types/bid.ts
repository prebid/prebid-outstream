export type Bid = Partial<{
    ad: string | null;
    vastXml: string;
    id: string;
    impid: string;
    price: number;
    adm: string;
    adomain: string[];
    cid: string;
    crid: string;
    ext: {
        dspid: number;
        advid: number;
    };
}>;
