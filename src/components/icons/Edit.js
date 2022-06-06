import styled from '@emotion/styled';

const Edit = ({ size, color, ...props }) => {
  return (
    <StyledSvg
      fill={color}
      height={size}
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </StyledSvg>
  );
};

const StyledSvg = styled.svg`
  :hover {
    fill: ${({ fill }) => fill};
  }
`;

export default Edit;
