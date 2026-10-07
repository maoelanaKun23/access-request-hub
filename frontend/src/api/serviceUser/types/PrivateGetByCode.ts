import type { GeneralParameterDto } from "./GeneralParameterDto";

 export type PrivateGetByCodePathParams = {
    /**
     * @description Code of general parameter object.
     * @type string
    */
    generalParameterCode: string;
};
export type PrivateGetByCodeHeaderParams = {
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
export type PrivateGetByCode200 = GeneralParameterDto;
/**
 * @description Request successful.
*/
export type PrivateGetByCodeQueryResponse = GeneralParameterDto;
export type PrivateGetByCodeQuery = {
    Response: PrivateGetByCodeQueryResponse;
    PathParams: PrivateGetByCodePathParams;
    HeaderParams: PrivateGetByCodeHeaderParams;
};