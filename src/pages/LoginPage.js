import * as Yup from 'yup';

import { Columns, Container, Hero } from 'react-bulma-components';
import { Link, useNavigate } from 'react-router-dom';

import AnimatedIcon from '../components/icons/AnimatedIcon';
import Buttons from '../components/common/Buttons';
import { Colors } from '../styles';
import { EMAIL } from '../constants/business';
import IconInput from '../components/common/IconInput';
import PageTitle from '../components/common/PageTitle';
import Swal from 'sweetalert2';
import { TOKEN_INFO } from '../constants/tokens';
import { loginState } from '../state/loginState';
import { onLogin } from '../api/memberApi';
import styled from '@emotion/styled';
import { useFormik } from 'formik';
import { useRecoilState } from 'recoil';

const LoginPage = () => {
  const [login, setLogin] = useRecoilState(loginState);
  const navigate = useNavigate();

  const EMAIL_VALIDATION = EMAIL.VALIDATION;

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .strict(true)
      .matches(EMAIL_VALIDATION.REGEX, EMAIL_VALIDATION.MESSAGE)
      .required(EMAIL_VALIDATION.REQUIRE),
    password: Yup.string().required('비밀번호를 입력해주세요.'),
  });

  const { errors, handleBlur, handleSubmit, handleChange, touched, values } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, formikHelper) => {
      if (login) {
        return;
      }
      try {
        const result = await onLogin(values);
        formikHelper.setStatus({ success: true });
        formikHelper.setSubmitting(false);
        localStorage.setItem(TOKEN_INFO.ACCESS_TOKEN_NAME, result.data.accessToken);
        setLogin(true);
        navigate('/', { replace: true });
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          text: `${error.details}`,
        });
      }
    },
  });

  return (
    <>
      <PageTitle>로그인</PageTitle>
      <Hero size={'small'}>
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
                  <label className="label">비밀번호</label>
                  <IconInput
                    type="password"
                    name="password"
                    autocomplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="비밀번호를 입력해주세요."
                    leftIconComponent={<AnimatedIcon.Password />}
                    rightIconComponent={
                      touched.password &&
                      (!errors.password ? (
                        <AnimatedIcon.CheckMark size={'large'} />
                      ) : (
                        <AnimatedIcon.WarningAlert size={'large'} />
                      ))
                    }
                  />
                  <p style={{ color: errors.password ? Colors.warningFirst : Colors.successFirst }}>
                    &nbsp;{touched.password && (errors.password || '비밀번호 입력이 확인되었어요.')}
                  </p>
                  <p className="is-size-7">&nbsp;</p>
                </div>
                <div className="control">
                  <Buttons type={'submit'}>로그인</Buttons>
                  <p className="is-size-3">&nbsp;</p>
                  <Columns className="is-mobile has-text-centered is-size-5-desktop is-size-6-mobile">
                    <Columns.Column className="is-5">
                      <Link to={'/findpassword'}>비밀번호찾기</Link>
                    </Columns.Column>
                    <Columns.Column className="is-2 has-text-link">|</Columns.Column>
                    <Columns.Column className="is-5">
                      <Link to={'/join'}>회원가입</Link>
                    </Columns.Column>
                  </Columns>
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

export default LoginPage;
