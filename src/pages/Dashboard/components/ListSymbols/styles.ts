import styled from "styled-components";
import media from "../../../../utils/media";

export const Wrapper = styled.section`
  border: 2px solid var(--primary-color);
  min-width: 220px;
  background-color: rgba(30, 65, 71, 0.5);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 12px 24px;
  overflow: auto;
  ${media.greaterThan("tablet")`
    width: 100%;
  `}
`;

export const Table = styled.table`
  border-collapse: collapse;
  text-align: center;
  padding: 100px;
  width: 100%;
`;

export const TableHead = styled.thead`
  font-weight: bold;
`;

export const TableHeaderCell = styled.th`
  padding: 10px;
  border-bottom: 1px solid var(--white);
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid var(--white);

  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.td<{ isPositive?: number }>`
  padding: 18px 0;
  align-items: center;
  margin: 10px;

  color: ${({ isPositive }) => {
    const value = isPositive ?? 0;
    if (value > 0) {
      return "var(--text-color-positive)";
    }

    if (value < 0) {
      return "var(--text-color-negative)";
    }

    return "inherit";
  }};
`;

export const SymbolCell = styled(TableCell)``;
