import type { GeneralParameterDto } from "./GeneralParameterDto";

 export type PrivateGetByCodesQueryParams = {
    /**
     * @type array | undefined
    */
    code?: string[];
    /**
     * @type boolean
    */
    cache?: boolean | null;
};
export type PrivateGetByCodesHeaderParams = {
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
export type PrivateGetByCodes200 = GeneralParameterDto[];
export type PrivateGetByCodes400 = string;
export type PrivateGetByCodesQueryResponse = GeneralParameterDto[];
export type PrivateGetByCodesQuery = {
    Response: PrivateGetByCodesQueryResponse;
    QueryParams: PrivateGetByCodesQueryParams;
    HeaderParams: PrivateGetByCodesHeaderParams;
    Errors: PrivateGetByCodes400;
};