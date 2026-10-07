import type { UserNewLoginDto } from "./UserNewLoginDto";
import type { UserLoginDto } from "./UserLoginDto";

 export type AccountNewLoginHeaderParams = {
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
export type AccountNewLogin200 = UserNewLoginDto;
export type AccountNewLoginMutationRequest = UserLoginDto;
export type AccountNewLoginMutationResponse = UserNewLoginDto;
export type AccountNewLoginMutation = {
    Response: AccountNewLoginMutationResponse;
    Request: AccountNewLoginMutationRequest;
    HeaderParams: AccountNewLoginHeaderParams;
};