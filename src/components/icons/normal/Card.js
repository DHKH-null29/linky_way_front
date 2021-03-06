import { Media } from '../../../styles';
import styled from '@emotion/styled';

const Card = ({ size }) => {
  return (
    <StyledSvg
      enableBackground="new 0 0 50 50"
      id="Layer_1"
      version="1.1"
      viewBox="0 0 50 50"
      width={size}
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="none" height="50" width="50" />
      <rect fill="none" height="50" width="50" />
      <path
        d="  M42,10c0,0-29.397,0-34,0c-3.076,0-5,3-5,5v20.384C3,37.934,5.066,40,7.616,40h34.768C44.933,40,47,37.934,47,35.384V14.846  C47,12.299,44.549,10,42,10z"
        fill="none"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <rect height="5" width="44" x="3" y="16" />
    </StyledSvg>
  );
};

Card.defaultProps = {
  size: 18,
};

const StyledSvg = styled.svg`
  width: ${({ size }) => size + 'px'};
  height: auto;
  @media ${Media.mobile} {
    width: ${({ size }) => size / 1.6 + 'px'};
  }
`;

export default Card;
