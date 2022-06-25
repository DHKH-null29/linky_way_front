import { BorderRadius, Colors, FontSize, Shadows } from '../styles';
import { Container, Hero } from 'react-bulma-components';

import Buttons from '../components/common/Buttons';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleClickButton = () => {
    navigate('/');
  };
  return (
    <Hero size={'medium'}>
      <StyledHeroBody>
        <StyleContainer className="column is-half is-offset-one-quarter has-text-centered">
          <StyledForm>
            <StyledH2>404 ERROR</StyledH2>
            <br />
            <h1 className="has-text-link">
              죄송합니다. 현재 찾을 수 없는 페이지를 요청 하셨습니다.
            </h1>
            <p className="is-size-8">&nbsp;</p>
            <p>
              존재하지 않는 주소를 입력하셨거나, <br />
              요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
            </p>
          </StyledForm>
          <p className="is-size-4">&nbsp;</p>
          <Buttons onClick={handleClickButton}>메인화면</Buttons>
        </StyleContainer>
      </StyledHeroBody>
    </Hero>
  );
};
const StyledHeroBody = styled(Hero.Body)`
  background-color: ${Colors.layout};
`;

const StyledForm = styled.form`
  width: 100%;
`;

const StyleContainer = styled(Container)`
  box-shadow: ${Shadows.button};
  background-color: ${Colors.backgroundPage};
  border-radius: ${BorderRadius.card};
`;

const StyledH2 = styled.h2`
  margin: 20px;
  font-size: ${FontSize.huge};
  font-color: ${Colors.mainFirst};
`;

export default NotFoundPage;
