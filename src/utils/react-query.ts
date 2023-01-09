import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus(query) {
        return false;
      },
      staleTime: 1000 * 60 * 2, // 2min
    },
  },
});

export { queryClient };
