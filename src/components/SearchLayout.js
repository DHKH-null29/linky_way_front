import * as Yup from 'yup';

import { Columns, Hero } from 'react-bulma-components';

import AnimatedIcon from '../components/icons/AnimatedIcon';
import { Colors } from '../styles/colors';
import Dropdown from './Dropdown';
import IconInput from './IconInput';
import Swal from 'sweetalert2';
import TagList from './TagList';
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
    <StyleLayout className="hero">
      <StyledHeroBody>
        <Columns.Column className="is-three-quarters-desktop is-offset-one-fifth-desktop is-three-quarters-tablet is-offset-one-fifth-tablet is-fullwidth-mobile">
          <StyledForm>
            <div className="columns">
              <div className="column is-2">
                <StyledDropdown />
              </div>
              <div className="column is-6">
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
            <p className="is-size-6">&nbsp;</p>
          </StyledForm>
          <TagList />
        </Columns.Column>
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

const StyledDropdown = styled(Dropdown)`
  margin: 10px 0px 0px 10px;
`;
const StyledForm = styled.form``;

export default SearchLayout;
