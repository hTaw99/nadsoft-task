import styled from "styled-components";

export const TitleContainer = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const Title = styled.h3<{
  $varient?: "small" | "medium" | "large";
  $mb?: number;
}>`
  font-size: ${(props) => {
    if (props.$varient === "small") {
      return "1.1rem";
    } else if (props.$varient === "medium") {
      return "1.5rem";
    } else if (props.$varient === "large") {
      return "2.5rem";
    }
  }};
  margin-bottom: ${(props) => `${props.$mb}rem`};
`;

export default Title;
