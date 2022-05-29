import * as Yup from 'yup';

import { Columns, Container, Hero } from 'react-bulma-components';

import AnimatedIcon from '../components/icons/AnimatedIcon';
import { Colors } from '../styles/colors';
import Dropdown from './Dropdown';
import IconInput from './IconInput';
import Swal from 'sweetalert2';
import styled from '@emotion/styled';
import { useFormik } from 'formik';

const SearchLayout = () => {
  const initialValues = {
    search: '',
  };

  const validationSchema = Yup.object().shape({
    search: Yup.string()
      .min(2, '최소 2글자 이상 입력하세요.')
      .max(16, '최대 16글자 이하여야 합니다.')
      .required('검색할 태그를 입력하세요.'),
  });

  const { errors, handleBlur, handleChange, touched, values } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, formikHelper) => {
      try {
        console.log(values);
        formikHelper.setStatus({ success: true });
        formikHelper.setSubmitting(false);
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          text: '검색을 실패했습니다.',
        });
      }
    },
  });
  return (
    <StyleLayout className="hero is-medium">
      <StyledHeroBody>
        <Container>
          <Columns.Column className="is-half-desktop is-offset-3-desktop is-8-tablet is-offset-2-tablet is-fullwidth-mobile">
            <StyledForm>
              <div className="control">
                <div className="columns">
                  <div className="column is-4">
                    <Dropdown></Dropdown>
                  </div>
                  <div className="column is-12">
                    <IconInput
                      type="text"
                      name="search"
                      autocomplete="off"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.search}
                      placeholder="검색할 태그를 입력해주세요."
                      leftIconComponent={<AnimatedIcon.Search />}
                      rightIconComponent={' '}
                    />
                    <p style={{ color: errors.search ? Colors.warningFirst : Colors.successFirst }}>
                      &nbsp;{touched.search && errors.search}
                    </p>
                  </div>
                </div>
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
const StyledHeroBody = styled(Hero.Body)`
  width: 100%;
`;

const StyledForm = styled.form`
  width: 100%;
`;

export default SearchLayout;
