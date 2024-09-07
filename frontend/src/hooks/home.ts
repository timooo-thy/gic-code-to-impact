    import { useQuery } from "@tanstack/react-query";

export const useGetInstruments = (field: string) => {
  return useQuery({
    queryKey: ['instruments', field],
    queryFn: () => {
        // field must be a valid value!!
      return fetch(`http://localhost:8000/approved_instruments/${field}`)
        .then(response => {
          if (!response.ok) {
            return Promise.reject(new Error('Network response was not ok'));
          }
          return response.json(); // Parse the response body as JSON
        }).then(res => {
            return res;
        })
    },
  });
};

export const useCreateApprovalRequest = (field: string) => {
    return useQuery({
      queryKey: ['instruments', field],
      queryFn: () => {
          // field must be a valid value!!
        return fetch(`http://localhost:8000/approved_instruments/${field}`)
          .then(response => {
            if (!response.ok) {
              return Promise.reject(new Error('Network response was not ok'));
            }
            return response.json(); // Parse the response body as JSON
          }).then(res => {
              return res;
          })
      },
    });
  };