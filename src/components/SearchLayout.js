import { Columns, Container, Hero } from 'react-bulma-components';

import AnimatedIcon from '../components/icons/AnimatedIcon';
import { Colors } from '../styles/colors';
import IconInput from './IconInput';
import styled from '@emotion/styled';

const SearchLayout = () => {
  return (
    <StyleLayout className="hero is-medium">
      <StyledHeroBody>
        <Container>
          <Columns.Column
            className="is-half-desktop is-offset-3-desktop is-8-tablet is-offset-2-tablet is-fullwidth-mobile"
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <StyledForm>
              <div className="control">
                <IconInput
                  type="text"
                  placeholder="검색할 태그를 입력해주세요."
                  leftIconComponent={' '}
                  rightIconComponent={<AnimatedIcon.Search />}
                />
              </div>
            </StyledForm>
          </Columns.Column>
        </Container>
      </StyledHeroBody>
    </StyleLayout>
  );
};

const StyleLayout = styled.section`
  background-color: ${Colors.layout};
`;
const StyledHeroBody = styled(Hero.Body)``;

const StyledForm = styled.form`
  width: 100%;
`;

export default SearchLayout;
