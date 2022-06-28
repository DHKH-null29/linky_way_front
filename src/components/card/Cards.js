import { BorderRadius, Colors, FontSize, Media, Shadows } from '../../styles';
import { Card, Container, Content } from 'react-bulma-components';
import { memo, useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import AnimatedIcon from '../icons/AnimatedIcon';
import Buttons from '../common/Buttons';
import CardAddForm from './CardAddForm';
import CardDetailBody from './CardDetailBody';
import { FontWeight } from '../../styles/font';
import Modals from '../modals/Modals';
import Swal from 'sweetalert2';
import Tab from '../common/Tab';
import { cardChangeState } from '../../state/cardState';
import { linkPreviewState } from '../../state/linkPreviewState';
import noimageImage from '../../assets/images/noimage.JPG';
import { onDeleteCard } from '../../api/cardApi';
import { onSelectCardLinkPreview } from '../../api/linkPreviewApi';
import styled from '@emotion/styled';
import useAsync from '../../hooks/useAsync';
import useCardChangeWithFolder from '../../hooks/useCardChangeWithFolder';
import useCardChangeWithTag from '../../hooks/useCardChangeWithTag';
import useMouseHover from '../../hooks/useMouseHover';

const Cards = ({ title, content, id, link, tagList, writable = true }) => {
  const [linkPreview, setLinkPreview] = useRecoilState(linkPreviewState);
  const [currentData, setCurrentData] = useState();
  const [modalActive, setModalActive] = useState(false);
  const [cardDetailModalActive, setCardDetailModalActive] = useState(false);
  const [cardUpdateModalActive, setCardUpdateModalActive] = useState(false);
  const setCardChange = useSetRecoilState(cardChangeState);

  const deleteCardChangeWithFolder = useCardChangeWithFolder('DELETE');
  const deleteCardChangeWithTag = useCardChangeWithTag('DELETE');

  const [hoverRef, isHovered] = useMouseHover();

  const handleDeleteClick = async () => {
    Swal.fire({
      icon: 'question',
      text: '휴지통으로 이동합니다',
      showCancelButton: true,
      confirmButtonColor: `${Colors.successFirst}`,
      cancelButtonColor: `${Colors.warningFirst}`,
      confirmButtonText: '네',
      cancelButtonText: '아니요',
    }).then(async result => {
      if (result.isConfirmed) {
        onDeleteCard(id)
          .then(() => {
            deleteCardChangeWithFolder(id);
            deleteCardChangeWithTag(tagList && tagList.map(tag => tag.tagId), id);
            setCardChange(true);
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

  const handleModalClose = () => {
    setModalActive(false);
  };

  return (
    <StyleCardWrapper ref={hoverRef} style={{ position: 'relative' }}>
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
              style={{
                cursor: 'pointer',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
                minHeight: '90px',
                backgroundImage: `url("${currentData.image}"), url("${noimageImage}")`,
              }}
            ></div>
            <div className="LowerContainer">
              <h3 data-testid="title" className="Title">
                {currentData.title.length > 37
                  ? currentData.title.substr(0, 33) + '..'
                  : currentData.title}
              </h3>
            </div>
          </div>
        )}
        <CardContent>
          <StyleTitle>{title.substr(0, 14) || '제목없음'}</StyleTitle>
          {1 !== 1 && <StyleContent className="mb-1">{content || '설명없음'}</StyleContent>}
        </CardContent>
      </StyleCard>
      {writable && isHovered && (
        <StyleCardHovered>
          <StyledCardHoveredButtonGroups>
            <Buttons
              className="mb-2"
              onClick={() => {
                window.open(link);
              }}
            >
              <AnimatedIcon.CommonInput />
              &nbsp;링크가기
            </Buttons>
            <Buttons
              className="mb-2"
              onClick={() => {
                setModalActive(true);
              }}
            >
              <AnimatedIcon.Search />
              &nbsp;상세보기
            </Buttons>
          </StyledCardHoveredButtonGroups>
        </StyleCardHovered>
      )}
      {modalActive && (
        <Modals title={title} active={modalActive} onClose={handleModalClose}>
          <Container>
            <Tab
              contents={['보기', '편집']}
              onClickList={[
                () => {
                  setCardDetailModalActive(true);
                  setCardUpdateModalActive(false);
                },
                () => {
                  setCardDetailModalActive(false);
                  setCardUpdateModalActive(true);
                },
              ]}
            />
          </Container>
          {cardUpdateModalActive && (
            <CardAddForm
              onClose={handleModalClose}
              currentCardId={id}
              active={modalActive}
              method="UPDATE"
            />
          )}
          {cardDetailModalActive && <CardDetailBody onClose={handleModalClose} cardId={id} />}
        </Modals>
      )}
    </StyleCardWrapper>
  );
};

const StyleCardWrapper = styled.div`
  @media ${Media.desktop} {
    max-width: 14vw;
  }
`;
const StyleCard = styled(Card)`
  font-family: 'ImcreSoojin';
  width: 100%;
  border-radius: ${BorderRadius.card};
  background-color: ${({ ok }) => (ok ? Colors.layout : Colors.warningSecond)};
  box-shadow: ${Shadows.card};
  @media ${Media.desktop} {
    max-width: 14vw;
  }
  :hover {
    box-shadow: ${Shadows.section};
  }
  .Secondary {
    text-align: left;
    align-items: center;
    display: flex;
    height: 3.5rem;

    @media ${Media.desktop} {
      font-size: ${FontSize.large};
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
    display: flex;
    align-items: center;
    justify-content: center;
    @media ${Media.desktop} {
      font-size: 0.7vw;
      height: 2.1vw;
    }
    @media ${Media.tablet} {
      font-size: 12px;
      height: 2.2rem;
    }
    @media ${Media.mobile} {
      white-space: nowrap;
      font-size: 10px;
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
      height: 6.5vw;
    }
    @media ${Media.tablet} {
      font-size: ${FontSize.small};
      height: 140px;
    }
    @media ${Media.mobile} {
      font-size: ${FontSize.micro};
      height: 60px;
    }
  }
  padding-bottom: 0.3rem;
`;

const StyleCardHovered = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0.82;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${BorderRadius.card};
  @media ${Media.desktop} {
    max-width: 14vw;
  }
`;

const StyledCardHoveredButtonGroups = styled.div`
  button {
    color: white;
    background-color: black;
    opacity: 1;
    font-size: 0.8vw;
    @media ${Media.tablet} {
      font-size: ${FontSize.micro};
    }
    @media ${Media.mobile} {
      font-size: 10px;
    }
  }
`;

const CardContent = styled(Card.Content)`
  @media ${Media.desktop} {
    padding-top: 0.4rem;
    padding-bottom: 0.2rem;
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
  overflow-x: hidden;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${Media.desktop} {
    font-size: 0.7vw;
    min-height: 2.1vw;
  }
  @media ${Media.tablet} {
    font-size: 12px;
    min-height: ${FontSize.medium};
  }
  @media ${Media.mobile} {
    font-size: 10px;
    min-height: ${FontSize.small};
  }
`;

const StyleContent = styled(Content)`
  line-height: 1em;
  overflow: hidden;
  font-size: 11px;
  opacity: 0.8;
  @media ${Media.desktop} {
    font-size: 0.6vw;
    min-height: 1.9vw;
    max-height: 1.9vw;
  }
  @media ${Media.tablet} {
    min-height: 40px;
    max-height: 40px;
  }
  @media ${Media.mobile} {
    min-height: 25px;
    max-height: 25px;
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
    z-index: 2;
  }
  z-index: 2;
`;

export default memo(Cards);
