import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetInstruments = (field: string) => {
  return useQuery({
    queryKey: ["instruments", field],
    queryFn: () => {
      // field must be a valid value!!
      return fetch(
        `${process.env.NEXT_PUBLIC_FASTAPI_URL}/approved_instruments/${field}`
      )
        .then((response) => {
          if (!response.ok) {
            return Promise.reject(new Error("Network response was not ok"));
          }
          return response.json(); // Parse the response body as JSON
        })
        .then((res) => {
          return res;
        });
    },
  });
};

export const useGetSearchData = (
  field1: string,
  field2: string,
  field3: string,
  field4: string,
  field5: string,
  field6: string,
  field7: string
) => {
  return useQuery({
    queryKey: [
      "instruments",
      field1,
      field2,
      field3,
      field4,
      field5,
      field6,
      field7,
    ],
    queryFn: () => {
      // field must be a valid value!!
      return fetch(
        `${process.env.NEXT_PUBLIC_FASTAPI_URL}/approved_instruments/?instrument_group=${field1}&instrument=${field2}&department=${field3}&risk_country=${field4}&exchange=${field5}&trade_ccy=${field6}&settlement_ccy=${field7}`
      )
        .then((response) => {
          if (!response.ok) {
            return Promise.reject(new Error("Network response was not ok"));
          }
          return response.json(); // Parse the response body as JSON
        })
        .then((res) => {
          return res;
        });
    },
  });
};

interface TradingPayload {
  trader_id: number;
  instrument: string;
  settlement_ccy: string;
  trade_ccy: string;
  risk_country: string;
  exchange: string;
  department: string;
  counterparty: string;
  trade_date: string;
  instrument_group: string;
  amount: number;
}

export const useModifyTrade = () => {
  return useMutation({
    mutationFn: async (payload: TradingPayload) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FASTAPI_URL}/trades/set_trade`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      )
        .then((response) => {
          if (!response.ok) {
            return Promise.reject("network bad");
          }
          return response.json(); // Parse the response body as JSON
        })
        .then((res) => {
          return res;
        });
    },
  });
};

export interface ApprovalRequestPayload {
  email: string;
  instrument_name: string;
  settlement_ccy: string;
  trade_ccy: string;
  country: string;
  exchange_name: string;
  department: string;
  instrument_group: string;
}

export const useCreateApprovalRequestMutation = () => {
  return useMutation({
    mutationFn: async (payload: ApprovalRequestPayload) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FASTAPI_URL}/approval-request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      )
        .then((response) => {
          if (!response.ok) {
            return Promise.reject("network bad");
          }
          return response.json(); // Parse the response body as JSON
        })
        .then((res) => {
          return res;
        });
    },
  });
};
