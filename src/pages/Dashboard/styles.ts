import styled from "styled-components";
import media from "../../utils/media";

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 24px;

  ${media.greaterThan("tablet")`
    flex-direction: row;
  `}
`;
