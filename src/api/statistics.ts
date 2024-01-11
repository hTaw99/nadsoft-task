import { TState } from "@/types/states";
import { TStatistic } from "@/types/statistic";

export const getStatistics = async (state?: TState): Promise<Omit<TStatistic, "code">> => {
  const code = state ? `states/${state.code.toLowerCase()}` : "us";

  const res = await fetch(
    `https://api.covidtracking.com/v1/${code}/current.json`
  );
  if (!res.ok) throw new Error("Something went wrong");
  const data = await res.json();

  const modifiedData = state
    ? {
        date: data.date,
        death: data.death,
        hospitalizedCumulative: data.hospitalizedCumulative,
        inIcuCumulative: data.inIcuCumulative,
        negative: data.negative,
        onVentilatorCumulative: data.onVentilatorCumulative,
        pending: data.pending,
        positive: data.positive,
      }
    : {
        date: data[0].date,
        death: data[0].death,
        hospitalizedCumulative: data[0].hospitalizedCumulative,
        inIcuCumulative: data[0].inIcuCumulative,
        negative: data[0].negative,
        onVentilatorCumulative: data[0].onVentilatorCumulative,
        pending: data[0].pending,
        positive: data[0].positive,
      };

  return modifiedData;
};

export const getHistoricalStatistics = async (
  state?: TState
): Promise<Pick<TStatistic, "date" | "death" | "positive">[]> => {
  const code = state ? `states/${state.code.toLowerCase()}` : "us";

  const res = await fetch(
    `https://api.covidtracking.com/v1/${code}/daily.json`
  );
  if (!res.ok) throw new Error("Something went wrong");
  const data = await res.json();

  const modifiedData = data.map((s: Record<string, any>) => ({
    date: s.date,
    death: s.death,
    positive: s.positive,
  }));

  return modifiedData;
};

export const getStatisticsForMultipleState = async (
  statesCodesArr: string[]
): Promise<TStatistic[] | undefined> => {
  // if (statesCodesArr.length === 0) return;
  const states = Promise.all(
    statesCodesArr.map(async (code) => {
      const response = await fetch(
        `https://api.covidtracking.com/v1/states/${code}/current.json`,
        {
          method: "GET",
        }
      );

      if (!response.ok) throw new Error("Something went wrong");
      const data = await response.json();
      const modifiedData = {
        code: data.state,
        date: data.date,
        death: data.death,
        hospitalizedCumulative: data.hospitalizedCumulative,
        inIcuCumulative: data.inIcuCumulative,
        negative: data.negative,
        onVentilatorCumulative: data.onVentilatorCumulative,
        pending: data.pending,
        positive: data.positive,
      };
      return modifiedData;
    })
  );
  const arr = await states;
  return arr;
};
