import type { UserLogin2faDto } from "./UserLogin2faDto";

 export type AccountLogin2FaGetTokenHeaderParams = {
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
export type AccountLogin2FaGetToken200 = UserLogin2faDto;
export type AccountLogin2FaGetTokenMutationRequest = UserLogin2faDto;
export type AccountLogin2FaGetTokenMutationResponse = UserLogin2faDto;
export type AccountLogin2FaGetTokenMutation = {
    Response: AccountLogin2FaGetTokenMutationResponse;
    Request: AccountLogin2FaGetTokenMutationRequest;
    HeaderParams: AccountLogin2FaGetTokenHeaderParams;
};