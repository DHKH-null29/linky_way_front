import { BorderRadius, Colors, FontSize, Media, Shadows } from '../styles';
import { Card, Content } from 'react-bulma-components';
import {
  currentCardByFolderSelector,
  currentDefaultCardState,
  globalCardChangeState,
} from '../state/cardState';
import { memo, useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { FontWeight } from '../styles/font';
import Swal from 'sweetalert2';
import { linkPreviewState } from '../state/linkPreviewState';
import { onDeleteCard } from '../api/cardApi';
import { onSelectCardLinkPreview } from '../api/linkPreviewApi';
import styled from '@emotion/styled';
import useAsync from '../hooks/useAsync';

const DownCards = ({ title, content, id, link, writable = true }) => {
  const [linkPreview, setLinkPreview] = useRecoilState(linkPreviewState);
  const setDeleteCardHasFolder = useSetRecoilState(
    currentCardByFolderSelector({ requestType: 'delete' }),
  );
  const [defaultCards, setDefaultCards] = useRecoilState(currentDefaultCardState);
  const setGlobalCardChange = useSetRecoilState(globalCardChangeState);
  const [currentData, setCurrentData] = useState();
  const handleDeleteClick = async () => {
    Swal.fire({
      icon: 'question',
      text: '정말 북마크를 삭제하실거예요?',
      showCancelButton: true,
      confirmButtonColor: `${Colors.successFirst}`,
      cancelButtonColor: `${Colors.warningFirst}`,
      confirmButtonText: '네',
      cancelButtonText: '아니요',
    }).then(async result => {
      if (result.isConfirmed) {
        onDeleteCard(id)
          .then(() => {
            setDeleteCardHasFolder({ cardId: id });
            setDefaultCards({
              ...defaultCards,
              data: defaultCards.data.filter(card => card.cardId !== id),
            });
            setGlobalCardChange(true);
          })
          .catch(error => {
            Swal.fire({
              icon: 'error',
              text: error.details,
            });
          });
      }
    });
  };
  const getCardPreview = async () => {
    const result = await onSelectCardLinkPreview(link);
    return result;
  };
  const [state, fetch] = useAsync(getCardPreview, [], true);
  useEffect(() => {
    if (!linkPreview[link]) {
      (async () => {
        const result = await fetch();
        setCurrentData(result);
        const newLinkPreview = { ...linkPreview };
        newLinkPreview[link] = result;
        setLinkPreview(newLinkPreview);
      })();
    } else {
      setCurrentData(linkPreview[link]);
    }
  }, [link]);

  return (
    <StyleCard ok={currentData && currentData.ok ? 1 : 0}>
      {writable && <DeleteButton className="delete" onClick={handleDeleteClick}></DeleteButton>}
      <Card.Content className="pt-1 pb-1"></Card.Content>
      {state.loading && <div>...loading</div>}
      {state.error && <div>...error!</div>}
      {currentData && (
        <div
          data-testid="container"
          className="Container "
          style={{ backgroundColor: 'white', borderColor: 'rgb(204, 204, 204)' }}
        >
          <div
            data-testid="image-container"
            className="Image"
            onClick={() => {
              location.herf = link;
            }}
            style={{
              cursor: 'pointer',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%',
              backgroundImage: `url("${currentData.image}")`,
            }}
          ></div>
          <div className="LowerContainer">
            <h3 data-testid="title" className="Title">
              {currentData.title.length > 33
                ? currentData.title.substr(0, 30) + '...'
                : currentData.title}
            </h3>
            <span data-testid="desc" className="Description Secondary">
              {currentData.description.length > 43
                ? currentData.description.substr(0, 40) + '...'
                : currentData.description}
            </span>
          </div>
        </div>
      )}
      <CardContent>
        <StyleTitle>{title || '제목없음'}</StyleTitle>
        <StyleContent className="mb-1">{content || '설명없음'}</StyleContent>
      </CardContent>
    </StyleCard>
  );
};

const StyleCard = styled(Card)`
  font-family: 'ImcreSoojin';
  width: 100%;
  border-radius: ${BorderRadius.card};
  background-color: ${({ ok }) => (ok ? Colors.layout : Colors.warningSecond)};
  box-shadow: ${Shadows.card};
  :hover {
    box-shadow: ${Shadows.section};
  }

  .Secondary {
    text-align: left;
    align-items: center;
    display: flex;
    height: 3.5rem;

    @media ${Media.desktop} {
      font-size: ${FontSize.normal};
    }
    @media ${Media.tablet} {
      font-size: ${FontSize.small};
    }
    @media ${Media.mobile} {
      font-size: 0.5rem;
      height: 2.5rem;
    }
  }
  .SiteDetails {
    display: none;
  }
  .Title {
    margin-bottom: 0;
    font-weight: ${FontWeight.bold};
    overflow: hidden;
    text-align: center;
    justify-content: center;

    display: flex;
    align-items: center;
    @media ${Media.desktop} {
      font-size: ${FontSize.normal};
      height: 3.5rem;
    }
    @media ${Media.tablet} {
      font-size: ${FontSize.small};
      height: 3.5rem;
    }
    @media ${Media.mobile} {
      font-size: ${FontSize.micro};
      height: 2rem;
    }
  }
  .LowerContainer {
    @media ${Media.mobile} {
      padding-bottom: 0.2rem;
      padding-top: 0.2rem;
    }
  }
  .Image {
    :hover {
      box-shadow: ${Shadows.section};
    }
    @media ${Media.desktop} {
      font-size: ${FontSize.normal};
      height: 160px;
    }
    @media ${Media.tablet} {
      font-size: ${FontSize.small};
      height: 120px;
    }
    @media ${Media.mobile} {
      font-size: ${FontSize.micro};
      height: 60px;
    }
  }
`;

const CardContent = styled(Card.Content)`
  @media ${Media.desktop} {
    padding-top: 0.4rem;
    padding-bottom: 0.25rem;
  }
  @media ${Media.tablet} {
    padding-top: 0;
    padding-bottom: 0.1rem;
  }
  @media ${Media.mobile} {
    padding-bottom: 0;
    padding-top: 0;
    padding-left: 0.7rem;
    padding-right: 0.7rem;
  }
`;

const StyleTitle = styled.div`
  font-weight: ${FontWeight.bolder};
  line-height: 1.2em;
  overflow-x: hidden;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${Media.desktop} {
    font-size: ${FontSize.medium};
    min-height: ${FontSize.large};
    height: 3.5rem;
  }
  @media ${Media.tablet} {
    font-size: ${FontSize.normal};
    min-height: ${FontSize.medium};
    height: 3.5rem;
  }
  @media ${Media.mobile} {
    font-size: ${FontSize.small};
    min-height: ${FontSize.normal};
    height: 2.5rem;
  }
`;

const StyleContent = styled(Content)`
  line-height: 1em;
  overflow-y: hidden;
  @media ${Media.desktop} {
    font-size: ${FontSize.normal};
    min-height: 70px;
    max-height: 70px;
    padding-top: 0.35rem;
  }
  @media ${Media.tablet} {
    font-size: ${FontSize.small};
    min-height: 55px;
    max-height: 55px;
  }
  @media ${Media.mobile} {
    font-size: ${FontSize.micro};
    min-height: 50px;
    max-height: 50px;
    padding-top: 0.1rem;
  }
`;

const DeleteButton = styled.button`
  background-color: ${Colors.warningFirst};
  position: absolute;
  top: 0;
  left: 0;
  @media ${Media.desktop} {
    transform: scale(1.4);
  }
`;

export default memo(DownCards);
