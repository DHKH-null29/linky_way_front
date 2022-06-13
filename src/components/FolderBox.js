import { Colors, FontSize, Media, Shadows } from '../styles';
import { cardChangeState, currentCardClassifier, currentCardState } from '../state/cardState';
import { folderHighlightState, folderListState } from '../state/folderState';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { onDeleteFolder, onUpdateFolderName } from '../api/folderApi';
import { useRecoilState, useSetRecoilState } from 'recoil';

import AnimatedIcon from './icons/AnimatedIcon';
import Close from './icons/Close';
import Edit from './icons/Edit';
import { FOLDER } from '../constants/business';
import FolderArrow from './icons/FolderArrow';
import { FontWeight } from '../styles/font';
import { Icon } from 'react-bulma-components';
import Swal from 'sweetalert2';
import { onSelectCardsByFolder } from '../api/cardApi';
import styled from '@emotion/styled';
import useAsync from '../hooks/useAsync';

const FolderBox = ({ children, folderId, highlight, idx, parent, level }) => {
  const setCurrentCards = useSetRecoilState(currentCardState);
  const setFolderHighlight = useSetRecoilState(folderHighlightState);
  const setCardClassfier = useSetRecoilState(currentCardClassifier);
  const [folderList, setFolderList] = useRecoilState(folderListState);
  const [mouseOver, setMouseOver] = useState(false);
  const [modifiable, setModifiable] = useState(false);
  const [cardChange, setCardChange] = useRecoilState(cardChangeState);
  const folderInputRef = useRef();
  useEffect(() => {
    if (highlight && cardChange) {
      (async () => {
        const result = await fetch();
        setCurrentCards(result.data);
        setCardChange(false);
      })();
    }
  }, [cardChange]);
  const handleGetCards = async () => {
    const findDeep = level < FOLDER.DEPTH_LIMIT ? true : false;
    return await onSelectCardsByFolder(folderId, findDeep);
  };
  const [state, fetch] = useAsync(handleGetCards, [], true);

  const handleMouseOver = () => {
    setMouseOver(true);
  };

  const handleMouseLeave = () => {
    setMouseOver(false);
  };

  const handleNameClick = useCallback(async () => {
    if (!highlight) {
      const newArray = [];
      newArray[idx] = true;
      setFolderHighlight(newArray);
      if (!state.data) {
        await fetch().then(response => {
          setCurrentCards(response.data);
        });
      }
      if (state.data) {
        setCurrentCards(state.data.data);
      }
      setCardClassfier({ id: folderId, classifier: '폴더', name: children, parent: parent });
    }
  }, [highlight]);

  const handleDeleteButtonClick = () => {
    Swal.fire({
      icon: 'question',
      text: '정말 폴더를 삭제하실거예요?',
      showCancelButton: true,
      confirmButtonColor: `${Colors.successFirst}`,
      cancelButtonColor: `${Colors.warningFirst}`,
      confirmButtonText: '네',
      cancelButtonText: '아니요',
    }).then(result => {
      if (result.isConfirmed) {
        onDeleteFolder(folderId).then(() => {
          const newFolderList = [...folderList];
          setFolderList(newFolderList.filter(folder => folder.folderId !== folderId));
        });
      }
    });
  };

  const handleUpdateButtonClick = async () => {
    const inputName = folderInputRef.current.value;
    if (inputName === children || inputName === '' || inputName.length > 10) {
      return;
    }
    const result = await onUpdateFolderName(folderId, inputName);
    if (result.code === 200) {
      const newFolder = { ...folderList[idx] };
      newFolder.name = inputName;
      const newFolderList = [...folderList];
      newFolderList[idx] = newFolder;
      setFolderList(newFolderList);
    }
  };

  return (
    <Wrapper onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
      &nbsp;
      {parent && (
        <Icon className="is-large">
          <span>
            <FolderArrow />
          </span>
        </Icon>
      )}
      <Icon className="is-large">
        <AnimatedIcon.Folder size={30} />
      </Icon>
      {!modifiable && (
        <FolderName onClick={handleNameClick} highlight={highlight ? 1 : 0}>
          {children}
        </FolderName>
      )}
      {modifiable && (
        <FolderNameInput ref={folderInputRef} className="input" placeholder={children} />
      )}
      <span>&nbsp;&nbsp;</span>
      {mouseOver && (
        <FolderModification>
          &nbsp;
          <Edit
            size={16}
            color={modifiable ? 'black' : 'none'}
            onClick={() => {
              setModifiable(!modifiable);
              if (modifiable) {
                handleUpdateButtonClick();
              }
            }}
          />
          &nbsp;
          {!modifiable && <Close size={16} onClick={handleDeleteButtonClick} />}
          {modifiable && (
            <Close
              size={16}
              onClick={() => {
                setModifiable(false);
              }}
            />
          )}
        </FolderModification>
      )}
    </Wrapper>
  );
};

FolderBox.defaultProps = {
  parent: undefined,
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  @media ${Media.desktop} {
    margin-left: 0.15rem;
    width: 90%;
  }
  @media ${Media.tablet} {
    margin-left: -0.35rem;
    width: 100%;
  }
  @media ${Media.mobile} {
    width: 100%;
  }
  :hover {
    background-color: ${Colors.backgroundEvent};
  }
`;

const FolderName = styled.span`
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

const FolderNameInput = styled.input`
  font-size: 0.95rem;
  width: 50%;
`;

const FolderModification = styled.span`
  & > * {
    border-radius: 20%;
  }
  > :hover {
    cursor: pointer;
    box-shadow: ${Shadows.card};
    transform: scale(1.3);
    fill: black;
  }
`;

export default memo(FolderBox);
