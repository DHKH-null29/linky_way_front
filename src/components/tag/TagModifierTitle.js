import { Columns } from 'react-bulma-components';

const TagModifierTitle = ({ left, center, right }) => {
  return (
    <Columns className="is-mobile mb-0 pb-0">
      <Columns.Column className="is-5">
        <span className="pl-2 is-size-6-mobile is-size-5-desktop">{left && '[' + left + ']'}</span>
      </Columns.Column>
      <Columns.Column className="is-5">{center && '[' + center + ']'}</Columns.Column>
      <Columns.Column className="is-2">
        <span className="is-size-6-mobile is-size-5-desktop" style={{ whiteSpace: 'nowrap' }}>
          {right && '[' + right + ']'}
        </span>
      </Columns.Column>
    </Columns>
  );
};

export default TagModifierTitle;
