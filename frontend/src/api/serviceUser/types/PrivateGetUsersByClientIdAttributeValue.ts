export type PrivateGetUsersByClientIdAttributeValuePathParams = {
    /**
     * @type string
    */
    clientid: string;
    /**
     * @type string
    */
    attributename: string;
    /**
     * @type string
    */
    attributevalue: string;
};
export type PrivateGetUsersByClientIdAttributeValueHeaderParams = {
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
export type PrivateGetUsersByClientIdAttributeValue200 = string;
export type PrivateGetUsersByClientIdAttributeValueQueryResponse = string;
export type PrivateGetUsersByClientIdAttributeValueQuery = {
    Response: PrivateGetUsersByClientIdAttributeValueQueryResponse;
    PathParams: PrivateGetUsersByClientIdAttributeValuePathParams;
    HeaderParams: PrivateGetUsersByClientIdAttributeValueHeaderParams;
};