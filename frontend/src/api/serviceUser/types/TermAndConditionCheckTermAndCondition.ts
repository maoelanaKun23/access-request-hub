import type { TermAndConditionDetailDto } from "./TermAndConditionDetailDto";

 export type TermAndConditionCheckTermAndConditionHeaderParams = {
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
export type TermAndConditionCheckTermAndCondition200 = TermAndConditionDetailDto;
/**
 * @description Request successful.
*/
export type TermAndConditionCheckTermAndConditionQueryResponse = TermAndConditionDetailDto;
export type TermAndConditionCheckTermAndConditionQuery = {
    Response: TermAndConditionCheckTermAndConditionQueryResponse;
    HeaderParams: TermAndConditionCheckTermAndConditionHeaderParams;
};