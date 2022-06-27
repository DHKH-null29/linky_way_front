import { Colors, FontSize, Media, Shadows } from '../styles';
import { Columns, Footer, Hero } from 'react-bulma-components';

import Buttons from '../components/common/Buttons';
import { FontWeight } from '../styles/font';
import main1_Card from '../assets/images/mainPage/main1_Card.jpg';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  const handlePageButtonClick = path => {
    navigate(path);
  };
  return (
    <>
      <StyledOddNumHero className="is-medium">
        <StyledHeroBody className="column has-text-centered">
          <Columns.Column>
            <StyledForm className="section container">
              <StyledTitle>별들을 한곳에 모으는 은하수</StyledTitle>
              <StyledTitle>소셜 북마크 서비스</StyledTitle>
              <br />
              <StyledContent>(로고가 들어갈 자리)</StyledContent>
            </StyledForm>
          </Columns.Column>
        </StyledHeroBody>
      </StyledOddNumHero>

      <StyledEvenNumHero>
        <StyledHeroBody className="column has-text-centered">
          <Columns.Column>
            <StyledForm className="section container">
              <StyledTitle>이런 북마크 사이트 어디 없을까?</StyledTitle>
              <br />
              <div>
                <StyledLi>북마크를 한 곳에 관리하고 싶어요.</StyledLi>
                <StyledLi>다른 사용자의 북마크도 궁금해요.</StyledLi>
                <StyledLi>좋은 사이트를 공유하고 싶어요.</StyledLi>
                <StyledLi>없어진 사이트를 바로 알고 싶어요.</StyledLi>
              </div>
              <br />
              <StyledTitle>바로 여기 LinkyWay에 있습니다!</StyledTitle>
            </StyledForm>
          </Columns.Column>
        </StyledHeroBody>
      </StyledEvenNumHero>

      <StyledOddNumHero className="is-medium">
        <StyledHeroBody className="column has-text-centered">
          <Columns.Column>
            <StyledForm className="section container">
              <StyledTitle>나만의 북마크 저장 공간</StyledTitle>
              <br />
              <StyledContent>여기저기 널려있는 북마크들을 한번에 관리할 수 있어요</StyledContent>
              <StyledContent>태그별로 보고 싶은 카드들을 모아 볼 수 있어요.</StyledContent>
            </StyledForm>
          </Columns.Column>
          <Columns.Column>
            <StyledTitle>
              <div>
                <img src={main1_Card} width="450" height="150" alt="main1_Card" />
              </div>
              <div>(개인페이지 스크롤하는 움직이는 이미지)</div>
            </StyledTitle>
          </Columns.Column>
        </StyledHeroBody>
      </StyledOddNumHero>

      <StyledEvenNumHero className="is-medium">
        <StyledHeroBody className="column has-text-centered">
          <Columns.Column>
            <StyledTitle>
              <div>
                <img src={main1_Card} width="450" height="150" alt="main1_Card" />
              </div>
              <div>(페이지 이동하는 움직이는 이미지, 페이지 이동 아이콘)</div>
            </StyledTitle>
          </Columns.Column>
          <Columns.Column>
            <StyledForm className="section container">
              <StyledTitle>아이콘으로 편리한 페이지 이동</StyledTitle>
              <br />
              <StyledContent>아이콘으로 클릭으로 간편하게</StyledContent>
              <StyledContent>개인 페이지와 소셜페이지를 편리하게 이동해보세요.</StyledContent>
            </StyledForm>
          </Columns.Column>
        </StyledHeroBody>
      </StyledEvenNumHero>

      <StyledOddNumHero className="is-medium">
        <StyledHeroBody className="column has-text-centered">
          <Columns.Column>
            <StyledForm className="section container">
              <StyledTitle>사라진 사이트들을 알려주는</StyledTitle>
              <StyledTitle>Error 카드</StyledTitle>
              <br />
              <StyledContent>없어진 사이트들도 Error카드로 </StyledContent>
              <StyledContent>바로바로 확인하고 관리할 수 있어요!</StyledContent>
            </StyledForm>
          </Columns.Column>
          <Columns.Column>
            <StyledTitle>
              <div>
                <img src={main1_Card} width="450" height="150" alt="main1_Card" />
              </div>
              <div>(에러 카드 목록, 에러 카드)</div>
            </StyledTitle>
          </Columns.Column>
        </StyledHeroBody>
      </StyledOddNumHero>

      <StyledEvenNumHero className="is-medium">
        <StyledHeroBody className="column has-text-centered">
          <Columns.Column>
            <StyledTitle>
              <div>
                <img src={main1_Card} width="450" height="150" alt="main1_Card" />
              </div>
              <div>(소셜페이지 이미지)</div>
            </StyledTitle>
          </Columns.Column>
          <Columns.Column>
            <StyledForm className="section container">
              <StyledTitle>다른 사람과 공유하는 소셜 공간</StyledTitle>
              <br />
              <StyledContent>좋은 사이트는 나만 알 수 없지! </StyledContent>
              <StyledContent>내가 공유하고 싶은 북마크만 골라서 </StyledContent>
              <StyledContent>나만의 북마크 리스트를 공유해봐요.</StyledContent>
            </StyledForm>
          </Columns.Column>
        </StyledHeroBody>
      </StyledEvenNumHero>

      <StyledOddNumHero className="is-medium">
        <StyledHeroBody className="column has-text-centered">
          <Columns.Column>
            <StyledForm className="section container">
              <StyledTitle>소셜페이지 카드 복사 기능</StyledTitle>
              <br />
              <StyledContent>다른 사람의 사이트가 도움이 된다면</StyledContent>
              <StyledContent>카드를 나의 공간에 복사할 수 있어요.</StyledContent>
            </StyledForm>
          </Columns.Column>
          <Columns.Column>
            <StyledTitle>
              <div>
                <img src={main1_Card} width="450" height="150" alt="main1_Card" />
              </div>
              <div>(카드 복사하는 움직이는 이미지)</div>
            </StyledTitle>
          </Columns.Column>
        </StyledHeroBody>
      </StyledOddNumHero>

      <StyledEvenNumHero className="is-medium">
        <StyledHeroBody className="column has-text-centered">
          <Columns.Column>
            <StyledForm className="section container">
              <h2 className="title">LinkyWay 무료로 사용하기</h2>
              <br />
              <Buttons
                onClick={() => {
                  handlePageButtonClick('/join');
                }}
              >
                LinkyWay 시작하기
              </Buttons>
            </StyledForm>
          </Columns.Column>
        </StyledHeroBody>
      </StyledEvenNumHero>

      <Columns className="is-tablet"></Columns>
      <Footer>
        <div className="content has-text-centered">
          <p>
            LinkyWay <strong>email: msNull29@gmail.com</strong>
          </p>
          <DevideLine space="micro" color="none" />
          <p>
            Copyright 2022 <strong>LinkyWay</strong> by{' '}
            <a href="https://github.com/DHKH-null29">머선Null29 Them</a> All right reserved.
          </p>
        </div>
      </Footer>
    </>
  );
};

