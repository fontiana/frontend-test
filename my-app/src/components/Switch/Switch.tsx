import * as S from './Switch.styles';

export const Switch: React.FC = () => {
    return (
        <S.Container>
            <S.Label>light</S.Label>
                <S._Switch 
                checkedIcon={false} 
                uncheckedIcon={false}
                checked={true}
                onChange={() =>void 0} />
            <S.Label>dark</S.Label>
        </S.Container>
    
    );
}