import { Columns, Container, Hero } from 'react-bulma-components';

import AnimatedIcon from '../components/icons/AnimatedIcon';
import Buttons from '../components/Buttons';
import IconInput from '../components/IconInput';
import styled from '@emotion/styled';

// import { FontSize } from '../styles';

const LoginPage = () => {
  return (
    <>
      <Hero size={'fullheight'}>
        <StyledHeroBody>
          <Container>
            <Columns.Column
              className="is-half-desktop is-offset-3-desktop is-8-tablet is-offset-2-tablet is-fullwidth-mobile"
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <StyledForm>
                <div className="control">
                  <h2 className="container has-text-centered title is-2">로그인</h2>
                </div>
                <p className="is-size-3">&nbsp;</p>
                <div className="control">
                  <label className="label">이메일</label>
                  <IconInput
                    type="text"
                    name="id"
                    id="id"
                    autocomplete="off"
                    required
                    placeholder="이메일을 입력해주세요."
                    leftIconComponent={<AnimatedIcon.Email />}
                    rightIconComponent={<AnimatedIcon.CheckMark />}
                  />
                  <p className="is-size-7">&nbsp;</p>
                </div>
                <div className="control">
                  <label className="label">비밀번호</label>
                  <IconInput
                    type="password"
                    name="pw"
                    id="pw"
                    autocomplete="off"
                    required
                    placeholder="비밀번호를 입력해주세요."
                    leftIconComponent={<AnimatedIcon.Password />}
                    rightIconComponent={<AnimatedIcon.CheckMark />}
                  />
                  <p className="is-size-3">&nbsp;</p>
                </div>
                <div className="control">
                  <Buttons type="submit">로그인</Buttons>
                  <p className="is-size-7">&nbsp;</p>
                  <div className="columns">
                    <div className="column is-7">
                      비밀번호 기억안나요!
                      <a href="/findpassword">비밀번호찾기</a>
                    </div>
                    <div className="column is-7">
                      아이디가 없어요!
                      <a href="/join">회원가입</a>
                    </div>
                  </div>
                </div>
              </StyledForm>
            </Columns.Column>
          </Container>
        </StyledHeroBody>
      </Hero>
    </>
  );
};

const StyledHeroBody = styled(Hero.Body)``;

const StyledForm = styled.form`
  width: 100%;
`;

/**
 * width: 100%;
  background-color: #fffff9;
  border-radius: ${BorderRadius.card};
  border: 2px solid ${Colors.subFirst};
  box-shadow: ${Shadows.card};

  @media ${Media.desktop} {
    max-width: 1200px;
  }
 */

export default LoginPage;
