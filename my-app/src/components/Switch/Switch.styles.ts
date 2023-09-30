import styled from "styled-components";
import Switch, { ReactSwitchProps } from 'react-switch';


export const Container = styled.div`
display: flex;
align-items: center;
`;

export const Label = styled.span``;

export const _Switch = styled(Switch).attrs<ReactSwitchProps>(({ theme }) => ({
   onColor: theme.color.info,
   offColor: theme.color.warning
}))<ReactSwitchProps>`
margin-left: 4px;
margin-right: 4px;
`;