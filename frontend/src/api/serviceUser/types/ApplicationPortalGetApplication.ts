import type { ApplicationCategoryDto } from "./ApplicationCategoryDto";

 export type ApplicationPortalGetApplicationHeaderParams = {
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
export type ApplicationPortalGetApplication200 = ApplicationCategoryDto[];
export type ApplicationPortalGetApplication400 = string;
export type ApplicationPortalGetApplicationQueryResponse = ApplicationCategoryDto[];
export type ApplicationPortalGetApplicationQuery = {
    Response: ApplicationPortalGetApplicationQueryResponse;
    HeaderParams: ApplicationPortalGetApplicationHeaderParams;
    Errors: ApplicationPortalGetApplication400;
};