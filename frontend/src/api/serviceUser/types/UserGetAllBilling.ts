export type UserGetAllBillingQueryParams = {
    /**
     * @type string | undefined, guid
    */
    userId?: string;
};
export type UserGetAllBillingHeaderParams = {
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
export type UserGetAllBilling200 = Blob;
export type UserGetAllBillingQueryResponse = Blob;
export type UserGetAllBillingQuery = {
    Response: UserGetAllBillingQueryResponse;
    QueryParams: UserGetAllBillingQueryParams;
    HeaderParams: UserGetAllBillingHeaderParams;
};