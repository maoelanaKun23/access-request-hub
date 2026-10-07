export type UserTestingLoginHeaderParams = {
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
export type UserTestingLogin200 = Blob;
export type UserTestingLoginQueryResponse = Blob;
export type UserTestingLoginQuery = {
    Response: UserTestingLoginQueryResponse;
    HeaderParams: UserTestingLoginHeaderParams;
};