export type UserGetAllBranchHeaderParams = {
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
export type UserGetAllBranch200 = Blob;
export type UserGetAllBranchQueryResponse = Blob;
export type UserGetAllBranchQuery = {
    Response: UserGetAllBranchQueryResponse;
    HeaderParams: UserGetAllBranchHeaderParams;
};