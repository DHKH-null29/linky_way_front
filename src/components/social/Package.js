import { BorderRadius, Colors, Shadows } from '../../styles';
import { Card, Icon } from 'react-bulma-components';

import AnimatedIcon from '../icons/AnimatedIcon';
import styled from '@emotion/styled';

const Package = ({ memeberId, nickname, numberOfCard }) => {
  return (
    <StyleCard>
      <Card.Content>
        <div className="media-content">
          <p className="title is-4">닉네임{nickname}</p>
          <p className="title is-6">태그이름{memeberId}</p>
        </div>
      </Card.Content>
      <Card.Content className="columns is-mobile">
        <StyleLike>
          <div className="media-content is-right">
            <Icon>
              <AnimatedIcon.Card />
            </Icon>
            15{numberOfCard}
            &nbsp; &nbsp;
            <Icon>
              <AnimatedIcon.ThumbUp />
            </Icon>
            9999
          </div>
        </StyleLike>
      </Card.Content>
    </StyleCard>
  );
};

const StyleCard = styled(Card)`
  font-family: 'ImcreSoojin';
  width: 100%;
  max-height: 250px;
  padding: 20px;
  margin: 5px;
  border-radius: ${BorderRadius.card};
  background-color: ${Colors.backgroundForm};
  box-shadow: ${Shadows.package};
  :hover {
    box-shadow: ${Shadows.hoverpackage};
    cursor: pointer;
  }
`;

const StyleLike = styled.div`
  padding: 2px 5px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
`;

export default Package;
