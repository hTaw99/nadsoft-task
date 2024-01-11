import { TState } from "@/types/states";
import { getErrorMessage } from "@/utilsFn/getErrorMessage";
import { useCallback, useEffect, useReducer } from "react";

// ############ TYPES #############
type Error = { message: string };

type UseQueryProps<T> = {
  queryFn: () => Promise<T>;
  queryKey: [string, (TState | string[])?];
};

type UseQueryState<T> = {
  status: "loading" | "success" | "error" | "idle";
  error: Error | undefined;
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
};

type Action<T> =
  | {
      type: "FETCHING";
    }
  | {
      type: "FETCHED";
      payload: T;
    }
  | {
      type: "FETCHED-ERROR";
      payload: Error;
    };

// ############ INITIAL STATE #############

const initialStateFn = <T>(): UseQueryState<T> => ({
  status: "idle",
  error: undefined,
  data: undefined,
  isLoading: false,
  isError: false,
});

// ############ REDUCER FUNCTION #############

function reducerFn<T>(
  state: UseQueryState<T>,
  action: Action<T>
): UseQueryState<T> {
  switch (action.type) {
    case "FETCHING":
      return { ...initialStateFn(), isLoading: true, status: "loading" };
    case "FETCHED":
      return {
        ...initialStateFn(),
        isLoading: false,
        data: action.payload,
        status: "success",
      };
    case "FETCHED-ERROR":
      return {
        ...initialStateFn(),
        isLoading: false,
        error: action.payload,
        isError: true,
        status: "error",
      };

    default:
      console.log(state);
      throw new Error("Action not supported");
  }
}

// const cachedData: { [key: string]: unknown[] } = {};

export const useQuery = <T>({
  queryFn,
  queryKey,
}: UseQueryProps<T>): UseQueryState<T> & { refetch: typeof runQuery } => {
  const [state, dispatch] = useReducer(reducerFn<T>, initialStateFn<T>());

  // const memoizedQueryFn = useCallback(() => queryFn(), []);
  // const memoizedQueryKey = useMemo(() => queryKey, [queryKey[1]?.length]);

  const runQuery = useCallback(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCHING" });
      try {
        // if (
        //   cachedData[queryKey[0]] &&
        //   cachedData[queryKey[0]].length !== 0

        // ) {
        //   console.log("asasas");
        //   dispatch({
        //     type: "FETCHED",
        //     payload: cachedData[queryKey[0]] as T,
        //   });
        // } else {
        const data = await queryFn();
        // cachedData[queryKey[0]] = data as unknown[];

        dispatch({ type: "FETCHED", payload: data });
        // }
      } catch (err) {
        dispatch({
          type: "FETCHED-ERROR",
          payload: { message: getErrorMessage(err) },
        });
      }
    };
    fetchData();
  }, [queryKey[1]]);

  useEffect(runQuery, [runQuery]);

  return {
    data: state.data,
    isError: state.isError,
    isLoading: state.isLoading,
    error: state.error,
    status: state.status,
    refetch: runQuery,
  };
};
