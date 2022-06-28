import { Columns, Container, Hero } from 'react-bulma-components';

import EmailValidationForm from '../components/email/EmailValidationForm';
import JoinForm from '../components/member/JoinForm';
import PageTitle from '../components/common/PageTitle';
import Swal from 'sweetalert2';
import { currentJoinFormState } from '../state/joinState';
import { onJoin } from '../api/memberApi';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { useState } from 'react';

const JoinPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [currentJoinForm, setCurrentJoinForm] = useRecoilState(currentJoinFormState);

  const onSuccessJoin = async () => {
    return onJoin(currentJoinForm)
      .then(() => {
        setCurrentJoinForm(undefined);
        Swal.fire({
          icon: 'success',
          text: '회원가입 성공!',
        }).then(() => {
          window.location.href = '/';
        });
      })
      .catch(error => {
        Swal.fire({
          icon: 'fail',
          text: error.details || error.message || '회원가입 실패!',
        });
      });
  };

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
                <EmailValidationForm
                  onSuccess={onSuccessJoin}
                  isJoinRequest={true}
                  email={currentJoinForm.email}
                />
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
