import type { CustomerDto } from "./CustomerDto";

 export type UserGetCustomerApplicationsQueryParams = {
    /**
     * @type string | undefined, guid
    */
    applicationId?: string;
};
export type UserGetCustomerApplicationsHeaderParams = {
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
export type UserGetCustomerApplications200 = CustomerDto[];
/**
 * @description Request successful.
*/
export type UserGetCustomerApplicationsQueryResponse = CustomerDto[];
export type UserGetCustomerApplicationsQuery = {
    Response: UserGetCustomerApplicationsQueryResponse;
    QueryParams: UserGetCustomerApplicationsQueryParams;
    HeaderParams: UserGetCustomerApplicationsHeaderParams;
};