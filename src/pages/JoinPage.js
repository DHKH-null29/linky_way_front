import * as Yup from 'yup';

import { Colors, FontSize, Shadows } from '../styles';
import { Columns, Container, Hero } from 'react-bulma-components';

import AnimatedIcon from '../components/icons/AnimatedIcon';
import Buttons from '../components/Buttons';
import IconInput from '../components/IconInput';
import Swal from 'sweetalert2';
import styled from '@emotion/styled';
import { useFormik } from 'formik';

const JoinPage = () => {
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
          text: '회원가입에 실패했습니다.',
        });
      }
    },
  });

  const handleEmailAuthenticationButtonClick = () => {
    if (errors.email) {
      Swal.fire({
        icon: 'warning',
        text: '이메일 입력을 확인하세요',
      });
    } else {
      Swal.fire({
        icon: 'success',
        text: '이메일 인증을 준비중입니다.',
      });
    }
  };

  return (
    <>
      <Hero size={'fullheight'}>
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
                <p className="container has-text-centered title is-2">회원가입</p>
                <p className="is-size-3">&nbsp;</p>
                <label className="label">이메일</label>
                <IconInput
                  name="email"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  autocomplete="off"
                  placeholder="이메일을 입력하세요"
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
                  &nbsp;{touched.email && (errors.email || '잘했어요오오오!')}
                </p>
                <DevideLine space="micro" color="none" />
                <Buttons type="button" onClick={handleEmailAuthenticationButtonClick}>
                  이메일 인증
                </Buttons>
                <DevideLine space="medium" color="none" />
                <Columns>
                  <Columns.Column className="is-12 pb-0" style={{ width: '100%' }}>
                    <label className="label">닉네임</label>
                  </Columns.Column>
                  <Columns.Column className="is-8">
                    <IconInput
                      size={'medium'}
                      type="text"
                      name="id"
                      id="id"
                      autocomplete="off"
                      placeholder="닉네임을 입력하세요"
                      leftIconComponent={<AnimatedIcon.CommonInput />}
                      rightIconComponent={<AnimatedIcon.CheckMark />}
                    />
                  </Columns.Column>
                  <Columns.Column>
                    <Buttons type="button">중복확인</Buttons>
                  </Columns.Column>
                </Columns>
                <DevideLine space="small" color="none" />
                <label className="label">비밀번호</label>
                <IconInput
                  type="password"
                  name="pw"
                  id="pw"
                  autocomplete="off"
                  placeholder="비밀번호를 입력하세요."
                  leftIconComponent={<AnimatedIcon.Password />}
                  rightIconComponent={<AnimatedIcon.CheckMark />}
                />
                <DevideLine space="medium" color="none" />
                <label className="label">비밀번호 확인</label>
                <IconInput
                  type="password"
                  name="pw"
                  id="pw"
                  autocomplete="off"
                  placeholder="비밀번호 확인"
                  leftIconComponent={<AnimatedIcon.Password />}
                  rightIconComponent={<AnimatedIcon.CheckMark />}
                />
                <DevideLine color="none" />

                <Buttons type={'submit'}>회원가입</Buttons>
                <DevideLine space="medium" color="none" />
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

const DevideLine = styled.hr`
  background-color: ${props => (!props.color ? Colors.mainFirst : props.color)};
  opacity: 0.6;
  box-shadow: ${props => (!props.color ? Shadows.button : 'none')};
  margin-top: ${props => (!props.space ? Shadows.huge : FontSize[props.space])};
  margin-bottom: ${props => (!props.space ? FontSize.huge : FontSize[props.space])};
`;

export default JoinPage;
