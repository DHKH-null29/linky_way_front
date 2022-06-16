import * as Yup from 'yup';

import { Columns, Hero } from 'react-bulma-components';
import { FontSize, Media } from '../../styles';

import AnimatedIcon from '../icons/AnimatedIcon';
import Buttons from '../Buttons';
import { Colors } from '../../styles/colors';
import IconInput from '../IconInput';
import Swal from 'sweetalert2';
import TagList from '../TagList';
import { currentCardState } from '../../state/cardState';
import { onSelectCardsByKeyword } from '../../api/cardApi';
import styled from '@emotion/styled';
import { useFormik } from 'formik';
import { useSetRecoilState } from 'recoil';

const Layout = () => {
  const setCurrentCards = useSetRecoilState(currentCardState);

  const initialValues = {
    keyword: '',
  };

  const validationSchema = Yup.object().shape({
    keyword: Yup.string()
      .min(2, '최소 2글자 이상 입력하세요.')
      .max(16, '최대 16글자 이하여야 합니다.')
      .required('검색할 키워드를 입력하세요.'),
  });

  const { errors, handleBlur, handleChange, handleSubmit, touched, values } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, formikHelper) => {
      try {
        const result = await onSelectCardsByKeyword(values.keyword);
        setCurrentCards(result.data);
        formikHelper.setStatus({ success: true });
        formikHelper.setSubmitting(false);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: error.details,
        });
      }
    },
  });
  return (
    <StyledHero className="is-small">
      <StyledHeroBody className="column">
        <Columns.Column className="has-text-centered">
          <StyledForm className="section container" onSubmit={handleSubmit}>
            <Columns className="is-tablet">
              <Columns.Column className="is-10">
                <IconInput
                  type="text"
                  name="keyword"
                  autocomplete="off"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.keyword}
                  placeholder="검색할 키워드를 입력해주세요."
                  leftIconComponent={<AnimatedIcon.Search />}
                  rightIconComponent={' '}
                />
              </Columns.Column>
              <Columns.Column className="is-2">
                <Buttons> &nbsp;검색&nbsp;</Buttons>
              </Columns.Column>
            </Columns>
            <p
              className="pt-2"
              style={{ color: errors.keyword ? Colors.warningFirst : Colors.successFirst }}
            >
              &nbsp;{touched.keyword && errors.keyword}
            </p>
          </StyledForm>
          <TagContainer>
            <div>
              <TagList />
            </div>
          </TagContainer>
          <br />
        </Columns.Column>
      </StyledHeroBody>
    </StyledHero>
  );
};

const StyledHero = styled(Hero)`
  background-color: ${Colors.layout};
`;
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
    width: 50%;
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

const TagContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;

  > div {
    @media ${Media.desktop} {
      width: 55%;
    }
    @media ${Media.tablet} {
      width: 80%;
      padding: ${FontSize.micro};
    }
    @media ${Media.mobile} {
      width: 100%;
      padding: 0px;
    }
  }
`;

export default Layout;
