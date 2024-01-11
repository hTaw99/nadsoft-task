import styled from "styled-components";
import DataComparison from "../DataComparison";
// import DataFilteringSorting from "../DataFilteringSorting";
import HistoricalDataChart from "../HistoricalDataChart";
import Dropdown from "../Dropdown";
import StatisticsDisplay from "../StatisticsDisplay";
import Title from "@/styles/Title.style";

const StatisticsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 3rem;
`;

export default function Dashboard() {
  return (
    <div className="container">
      <Title $mb={3} $varient="large" as={"h1"}>
        COVID-19 Statistics Dashboard
      </Title>
      <div style={{ marginBottom: "3rem" }}>
        <Dropdown title="Select Certain State" />
      </div>
      <StatisticsContainer>
        <StatisticsDisplay />
        <HistoricalDataChart />
      </StatisticsContainer>
      <DataComparison />
      {/* <DataFilteringSorting /> */}
    </div>
  );
}
