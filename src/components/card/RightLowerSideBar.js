import { BorderRadius, Colors } from '../../styles';
import { Box, Columns, Media } from 'react-bulma-components';

import styled from '@emotion/styled';

const RightLowerSideBar = () => {
  return (
    <StyledSideBar>
      <p className="pt-2">&nbsp;최근방문</p>
      <div className="pt-2">
        <Columns>
          <Columns.Column>준비중이예요!</Columns.Column>
        </Columns>
      </div>
    </StyledSideBar>
  );
};

const StyledSideBar = styled(Box)`
  border-radius: ${BorderRadius.card};
  border: 1px solid ${Colors.mainSecond};
  @media ${Media.desktop} {
    min-height: 500px;
    max-height: 800px;
    position: sticky;
    top: 50px;
    width: 90%;
  }
`;

export default RightLowerSideBar;
