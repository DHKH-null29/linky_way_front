import { Colors, FontSize, Media } from '../styles';
import { cardChangeState, currentCardState } from '../state/cardState';
import { memo, useCallback, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import AnimatedIcon from './icons/AnimatedIcon';
import FolderArrow from './icons/FolderArrow';
import { Icon } from 'react-bulma-components';
import { folderHighlightState } from '../state/folderState';
import { onSelectCardsByFolder } from '../api/cardApi';
import styled from '@emotion/styled';
import useAsync from '../hooks/useAsync';

const FolderBox = ({ children, folderId, highlight, idx, hasParent }) => {
  const setCurrentCards = useSetRecoilState(currentCardState);
  const setFolderHighlight = useSetRecoilState(folderHighlightState);
  const [cardChange, setCardChange] = useRecoilState(cardChangeState);

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
    const result = await onSelectCardsByFolder(folderId);
    return result;
  };
  const [state, fetch] = useAsync(handleGetCards, [], true);

  const handleClick = useCallback(async () => {
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
    }
  }, [highlight]);

  return (
    <>
      <Wrapper onClick={handleClick}>
        {hasParent && (
          <Icon className="is-large">
            <span>
              <FolderArrow />
            </span>
          </Icon>
        )}
        <Icon className="is-large">
          <AnimatedIcon.Folder size={30} />
        </Icon>
        <FolderName highlight={highlight ? 1 : 0}>{children}</FolderName>
      </Wrapper>
    </>
  );
};

FolderBox.defaultProps = {
  hasParent: false,
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
  color: ${({ highlight }) => (highlight ? Colors.linkFirst : 'black')};
  display: inline-block;
  font-size: ${FontSize.large};
  @media ${Media.tablet} {
    font-size: ${FontSize.small};
  }
  @media ${Media.mobile} {
    font-size: ${FontSize.small};
  }
`;

export default memo(FolderBox);
