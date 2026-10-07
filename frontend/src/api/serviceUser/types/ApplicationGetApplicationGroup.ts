import type { ApplicationGroupSorting } from "./ApplicationGroupSorting";
import type { ApplicationGroupDto } from "./ApplicationGroupDto";

 export type ApplicationGetApplicationGroupQueryParams = {
    /**
     * @type string | undefined, guid
    */
    applicationId?: string;
    /**
     * @type integer | undefined
    */
    sorting?: ApplicationGroupSorting;
};
export type ApplicationGetApplicationGroupHeaderParams = {
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
export type ApplicationGetApplicationGroup200 = ApplicationGroupDto[];
export type ApplicationGetApplicationGroupQueryResponse = ApplicationGroupDto[];
export type ApplicationGetApplicationGroupQuery = {
    Response: ApplicationGetApplicationGroupQueryResponse;
    QueryParams: ApplicationGetApplicationGroupQueryParams;
    HeaderParams: ApplicationGetApplicationGroupHeaderParams;
};