export type AccountGetParentQueryParams = {
    /**
     * @type string | undefined, guid
    */
    childId?: string;
};
export type AccountGetParentHeaderParams = {
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
export type AccountGetParent200 = string;
export type AccountGetParentQueryResponse = string;
export type AccountGetParentQuery = {
    Response: AccountGetParentQueryResponse;
    QueryParams: AccountGetParentQueryParams;
    HeaderParams: AccountGetParentHeaderParams;
};