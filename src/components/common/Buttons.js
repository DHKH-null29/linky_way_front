import { BorderRadius, Colors, FontSize, Media, Shadows } from '../../styles';

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
  success: [Colors.successFirst, Colors.successSecond, Colors.successFont],
  warn: [Colors.warningFirst, Colors.warningSecond, Colors.wanringFont],
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
color: ${({ colortype }) => buttonColors[colortype][2]};
@media ${Media.mobile} {
  font-size: ${FontSize.small}
}
:hover {
  background-color: ${({ colortype }) => buttonColors[colortype][1]};
`;
