import { Container, Navbar } from 'react-bulma-components';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import FontLogo from '../../assets/logos/Font';
import { FontSize } from '../../styles/font';
import HamburgerSideBar from './HamburgerSideBar';
import HeaderSwitcher from './HeaderSwitcher';
import { Media } from '../../styles/media';
import { Shadows } from '../../styles/shadow';
import Swal from 'sweetalert2';
import { headerClickState } from '../../state/headerState';
import { loginState } from '../../state/loginState';
import styled from '@emotion/styled';

const HeaderBar = () => {
  const [visible, setVisible] = useState(false);
  const [visibleState, setVisibleState] = useState(false);
  const [animationState, setAnimationState] = useState(false);
  const [login, setLogin] = useRecoilState(loginState);
  const setHeaderSwitch = useSetRecoilState(headerClickState);

  const navigate = useNavigate();

  const handleBurgerClick = () => {
    setVisible(!visible);
  };

  const handleLinkClick = () => {
    setHeaderSwitch(undefined);
  };

  const handleLogoutClick = () => {
    Swal.fire({
      icon: 'success',
      text: '로그아웃 성공!',
      showConfirmButton: false,
      timer: 1000,
    });
    setLogin(false);
    localStorage.clear();
    sessionStorage.clear();
    navigate('/', { replace: true });
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
          <Link
            className="navbar-item"
            hoverable={false}
            style={{ zIndex: '2' }}
            to={'/'}
            onClick={handleLinkClick}
          >
            <StyleFontLogo width="200" height="35" />
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
          {!login ? (
            <Navbar.Container align="right">
              <StyledLink
                className="is-hidden-tablet-only is-hidden-mobile navbar-item"
                to={'/login'}
                onClick={handleLinkClick}
              >
                로그인
              </StyledLink>
              <StyledLink
                className="is-hidden-tablet-only is-hidden-mobile navbar-item"
                to={'/join'}
                onClick={handleLinkClick}
              >
                회원가입
              </StyledLink>
            </Navbar.Container>
          ) : (
            <Navbar.Container align="right">
              <StyledLink
                className="is-hidden-tablet-only is-hidden-mobile navbar-item"
                to={'/mypage'}
                onClick={handleLinkClick}
              >
                마이페이지
              </StyledLink>
              <StyledA
                className="is-hidden-tablet-only is-hidden-mobile navbar-item"
                onClick={handleLogoutClick}
              >
                로그아웃
              </StyledA>
            </Navbar.Container>
          )}
        </HeaderMenu>
      </Container>
      {visibleState && (
        <HamburgerSideBar
          onCancle={handleBurgerClick}
          onLogout={handleLogoutClick}
          visible={visible}
        />
      )}
    </StyledNavBar>
  );
};

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

const StyledA = styled.a`
  font-size: ${FontSize.medium};
  text-decoration: 1px solid underline;
  text-underline-offset: ${FontSize.normal};
  opacity: 0.7;
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

const StyleFontLogo = styled(FontLogo)`
  font-size: ${FontSize.large};
  @media ${Media.desktop} {
    width: 180;
    margin-top: -0.5rem;
    margin-bottom: 0;
  }
  @media ${Media.tablet} {
    width: 180;
    height: 40;
    margin-top: -0.5rem;
    margin-bottom: 0;
  }
  @media ${Media.mobile} {
    width: 150;
    height: 30;
    margin-top: -0.5rem;
    margin-bottom: 0;
  }
`;

export default HeaderBar;
