import type { PrivacyPolicyDetailDto } from "./PrivacyPolicyDetailDto";

 export type PrivacyPolicyCheckPrivacyPolicyQueryParams = {
    /**
     * @type string | undefined
    */
    "client-id"?: string;
};
export type PrivacyPolicyCheckPrivacyPolicyHeaderParams = {
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
export type PrivacyPolicyCheckPrivacyPolicy200 = PrivacyPolicyDetailDto;
export type PrivacyPolicyCheckPrivacyPolicyQueryResponse = PrivacyPolicyDetailDto;
export type PrivacyPolicyCheckPrivacyPolicyQuery = {
    Response: PrivacyPolicyCheckPrivacyPolicyQueryResponse;
    QueryParams: PrivacyPolicyCheckPrivacyPolicyQueryParams;
    HeaderParams: PrivacyPolicyCheckPrivacyPolicyHeaderParams;
};