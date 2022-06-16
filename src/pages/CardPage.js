import { CARD_CLASSIFIER, REACT_QUERY_KEY, getCardQueryKeyByClassifier } from '../constants/query';
import { Columns, Hero } from 'react-bulma-components';
import { FontSize, Media } from '../styles';
import { Link, useNavigate } from 'react-router-dom';
import { cardChangeState, currentCardClassifier, currentCardState } from '../state/cardState';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import CardAddForm from '../components/CardAddForm';
import DownCards from '../components/DownCards';
import FolderBar from '../components/FolderBar';
import Modals from '../components/modals/Modals';
import SearchLayout from '../components/SearchLayout';
import { folderHighlightState } from '../state/folderState';
import { loginState } from '../state/loginState';
import { onSelectCardsByDefaultMember } from '../api/cardApi';
import styled from '@emotion/styled';
import { tagHighlightState } from '../state/tagState';

const CardPage = () => {
  const queryClient = useQueryClient();
  const login = useRecoilValue(loginState);
  const setFolderHighlight = useSetRecoilState(folderHighlightState);
  const setTagHighlight = useSetRecoilState(tagHighlightState);
  const [cardClassifier, setCardClassifer] = useRecoilState(currentCardClassifier);
  const [currentCards, setCurrentCards] = useRecoilState(currentCardState);
  const [cardAddModalActive, setCardAddModalActive] = useState(false);
  const [cardChange, setCardChange] = useRecoilState(cardChangeState);

  const navigate = useNavigate();
  if (!login) {
    navigate('/login');
  }

  const { isSuccess, isLoading, data } = useQuery(REACT_QUERY_KEY.CARDS_BY_DEFAULT, () =>
    onSelectCardsByDefaultMember().then(response => response.data),
  );

  useEffect(() => {
    if (isSuccess) {
      setCurrentCards(data);
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

  return (
    <div>
      <SearchLayout />
      <br />
      <Hero className="medium">
        <Hero.Body className="columns">
          <FolderBarWrapper className="is-3-desktop is-3-tablet">
            <FolderBar></FolderBar>
          </FolderBarWrapper>
          <Columns.Column className="is-8-desktop is-9-tablet is-12-mobile">
            <Columns className="pl-2 m-3 pb-3">
              <StyledLink
                className="mr-5"
                to={'/card'}
                onClick={() => {
                  setFolderHighlight([]);
                  setTagHighlight([]);
                  setCardClassifer({
                    ...cardClassifier,
                    classifier: CARD_CLASSIFIER.DEFAULT,
                  });
                }}
              >
                전체보기
              </StyledLink>
              <StyledLink
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
                  ' >  ' +
                    cardClassifier.classifier.name +
                    ' > ' +
                    (cardClassifier.parent && cardClassifier.parent.id
                      ? (cardClassifier.parent.name || '이름없음') + ' > '
                      : '') +
                    cardClassifier.name}
                <hr />
              </Classifier>
            </Columns>
            <Columns className="is-mobile">
              {currentCards &&
                currentCards.map((value, index) => {
                  return (
                    <Columns.Column key={index} className="is-3-desktop is-6-tablet is-half-mobile">
                      <DownCards
                        id={value.cardId}
                        title={value.title}
                        content={value.content}
                        link={value.link}
                        tagList={value.tags}
                      />
                    </Columns.Column>
                  );
                })}
            </Columns>
          </Columns.Column>
          <Columns.Column className="is-1-desktop is-hidden-tablet"></Columns.Column>
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
        </Hero.Body>
      </Hero>
    </div>
  );
};

const FolderBarWrapper = styled(Columns.Column)`
  z-index: 1;
`;

const Classifier = styled.div`
  font-size: ${FontSize.huge};
  @media ${Media.tablet} {
    font-size: ${FontSize.large};
  }
  @media ${Media.mobile} {
    font-size: ${FontSize.normal};
  }
`;

const StyledLink = styled(Link)`
  text-decoration: 1px solid underline;
  text-underline-offset: ${FontSize.normal};
  opacity: 0.7;
  font-size: ${FontSize.huge};
  @media ${Media.tablet} {
    font-size: ${FontSize.large};
  }
  @media ${Media.mobile} {
    font-size: ${FontSize.normal};
  }
`;

export default CardPage;
