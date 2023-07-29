import {
  GetBanksQueryParams,
  GetBanksResponse,
  GetCountriesResponse,
  VerifyNumberQueryParams,
  VerifyNumberResponse,
  CardBINResponse,
} from "../../types";
import { Transaction } from "../transaction/Transaction";
import { Transfer } from "../transfer/Transfer";
import { Charges } from "../charge/Charge";
import { BulkCharges } from "../charge/BulkCharge";
import { formatQueryParams, sendRequest, transformToCamelCase } from "../utils";
import { getRequestData } from "../constants";
import { Refund } from "../refund/Refund";
import { Integration } from "../integration/Integration";
import { ApplePay } from "../apple-pay/ApplePay";
import { TransactionSplit } from "../transaction-split/TransactionSplit";
import { SubAccount } from "../subaccounts/SubAccount";
abstract class PayStackBase {
  abstract getBanks(
    queryParams: GetBanksQueryParams
  ): Promise<GetBanksResponse>;

  abstract getCountries(): Promise<GetCountriesResponse[]>;

  abstract verifyNumber(
    params: VerifyNumberQueryParams
  ): Promise<VerifyNumberResponse>;

  abstract verifyCardBIN(binNumber: string): Promise<CardBINResponse>;
}
export class PayStack extends PayStackBase {
  readonly transaction: Transaction = new Transaction;
  readonly transfer: Transfer = new Transfer;
  readonly charges: Charges=  new Charges;
  readonly bulkCharges: BulkCharges = new BulkCharges;
  readonly refund: Refund = new Refund;
  readonly integration: Integration = new Integration;
  readonly applePay: ApplePay = new ApplePay;
  readonly transactionSplit: TransactionSplit = new TransactionSplit;
  readonly subAccount: SubAccount = new SubAccount;
  constructor() {
    super();
  }

  async getBanks(queryParams: GetBanksQueryParams): Promise<GetBanksResponse> {
    let formattedQueryString: string = formatQueryParams(queryParams);
    return await sendRequest<GetBanksResponse>(
      getRequestData("GET", formattedQueryString).getBanks
    );
  }

  async getCountries(): Promise<GetCountriesResponse[]> {
    return await sendRequest<GetCountriesResponse[]>(
      getRequestData("GET").getCountries
    );
  }

  async verifyNumber(
    params: VerifyNumberQueryParams
  ): Promise<VerifyNumberResponse> {
    let formattedQueryString: string = formatQueryParams(params);
    return await sendRequest<VerifyNumberResponse>(
      getRequestData("GET", formattedQueryString).verifyNumber
    );
  }

  async verifyCardBIN(binNumber: string): Promise<CardBINResponse> {
    let path = `/${binNumber}`;
    return await sendRequest<CardBINResponse>(
      getRequestData("GET", path).verifyCardBIN
    );
  }
}