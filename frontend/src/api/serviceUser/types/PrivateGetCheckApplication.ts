export type PrivateGetCheckApplicationPathParams = {
    /**
     * @type string
    */
    clientId: string;
    /**
     * @type string
    */
    clientSecret: string;
};
export type PrivateGetCheckApplicationHeaderParams = {
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
export type PrivateGetCheckApplication200 = boolean;
export type PrivateGetCheckApplicationQueryResponse = boolean;
export type PrivateGetCheckApplicationQuery = {
    Response: PrivateGetCheckApplicationQueryResponse;
    PathParams: PrivateGetCheckApplicationPathParams;
    HeaderParams: PrivateGetCheckApplicationHeaderParams;
};