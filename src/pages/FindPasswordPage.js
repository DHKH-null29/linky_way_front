import * as Yup from 'yup';

import { Columns, Container, Hero } from 'react-bulma-components';

import AnimatedIcon from '../components/icons/AnimatedIcon';
import Buttons from '../components/common/Buttons';
import { Colors } from '../styles';
import IconInput from '../components/common/IconInput';
import Swal from 'sweetalert2';
import styled from '@emotion/styled';
import { useFormik } from 'formik';

const FindPasswordPage = () => {
  const initialValues = {
    email: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .strict(true)
      .email('이메일 형식으로 작성해주세요.')
      .required('이메일을 입력해주세요.'),
  });

  const { errors, handleBlur, handleSubmit, handleChange, touched, values } = useFormik({
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
          text: '없는 이메일입니다. 다시 확인해주세요.',
        });
      }
    },
  });
  return (
    <>
      <Hero size={'medium'}>
        <StyledHeroBody>
          <Container>
            <Columns.Column
              className="is-half-desktop is-offset-3-desktop is-8-tablet is-offset-2-tablet is-fullwidth-mobile"
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <StyledForm onSubmit={handleSubmit}>
                <div className="control">
                  <h2 className="container has-text-centered title is-2">비밀번호 찾기</h2>
                </div>
                <p className="is-size-3">&nbsp;</p>
                <div className="control">
                  <label className="label">이메일</label>
                  <IconInput
                    type="text"
                    name="email"
                    autocomplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="이메일을 입력해주세요."
                    leftIconComponent={<AnimatedIcon.Email />}
                    rightIconComponent={
                      touched.email &&
                      (!errors.email ? (
                        <AnimatedIcon.CheckMark size={'large'} />
                      ) : (
                        <AnimatedIcon.WarningAlert size={'large'} />
                      ))
                    }
                  />
                  <p style={{ color: errors.email ? Colors.warningFirst : Colors.successFirst }}>
                    &nbsp;{touched.email && (errors.email || '이메일 입력이 확인되었어요.')}
                  </p>
                  <p className="is-size-7">&nbsp;</p>
                </div>
                <div className="control">
                  <Buttons type={'submit'}>비밀번호찾기</Buttons>
                </div>
              </StyledForm>
            </Columns.Column>
          </Container>
        </StyledHeroBody>
      </Hero>
    </>
  );
};

const StyledHeroBody = styled(Hero.Body)``;

const StyledForm = styled.form`
  width: 100%;
`;

export default FindPasswordPage;
