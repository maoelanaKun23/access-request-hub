import type { SocialLoginDto } from "./SocialLoginDto";

 export type AccountSocialLoginHeaderParams = {
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
export type AccountSocialLogin200 = Blob;
export type AccountSocialLoginMutationRequest = SocialLoginDto;
export type AccountSocialLoginMutationResponse = Blob;
export type AccountSocialLoginMutation = {
    Response: AccountSocialLoginMutationResponse;
    Request: AccountSocialLoginMutationRequest;
    HeaderParams: AccountSocialLoginHeaderParams;
};