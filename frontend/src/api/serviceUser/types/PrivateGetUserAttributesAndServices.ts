export type PrivateGetUserAttributesAndServicesPathParams = {
    /**
     * @type string, guid
    */
    userId: string;
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
export type PrivateGetUserAttributesAndServicesHeaderParams = {
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
export type PrivateGetUserAttributesAndServices200 = string[];
/**
 * @description Request successful.
*/
export type PrivateGetUserAttributesAndServicesQueryResponse = string[];
export type PrivateGetUserAttributesAndServicesQuery = {
    Response: PrivateGetUserAttributesAndServicesQueryResponse;
    PathParams: PrivateGetUserAttributesAndServicesPathParams;
    HeaderParams: PrivateGetUserAttributesAndServicesHeaderParams;
};