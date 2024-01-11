import { type TState } from "@/types/states";
import { getErrorMessage } from "@/utilsFn/getErrorMessage";
import { useEffect, useReducer } from "react";

const cachedData: Record<string, TState[]> | Record<string, never> = {};

type ActionError = {
  type: "FETCHED-ERROR";
  payload: string;
};
type ActionFetched = {
  type: "FETCHED";
  payload: TState[];
};
type ActionFetching = {
  type: "FETCHING";
};
type Action = ActionError | ActionFetched | ActionFetching;

const initialState: initialState = {
  status: "idle",
  error: null,
  data: [],
  isLoading: false,
  isError: false,
};

type initialState = {
  status: string;
  error: unknown;
  data: TState[];
  isLoading: boolean;
  isError: boolean;
};

function reducerFn(
  state: typeof initialState,
  action: Action
): typeof initialState {
  switch (action.type) {
    case "FETCHING":
      return { ...initialState, isLoading: true, status: "loading" };
    case "FETCHED":
      return {
        ...initialState,
        isLoading: false,
        data: action.payload,
        status: "success",
      };
    case "FETCHED-ERROR":
      return {
        ...initialState,
        isLoading: false,
        error: action.payload,
        isError: true,
        status: "error",
      };

    default:
      console.log(state);
      throw new Error("somtheng went wrong");
  }
}

export const useGetStates = () => {
  const [state, dispatch] = useReducer(reducerFn, initialState);

  useEffect(() => {
    const getStatistics = async () => {
      try {
        dispatch({ type: "FETCHING" });

        if (cachedData.cachedData) {
          dispatch({ type: "FETCHED", payload: cachedData.cachedData });
        } else {
          const res = await fetch(
            " https://api.covidtracking.com/v1/states/info.json"
          );

          if (!res.ok) throw new Error("Somtheng Went wrong");

          const data = await res.json();
          cachedData.cachedData = data;

          dispatch({ type: "FETCHED", payload: data });
        }
      } catch (err) {
        dispatch({ type: "FETCHED-ERROR", payload: getErrorMessage(err) });
      }
    };

    getStatistics();
  }, []);

  return {
    states: state.data,
    isError: state.isError,
    isLoading: state.isLoading,
    error: state.error,
  };
};

export const getStates = async (): Promise<TState[]> => {
  const res = await fetch("https://api.covidtracking.com/v1/states/info.json");
  if (!res.ok) throw new Error("Something went wrong");
  const data = await res.json();
  const modifiedData = data.map((state: Record<string, any>) => ({
    name: state.name,
    code: state.state,
  }));
  return modifiedData;
};
