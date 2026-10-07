import type { TermAndConditionDetailDto } from "./TermAndConditionDetailDto";

 export type TermAndConditionGetTermAndConditionQueryParams = {
    /**
     * @type string | undefined
    */
    "client-id"?: string;
};
export type TermAndConditionGetTermAndConditionHeaderParams = {
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
export type TermAndConditionGetTermAndCondition200 = TermAndConditionDetailDto;
export type TermAndConditionGetTermAndConditionQueryResponse = TermAndConditionDetailDto;
export type TermAndConditionGetTermAndConditionQuery = {
    Response: TermAndConditionGetTermAndConditionQueryResponse;
    QueryParams: TermAndConditionGetTermAndConditionQueryParams;
    HeaderParams: TermAndConditionGetTermAndConditionHeaderParams;
};