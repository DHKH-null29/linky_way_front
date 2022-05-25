import { Container, Navbar, Section } from 'react-bulma-components';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import AnimatedIcon from './icons/AnimatedIcon';
import { BorderRadius } from '../styles';
import Buttons from './Buttons';
import { Colors } from '../styles/colors';
import { FontSize } from '../styles/font';
import HeaderSwitcher from './HeaderSwitcher';
import { Media } from '../styles/media';
import { Shadows } from '../styles/shadow';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const HeaderBar = () => {
  const [visible, setVisible] = useState(false);
  const [visibleState, setVisibleState] = useState(false);
  const [animationState, setAnimationState] = useState(false);
  const navigate = useNavigate();

  const handleBurgerClick = () => {
    setVisible(!visible);
  };

  const handleBurgerCancleClick = () => {
    setVisible(false);
  };

  const handlePageButtonClick = path => {
    navigate(path);
  };

  useEffect(() => {
    setAnimationState(true);
    setTimeout(() => {
      if (!visible && visibleState) {
        setAnimationState(!animationState);
      }
      setVisibleState(visible);
    }, 240);
  }, [visible, visibleState]);

  return (
    <StyledNavBar size="large">
      <Container>
        <StyledLogo>
          <Link className="navbar-item" hoverable={false} style={{ zIndex: '2' }} to={'/'}>
            로고
          </Link>
          <Navbar.Burger
            style={{ zIndex: '2' }}
            className="burger"
            data-target="navbar"
            onClick={handleBurgerClick}
          ></Navbar.Burger>
        </StyledLogo>
        <CenterSwitchContainer style={{}}>
          <HeaderSwitcher />
        </CenterSwitchContainer>
        <HeaderMenu>
          <Navbar.Container align="right">
            <StyledLink
              className="is-hidden-tablet-only is-hidden-mobile navbar-item"
              to={'/login'}
            >
              로그인
            </StyledLink>
            <StyledLink className="is-hidden-tablet-only is-hidden-mobile navbar-item" to={'/join'}>
              회원가입
            </StyledLink>
          </Navbar.Container>
        </HeaderMenu>
      </Container>

      {visibleState && (
        <HamburgerContent disappear={visible}>
          <Container className="has-text-center p-3">
            <HamburgerHeader>
              <HamburgerBackButton size={'large'} onClick={handleBurgerCancleClick} />
            </HamburgerHeader>
            <Container>
              <Section>
                <p className="title">로고</p>
                <DevideLine />
                <DevideLine space="micro" color="none" />
                <p className="subtitle">당신의 LinkyWay를 걸어봐요</p>
                <p style={{ opacity: 0.7 }}>여기에 뭘 써야 할지 모르겠지만 시작해바요</p>
                <DevideLine space="medium" color="none" />
                <Buttons onClick={() => handlePageButtonClick('/login')}>로그인</Buttons>
                <DevideLine space="micro" color="none" />
                <Buttons onClick={() => handlePageButtonClick('/join')}>회원가입</Buttons>
              </Section>
            </Container>
          </Container>
        </HamburgerContent>
      )}
    </StyledNavBar>
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

const StyledNavBar = styled(Navbar)`
  margin-top: -10px;
  box-shadow: ${Shadows.header};
`;

const StyledLogo = styled(Navbar.Brand)`
  text-align: center;
  justify-content: center;
  align-content: center;
  font-size: ${FontSize.large};
  margin: 15px 0 10px 0;
`;

const HeaderMenu = styled(Navbar.Menu)`
  margin: 10px 0 10px 0;
`;

const StyledLink = styled(Link)`
  font-size: ${FontSize.medium};
  text-decoration: 1px solid underline;
  text-underline-offset: ${FontSize.normal};
  opacity: 0.7;
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
    width: 100%;
  }
  background-color: ${Colors.backgroundForm};
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${props => (props.disappear ? slideLeft : slideRight)};
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

const CenterSwitchContainer = styled(StyledLogo)`
  position: absolute;
  top: 0;
  marginleft: auto;
  marginright: auto;
  left: 0;
  right: 0;
  textalign: center;

  @media ${Media.tablet} {
    margin-top: -0.5rem;
    margin-bottom: 0;
  }
  @media ${Media.mobile} {
    margin-top: -0.5rem;
    margin-bottom: 0;
  }
`;

export default HeaderBar;
