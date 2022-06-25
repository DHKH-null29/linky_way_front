import { BorderRadius, Colors, FontSize, Media, Shadows } from '../../styles';
import { Box, Columns, Icon } from 'react-bulma-components';

import AnimatedIcon from '../icons/AnimatedIcon';
import NormalIcon from '../icons/NormalIcon';
import styled from '@emotion/styled';

const RightUpperSideBar = () => {
  return (
    <StyledSideBar>
      <p className="pt-2">&nbsp;관리하기</p>
      <StyledIconContainer className="pt-0">
        <Columns>
          <Columns.Column className="is-5 has-text-right ml-1">
            <StyledIcon className="is-large">
              <NormalIcon.Tag fill={Colors.mainSecond} size={23} />
            </StyledIcon>
            <p className="is-size-7 pt-2">태그관리</p>
          </Columns.Column>
          <Columns.Column className="is-5 has-text-left pl-0">
            <StyledIcon className="is-large">
              <AnimatedIcon.Trash lineColor={Colors.subFirst} size={'medium'} />
            </StyledIcon>
            <p className="is-size-7 pt-2 pl-2">휴지통</p>
          </Columns.Column>
        </Columns>
      </StyledIconContainer>
    </StyledSideBar>
  );
};

const StyledSideBar = styled(Box)`
  border-radius: ${BorderRadius.card};
  border: 1px solid ${Colors.mainSecond};
  @media ${Media.desktop} {
    min-height: 200px;
    max-height: 200px;
    position: sticky;
    top: 50px;
    width: 90%;
  }
`;

const StyledIconContainer = styled.div`
  color: ${({ highlight }) => (highlight ? Colors.linkFirst : 'black')};
  display: inline-block;
  font-size: 1vw;
  @media ${Media.tablet} {
    font-size: ${FontSize.medium};
  }
  @media ${Media.mobile} {
    font-size: ${FontSize.small};
  }

  width: 100%;
  position: absolute;
  bottom: 0;
  padding-bottom: 2rem;
`;

const StyledIcon = styled(Icon)`
  cursor: pointer;
  border-radius: 100%;
  padding: 10px;
  background-color: ${Colors.layout};
  box-shadow: ${Shadows.header};
  :hover {
    box-shadow: ${Shadows.card};
  }
`;
export default RightUpperSideBar;
