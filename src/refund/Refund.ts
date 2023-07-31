import { Http } from "../core/Http";
import {
  RefundResponse,
  RefundPayload,
  ListRefundResponseData,
  ListRefundQuery,
  FetchRefundParam,
  FetchReFundReponse,
  BaseRefund,
} from "../types";
import { formatQueryParams } from "../utils";

export class Refund extends BaseRefund {
  private endpoint = "/refund";
  constructor() {
    super();
  }
  async create(payload: RefundPayload): Promise<RefundResponse> {
    try {
      return await Http.post<RefundPayload, RefundResponse>(
        `${this.endpoint}`,
        payload
      );
    } catch (error: any) {
      return error.response.data;
    }
  }

  async list(params: ListRefundQuery): Promise<ListRefundResponseData> {
    try {
      let formattedQueryString: string = formatQueryParams(params);
      return await Http.get<ListRefundResponseData>(
        `${this.endpoint}${formattedQueryString}`
      );
    } catch (error: any) {
      return error.response.data;
    }
  }
  /**
   *
   * @param reference  - reference from refund
   */
  async fetch(param: FetchRefundParam): Promise<FetchReFundReponse> {
    try {
      return await Http.get<FetchReFundReponse>(
        `${this.endpoint}/${param.reference}`
      );
    } catch (error: any) {
      return error.response.data;
    }
  }
}
