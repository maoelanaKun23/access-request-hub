import type { IHeaderDictionary } from "./IHeaderDictionary";

 export type UserAddUsersByFileHeaderParams = {
    /**
     * @type string | undefined
    */
    Authorization?: string;
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
export type UserAddUsersByFile200 = Blob;
export type UserAddUsersByFileMutationRequest = {
    /**
     * @type string | undefined
    */
    ContentType?: string;
    /**
     * @type string | undefined
    */
    ContentDisposition?: string;
    /**
     * @type object | undefined
    */
    Headers?: IHeaderDictionary;
    /**
     * @type integer | undefined, int64
    */
    Length?: number;
    /**
     * @type string | undefined
    */
    Name?: string;
    /**
     * @type string | undefined
    */
    FileName?: string;
    /**
     * @type string | undefined, guid
    */
    applicationId?: string;
};
export type UserAddUsersByFileMutationResponse = Blob;
export type UserAddUsersByFileMutation = {
    Response: UserAddUsersByFileMutationResponse;
    Request: UserAddUsersByFileMutationRequest;
    HeaderParams: UserAddUsersByFileHeaderParams;
};