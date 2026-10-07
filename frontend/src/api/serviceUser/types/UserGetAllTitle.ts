export type UserGetAllTitleHeaderParams = {
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
export type UserGetAllTitle200 = Blob;
export type UserGetAllTitleQueryResponse = Blob;
export type UserGetAllTitleQuery = {
    Response: UserGetAllTitleQueryResponse;
    HeaderParams: UserGetAllTitleHeaderParams;
};