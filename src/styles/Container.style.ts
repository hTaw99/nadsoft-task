import styled from "styled-components";

const Container = styled.div<{ $inner?: boolean }>`
  border: ${(props) =>
    props.$inner ? "0px" : "1px solid rgba(0, 0, 0, 0.2);"};
  padding: ${(props) => (props.$inner ? "1rem" : "0")};
  border-radius: 0.5rem;
`;

export const MetricsContainer = styled.ul`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
`;

export const ListContainer = styled.ul`
  padding: 1rem;
  border-radius: 4px;
  background-color: rgba(0,0,0, 0.05);
  text-transform: capitalize;
`;

export default Container;
