import { BorderRadius, Colors, Shadows } from '../../styles';

import { Card } from 'react-bulma-components';
import styled from '@emotion/styled';

const Package = ({ memeberId, nickname, numberOfCard }) => {
  return (
    <StyleCard style={{ width: 350, margin: 'auto' }}>
      <Card.Content>
        <div className="media-content">
          <p className="title is-4">닉네임{nickname}</p>
          <p className="title is-6">태그이름{memeberId}</p>
        </div>
      </Card.Content>
      <Card.Content>
        <StyleLike>
          <div className="his-1">🔖 15{numberOfCard}</div>
          <div>👍 9999</div>
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
  text-align: right;
  padding: 3px 15px;
`;

export default Package;
