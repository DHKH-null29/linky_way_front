import { Columns, Hero } from 'react-bulma-components';

import DownCards from '../components/DownCards';
import FolderBar from '../components/FolderBar';
import SearchLayout from '../components/SearchLayout';
import { currentCardState } from '../state/cardState';
import { loginState } from '../state/loginState';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const CardPage = () => {
  const login = useRecoilValue(loginState);
  const currentCards = useRecoilValue(currentCardState);
  const navigate = useNavigate();
  if (!login) {
    navigate('/login');
  }
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

const FolderBarWrapper = styled(Columns.Column)`
  z-index: 1;
`;

export default CardPage;
