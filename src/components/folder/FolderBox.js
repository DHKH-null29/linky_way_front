import { CARD_CLASSIFIER, REACT_QUERY_KEY } from '../../constants/query';
import { Colors, FontSize, Media, Shadows } from '../../styles';
import { memo, useEffect, useRef, useState } from 'react';
import { onDeleteFolder, onUpdateFolderName } from '../../api/folderApi';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import AnimatedIcon from '../icons/AnimatedIcon';
import { FOLDER } from '../../constants/business';
import { FontWeight } from '../../styles/font';
import { Icon } from 'react-bulma-components';
import NormalIcon from '../icons/NormalIcon';
import Swal from 'sweetalert2';
import { currentCardClassifier } from '../../state/cardState';
import { folderHighlightState } from '../../state/folderState';
import { onSelectCardsByFolder } from '../../api/cardApi';
import styled from '@emotion/styled';
import { tagHighlightState } from '../../state/tagState';
import useMouseHover from '../../hooks/useMouseHover';
import { useSetRecoilState } from 'recoil';

const FolderBox = ({ children, folderId, highlight, idx, parent, level }) => {
  const FOLDER_QUERY_KEY = REACT_QUERY_KEY.FOLDERS;
  const queryClient = useQueryClient();
  const folders = queryClient.getQueryData(FOLDER_QUERY_KEY);
  const setFolderHighlight = useSetRecoilState(folderHighlightState);
  const setTagHighlight = useSetRecoilState(tagHighlightState);
  const setCardClassfier = useSetRecoilState(currentCardClassifier);
  const [modifiable, setModifiable] = useState(false);
  const folderInputRef = useRef();
  const [hoverRef, isHovered] = useMouseHover();
  const [childrenHover, setChildrenHover] = useState(children);

  const changeHighlightState = () => {
    if (!highlight) {
      const newArray = [];
      newArray[idx] = true;
      setFolderHighlight(newArray);
      setTagHighlight([]);
    }
  };

  const handleGetCards = async () => {
    const findDeep = level < FOLDER.DEPTH_LIMIT ? true : false;
    return await onSelectCardsByFolder(folderId, findDeep).then(response => response.data);
  };

  const handleNameClick = async () => {
    const currentCardsByFolder = queryClient.getQueryData([
      REACT_QUERY_KEY.CARDS_BY_FOLDER,
      folderId,
    ]);
    if (!currentCardsByFolder) {
      await fetchCardsByFolder();
    }
    changeHighlightState();
    setCardClassfier({
      id: folderId,
      classifier: CARD_CLASSIFIER.FOLDER,
      name: children,
      parent: parent,
    });
  };

  const { refetch: fetchCardsByFolder } = useQuery(
    [REACT_QUERY_KEY.CARDS_BY_FOLDER, folderId],
    handleGetCards,
    {
      refetchOnWindowFocus: true,
      enabled: false,
    },
  );

  const folderNameModifyMutation = useMutation(
    inputName => onUpdateFolderName(folderId, inputName),
    {
      onMutate: async inputName => {
        await queryClient.cancelQueries(FOLDER_QUERY_KEY);
        const prevFolders = folders;
        const newFolders = [...prevFolders];
        newFolders[idx] = { ...newFolders[idx], name: inputName };
        queryClient.setQueryData(FOLDER_QUERY_KEY, newFolders);
        return { prevFolders };
      },

      onError: (error, values, context) => {
        Swal.fire({
          icon: 'error',
          text: error.errors[0].msg || '폴더 생성 실패',
        }).then(() => {
          queryClient.setQueriesData(FOLDER_QUERY_KEY, context.prevFolders);
        });
      },
    },
  );

  useEffect(() => {
    if (isHovered) {
      if (children.length >= FOLDER.NAME_LENGTH - 6 && children.match(/[가-힣]/)) {
        setChildrenHover(children.substr(0, FOLDER.NAME_LENGTH - 7) + '..');
        return;
      }
      if (children.length >= FOLDER.NAME_LENGTH - 4 && children.match(/^[a-zA-Z0-9_]*$/)) {
        setChildrenHover(children.substr(0, FOLDER.NAME_LENGTH - 5) + '..');
        return;
      }
    }

    setChildrenHover(children);
  }, [isHovered]);

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
          queryClient.setQueriesData(
            FOLDER_QUERY_KEY,
            folders.filter(
              folder => !(folder.folderId === folderId || folder.parentId === folderId),
            ),
          );
        });
      }
    });
  };

  const handleUpdateButtonClick = async () => {
    const inputName = folderInputRef.current.value;
    if (inputName === children || inputName === '') {
      return;
    }
    folderNameModifyMutation.mutate(inputName);
  };

  return (
    <Wrapper ref={hoverRef}>
      &nbsp;
      {parent &&
        [...Array(level)].map((value, index) => {
          const opacity = index === level - 1 ? 1 : 0;
          if (index === 0) {
            return;
          }

          return (
            <Icon key={index} className="is-medium">
              <span>
                &nbsp;
                <NormalIcon.FolderArrow size={15} opacity={opacity} />
              </span>
            </Icon>
          );
        })}
      <Icon className="is-medium">
        <AnimatedIcon.Folder size={20} />
      </Icon>
      {!modifiable && (
        <FolderName onClick={handleNameClick} highlight={highlight ? 1 : 0}>
          {childrenHover}
        </FolderName>
      )}
      {modifiable && (
        <FolderNameInput ref={folderInputRef} className="input" placeholder={children} />
      )}
      <span>&nbsp;&nbsp;</span>
      {level !== 0 && isHovered && (
        <FolderModification>
          &nbsp;
          <NormalIcon.Edit
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
          {!modifiable && <NormalIcon.Close size={16} onClick={handleDeleteButtonClick} />}
          {modifiable && (
            <NormalIcon.Close
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
  white-space: nowrap;
  align-items: center;
  @media ${Media.desktop} {
    width: 100%;
    max-height: 30px;
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
  font-size: 0.7vw;
  @media ${Media.tablet} {
    font-size: ${FontSize.small};
  }
  @media ${Media.mobile} {
    font-size: ${FontSize.micro};
  }
  :hover {
    font-weight: ${FontWeight.bold};
  }
`;

const FolderNameInput = styled.input`
  font-size: 0.7vw;
  width: 50%;
`;

const FolderModification = styled.span`
  & > * {
    border-radius: 20%;
    width: 0.75vw;
    height: 0.75vw;
  }
  > :hover {
    cursor: pointer;
    box-shadow: ${Shadows.card};
    transform: scale(1.3);
    fill: black;
  }
`;

export default memo(FolderBox);
