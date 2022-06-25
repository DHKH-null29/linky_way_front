import { BorderRadius, Colors, FontSize, Media } from '../../styles';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { onChangeFolderPath, onSelectFolderList } from '../../api/folderApi';
import { useQuery, useQueryClient } from 'react-query';

import { Box } from 'react-bulma-components';
import { FOLDER } from '../../constants/business';
import FolderAddForm from './FolderAddForm';
import FolderBox from './FolderBox';
import { FontWeight } from '../../styles/font';
import Modals from '../modals/Modals';
import NormalIcon from '../icons/NormalIcon';
import { REACT_QUERY_KEY } from '../../constants/query';
import { folderHighlightState } from '../../state/folderState';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

const MOVE_TO_DROPPABLE = 'folderDroppable';
const MOVE_TO_SUPER_DROPPABLE = 'superDroppable';

const FolderBar = () => {
  const queryClient = useQueryClient();
  const folderHighlight = useRecoilValue(folderHighlightState);
  const [folderModalActive, setFolderModalActive] = useState(false);
  const {
    isLoading,
    data: folders,
    refetch: loadNewFolders,
  } = useQuery(REACT_QUERY_KEY.FOLDERS, onSelectFolderList);
  const [draggingFolderId, setDraggingFolderId] = useState();
  const [directoryChangeable, setDirectoryChangeable] = useState(false);

  const getFolderById = id => {
    return folders.find(folder => folder.folderId + '' === id + '');
  };

  const resetCardsByFolderQuery = () => {
    queryClient.resetQueries(REACT_QUERY_KEY);
  };

  const onDragEnd = result => {
    setDraggingFolderId(false);
    if (!result.destination) {
      return;
    }
    if (result.destination.droppableId === MOVE_TO_SUPER_DROPPABLE) {
      onChangeFolderPath(result.draggableId).then(() => {
        loadNewFolders();
        setDirectoryChangeable(false);
      });
      return;
    }

    if (directoryChangeable) {
      onChangeFolderPath(result.draggableId, folders[result.destination.index].folderId).then(
        () => {
          loadNewFolders();
          resetCardsByFolderQuery();
        },
      );
      setDirectoryChangeable(false);
    }
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
  };

  const onDragUpdate = result => {
    setDirectoryChangeable(false);
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    if (getFolderById(result.draggableId).level === 0) {
      return;
    }
    if (folders[result.destination.index].parentId + '' === result.draggableId + '') {
      return;
    }
    if (result.destination.droppableId === MOVE_TO_DROPPABLE) {
      const folderByIndex = folders[result.destination.index];
      if (folderByIndex.level === 0) {
        return;
      }
      if (getFolderById(result.draggableId).parentId === folderByIndex.folderId) {
        return;
      }
      if (folderByIndex.level < FOLDER.DEPTH_LIMIT) {
        setDirectoryChangeable(true);
        return;
      }
    }
    if (
      result.destination.droppableId === MOVE_TO_SUPER_DROPPABLE &&
      getFolderById(result.draggableId).parentId
    ) {
      setDirectoryChangeable(true);
      return;
    }
    setDirectoryChangeable(false);
  };

  const onDragStart = result => {
    setDraggingFolderId(result.draggableId);
  };

  const getItemStyle = (isDragging, draggableStyle, isDraggingOver) => ({
    userSelect: 'none',
    background:
      isDraggingOver && isDragging ? Colors.layout : isDragging ? Colors.warningFirst : 'none',
    ...draggableStyle,
  });

  const getItemChangeableStyle = draggableStyle => ({
    userSelect: 'none',
    background: Colors.successFirst,
    ...draggableStyle,
  });

  const makeFolderBox = (value, index) => {
    return (
      <FolderBox
        parent={value.level <= 1 ? false : { id: value.parentId, name: value.parentName }}
        folderId={value.folderId}
        idx={index}
        highlight={folderHighlight[index]}
        level={value.level}
      >
        {value.level === 0 ? '미분류' : value.name || '이름없음'}
      </FolderBox>
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate} onDragStart={onDragStart}>
      <StyledFolderBar>
        <FolderAddSection>
          &nbsp;
          <FolderAddText
            onClick={() => {
              setFolderModalActive(true);
            }}
          >
            &nbsp;&nbsp;추가하기
            <NormalIcon.Plus size={17} />
          </FolderAddText>
        </FolderAddSection>
        <br />
        {isLoading ? (
          <div>...loading</div>
        ) : (
          <div>
            <Droppable droppableId={MOVE_TO_DROPPABLE}>
              {(droppableProvided, droppableSnapshot) => (
                <div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
                  <div style={{ overflow: 'auto', minHeight: '400px' }}>
                    {folders.map((value, index) => {
                      return (
                        <div key={value.folderId}>
                          <Draggable draggableId={value.folderId + ''} index={index}>
                            {(draggableProvided, draggableSnapshot) => (
                              <div
                                ref={draggableProvided.innerRef}
                                {...draggableProvided.draggableProps}
                                {...draggableProvided.dragHandleProps}
                                style={
                                  directoryChangeable
                                    ? getItemChangeableStyle(draggableProvided.draggableProps.style)
                                    : getItemStyle(
                                        draggableSnapshot.isDragging,
                                        draggableProvided.draggableProps.style,
                                        droppableSnapshot.isDraggingOver,
                                      )
                                }
                              >
                                {(!draggingFolderId ||
                                  draggingFolderId + '' === value.folderId + '') &&
                                  makeFolderBox(value, index)}
                              </div>
                            )}
                          </Draggable>
                          {draggingFolderId && makeFolderBox(value, index)}
                        </div>
                      );
                    })}
                  </div>
                  {droppableProvided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId={MOVE_TO_SUPER_DROPPABLE}>
              {superDroppableProvided => (
                <div
                  {...superDroppableProvided.droppableProps}
                  ref={superDroppableProvided.innerRef}
                >
                  {draggingFolderId && getFolderById(draggingFolderId).parentId && (
                    <ChildFolderMoveSection className="has-text-centered p-1">
                      <p>&nbsp;</p>
                      <p>&nbsp;</p>
                      <p>최상위 폴더로</p>
                      <p>&nbsp;</p>
                      <p>&nbsp;</p>
                    </ChildFolderMoveSection>
                  )}
                  {!draggingFolderId && (
                    <div>
                      <p>&nbsp;</p> <p>&nbsp;</p> <p>&nbsp;</p> <p>&nbsp;</p> <p>&nbsp;</p>
                    </div>
                  )}
                  {superDroppableProvided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}
        <br />
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
    </DragDropContext>
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

const ChildFolderMoveSection = styled.div`
  width: 90%;
  background-color: ${Colors.backgroundForm};
  border: 1px dotted;
  border-radius: ${BorderRadius.card};
`;

export default FolderBar;
