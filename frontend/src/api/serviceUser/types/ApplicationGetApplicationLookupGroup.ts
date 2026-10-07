import type { ApplicationGroupLookupDto } from "./ApplicationGroupLookupDto";

 export type ApplicationGetApplicationLookupGroupQueryParams = {
    /**
     * @type string | undefined, guid
    */
    applicationId?: string;
    /**
     * @type string
    */
    keyword?: string | null;
};
export type ApplicationGetApplicationLookupGroupHeaderParams = {
    /**
     * @description Client ID
     * @type string | undefined
    */
    "client-id"?: string;
    /**
     * @description Client Secret
     * @type string | undefined
    */
    "client-secret"?: string;
};
export type ApplicationGetApplicationLookupGroup200 = ApplicationGroupLookupDto[];
export type ApplicationGetApplicationLookupGroupQueryResponse = ApplicationGroupLookupDto[];
export type ApplicationGetApplicationLookupGroupQuery = {
    Response: ApplicationGetApplicationLookupGroupQueryResponse;
    QueryParams: ApplicationGetApplicationLookupGroupQueryParams;
    HeaderParams: ApplicationGetApplicationLookupGroupHeaderParams;
};