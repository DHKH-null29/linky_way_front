import { CARD_CLASSIFIER, REACT_QUERY_KEY, getCardQueryKeyByClassifier } from '../constants/query';
import { Columns, Container, Hero } from 'react-bulma-components';
import { FontSize, Media } from '../styles';
import { Link, useNavigate } from 'react-router-dom';
import { cardChangeState, currentCardClassifier, currentCardState } from '../state/cardState';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import CardAddForm from '../components/card/CardAddForm';
import DownCards from '../components/card/Cards';
import FolderBar from '../components/folder/FolderBar';
import Modals from '../components/modals/Modals';
import RightLowerSideBar from '../components/card/RightLowerSideBar';
import RightUpperSideBar from '../components/card/RightUpperSideBar';
import SearchLayout from '../components/card/SearchLayout';
import { folderHighlightState } from '../state/folderState';
import { loginState } from '../state/loginState';
import { onSelectCardsByDefaultMember } from '../api/cardApi';
import { pagingRequestWrapper } from '../api/config';
import styled from '@emotion/styled';
import { tagHighlightState } from '../state/tagState';
import { useEagerPagingQuery } from '../hooks/useQuery';
import { useInView } from 'react-intersection-observer';
import { useQueryClient } from 'react-query';
import useScroll from '../hooks/useScroll';

