import { Icon } from 'react-bulma-components';
import TagIcon from './icons/TagIcon';
import styled from '@emotion/styled';

const IconTag = ({ children }) => {
  return (
    <StyledTag className="tag is-warning is-medium is-rounded">
      <Icon>
        <TagIcon />
      </Icon>
      {children}
      <button className="delete is-small"></button>
    </StyledTag>
  );
};

const StyledTag = styled.span`
  margin: 5px 3px 3px 5px;
`;
export default IconTag;
