import { Colors, Media } from '../../../styles';

import styled from '@emotion/styled';

// fill: 아이콘 색상 stroke: 아이콘 선색상
const Tag = ({ size, fill, stroke }) => {
  return (
    <>
      <StyledSvg size={size} version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <title />
        <desc />
        <defs />
        <g fill={fill} id="Page-1" stroke={stroke} strokeWidth="1">
          <g fill={fill} id="icon-146-tag">
            <path d="M14,4 L5.99961498,4 C4.89525812,4 4,4.88743329 4,5.99961498 L4,14 L17.3809027,27.3809027 C18.1646418,28.1646418 19.433119,28.1668566 20.2115341,27.3884415 L27.3884415,20.2115341 C28.168017,19.4319586 28.1640508,18.1640508 27.3809027,17.3809027 L14,4 L14,4 Z M13.5,5 L6.00844055,5 C5.45149422,5 5,5.45699692 5,6.00844055 L5,13.5 L18.0998579,26.671163 C18.488383,27.0618028 19.1183535,27.0613199 19.5042948,26.672744 L26.6678854,19.4602516 C27.0550094,19.0704849 27.0531075,18.4413912 26.6620109,18.0535183 L13.5,5 L13.5,5 Z M9.5,12 C10.8807119,12 12,10.8807119 12,9.5 C12,8.11928806 10.8807119,7 9.5,7 C8.11928806,7 7,8.11928806 7,9.5 C7,10.8807119 8.11928806,12 9.5,12 L9.5,12 Z M9.5,11 C10.3284272,11 11,10.3284272 11,9.5 C11,8.67157283 10.3284272,8 9.5,8 C8.67157283,8 8,8.67157283 8,9.5 C8,10.3284272 8.67157283,11 9.5,11 L9.5,11 Z" />
          </g>
        </g>
      </StyledSvg>
    </>
  );
};

Tag.defaultProps = {
  size: 45,
  fill: Colors.tagicon,
  stroke: Colors.tagstroke,
};

const StyledSvg = styled.svg`
  width: ${({ size }) => size + 'px'};
  height: auto;
  @media ${Media.mobile} {
    width: ${({ size }) => size / 1.8 + 'px'};
  }
`;

export default Tag;
