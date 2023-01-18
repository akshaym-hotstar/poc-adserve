import { QueryClient, QueryFunctionContext } from "@tanstack/react-query";

import type { AnyFunction } from "../types";

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

/**
 * @description Not a hook, it's a HOC function
 * @param fn Function
 * @returns {Function}
 */
const withQuery =
  <T extends AnyFunction>(
    fn: T
  ): ((payload: QueryFunctionContext) => ReturnType<T>) =>
  ({ queryKey }) => {
    const [_, payload] = queryKey;
    return fn(payload);
  };

export { queryClient, withQuery };