const StyledOddNumHero = styled(Hero)`
  background-color: ${Colors.mainpage};
`;

const StyledEvenNumHero = styled(Hero)``;

const StyledHeroBody = styled(Hero.Body)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
`;

const StyledForm = styled.form`
  padding-bottom: ${FontSize.micro};
  @media ${Media.desktop} {
    width: 100%;
  }
  @media ${Media.tablet} {
    width: 80%;
    padding: ${FontSize.micro};
  }
  @media ${Media.mobile} {
    width: 100%;
    padding: 0px;
  }
`;

const StyledTitle = styled.h1`
  font-size: ${FontSize.large};
  font-weight: ${FontWeight.bold};
`;

const StyledContent = styled.h2`
  font-size: ${FontSize.medium};
  font-weight: ${FontWeight.medium};
`;

const StyledLi = styled.li`
  font-size: ${FontSize.medium};
  font-weight: ${FontWeight.medium};
`;

const DevideLine = styled.hr`
  background-color: ${props => (!props.color ? Colors.mainFirst : props.color)};
  opacity: 0.6;
  box-shadow: ${props => (!props.color ? Shadows.button : 'none')};
  margin-top: ${props => (!props.space ? Shadows.huge : FontSize[props.space])};
  margin-bottom: ${props => (!props.space ? FontSize.huge : FontSize[props.space])};
`;

export default MainPage;
