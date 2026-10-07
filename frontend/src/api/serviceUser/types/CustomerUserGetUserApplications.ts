import type { ApplicationCustomerViewDto } from "./ApplicationCustomerViewDto";

 export type CustomerUserGetUserApplicationsHeaderParams = {
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
export type CustomerUserGetUserApplications200 = ApplicationCustomerViewDto[];
/**
 * @description Request successful.
*/
export type CustomerUserGetUserApplicationsQueryResponse = ApplicationCustomerViewDto[];
export type CustomerUserGetUserApplicationsQuery = {
    Response: CustomerUserGetUserApplicationsQueryResponse;
    HeaderParams: CustomerUserGetUserApplicationsHeaderParams;
};