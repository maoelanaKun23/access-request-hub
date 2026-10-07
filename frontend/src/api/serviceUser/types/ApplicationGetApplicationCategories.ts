import type { ApplicationCategory } from "./ApplicationCategory";

 export type ApplicationGetApplicationCategoriesQueryParams = {
    /**
     * @type boolean
    */
    Status?: boolean | null;
};
export type ApplicationGetApplicationCategoriesHeaderParams = {
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
export type ApplicationGetApplicationCategories200 = ApplicationCategory[];
export type ApplicationGetApplicationCategoriesQueryResponse = ApplicationCategory[];
export type ApplicationGetApplicationCategoriesQuery = {
    Response: ApplicationGetApplicationCategoriesQueryResponse;
    QueryParams: ApplicationGetApplicationCategoriesQueryParams;
    HeaderParams: ApplicationGetApplicationCategoriesHeaderParams;
};