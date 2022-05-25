import * as Yup from 'yup';

import { Colors, FontSize, Shadows } from '../styles';
import { Columns, Container, Hero } from 'react-bulma-components';

import AnimatedIcon from '../components/icons/AnimatedIcon';
import Buttons from '../components/Buttons';
import IconInput from '../components/IconInput';
import Swal from 'sweetalert2';
import styled from '@emotion/styled';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

const JoinPage = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: '',
    nickname: '',
    password: '',
    checkPassword: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .strict(true)
      .email('이메일 형식으로 작성해주세요.')
      .required('이메일을 입력해주세요.'),
    nickname: Yup.string()
      .strict(true)
      .required('닉네임을 입력해주세요')
      .matches(/^[a-zA-Z0-9가-힣_]{2,10}$/, '2~10 글자의 문자를 입력해주세요'),
    password: Yup.string()
      .required('비밀번호를 입력하세요')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,16}$/,
        '비밀번호는 4~16자의 대소영문자,숫자,특수문자를 포함해야 합니다',
      ),
    checkPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
      .required('확인 비밀번호를 입력해주세요.'),
  });

  const { errors, handleBlur, handleSubmit, handleChange, touched, values } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, formikHelper) => {
      try {
        console.log(values);
        formikHelper.resetForm();
        formikHelper.setStatus({ success: true });
        formikHelper.setSubmitting(false);
        Swal.fire({
          icon: 'success',
          text: '회원가입 성공!!',
        }).then(() => {
          navigate('/');
        });
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

  const handleCheckDuplicatedNameButton = nickname => {
    if (nickname === '') {
      return;
    }
    Swal.fire({
      icon: 'success',
      text: '사용가능한 닉네임입니다!: ' + nickname,
    });
  };

  const resolveRightIconComponent = val => {
    return (
      touched[val] &&
      (!errors[val] ? (
        <AnimatedIcon.CheckMark size={'large'} />
      ) : (
        <AnimatedIcon.WarningAlert size={'large'} />
      ))
    );
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
                <DevideLine space="small" color="none" />
                <label className="label">이메일</label>
                <IconInput
                  name="email"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  autocomplete="off"
                  placeholder="이메일을 입력하세요"
                  required
                  leftIconComponent={<AnimatedIcon.Email />}
                  rightIconComponent={resolveRightIconComponent('email')}
                />
                <p
                  className="m-2"
                  style={{ color: errors.email ? Colors.warningFirst : Colors.successFirst }}
                >
                  &nbsp;{touched.email && (errors.email || '이메일 입력이 확인되었어요')}
                </p>
                <Buttons type="button" onClick={handleEmailAuthenticationButtonClick}>
                  이메일 인증번호 전송
                </Buttons>
                <DevideLine space="medium" color="none" />
                <Columns>
                  <Columns.Column className="is-12 pb-0" style={{ width: '100%' }}>
                    <label className="label">닉네임</label>
                  </Columns.Column>
                  <Columns.Column className="is-8">
                    <IconInput
                      type="text"
                      name="nickname"
                      autocomplete="off"
                      required
                      placeholder="닉네임을 입력하세요"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.nickname}
                      leftIconComponent={<AnimatedIcon.CommonInput />}
                      rightIconComponent={resolveRightIconComponent('nickname')}
                    />
                  </Columns.Column>
                  <Columns.Column>
                    <Buttons
                      type="button"
                      onClick={() => handleCheckDuplicatedNameButton(values.nickname)}
                    >
                      중복확인
                    </Buttons>
                  </Columns.Column>
                  <p style={{ color: errors.nickname ? Colors.warningFirst : Colors.successFirst }}>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {touched.nickname && (errors.nickname || '닉네임 입력이 확인되었어요')}
                  </p>
                </Columns>
                <DevideLine space="micro" color="none" />
                <label className="label">비밀번호</label>
                <IconInput
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  autocomplete="off"
                  placeholder="비밀번호를 입력하세요"
                  required
                  leftIconComponent={<AnimatedIcon.Password />}
                  rightIconComponent={resolveRightIconComponent('password')}
                />
                <p
                  className="m-2"
                  style={{ color: errors.password ? Colors.warningFirst : Colors.successFirst }}
                >
                  {touched.password && (errors.password || '비밀번호 입력이 확인되었어요')}
                </p>
                <DevideLine space="micro" color="none" />
                <label className="label">비밀번호 확인</label>
                <IconInput
                  name="checkPassword"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.checkPassword}
                  autocomplete="off"
                  placeholder="비밀번호를 확인해줏세요"
                  required
                  leftIconComponent={<AnimatedIcon.Password />}
                  rightIconComponent={resolveRightIconComponent('checkPassword')}
                />
                <p
                  className="m-2"
                  style={{
                    color: errors.checkPassword ? Colors.warningFirst : Colors.successFirst,
                  }}
                >
                  {touched.checkPassword &&
                    (errors.checkPassword || '비밀번호 입력이 확인되었어요')}
                </p>

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
