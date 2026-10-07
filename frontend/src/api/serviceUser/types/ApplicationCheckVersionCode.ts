export type ApplicationCheckVersionCodePathParams = {
    /**
     * @type string
    */
    versionCode: string;
};
export type ApplicationCheckVersionCodeHeaderParams = {
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
export type ApplicationCheckVersionCode200 = Blob;
/**
 * @description Request successful.
*/
export type ApplicationCheckVersionCodeQueryResponse = Blob;
export type ApplicationCheckVersionCodeQuery = {
    Response: ApplicationCheckVersionCodeQueryResponse;
    PathParams: ApplicationCheckVersionCodePathParams;
    HeaderParams: ApplicationCheckVersionCodeHeaderParams;
};