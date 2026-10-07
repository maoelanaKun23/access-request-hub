import type { AuditTrailHeaderResultDto } from "./AuditTrailHeaderResultDto";

 export type AuditTrailHeaderListGetAuditTraiHeaderResultListQueryParams = {
    /**
     * @default ""
     * @type string | undefined
    */
    ResultCode?: string;
};
export type AuditTrailHeaderListGetAuditTraiHeaderResultListHeaderParams = {
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
export type AuditTrailHeaderListGetAuditTraiHeaderResultList200 = AuditTrailHeaderResultDto[];
export type AuditTrailHeaderListGetAuditTraiHeaderResultListQueryResponse = AuditTrailHeaderResultDto[];
export type AuditTrailHeaderListGetAuditTraiHeaderResultListQuery = {
    Response: AuditTrailHeaderListGetAuditTraiHeaderResultListQueryResponse;
    QueryParams: AuditTrailHeaderListGetAuditTraiHeaderResultListQueryParams;
    HeaderParams: AuditTrailHeaderListGetAuditTraiHeaderResultListHeaderParams;
};