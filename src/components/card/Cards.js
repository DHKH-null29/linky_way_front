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
    <div ref={hoverRef} style={{ position: 'relative' }}>
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
                {currentData.title.length > 17
                  ? currentData.title.substr(0, 15) + '..'
                  : currentData.title}
              </h3>
            </div>
          </div>
        )}
        <CardContent>
          <StyleTitle>{title || '제목없음'}</StyleTitle>
          <StyleContent className="mb-1">{content || '설명없음'}</StyleContent>
        </CardContent>
      </StyleCard>
      {isHovered && (
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
    </div>
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
    align-items: center;
    @media ${Media.desktop} {
      font-size: ${FontSize.normal};
      height: 1.5rem;
    }
    @media ${Media.tablet} {
      font-size: ${FontSize.small};
      height: 1.2rem;
    }
    @media ${Media.mobile} {
      font-size: ${FontSize.micro};
      height: 1.2rem;
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
`;

const StyledCardHoveredButtonGroups = styled.div`
  button {
    color: white;
    background-color: black;
    opacity: 1;
    @media ${Media.tablet} {
      font-size: ${FontSize.small};
    }
    @media ${Media.mobile} {
      font-size: 10px;
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
  overflow-x: hidden;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${Media.desktop} {
    font-size: ${FontSize.normal};
    min-height: ${FontSize.medium};
    height: 1.8rem;
  }
  @media ${Media.tablet} {
    font-size: ${FontSize.normal};
    min-height: ${FontSize.medium};
    height: 1.6rem;
  }
  @media ${Media.mobile} {
    font-size: ${FontSize.micro};
    min-height: ${FontSize.small};
    height: 1.2rem;
  }
`;

const StyleContent = styled(Content)`
  line-height: 1em;
  overflow: hidden;
  @media ${Media.desktop} {
    font-size: ${FontSize.small};
    min-height: 40px;
    max-height: 40px;
  }
  @media ${Media.tablet} {
    font-size: ${FontSize.small};
    min-height: 40px;
    max-height: 40px;
  }
  @media ${Media.mobile} {
    font-size: 0.6rem;
    min-height: 20px;
    max-height: 20px;
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
