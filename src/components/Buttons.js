import 'bulma/css/bulma.min.css';

import { BorderRadius, Colors, Shadows } from '../styles';

import { Button } from 'react-bulma-components';
import styled from '@emotion/styled';

const Buttons = ({ children, props }) => {
  return (
    <div>
      <StyledButton {...props}>{children}</StyledButton>
    </div>
  );
};

export default Buttons;

const StyledButton = styled(Button)`
font-family: 'ImcreSoojin';
width: 100%;
box-shadow: ${Shadows.button};
background-color: ${({ colorType }) => (!colorType ? Colors.mainFirst : Colors.mainSecond)};
border-radius: ${BorderRadius.button};
:hover {
  background-color: ${({ colorType }) => (!colorType ? Colors.mainSecond : Colors.subSecond)};
`;
