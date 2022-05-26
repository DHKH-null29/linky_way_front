import { BorderRadius, Colors, FontSize, Media, Shadows } from '../styles';

import { Button } from 'react-bulma-components';
import styled from '@emotion/styled';

const Buttons = ({ children, colortype, ...props }) => {
  return (
    <div>
      <StyledButton colortype={colortype} {...props}>
        {children}
      </StyledButton>
    </div>
  );
};

const buttonColors = {
  main: [Colors.mainFirst, Colors.mainSecond],
  sub: [Colors.subFirst, Colors.subSecond],
};

Buttons.defaultProps = {
  colortype: 'main',
};

export default Buttons;

const StyledButton = styled(Button)`
font-family: 'ImcreSoojin';
width: 100%;
box-shadow: ${Shadows.button};
background-color: ${({ colortype }) => buttonColors[colortype][0]};
border-radius: ${BorderRadius.button};
font-size: ${FontSize.medium};
@media ${Media.mobile} {
  font-size: ${FontSize.normal}
}
:hover {
  background-color: ${({ colortype }) => buttonColors[colortype][1]};
`;
