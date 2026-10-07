export type AccountLoginAuthenticatedPathParams = {
    /**
     * @type string
    */
    id: string;
};
export type AccountLoginAuthenticatedHeaderParams = {
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
export type AccountLoginAuthenticated200 = Blob;
export type AccountLoginAuthenticatedQueryResponse = Blob;
export type AccountLoginAuthenticatedQuery = {
    Response: AccountLoginAuthenticatedQueryResponse;
    PathParams: AccountLoginAuthenticatedPathParams;
    HeaderParams: AccountLoginAuthenticatedHeaderParams;
};