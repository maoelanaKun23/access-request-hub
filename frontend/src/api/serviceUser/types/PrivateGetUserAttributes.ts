export type PrivateGetUserAttributesPathParams = {
    /**
     * @description Id of user.
     * @type string, guid
    */
    userId: string;
    /**
     * @description ClientId of Application.
     * @type string
    */
    clientId: string;
    /**
     * @type string
    */
    permissionName: string;
};
export type PrivateGetUserAttributesHeaderParams = {
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
export type PrivateGetUserAttributes200 = string[];
/**
 * @description Request successful.
*/
export type PrivateGetUserAttributesQueryResponse = string[];
export type PrivateGetUserAttributesQuery = {
    Response: PrivateGetUserAttributesQueryResponse;
    PathParams: PrivateGetUserAttributesPathParams;
    HeaderParams: PrivateGetUserAttributesHeaderParams;
};