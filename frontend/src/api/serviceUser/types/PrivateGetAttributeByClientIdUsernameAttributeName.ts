export type PrivateGetAttributeByClientIdUsernameAttributeNamePathParams = {
    /**
     * @type string
    */
    username: string;
    /**
     * @type string
    */
    clientid: string;
    /**
     * @type string
    */
    rolecode: string;
    /**
     * @type string
    */
    attributename: string;
};
export type PrivateGetAttributeByClientIdUsernameAttributeNameHeaderParams = {
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
export type PrivateGetAttributeByClientIdUsernameAttributeName200 = string;
export type PrivateGetAttributeByClientIdUsernameAttributeNameQueryResponse = string;
export type PrivateGetAttributeByClientIdUsernameAttributeNameQuery = {
    Response: PrivateGetAttributeByClientIdUsernameAttributeNameQueryResponse;
    PathParams: PrivateGetAttributeByClientIdUsernameAttributeNamePathParams;
    HeaderParams: PrivateGetAttributeByClientIdUsernameAttributeNameHeaderParams;
};