import type { PaginatedListOfUserApplicationDeviceDto } from "./PaginatedListOfUserApplicationDeviceDto";

 export type UserDeviceGetQueryParams = {
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
};
export type UserDeviceGetHeaderParams = {
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
export type UserDeviceGet200 = PaginatedListOfUserApplicationDeviceDto;
/**
 * @description Request successful.
*/
export type UserDeviceGetQueryResponse = PaginatedListOfUserApplicationDeviceDto;
export type UserDeviceGetQuery = {
    Response: UserDeviceGetQueryResponse;
    QueryParams: UserDeviceGetQueryParams;
    HeaderParams: UserDeviceGetHeaderParams;
};