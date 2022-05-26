import { Icon } from 'react-bulma-components';
import TagIcon from '../components/icons/TagIcon';

const Tagtag = ({ children }) => {
  return (
    <span className="tag is-warning is-medium is-rounded">
      <Icon>
        <TagIcon />
      </Icon>
      {children}
      <button className="delete is-small"></button>
    </span>
  );
};

export default Tagtag;
