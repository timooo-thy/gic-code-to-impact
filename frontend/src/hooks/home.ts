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
