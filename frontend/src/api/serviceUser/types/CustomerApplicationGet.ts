import type { CustomerApplicationSorting } from "./CustomerApplicationSorting";
import type { PaginatedListOfCustomerApplicationDto } from "./PaginatedListOfCustomerApplicationDto";

 export type CustomerApplicationGetQueryParams = {
    /**
     * @description Id of application which filter the list by application.
     * @type string | undefined, guid
    */
    applicationId?: string;
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
     * @description number of item on a page
     * @default 10
     * @type integer | undefined, int32
    */
    pageSize?: number;
    /**
     * @type integer | undefined
    */
    sorting?: CustomerApplicationSorting;
};
export type CustomerApplicationGetHeaderParams = {
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
export type CustomerApplicationGet200 = PaginatedListOfCustomerApplicationDto;
/**
 * @description Request successful.
*/
export type CustomerApplicationGetQueryResponse = PaginatedListOfCustomerApplicationDto;
export type CustomerApplicationGetQuery = {
    Response: CustomerApplicationGetQueryResponse;
    QueryParams: CustomerApplicationGetQueryParams;
    HeaderParams: CustomerApplicationGetHeaderParams;
};