import { getStatisticsForMultipleState } from "@/api/statistics";
import { useAppSelector } from "@/hooks/rtkHooks";
import { useQuery } from "@/hooks/useQuery";
import { Placeholder } from "@/styles/Placeholder.style";
import { TStatistic } from "@/types/statistic";
import { useMemo } from "react";

const RenderTable = ({ data }: { data: TStatistic[] }) => {
  console.log({ data });
  return (
    <table
      style={{
        borderCollapse: "collapse",
        width: "100%",
        textAlign: "center",
      }}
    >
      <thead
        style={{
          backgroundColor: "#f3f3f3",
        }}
      >
        <tr>
          {Object.keys(data?.[0]).map((key) => (
            <th
              style={{
                padding: "0.5rem 1rem",
                border: "1px solid #000000",
              }}
              key={key}
            >
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((dataRow) => (
          <tr key={dataRow.code}>
            {Object.keys(dataRow).map((key) => (
              <td
                style={{
                  padding: "0.5rem 1rem",
                  border: "1px solid #000000",
                }}
                key={key}
              >
                {dataRow[key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function CustomTable() {
  const selectedMultipleStates = useAppSelector(
    (state) => state.states.selectedMultipleStates
  );
  const statesCode = useMemo(
    () => selectedMultipleStates.map((state) => state.code.toLowerCase()),
    [selectedMultipleStates]
  );

  const { data: realData, isLoading } = useQuery({
    queryFn: async () => await getStatisticsForMultipleState(statesCode),
    queryKey: ["statisticsForMultipleState", statesCode],
  });

  if (realData && realData.length !== 0) {
    return (
      <div>
        <RenderTable data={realData} />
      </div>
    );
  } else {
    if (isLoading) {
      return <span>Loading...</span>;
    } else {
      return <Placeholder>No state to compare</Placeholder>;
    }
  }
}
