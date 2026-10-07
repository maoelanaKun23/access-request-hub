import type { ChangePictureResponseDto } from "./ChangePictureResponseDto";
import type { IHeaderDictionary } from "./IHeaderDictionary";

 export type AccountChangePhotoHeaderParams = {
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
export type AccountChangePhoto200 = ChangePictureResponseDto;
export type AccountChangePhotoMutationRequest = {
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
     * @type string | undefined
    */
    clientId?: string;
    /**
     * @type string | undefined, guid
    */
    userId?: string;
};
export type AccountChangePhotoMutationResponse = ChangePictureResponseDto;
export type AccountChangePhotoMutation = {
    Response: AccountChangePhotoMutationResponse;
    Request: AccountChangePhotoMutationRequest;
    HeaderParams: AccountChangePhotoHeaderParams;
};