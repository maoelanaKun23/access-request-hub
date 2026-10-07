import type { GeneralParamSorting } from "./GeneralParamSorting";
import type { PaginatedListOfGeneralParameterDto } from "./PaginatedListOfGeneralParameterDto";

 export type GeneralParameterGetQueryParams = {
    /**
     * @description The keyword which filter the list.
     * @default ""
     * @type string | undefined
    */
    keyword?: string;
    /**
     * @type integer | undefined
    */
    sorting?: GeneralParamSorting;
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
};
export type GeneralParameterGetHeaderParams = {
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
export type GeneralParameterGet200 = PaginatedListOfGeneralParameterDto;
/**
 * @description Request successful.
*/
export type GeneralParameterGetQueryResponse = PaginatedListOfGeneralParameterDto;
export type GeneralParameterGetQuery = {
    Response: GeneralParameterGetQueryResponse;
    QueryParams: GeneralParameterGetQueryParams;
    HeaderParams: GeneralParameterGetHeaderParams;
};