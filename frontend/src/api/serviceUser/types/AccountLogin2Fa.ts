import type { UserInfoTokenDto } from "./UserInfoTokenDto";
import type { UserLogin2faDto } from "./UserLogin2faDto";

 export type AccountLogin2FaHeaderParams = {
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
export type AccountLogin2Fa200 = UserInfoTokenDto;
export type AccountLogin2FaMutationRequest = UserLogin2faDto;
export type AccountLogin2FaMutationResponse = UserInfoTokenDto;
export type AccountLogin2FaMutation = {
    Response: AccountLogin2FaMutationResponse;
    Request: AccountLogin2FaMutationRequest;
    HeaderParams: AccountLogin2FaHeaderParams;
};