export type PrivateAuthorizePathParams = {
    /**
     * @description Id of user.
     * @type string, guid
    */
    id: string;
    /**
     * @description Id of client.
     * @type string
    */
    clientId: string;
    /**
     * @description Name of permission.
     * @type string
    */
    permissionName: string;
};
export type PrivateAuthorizeHeaderParams = {
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
export type PrivateAuthorize200 = Blob;
export type PrivateAuthorizeQueryResponse = Blob;
export type PrivateAuthorizeQuery = {
    Response: PrivateAuthorizeQueryResponse;
    PathParams: PrivateAuthorizePathParams;
    HeaderParams: PrivateAuthorizeHeaderParams;
};