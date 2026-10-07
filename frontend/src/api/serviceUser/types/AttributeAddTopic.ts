import type { AttributeTopicDto } from "./AttributeTopicDto";

 export type AttributeAddTopicHeaderParams = {
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
export type AttributeAddTopic200 = string;
/**
 * @description Request failed because of an exception.
*/
export type AttributeAddTopic400 = string;
export type AttributeAddTopicMutationRequest = AttributeTopicDto;
/**
 * @description Request successful.
*/
export type AttributeAddTopicMutationResponse = string;
export type AttributeAddTopicMutation = {
    Response: AttributeAddTopicMutationResponse;
    Request: AttributeAddTopicMutationRequest;
    HeaderParams: AttributeAddTopicHeaderParams;
    Errors: AttributeAddTopic400;
};