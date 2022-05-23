import 'bulma/css/bulma.min.css';

import { BorderRadius, Colors } from '../styles';

import { Button } from 'react-bulma-components';
import styled from '@emotion/styled';

const Buttons = ({ children }) => {
  return (
    <div>
      <StyledButton>{children}</StyledButton>
    </div>
  );
};

export default Buttons;

const StyledButton = styled(Button)`
font-family: 'ImcreSoojin';
width: 100%;
box-shadow: 0 5px 4px rgba(0, 0, 0, 0.25);
background-color: ${({ colorType }) => (!colorType ? Colors.mainFirst : Colors.mainSecond)};
border-radius: ${BorderRadius.button};
:hover {
  background-color: ${({ colorType }) => (!colorType ? Colors.mainSecond : Colors.subSecond)};
`;
