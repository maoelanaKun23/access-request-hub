export type PrivateGetAttributeByNameQueryParams = {
    /**
     * @type string | undefined
    */
    name?: string;
};
export type PrivateGetAttributeByNameHeaderParams = {
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
export type PrivateGetAttributeByName200 = string[];
export type PrivateGetAttributeByNameQueryResponse = string[];
export type PrivateGetAttributeByNameQuery = {
    Response: PrivateGetAttributeByNameQueryResponse;
    QueryParams: PrivateGetAttributeByNameQueryParams;
    HeaderParams: PrivateGetAttributeByNameHeaderParams;
};