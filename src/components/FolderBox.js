import AnimatedIcon from './icons/AnimatedIcon';
import { Colors } from '../styles';
import { Columns } from 'react-bulma-components';
import FolderArrow from './icons/FolderArrow';
import { memo } from 'react';
import styled from '@emotion/styled';

const FolderBox = ({ children, hasParent, highlight, onClickHightlight, ...props }) => {
  return (
    <Wrapper className="is-mobile" onClick={onClickHightlight} {...props}>
      {hasParent && (
        <FolderColumn className="is-2">
          <FolderArrow />
        </FolderColumn>
      )}
      <FolderColumn className="is-2">
        <AnimatedIcon.Folder />
      </FolderColumn>
      <FolderNameColumn highlight={highlight ? 1 : 0}>{children}</FolderNameColumn>
    </Wrapper>
  );
};

FolderBox.defaultProps = {
  hasParent: false,
};

const Wrapper = styled(Columns)`
  :hover {
    background-color: ${Colors.backgroundEvent};
  }
`;

const FolderColumn = styled(Columns.Column)`
  padding: 0.25rem;
  margin-right: -0.75rem;
  margin-left: 0.5rem;
`;

const FolderNameColumn = styled(FolderColumn)`
  color: ${({ highlight }) => (highlight ? Colors.linkFirst : 'black')};
`;

export default memo(FolderBox);
