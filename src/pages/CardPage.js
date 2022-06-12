import { Columns, Hero } from 'react-bulma-components';
import { FontSize, Media } from '../styles';
import { Link, useNavigate } from 'react-router-dom';
import {
  currentCardClassifier,
  currentCardState,
  currentDefaultCardState,
} from '../state/cardState';
import { useEffect, useState } from 'react';
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
import useAsync from '../hooks/useAsync';

const CardPage = () => {
  const login = useRecoilValue(loginState);
  const setFolderHighlight = useSetRecoilState(folderHighlightState);
  const [cardClassifier, setCardClassifer] = useRecoilState(currentCardClassifier);
  const [currentCards, setCurrentCards] = useRecoilState(currentCardState);
  const [defaultCards, setDefaultCards] = useRecoilState(currentDefaultCardState);
  const [cardAddModalActive, setCardAddModalActive] = useState(false);
  const navigate = useNavigate();
  if (!login) {
    navigate('/login');
  }

  const onLoadCards = async () => {
    return await onSelectCardsByDefaultMember();
  };
  const [state, fetch] = useAsync(onLoadCards, [], true);
  useEffect(() => {
    if (!defaultCards || !defaultCards.updated) {
      console.log('fetch default cards');
      (async () => {
        const result = await fetch();
        setDefaultCards({ data: result.data, updated: true });
      })();
    }
  }, [defaultCards.updated, state]);

  useEffect(() => {
    if (!cardClassifier.classifier) {
      setCurrentCards(defaultCards.data);
      setFolderHighlight([]);
    }
  }, [cardClassifier.classifier, defaultCards.data]);

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
                  setCurrentCards(defaultCards.data);
                  setFolderHighlight([]);
                  setCardClassifer({ classifier: false });
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
                {cardClassifier.classifier &&
                  ' >  ' +
                    cardClassifier.classifier +
                    '> ' +
                    (cardClassifier.parent ? cardClassifier.parent.name + ' > ' : '') +
                    cardClassifier.name}
                <hr />
              </Classifier>
            </Columns>
            <Columns className="is-mobile">
              {currentCards &&
                currentCards.map((value, index) => {
                  return (
                    <Columns.Column
                      key={index}
                      className="is-3-desktop  is-6-tablet is-half-mobile"
                    >
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
