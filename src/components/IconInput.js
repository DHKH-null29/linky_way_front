import { Colors } from '../styles';
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
  const setInputClassName = 'input is-' + size;
  return (
    <div className="control has-icons-left has-icons-right">
      <StyledInput className={setInputClassName} type={type} placeholder={placeholder} {...props} />
      <Icon align="left">{leftIconComponent || '*'}</Icon>
      <Icon align="right">{rightIconComponent || '*'}</Icon>
    </div>
  );
};

IconInput.defaultProps = {
  placeholder: '',
  size: 'normal',
  type: 'text',
};

const StyledInput = styled.input`
  font-family: 'ImcreSoojin';
  display: block;
  width: 100%;
  border: 2px solid ${Colors.mainFirst};
  border-radius: 8px;
  :focus {
    border-color: ${Colors.mainSecond};
  }
  :hover {
    border-color: ${Colors.subFirst};
  }
`;

export default IconInput;
