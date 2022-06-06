import { BorderRadius, Colors, Media } from '../styles';
import { folderHighlightState, folderListSelector, folderListState } from '../state/folderState';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';

import { Box } from 'react-bulma-components';
import FolderBox from './FolderBox';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const FolderBar = () => {
  const folderSelector = useRecoilValueLoadable(folderListSelector);
  const [folders, setFolders] = useRecoilState(folderListState);
  const folderHighlight = useRecoilValue(folderHighlightState);

  useEffect(() => {
    if (folderSelector.state === 'hasValue') {
      if (!folders || folders.length === 0) {
        setFolders(folderSelector.contents);
      }
    }
  }, [folderSelector]);

  return (
    <StyledFolderBar>
      <br />
      {folderSelector.state !== 'hasValue' ? (
        <div>...loading</div>
      ) : (
        <>
          {folders.map((value, index) => {
            return (
              <div key={index}>
                <FolderBox
                  key={value.folderId}
                  hasParent={value.level <= 2 ? false : true}
                  folderId={value.folderId}
                  idx={index}
                  highlight={folderHighlight[index]}
                >
                  {value.name}
                </FolderBox>
              </div>
            );
          })}
        </>
      )}
    </StyledFolderBar>
  );
};

const StyledFolderBar = styled(Box)`
  border-radius: ${BorderRadius.card};
  border: 1px solid ${Colors.mainSecond};
  @media ${Media.desktop} {
    min-height: 700px;
    position: sticky;
    top: 50px;
    width: 90%;
  }
  @media ${Media.tablet} {
    min-height: 600px;
    position: sticky;
    top: 55px;
  }
`;

export default FolderBar;
