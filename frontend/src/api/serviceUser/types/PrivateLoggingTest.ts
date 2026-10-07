export type PrivateLoggingTestQueryParams = {
    /**
     * @default 1
     * @type integer | undefined, int32
    */
    a?: number;
    /**
     * @default 0
     * @type integer | undefined, int32
    */
    b?: number;
};
export type PrivateLoggingTestHeaderParams = {
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
export type PrivateLoggingTest200 = string;
export type PrivateLoggingTestMutationResponse = string;
export type PrivateLoggingTestMutation = {
    Response: PrivateLoggingTestMutationResponse;
    QueryParams: PrivateLoggingTestQueryParams;
    HeaderParams: PrivateLoggingTestHeaderParams;
};