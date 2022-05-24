import { Columns, Container, Hero } from 'react-bulma-components';

import AnimatedIcon from '../components/icons/AnimatedIcon';
import Buttons from '../components/Buttons';
import IconInput from '../components/IconInput';
import styled from '@emotion/styled';

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
                  <IconInput
                    leftIconComponent={<AnimatedIcon.Email />}
                    rightIconComponent={<AnimatedIcon.CheckMark />}
                  />
                  <p className="is-size-3">&nbsp;</p>
                </div>
                <div className="control">
                  <Buttons>hi</Buttons>
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
