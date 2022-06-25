import { BorderRadius, Colors, FontSize, Shadows } from '../../styles';

import styled from '@emotion/styled';

const TextContent = ({ children, ...props }) => {
  return <StyledP {...props}>{children}</StyledP>;
};

const StyledP = styled.p`
  background-color: ${Colors.backgroundEvent};
  padding: ${FontSize.large} ${FontSize.normal} ${FontSize.large} ${FontSize.normal};
  opacity: 0.75;
  border-radius: ${BorderRadius.input};
  box-shadow: ${Shadows.input};
  font-size: ${FontSize.small};
`;

export default TextContent;
