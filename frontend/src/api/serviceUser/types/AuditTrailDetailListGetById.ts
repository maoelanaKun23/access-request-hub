import type { ApplicationDto } from "./ApplicationDto";

 export type AuditTrailDetailListGetByIdPathParams = {
    /**
     * @type string, guid
    */
    audittrailheaderid: string | null;
};
export type AuditTrailDetailListGetByIdQueryParams = {
    /**
     * @default ""
     * @type string | undefined
    */
    Field?: string;
    /**
     * @default ""
     * @type string | undefined
    */
    OldData?: string;
    /**
     * @default ""
     * @type string | undefined
    */
    NewData?: string;
    /**
     * @default 10
     * @type integer | undefined, int32
    */
    pageSize?: number;
    /**
     * @default 1
     * @type integer | undefined, int32
    */
    page?: number;
};
export type AuditTrailDetailListGetByIdHeaderParams = {
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
export type AuditTrailDetailListGetById200 = ApplicationDto;
export type AuditTrailDetailListGetByIdQueryResponse = ApplicationDto;
export type AuditTrailDetailListGetByIdQuery = {
    Response: AuditTrailDetailListGetByIdQueryResponse;
    PathParams: AuditTrailDetailListGetByIdPathParams;
    QueryParams: AuditTrailDetailListGetByIdQueryParams;
    HeaderParams: AuditTrailDetailListGetByIdHeaderParams;
};