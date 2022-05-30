import { IconSize } from '../../styles';
import styled from '@emotion/styled';

const FolderArrow = ({ size }) => {
  return (
    <StyledSvg viewBox="-80 0 300 250" xmlns="http://www.w3.org/2000/svg" size={size}>
      <rect fill="none" />
      <polyline
        fill="none"
        points="160 128 208 176 160 224"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="17"
      />
      <polyline
        fill="none"
        points="64 32 64 176 208 176"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="17"
      />
    </StyledSvg>
  );
};

FolderArrow.defaultProps = {
  size: IconSize.normal,
};

const StyledSvg = styled.svg`
  width: ${({ size }) => size + 'px'};
  height: auto;
`;

export default FolderArrow;