import * as S from "./Input.styles";

type Props = {
  label?: string;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
};
export const Input = ({ label, className, onChange, placeholder }: Props) => {
  return (
    <S.Wrapper className={className}>
      {label && <S.Label>{label}</S.Label>}
      <div style={{ marginTop: "4px" }}>
        <S.Input placeholder={placeholder} onChange={onChange} />
      </div>
    </S.Wrapper>
  );
};
