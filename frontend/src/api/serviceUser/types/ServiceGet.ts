import type { ServiceListSorting } from "./ServiceListSorting";
import type { PaginatedListOfServiceDto } from "./PaginatedListOfServiceDto";

 export type ServiceGetQueryParams = {
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
     * @description number of item in one page
     * @default 10
     * @type integer | undefined, int32
    */
    pageSize?: number;
    /**
     * @type integer | undefined
    */
    sorting?: ServiceListSorting;
};
export type ServiceGetHeaderParams = {
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
export type ServiceGet200 = PaginatedListOfServiceDto;
/**
 * @description Request successful.
*/
export type ServiceGetQueryResponse = PaginatedListOfServiceDto;
export type ServiceGetQuery = {
    Response: ServiceGetQueryResponse;
    QueryParams: ServiceGetQueryParams;
    HeaderParams: ServiceGetHeaderParams;
};