import { BorderRadius, Colors, FontSize, Media, Shadows } from '../../styles';
import { Container, Section } from 'react-bulma-components';

import AnimatedIcon from '../icons/AnimatedIcon';
import Buttons from '../common/Buttons';
import Logo from '../../assets/logos/Full';
import { keyframes } from '@emotion/react';
import { loginState } from '../../state/loginState';
import styled from '@emotion/styled';
import useClickAway from '../../hooks/useClickAway';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const HamburgerSideBar = ({ onCancle, onLogout, visible }) => {
  const login = useRecoilValue(loginState);
  const navigate = useNavigate();

  const handlePageButtonClick = path => {
    navigate(path);
  };

  const ref = useClickAway(() => {
    onCancle && onCancle();
  });

  return (
    <>
      {visible && <HamburgerBackground />}
      <HamburgerContent ref={ref} disappear={visible}>
        <Container className="has-text-center p-3">
          <HamburgerHeader>
            <HamburgerBackButton size={'large'} onClick={onCancle} />
          </HamburgerHeader>
          <Container>
            <Section>
              <p className="title">
                <Logo size={'30vw'} />
              </p>
              <DevideLine />
              <DevideLine space="micro" color="none" />
              <p className="subtitle">당신의 LinkyWay를 걸어봐요</p>
              <p style={{ opacity: 0.7 }}>길고 긴 설명 길고 긴 설명 길고 긴 설명 길고 긴 설명</p>
              <DevideLine space="medium" color="none" />
              {!login ? (
                <>
                  <Buttons
                    onClick={() => {
                      handlePageButtonClick('/login');
                      onCancle();
                    }}
                  >
                    로그인
                  </Buttons>
                  <DevideLine space="micro" color="none" />
                  <Buttons
                    onClick={() => {
                      handlePageButtonClick('/join');
                      onCancle();
                    }}
                  >
                    회원가입
                  </Buttons>
                </>
              ) : (
                <>
                  <Buttons
                    colortype={'sub'}
                    onClick={() => {
                      onLogout();
                      onCancle();
                    }}
                  >
                    로그아웃
                  </Buttons>
                  <DevideLine space="micro" color="none" />
                </>
              )}
            </Section>
          </Container>
        </Container>
      </HamburgerContent>{' '}
    </>
  );
};

const slideLeft = keyframes`
from {
  transform: translateX(500px);
}
to {
  transform: translateX(0px);
}
`;

const slideRight = keyframes`
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(500px);
  }
`;

const HamburgerBackground = styled.div`
  position: fixed;
  background-color: black;
  width: 100%;
  height: 110vh;
  top: 0;
  opacity: 0.3;
  @media ${Media.desktop} {
    display: none;
  }
`;

const HamburgerContent = styled.div`
  z-index: 3;
  position: absolute;
  background-color: ${Colors.backgroundForm};
  box-shadow: ${Shadows.card};
  text-align: center;
  justify-content: center;
  align-content: center;
  justify-content: center;
  top: 0;
  right: 0;
  @media ${Media.desktop} {
    display: none;
  }
  @media ${Media.tablet} {
    width: 60%;
  }
  @media ${Media.mobile} {
    width: 80%;
  }
  background-color: ${Colors.backgroundForm};
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${props => (props.disappear ? slideLeft : slideRight)};
  min-height: 100vh;
`;

const HamburgerHeader = styled.div`
  text-align: left;
`;

const HamburgerBackButton = styled(AnimatedIcon.RightArrow)`
  :hover {
    border: 2px solid ${Colors.mainFirst};
    border-radius: ${BorderRadius.button};
    cursor: pointer;
  }
`;

const DevideLine = styled.hr`
  background-color: ${props => (!props.color ? Colors.mainFirst : props.color)};
  opacity: 0.6;
  box-shadow: ${props => (!props.color ? Shadows.button : 'none')};
  margin-top: ${props => (!props.space ? FontSize.huge : FontSize[props.space])};
  margin-bottom: ${props => (!props.space ? FontSize.huge : FontSize[props.space])};
`;

export default HamburgerSideBar;
