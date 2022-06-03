import { BorderRadius, Colors, Media } from '../styles';
import { folderHighlightState, folderSelector } from '../state/folderState';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';

import { Box } from 'react-bulma-components';
import FolderBox from './FolderBox';
import styled from '@emotion/styled';
import { useMemo } from 'react';

const FolderBar = () => {
  const folderList = useRecoilValueLoadable(folderSelector);
  const folderHighlight = useRecoilValue(folderHighlightState);
  const folders = useMemo(() => {
    if (folderList.state === 'hasValue') {
      return folderList.contents.data;
    }
  }, [folderList]);

  return (
    <StyledFolderBar>
      <br />
      {folderList.state !== 'hasValue' ? (
        <div>...loading</div>
      ) : (
        <>
          <FolderBox
            key={folders.folderId}
            hasParent={false}
            folderId={folders.folderId}
            idx={0}
            highlight={folderHighlight[0]}
          >
            미분류
          </FolderBox>
          {folders.childFolderList.map((value, index) => {
            const currentIndex = index + 1;
            let prevChildIndex = 0;
            return (
              <div key={index}>
                <FolderBox
                  key={value.folderId}
                  hasParent={false}
                  folderId={value.folderId}
                  idx={currentIndex + prevChildIndex}
                  highlight={folderHighlight[currentIndex + prevChildIndex]}
                >
                  {value.name}
                </FolderBox>

                {value.childFolderList &&
                  value.childFolderList.map((child, index) => {
                    prevChildIndex = index + 1;
                    return (
                      <FolderBox
                        key={child.folderId}
                        hasParent={{ id: value.folderId, name: value.name }}
                        folderId={child.folderId}
                        idx={currentIndex + prevChildIndex}
                        highlight={folderHighlight[currentIndex + prevChildIndex]}
                      >
                        {child.name}
                      </FolderBox>
                    );
                  })}
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
