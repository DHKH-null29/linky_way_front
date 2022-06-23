import { Columns, Container, Hero } from 'react-bulma-components';

import EmailValidationForm from '../components/email/EmailValidationForm';
import JoinForm from '../components/member/JoinForm';
import PageTitle from '../components/common/PageTitle';
import styled from '@emotion/styled';
import { useState } from 'react';

const JoinPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <>
      <PageTitle>{formSubmitted ? '이메일 인증' : '회원가입'}</PageTitle>
      <Hero size={'small'}>
        <StyledHeroBody>
          <Container>
            <Columns.Column
              className="is-half-desktop is-offset-3-desktop is-8-tablet is-offset-2-tablet is-fullwidth-mobile"
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {formSubmitted ? (
                <EmailValidationForm />
              ) : (
                <JoinForm setFormSubmitted={setFormSubmitted} />
              )}
            </Columns.Column>
          </Container>
        </StyledHeroBody>
      </Hero>
    </>
  );
};

const StyledHeroBody = styled(Hero.Body)``;

export default JoinPage;
