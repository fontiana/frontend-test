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

export const WrapperOfListUser = styled.section`
  display: flex;
  justify-content: space-between;
  column-gap: 12px;

  ${media.lessThan("tablet")`
    flex-direction: column;
  `}
`;

export const SelectList = styled.select`
  width: 180px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 16px;
  outline: none;
  font-size: 16px;
  margin-bottom: 12px;
  background-color: var(--subtext-color);
  color: var(--black);
`;

export const ButtonAddList = styled.button`
  align-items: center;
  justify-content: center;
  background-color: var(--black);
  border-radius: 8px;
  color: var(--white);
  column-gap: 8px;
  display: flex;
  height: 36px;
  width: 36px;

  &:hover {
    background-color: var(--white);
    color: var(--primary-color);
  }
`;

export const WrapperNewList = styled.div`
  display: flex;
  gap: 8px;
`;

export const Field = styled.input.attrs({ type: "text" })`
  width: 180px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 16px;
  outline: none;
  font-size: 16px;
  margin-bottom: 12px;
  background-color: var(--subtext-color);
  color: var(--black);
`;

export const Button = styled.input.attrs({ type: "submit" })`
  width: 100%;
  min-width: 36px;
  height: 36px;
  border-radius: 8px;

  &:hover {
    background-color: var(--black);
    color: var(--white);
  }
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
