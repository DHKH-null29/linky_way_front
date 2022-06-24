import { Container, Hero } from 'react-bulma-components';

import { FontWeight } from '../../styles/font';
import styled from '@emotion/styled';

const PageTitle = ({ children }) => {
  return (
    <Hero size={'medium'}>
      <Hero.Body className="mb-0 pb-2">
        <Container className="has-text-centered">
          <TitleText className="is-size-2-desktop is-size-3-tablet is-size-4-mobile">
            {children}
          </TitleText>
        </Container>
      </Hero.Body>
    </Hero>
  );
};

const TitleText = styled.p`
  font-weight: ${FontWeight.bold};
`;

export default PageTitle;
