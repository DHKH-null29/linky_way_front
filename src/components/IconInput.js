import { Colors, FontSize, Media, Shadows } from '../styles';

import { Icon } from 'react-bulma-components';
import styled from '@emotion/styled';

const IconInput = ({
  type,
  size,
  placeholder,
  leftIconComponent,
  rightIconComponent,
  ...props
}) => {
  return (
    <div className="control has-icons-left has-icons-right">
      <StyledInput className="input" type={type} size={size} placeholder={placeholder} {...props} />
      <LeftIcon align="left">{leftIconComponent || '*'}</LeftIcon>
      <RightIcon align="right">{rightIconComponent || '*'}</RightIcon>
    </div>
  );
};

IconInput.defaultProps = {
  placeholder: '',
  size: 'medium',
  type: 'text',
};

const StyledInput = styled.input`
  font-family: 'ImcreSoojin';
  display: block;
  width: 100%;
  box-shadow: ${Shadows.input};
  border: 2px solid ${Colors.mainFirst};
  border-radius: 8px;
  font-size: ${({ size }) => FontSize[size]};
  @media ${Media.mobile} {
    font-size: ${FontSize.small};
  }
  :focus {
    border-color: ${Colors.mainSecond};
  }
  :hover {
    border-color: ${Colors.subFirst};
  }
`;

const RightIcon = styled(Icon)`
  margin-top: 0.25rem;
  margin-right: 0.2rem;
  @media ${Media.mobile} {
    margin-top: 0;
  }
`;

const LeftIcon = styled(Icon)`
  margin-top: 0.25rem;
  margin-left: 0.2rem;
  @media ${Media.mobile} {
    margin-top: 0;
  }
`;

export default IconInput;
