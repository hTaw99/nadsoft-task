import Container from "@/styles/Container.style";
import StateSelectionDropdown from "../Dropdown";
import CustomTable from "../CustomTable";
import Title, { TitleContainer } from "@/styles/Title.style";

export default function DataComparison() {
  return (
    <Container>
      <TitleContainer>
        <Title $varient="medium">Comparison Table</Title>
        <StateSelectionDropdown multiple />
      </TitleContainer>
      <Container $inner={true}>
        <CustomTable />
      </Container>
    </Container>
  );
}
