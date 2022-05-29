import { BorderRadius, FontSize, Shadows } from '../styles';
import { Dropdown, Icon } from 'react-bulma-components';

import ArrowDown from './icons/ArrowDown';
import styled from '@emotion/styled';

const Dropdowns = () => {
  return (
    <StyledDropdown
      className="dropdown is-hoverable"
      closeOnSelect={true}
      icon={
        <Icon>
          <ArrowDown />
        </Icon>
      }
      label={<StyledLabel>조건검색</StyledLabel>}
    >
      <Dropdown.Item renderAs="a" value="item">
        태그명
      </Dropdown.Item>
      <Dropdown.Item renderAs="a" value="item">
        제목
      </Dropdown.Item>
      <Dropdown.Item renderAs="a" value="item">
        태그명 + 제목
      </Dropdown.Item>
    </StyledDropdown>
  );
};

const StyledDropdown = styled(Dropdown)`
  font-family: 'ImcreSoojin';
  border-radius: ${BorderRadius.input};
  box-shadow: ${Shadows.input};
`;

const StyledLabel = styled.label`
  font-family: 'ImcreSoojin';
  font-size: ${FontSize.medium};
`;

export default Dropdowns;
