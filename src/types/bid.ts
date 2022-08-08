export type Bid = Partial<{
    ad: string | null;
    vastXml: string;

    /**
     * If no vastXml is provided this is used as a fallback to fetch the vast tag
     */
    vastUrl: string;
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
