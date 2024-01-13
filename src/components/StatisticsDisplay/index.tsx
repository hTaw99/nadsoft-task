import { getStatistics } from "@/api/statistics";
import { useAppSelector } from "@/hooks/rtkHooks";
import { useQuery } from "@/hooks/useQuery";
import Container, {
  MetricsContainer,
  ListContainer,
} from "@/styles/Container.style";
import { Skeleton } from "@/styles/Skeleton.style";
import Title, { TitleContainer } from "@/styles/Title.style";
import { TStatistic } from "@/types/statistic";

export default function StatisticsDisplay() {
  const selectedState = useAppSelector((state) => state.states.selectedState);

  const { error, isError, data } = useQuery({
    queryFn: () => getStatistics(selectedState),
    queryKey: ["currentStatistics", selectedState],
  });

  const metrics = {
    pending: data?.pending,
    positive: data?.positive,
    negative: data?.negative,
    hospitalized: data?.hospitalizedCumulative,
    icu: data?.inIcuCumulative,
    VentilatorCases: data?.onVentilatorCumulative,
  };

  if (isError) {
    return <div>{error?.message}</div>;
  }

  return (
    <Container>
      <TitleContainer>
        <Title $varient="medium">Current COVID-19 Statistics</Title>
      </TitleContainer>
      <Container $inner={true}>
        <MetricsContainer>
          {(Object.keys(metrics) as Array<keyof typeof metrics>).map((key) => (
            <ListContainer key={key}>
              <p>{key}</p>
              <RenderNumber data={data} number={metrics[key]} />
            </ListContainer>
          ))}
        </MetricsContainer>
      </Container>
    </Container>
  );
}

function RenderNumber({
  data,
  number,
}: {
  data: Omit<TStatistic, "code"> | undefined;
  number: number | undefined;
}) {
  if (data) {
    return <h3>{number ?? "--"}</h3>;
  } else {
    return <Skeleton />;
  }
}
