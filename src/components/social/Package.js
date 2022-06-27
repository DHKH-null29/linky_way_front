import { BorderRadius, Colors, Shadows } from '../../styles';
import { Card, Icon } from 'react-bulma-components';

import { FontWeight } from '../../styles/font';
import NormalIcon from '../icons/NormalIcon';
import styled from '@emotion/styled';

const Package = ({ tagName = '제목없음', nickname = '알수없음', numberOfCard = '0', onClick }) => {
  return (
    <StyleCard>
      <StyleSubCard></StyleSubCard>
      <Card.Content className="pb-4 pl-2" onClick={onClick}>
        <div className="">
          <p
            className="is-size-6-desktop is-size-7-mobile"
            style={{ fontWeight: FontWeight.bold, whiteSpace: 'nowrap' }}
          >
            {tagName}
          </p>
          <p className="is-size-7 mt-1" style={{ whiteSpace: 'nowrap' }}>
            <span style={{ fontSize: '10px' }}>&nbsp;</span>
            {nickname}
          </p>
        </div>
      </Card.Content>
      <Card.Content className="columns is-mobile p-1 is-size-7">
        <StyleLike>
          <div className="is-right pb-3 pl-5">
            <Icon>
              <NormalIcon.Card />
            </Icon>
            {numberOfCard}
            &nbsp; &nbsp;
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
  padding: 5px;
  margin: 5px;
  border: 1px solid ${Colors.layout};
  border-radius: ${BorderRadius.card};
  background-color: ${Colors.backgroundForm};
  box-shadow: ${Shadows.package};
  :hover {
    box-shadow: ${Shadows.hoverpackage};
    background-color: ${Colors.backgroundEvent};
    cursor: pointer;
    margin-left: 1px;
    margin-bottom: 1px;
  }
`;

const StyleSubCard = styled.div`
  position: absolute;
  top: -15px;
  left: -15px;
  z-index: -1;
  opacity: 0.2;
  border-radius: ${BorderRadius.card};
  background-color: ${Colors.layout};
  box-shadow: ${Shadows.package};
  width: 100%;
  height: 100%;
`;

const StyleLike = styled.div`
  padding: 2px 5px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
`;

export default Package;
