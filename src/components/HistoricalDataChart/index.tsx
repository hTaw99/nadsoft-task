import Container from "@/styles/Container.style";
import Title, { TitleContainer } from "@/styles/Title.style";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { useQuery } from "@/hooks/useQuery";
import { getHistoricalStatistics } from "@/api/statistics";
import { formatDate } from "@/utilsFn/formatDate";
import { useEffect, useReducer } from "react";
import DateRangeSelector from "../DateRangeSelector";
import { useAppSelector } from "@/hooks/rtkHooks";
Chart.register(CategoryScale);

type InitialState = {
  startDate: number;
  endDate: number;
  firstDate: number;
  lastDate: number;
};

const initialState: InitialState = {
  startDate: 20210101,
  endDate: 20210301,
  firstDate: 20210101,
  lastDate: 20210301,
};

export type Action =
  | {
      type: "SET_START_DATE" | "SET_END_DATE";
      payload: number;
    }
  | {
      type: "SET_BOUNDRIES";
      payload: {
        firstDate: number;
        lastDate: number;
      };
    };

const reducerFn = (state: InitialState, action: Action) => {
  switch (action.type) {
    case "SET_START_DATE":
      return { ...state, startDate: action.payload };
    case "SET_END_DATE":
      return { ...state, endDate: action.payload };
    case "SET_BOUNDRIES":
      return {
        ...state,
        firstDate: action.payload.firstDate,
        lastDate: action.payload.lastDate,
      };
    default:
      console.log(state);
      return state;
  }
};

export default function HistoricalDataChart() {
  const [state, dispatch] = useReducer(reducerFn, initialState);
  const selectedState = useAppSelector((state) => state.states.selectedState);
  const { isLoading, data: statistics } = useQuery({
    queryFn: () => getHistoricalStatistics(selectedState),
    queryKey: ["statistics", selectedState],
  });
  useEffect(() => {
    if (statistics) {
      console.log("asasa");
      dispatch({
        type: "SET_BOUNDRIES",
        payload: {
          firstDate: statistics[statistics.length - 1].date,
          lastDate: statistics[0].date,
        },
      });
    }
  }, [statistics]);

  const findDateIndex = (data: typeof statistics, dateToSearch: number) => {
    const index = data?.findIndex(
      (singleObj) => singleObj.date === dateToSearch
    );
    console.log(index);
    return index;
  };

  const rangedData = statistics?.slice(
    findDateIndex(statistics, state?.endDate),
    findDateIndex(statistics, state?.startDate)
  );

  return (
    <Container>
      <TitleContainer>
        <Title $varient="medium">HistoricalDataChart</Title>
      </TitleContainer>
      <Container $inner={true}>
        <div style={{ marginBottom: "1rem" }}>
          <DateRangeSelector
            startDate={state?.startDate}
            dispatch={dispatch}
            endDate={state?.endDate}
            firstDate={state?.firstDate}
            lastDate={state?.lastDate}
          />
        </div>
        {isLoading ? (
          "Loading..."
        ) : (
          <Line
            datasetIdKey="id"
            data={{
              labels: rangedData?.reverse().map(({ date }) => formatDate(date)),
              datasets: [
                {
                  // id: 1,
                  label: "Positive",
                  data: rangedData?.map(({ positive }) => positive),
                  pointRadius: 1,
                  borderColor: "blue",
                },
                {
                  // id: 2,
                  label: "Death",
                  data: rangedData?.map(({ death }) => death),
                  pointRadius: 1,
                  borderColor: "red",
                },
              ],
            }}
          />
        )}
      </Container>
    </Container>
  );
}
