import { Icon } from 'react-bulma-components';
import TagIcon from './icons/TagIcon';
import styled from '@emotion/styled';

const IconTag = ({ size, children, writable }) => {
  const SpanClassName = 'tag is-warning is-rounded is-' + size;
  const IconClassName = 'is' + size;
  return (
    <span className={SpanClassName}>
      <Icon className={IconClassName}>
        <TagIcon />
        &nbsp;
      </Icon>
      {children}
      {writable && <button className="delete is-small"></button>}
    </span>
  );
};

IconTag.defaultProps = {
  size: 'large',
  writable: false,
};

export default IconTag;
