import type { GeneralParameterDto } from "./GeneralParameterDto";

 export type GeneralParameterGetFileSizeHeaderParams = {
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
export type GeneralParameterGetFileSize200 = GeneralParameterDto;
export type GeneralParameterGetFileSizeQueryResponse = GeneralParameterDto;
export type GeneralParameterGetFileSizeQuery = {
    Response: GeneralParameterGetFileSizeQueryResponse;
    HeaderParams: GeneralParameterGetFileSizeHeaderParams;
};