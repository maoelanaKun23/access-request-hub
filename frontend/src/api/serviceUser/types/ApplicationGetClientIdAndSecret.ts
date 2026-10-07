export type ApplicationGetClientIdAndSecretQueryParams = {
    /**
     * @default ""
     * @type string
    */
    url?: string | null;
};
export type ApplicationGetClientIdAndSecretHeaderParams = {
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
export type ApplicationGetClientIdAndSecret200 = Blob;
export type ApplicationGetClientIdAndSecretQueryResponse = Blob;
export type ApplicationGetClientIdAndSecretQuery = {
    Response: ApplicationGetClientIdAndSecretQueryResponse;
    QueryParams: ApplicationGetClientIdAndSecretQueryParams;
    HeaderParams: ApplicationGetClientIdAndSecretHeaderParams;
};