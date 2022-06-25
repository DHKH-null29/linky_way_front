import { Columns, Container, Hero } from 'react-bulma-components';

import ChangePasswordForm from '../components/member/ChangePasswordForm';
import EmailValidationForm from '../components/email/EmailValidationForm';
import PageTitle from '../components/common/PageTitle';
import { useState } from 'react';

const FindPasswordPage = () => {
  const [verified, setVerified] = useState(false);
  const [email, setEmail] = useState();

  const getEmailFromEmailForm = email => {
    setEmail(email);
  };

  return (
    <>
      <PageTitle>
        {!verified ? '사용하시던 이메일로 인증해주세요' : '비밀번호를 재설정합니다'}
      </PageTitle>
      <Hero size={'small'}>
        <Hero.Body>
          <Container>
            <p>&nbsp;</p>
            <Columns.Column
              className="is-half-desktop is-offset-3-desktop is-8-tablet is-offset-2-tablet is-fullwidth-mobile"
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {verified ? (
                <ChangePasswordForm
                  purpose={'사용하실 새 비밀번호를 입력하세요'}
                  authRequest={false}
                  email={email}
                />
              ) : (
                <EmailValidationForm
                  onSuccess={() => setVerified(true)}
                  isJoinRequest={false}
                  setEmail={getEmailFromEmailForm}
                />
              )}
            </Columns.Column>
          </Container>
        </Hero.Body>
      </Hero>
    </>
  );
};

export default FindPasswordPage;
