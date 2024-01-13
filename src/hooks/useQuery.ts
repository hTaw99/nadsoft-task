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


const cache: Map<string, any> = new Map();

export const useQuery = <T>({
  queryFn,
  queryKey,
}: UseQueryProps<T>): UseQueryState<T> & { refetch: typeof runQuery } => {
  const [state, dispatch] = useReducer(reducerFn<T>, initialStateFn<T>());

  const runQuery = useCallback(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCHING" });
      try {
        const cacheKey = JSON.stringify(queryKey);
        const cachedData = cache.get(cacheKey);
        if (cachedData) {
          dispatch({
            type: "FETCHED",
            payload: cachedData,
          });
        } else {
          const data = await queryFn();
          dispatch({ type: "FETCHED", payload: data });
          cache.set(cacheKey, data);
        }
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
