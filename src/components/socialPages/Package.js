import { BorderRadius, Colors, Shadows } from '../../styles';

import { Card } from 'react-bulma-components';
import styled from '@emotion/styled';

const Package = () => {
  return (
    <StyleCard style={{ width: 350, margin: 'auto' }}>
      <Card.Content>
        <div className="media-content">
          <p className="title is-4">태그이름</p>
        </div>
        <p className="is-size-1">&nbsp;</p>
        <div className="content">태그이름과 관련된 내용입니다.</div>
      </Card.Content>
      <Card.Content>
        <StyleLike>👍 9999</StyleLike>
      </Card.Content>
    </StyleCard>
  );
};

const StyleCard = styled(Card)`
  font-family: 'ImcreSoojin';
  width: 100%;
  min-height: 300px;
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