const CardPage = () => {
  const queryClient = useQueryClient();
  const login = useRecoilValue(loginState);
  const setFolderHighlight = useSetRecoilState(folderHighlightState);
  const setTagHighlight = useSetRecoilState(tagHighlightState);
  const [cardClassifier, setCardClassifer] = useRecoilState(currentCardClassifier);
  const [currentCards, setCurrentCards] = useRecoilState(currentCardState);
  const [cardAddModalActive, setCardAddModalActive] = useState(false);
  const [cardChange, setCardChange] = useRecoilState(cardChangeState);
  const [mainPage, setMainPage] = useState(true);
  const { ref, inView } = useInView();

  const navigate = useNavigate();
  if (!login) {
    navigate('/login');
  }

  const { fetchNextPage, isLoading, isSuccess, hasNextPage, isFetchingNextPage, isFetching } =
    useEagerPagingQuery(REACT_QUERY_KEY.CARDS_BY_DEFAULT, ({ pageParam }) =>
      pagingRequestWrapper(() => onSelectCardsByDefaultMember(pageParam)),
    );
  const { y: sideBarY } = useScroll();
  useEffect(() => {
    if (isSuccess) {
      setMainPage(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!isLoading) {
      setCurrentCards(
        queryClient.getQueryData(
          getCardQueryKeyByClassifier(cardClassifier.classifier, cardClassifier.id),
        ),
      );
      setCardChange(false);
    }
  }, [cardClassifier, cardChange]);
  console.log(currentCards);
  useEffect(() => {
    if (inView) {
      cardClassifier.refetcher && cardClassifier.refetcher();
      setTimeout(() => setCardChange(true), 500);
    }
  }, [inView, currentCards]);

  useEffect(() => {
    if (mainPage) {
      setFolderHighlight([]);
      setTagHighlight([]);
      setCardClassifer({
        id: undefined,
        name: '',
        classifier: CARD_CLASSIFIER.DEFAULT,
        refetcher: fetchNextPage,
      });
      setMainPage(false);
    }
  }, [mainPage]);

  return (
    <div>
      <SearchLayout />
      <br />
      <Hero className="medium" style={{ position: 'relative' }}>
        <FolderBarWrapper style={{ top: sideBarY > 350 ? sideBarY - 300 : 0 }}>
          <FolderBar />
        </FolderBarWrapper>
        <RightUpperSideBarWrapper style={{ top: sideBarY > 350 ? sideBarY - 300 : 0 }}>
          <RightUpperSideBar />
        </RightUpperSideBarWrapper>
        <RightLowerSideBarWrapper style={{ top: sideBarY > 350 ? sideBarY - 50 : 250 }}>
          <RightLowerSideBar />
        </RightLowerSideBarWrapper>
        <StyledContainer className="">
          <StyledHeroBody className="columns">
            <Columns.Column className="is-12">
              <Columns className="pl-2 m-3 pb-3">
                <StyledLink
                  className="mr-5 is-size-4-desktop is-size-7-mobile"
                  to={'/card'}
                  onClick={() => {
                    setMainPage(true);
                  }}
                >
                  전체보기
                </StyledLink>
                <StyledLink
                  className="is-size-4-desktop is-size-7-mobile"
                  to={'/card'}
                  onClick={() => {
                    setCardAddModalActive(true);
                  }}
                >
                  카드추가+
                </StyledLink>
              </Columns>
              <Columns className="pt-4 pb-1 m-0">
                <Classifier className="pl-2">
                  &nbsp;[분류] ::&nbsp; <span>전체</span>
                  {cardClassifier.classifier.type &&
                    ' >  ' + cardClassifier.classifier.name + ' > ' + cardClassifier.name}
                  <hr />
                </Classifier>
              </Columns>
              <CardColumn className="is-mobile">
                {currentCards.pages &&
                  currentCards.pages.map(page =>
                    page.data.map((value, innerIndex) => (
                      <Columns.Column
                        key={innerIndex}
                        className="is-3-desktop is-6-tablet is-half-mobile"
                      >
                        <div>
                          <DownCards
                            id={value.cardId}
                            title={value.title}
                            content={value.content}
                            link={value.link}
                            tagList={value.tags}
                          />
                        </div>
                      </Columns.Column>
                    )),
                  )}
              </CardColumn>
              {currentCards.pages && (
                <div ref={ref}>
                  {isFetchingNextPage
                    ? 'Loading more...'
                    : hasNextPage
                    ? 'Load Newer'
                    : 'Nothing more to load'}
                </div>
              )}
              <div>he{isFetching && !isFetchingNextPage ? 'Background Updating...' : null}</div>
            </Columns.Column>
            <Columns.Column className="is-1-desktop is-hidden-tablet"></Columns.Column>
            {cardAddModalActive && (
              <Modals
                title={'카드 등록'}
                active={cardAddModalActive}
                onClose={() => {
                  setCardAddModalActive(false);
                }}
              >
                <CardAddForm
                  active={cardAddModalActive}
                  onClose={() => {
                    setCardAddModalActive(false);
                  }}
                />
              </Modals>
            )}
          </StyledHeroBody>
        </StyledContainer>
      </Hero>
    </div>
  );
};

const CardColumn = styled(Columns)`
  @media ${Media.desktop} {
    max-width: 50vw;
  }
`;

const FolderBarWrapper = styled(Columns.Column)`
  z-index: 1;
  position: absolute;
  left: 7vw;
  width: 17vw;
  visibility: hidden;
  @media ${Media.desktop} {
    visibility: visible;
  }
`;

const RightUpperSideBarWrapper = styled(Columns.Column)`
  z-index: 1;
  position: absolute;
  right: 6vw;
  width: 17vw;
  visibility: hidden;
  @media ${Media.desktop} {
    visibility: visible;
  }
`;

const RightLowerSideBarWrapper = styled(Columns.Column)`
  z-index: 1;
  position: absolute;
  right: 6vw;
  top: 250px;
  width: 17vw;
  visibility: hidden;
  @media ${Media.desktop} {
    visibility: visible;
  }
`;

const StyledContainer = styled(Container)`
  @media ${Media.desktop} {
    min-width: 50%;
    max-width: 50%;
  }
  @media ${Media.tablet} {
    min-width: 95%;
  }
  @media ${Media.mobile} {
    min-width: 100%;
  }
`;

const Classifier = styled.div`
  font-size: ${FontSize.medium};
  @media ${Media.tablet} {
    font-size: ${FontSize.small};
  }
  @media ${Media.mobile} {
    font-size: ${FontSize.micro};
  }
`;

const StyledLink = styled(Link)`
  text-decoration: 1px solid underline;
  text-underline-offset: ${FontSize.micro};
  opacity: 0.7;
`;

const StyledHeroBody = styled(Hero.Body)`
  @media ${Media.desktop} {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

export default CardPage;
