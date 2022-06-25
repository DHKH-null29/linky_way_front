import { Colors, Media } from '../../../styles';

import styled from '@emotion/styled';

const Crowd = ({ size, fill }) => {
  return (
    <StyledSvg
      size={size}
      overflow="hidden"
      version="1.1"
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <circle fill={fill} cx="24" cy="30.8" r="9" />
        <circle fill={fill} cx="72" cy="30.8" r="9" />
        <path
          fill={fill}
          d=" M 66 74.2 L 66 65.2 C 66 63.8 65.4 62.4 64.2 61.6 C 61.8 59.6 58.6 58.2 55.4 57.4 C 53.2 56.8 50.6 56.2 48 56.2 C 45.6 56.2 43 56.6 40.6 57.4 C 37.4 58.2 34.4 59.8 31.8 61.6 C 30.6 62.6 30 63.8 30 65.2 L 30 74.2 L 66 74.2 Z"
        />
        <circle fill={fill} cx="48" cy="44.8" r="9" />
        <path
          fill={fill}
          d=" M 88.2 47.6 C 85.8 45.6 82.6 44.2 79.4 43.4 C 77.2 42.8 74.6 42.2 72 42.2 C 69.6 42.2 67 42.6 64.6 43.4 C 63.4 43.8 62.2 44.2 61 44.8 L 61 45 C 61 48.4 59.6 51.6 57.4 53.8 C 61.2 55 64.2 56.6 66.6 58.4 C 67.2 59 67.8 59.4 68.2 60.2 L 90 60.2 L 90 51.2 C 90 49.8 89.4 48.4 88.2 47.6 Z"
        />
        <path
          fill={fill}
          d=" M 29.4 58.4 L 29.4 58.4 C 32.2 56.4 35.4 54.8 38.6 53.8 C 36.4 51.4 35 48.4 35 45 C 35 44.8 35 44.8 35 44.6 C 33.8 44.2 32.6 43.6 31.4 43.4 C 29.2 42.8 26.6 42.2 24 42.2 C 21.6 42.2 19 42.6 16.6 43.4 C 13.4 44.4 10.4 45.8 7.8 47.6 C 6.6 48.4 6 49.8 6 51.2 L 6 60.2 L 27.6 60.2 C 28.2 59.4 28.6 59 29.4 58.4 Z"
        />
      </g>
    </StyledSvg>
  );
};

Crowd.defaultProps = {
  size: 45,
  fill: Colors.subFirst,
};

const StyledSvg = styled.svg`
  width: ${({ size }) => size + 'px'};
  height: auto;
  @media ${Media.mobile} {
    width: ${({ size }) => size / 1.6 + 'px'};
  }
`;

export default Crowd;
