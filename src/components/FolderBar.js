import { BorderRadius, Colors, FontSize, Media } from '../styles';
import { folderHighlightState, folderListSelector, folderListState } from '../state/folderState';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';

import { Box } from 'react-bulma-components';
import FolderAddForm from './FolderAddForm';
import FolderBox from './FolderBox';
import { FontWeight } from '../styles/font';
import Modals from './modals/Modals';
import Plus from './icons/Plus';
import styled from '@emotion/styled';

const FolderBar = () => {
  const folderSelector = useRecoilValueLoadable(folderListSelector);
  const [folders, setFolders] = useRecoilState(folderListState);
  const folderHighlight = useRecoilValue(folderHighlightState);
  const [folderModalActive, setFolderModalActive] = useState(false);

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
              <FolderBox
                key={value.folderId}
                hasParent={
                  value.level <= 2 ? false : { parentId: value.parentId, name: value.parentName }
                }
                folderId={value.folderId}
                idx={index}
                highlight={folderHighlight[index]}
              >
                {value.name}
              </FolderBox>
            );
          })}
        </>
      )}
      <br />
      <FolderAddSection>
        &nbsp;
        <FolderAddText
          onClick={() => {
            setFolderModalActive(true);
          }}
        >
          &nbsp;&nbsp;추가하기
          <Plus size={17} />
        </FolderAddText>
      </FolderAddSection>
      <Modals
        active={folderModalActive}
        onClose={() => {
          setFolderModalActive(false);
        }}
      >
        <FolderAddForm
          onClose={() => {
            setFolderModalActive(false);
          }}
        />
      </Modals>
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

const FolderAddSection = styled.div`
  :hover {
    background-color: ${Colors.backgroundEvent};
  }
`;
const FolderAddText = styled.span`
  cursor: pointer;
  color: ${({ highlight }) => (highlight ? Colors.linkFirst : 'black')};
  display: inline-block;
  font-size: ${FontSize.medium};
  @media ${Media.tablet} {
    font-size: ${FontSize.small};
  }
  @media ${Media.mobile} {
    font-size: ${FontSize.small};
  }
  :hover {
    font-weight: ${FontWeight.bold};
  }
`;

export default FolderBar;
