import type { ApplicationListSorting } from "./ApplicationListSorting";
import type { PaginatedListOfApplicationDto } from "./PaginatedListOfApplicationDto";

 export type ApplicationGetQueryParams = {
    /**
     * @description The keyword which filter the list.
     * @default ""
     * @type string | undefined
    */
    keyword?: string;
    /**
     * @description The page number to be opened (default to 1).
     * @default 1
     * @type integer | undefined, int32
    */
    page?: number;
    /**
     * @description The keyword which filter the list.
     * @default 10
     * @type integer | undefined, int32
    */
    pageSize?: number;
    /**
     * @type integer | undefined
    */
    sorting?: ApplicationListSorting;
};
export type ApplicationGetHeaderParams = {
    /**
     * @type string | undefined
    */
    Authorization?: string;
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
/**
 * @description Request successful.
*/
export type ApplicationGet200 = PaginatedListOfApplicationDto;
/**
 * @description Request successful.
*/
export type ApplicationGetQueryResponse = PaginatedListOfApplicationDto;
export type ApplicationGetQuery = {
    Response: ApplicationGetQueryResponse;
    QueryParams: ApplicationGetQueryParams;
    HeaderParams: ApplicationGetHeaderParams;
};