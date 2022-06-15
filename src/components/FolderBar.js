import { BorderRadius, Colors, FontSize, Media } from '../styles';

import { Box } from 'react-bulma-components';
import { FOLDER } from '../constants/business';
import FolderAddForm from './FolderAddForm';
import FolderBox from './FolderBox';
import { FontWeight } from '../styles/font';
import Modals from './modals/Modals';
import Plus from './icons/Plus';
import { REACT_QUERY_KEY } from '../constants/query';
import { folderHighlightState } from '../state/folderState';
import { onSelectFolderList } from '../api/folderApi';
import styled from '@emotion/styled';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

const FolderBar = () => {
  const folderHighlight = useRecoilValue(folderHighlightState);
  const [folderModalActive, setFolderModalActive] = useState(false);
  const { isLoading, data: folders } = useQuery(REACT_QUERY_KEY.FOLDERS, onSelectFolderList);

  return (
    <StyledFolderBar>
      <br />
      {isLoading ? (
        <div>...loading</div>
      ) : (
        <>
          {folders.map((value, index) => {
            return (
              <FolderBox
                key={value.folderId}
                parent={
                  value.level < FOLDER.DEPTH_LIMIT
                    ? false
                    : { id: value.parentId, name: value.parentName }
                }
                folderId={value.folderId}
                idx={index}
                highlight={folderHighlight[index]}
                level={value.level}
              >
                {value.level === 0 ? '미분류' : value.name || '이름없음'}
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
