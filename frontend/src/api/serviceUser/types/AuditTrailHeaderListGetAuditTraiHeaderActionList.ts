import type { AuditTrailHeaderActionDto } from "./AuditTrailHeaderActionDto";

 export type AuditTrailHeaderListGetAuditTraiHeaderActionListQueryParams = {
    /**
     * @default ""
     * @type string | undefined
    */
    Action?: string;
};
export type AuditTrailHeaderListGetAuditTraiHeaderActionListHeaderParams = {
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
export type AuditTrailHeaderListGetAuditTraiHeaderActionList200 = AuditTrailHeaderActionDto[];
export type AuditTrailHeaderListGetAuditTraiHeaderActionListQueryResponse = AuditTrailHeaderActionDto[];
export type AuditTrailHeaderListGetAuditTraiHeaderActionListQuery = {
    Response: AuditTrailHeaderListGetAuditTraiHeaderActionListQueryResponse;
    QueryParams: AuditTrailHeaderListGetAuditTraiHeaderActionListQueryParams;
    HeaderParams: AuditTrailHeaderListGetAuditTraiHeaderActionListHeaderParams;
};