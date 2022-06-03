import { Columns, Hero } from 'react-bulma-components';
import { FontSize, Media } from '../styles';
import { Link, useNavigate } from 'react-router-dom';
import {
  currentCardClassifier,
  currentCardState,
  currentDefaultCardState,
} from '../state/cardState';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import DownCards from '../components/DownCards';
import FolderBar from '../components/FolderBar';
import SearchLayout from '../components/SearchLayout';
import { folderHighlightState } from '../state/folderState';
import { loginState } from '../state/loginState';
import { onSelectCardsByDefaultMember } from '../api/cardApi';
import styled from '@emotion/styled';
import useAsync from '../hooks/useAsync';
import { useEffect } from 'react';

const CardPage = () => {
  const login = useRecoilValue(loginState);
  const [currentCards, setCurrentCards] = useRecoilState(currentCardState);
  const cardClassifier = useRecoilValue(currentCardClassifier);
  const [defaultCards, setDefaultCards] = useRecoilState(currentDefaultCardState);
  const setFolderHighlight = useSetRecoilState(folderHighlightState);

  const navigate = useNavigate();
  if (!login) {
    navigate('/login');
  }

  const onLoadCards = async () => {
    const result = await onSelectCardsByDefaultMember();
    return result;
  };
  const [state, fetch] = useAsync(onLoadCards, [], true);

  useEffect(() => {
    if (!defaultCards || defaultCards.length === 0) {
      console.log('fetch default cards');
      (async () => {
        const result = await fetch();
        setDefaultCards(result.data);
      })();
    }
  }, [defaultCards, state]);

  useEffect(() => {
    setFolderHighlight([]);
    setCurrentCards(defaultCards);
  }, [defaultCards]);

  return (
    <div>
      <SearchLayout />
      <br></br>
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
                  setCurrentCards(defaultCards);
                  setFolderHighlight([]);
                }}
              >
                전체보기
              </StyledLink>
              <StyledLink to={'/card'} onClick={() => {}}>
                카드추가+
              </StyledLink>
            </Columns>
            <Columns className="pt-4 pb-1 m-0">
              <Classifier className="pl-2">
                &nbsp;[분류] ::&nbsp; <span>전체</span>
                {' >  ' +
                  (cardClassifier.classifier ? cardClassifier.classifier + ' > ' : '') +
                  (cardClassifier.parent ? cardClassifier.parent.name + ' > ' : '') +
                  cardClassifier.name}
                <hr />
              </Classifier>
            </Columns>
            <Columns className="is-mobile">
              {currentCards.map((value, index) => {
                return (
                  <Columns.Column key={index} className="is-3-desktop  is-6-tablet is-half-mobile">
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
        </Hero.Body>
      </Hero>
    </div>
  );
};

const FolderBarWrapper = styled(Columns.Column)``;

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
