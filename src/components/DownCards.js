import { BorderRadius, Colors, FontSize, Shadows } from '../styles';
import { Card, Content, Media } from 'react-bulma-components';

import IconTag from './IconTag';
import TestImage from '../assets/images/testImage.PNG';
import styled from '@emotion/styled';

const DownCards = ({ title, content }) => {
  return (
    <StyleCard style={{ width: 350, margin: 'auto', rounded: 'true' }}>
      <Card.Content>
        <Media>
          <Media.Item>
            <StyleTitle>타이틀인뎁쇼{title}</StyleTitle>
          </Media.Item>
        </Media>
      </Card.Content>
      <StyleImage size="3by1" src={TestImage} />
      <Card.Content>
        <StyleContent>
          무슨 말을 써야할지는 모르겠지만 이건 굉장히 중요한 카드의 내용일테니 저는 아무개로
          살랍니다.{content}
        </StyleContent>
        <IconTag>태그다잉</IconTag> <IconTag>호잇</IconTag> <IconTag>호잇</IconTag>
        <IconTag>호잇</IconTag>
      </Card.Content>
    </StyleCard>
  );
};

const StyleCard = styled(Card)`
  font-family: 'ImcreSoojin';
  width: 100%;
  border-radius: ${BorderRadius.card};
  background-color: ${Colors.card};
  box-shadow: ${Shadows.card};
  :hover {
    box-shadow: ${Shadows.section};
  }
`;

const StyleImage = styled(Card.Image)`
  font-family: 'ImcreSoojin';
  width: 100%;
  border-radius: ${BorderRadius.image};
  }
`;

const StyleTitle = styled.div`
  text-align: center;
  font-size: ${FontSize.large};
`;

const StyleContent = styled(Content)``;

export default DownCards;
