import type { DataTableOfListOfCustomerDto } from "./DataTableOfListOfCustomerDto";

 export type CustomerGetAllQueryParams = {
    /**
     * @type string, guid
    */
    CustomerId?: string | null;
    /**
     * @type string | undefined
    */
    Filters?: string;
    /**
     * @type string | undefined
    */
    Sorts?: string;
    /**
     * @type integer, int32
    */
    PageNumber?: number | null;
    /**
     * @type integer, int32
    */
    PageSize?: number | null;
    /**
     * @type integer, int32
    */
    Size?: number | null;
};
export type CustomerGetAllHeaderParams = {
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
export type CustomerGetAll200 = DataTableOfListOfCustomerDto;
export type CustomerGetAllQueryResponse = DataTableOfListOfCustomerDto;
export type CustomerGetAllQuery = {
    Response: CustomerGetAllQueryResponse;
    QueryParams: CustomerGetAllQueryParams;
    HeaderParams: CustomerGetAllHeaderParams;
};