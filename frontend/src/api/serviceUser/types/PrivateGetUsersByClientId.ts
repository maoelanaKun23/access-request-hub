export type PrivateGetUsersByClientIdPathParams = {
    /**
     * @type string
    */
    clientid: string;
};
export type PrivateGetUsersByClientIdHeaderParams = {
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
export type PrivateGetUsersByClientId200 = string;
export type PrivateGetUsersByClientIdQueryResponse = string;
export type PrivateGetUsersByClientIdQuery = {
    Response: PrivateGetUsersByClientIdQueryResponse;
    PathParams: PrivateGetUsersByClientIdPathParams;
    HeaderParams: PrivateGetUsersByClientIdHeaderParams;
};