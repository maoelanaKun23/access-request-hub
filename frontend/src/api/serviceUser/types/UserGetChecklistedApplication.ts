export type UserGetChecklistedApplicationHeaderParams = {
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
export type UserGetChecklistedApplication200 = Blob;
export type UserGetChecklistedApplicationMutationRequest = string[];
export type UserGetChecklistedApplicationMutationResponse = Blob;
export type UserGetChecklistedApplicationMutation = {
    Response: UserGetChecklistedApplicationMutationResponse;
    Request: UserGetChecklistedApplicationMutationRequest;
    HeaderParams: UserGetChecklistedApplicationHeaderParams;
};