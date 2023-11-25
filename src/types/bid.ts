/**
 * A bid object that is passed from the prebid ad. This library actually only uses the `vastXml` and `ad` properties.
 * The rest is just set in tests (for whatever reason).
 */
export type Bid = Partial<{
    ad: string | null;
    adResponse: {
        ads: {
            video: {
                content: string | null
            } | null
        }[] | null
    } | null;
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
