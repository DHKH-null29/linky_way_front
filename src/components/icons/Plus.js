import { IconSize } from '../../styles';
import UseAnimations from 'react-useanimations';
import plusToX from 'react-useanimations/lib/plusToX';
import styled from '@emotion/styled';

const Plus = ({ lineColor, size, ...props }) => {
  return (
    <StyledIcon animation={plusToX} size={IconSize[size]} strokeColor={lineColor} {...props} />
  );
};

Plus.defaultProps = {
  size: IconSize.normal,
  lineColor: 'black',
};

const StyledIcon = styled(UseAnimations)`
  :hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`;

export default Plus;
