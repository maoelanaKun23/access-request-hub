import type { UserInfoTokenDto } from "./UserInfoTokenDto";
import type { UserLoginDto } from "./UserLoginDto";

 export type AccountLoginParseHeaderParams = {
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
export type AccountLoginParse200 = UserInfoTokenDto;
export type AccountLoginParseMutationRequest = UserLoginDto;
export type AccountLoginParseMutationResponse = UserInfoTokenDto;
export type AccountLoginParseMutation = {
    Response: AccountLoginParseMutationResponse;
    Request: AccountLoginParseMutationRequest;
    HeaderParams: AccountLoginParseHeaderParams;
};