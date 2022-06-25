import * as Yup from 'yup';

import { Colors, FontSize, Shadows } from '../styles';
import { Columns, Container, Hero } from 'react-bulma-components';
import { onCheckNicknameDuplication, onJoin } from '../api/memberApi';

import AnimatedIcon from '../components/icons/AnimatedIcon';
import Buttons from '../components/common/Buttons';
import IconInput from '../components/common/IconInput';
import Swal from 'sweetalert2';
import styled from '@emotion/styled';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const MyPage = () => {
  const navigate = useNavigate();
  const [validNickname, setValidNickname] = useState(false);
  const [validNicknameHistory, setValidNicknameHistory] = useState(undefined);
  const initialValues = {
    email: '',
    nickname: '',
  };

  const validationSchema = Yup.object().shape({
    nickname: Yup.string()
      .strict(true)
      .required('닉네임을 입력해주세요')
      .matches(/^[a-zA-Z0-9가-힣_]{2,10}$/, '2~10 글자의 문자를 입력해주세요')
  });

  const { errors, handleBlur, handleSubmit, handleChange, touched, values } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, formikHelper) => {
      if (!validNickname) {
        Swal.fire({
          icon: 'error',
          title: '닉네임 중복 확인을 해주세요.',
        });
        return;
      }
      try {
        formikHelper.resetForm();
        formikHelper.setStatus({ success: true });
        formikHelper.setSubmitting(false);
        const result = await onJoin(values);

        if (result.code <= 201) {
          Swal.fire({
            icon: 'success',
            text: '정보가 수정되었습니다.',
          }).then(() => {
            navigate('/');
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: `정보 수정 실패: ${error.details}`,
        });
      }
    },
  });

  const handleCheckDuplicatedNameButton = async nickname => {
    if (errors.nickname) {
      return;
    }

    const result = await onCheckNicknameDuplication(nickname);

    if (result.data && validNicknameHistory !== nickname) {
      const usable = result.data.usable;
      if (usable) {
        setValidNickname(true);
        setValidNicknameHistory(nickname);
      }
      Swal.fire({
        icon: usable ? 'success' : 'warning',
        text: usable ? `'${nickname}' 사용 가능!` : '이미 존재하는 닉네임 입니다.',
      });
    }
  };

  const handleNicknameInputChange = event => {
    validNicknameHistory && event.target.value === validNicknameHistory
      ? setValidNickname(true)
      : setValidNickname(false);
    handleChange(event);
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
                <p className="container has-text-centered title is-2">My Page</p>
                <DevideLine space="small" color="none" />
                <Columns>
                  <Columns.Column className="is-12 pb-0" style={{ width: '100%' }}>
                    <label className="label">이메일</label>
                  </Columns.Column>
                  <Columns.Column>
                    <IconInput
                      name="email"
                      type="text"
                      value={values.email}
                      autocomplete="off"
                      placeholder="email@email.com"
                      leftIconComponent={<AnimatedIcon.Email />}
                      rightIconComponent={resolveRightIconComponent('email')}
                      disabled = {true}
                    />
                  </Columns.Column>
                </Columns>
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
                      onChange={handleNicknameInputChange}
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
                    {touched.nickname &&
                      (errors.nickname ||
                        (validNickname ? '닉네임 검증 완료!' : '닉네임 입력이 확인되었어요'))}
                  </p>
                <p className="is-size-3">&nbsp;</p>
                <DevideLine space="medium" color="none" />
                <Columns>
                  <Columns.Column>
                    <p className="is-size-6">&nbsp;</p>
                    <label className="label">비밀번호 변경</label>
                    <Buttons type={'submit'}>변경하기</Buttons>
                  </Columns.Column>
                  <Columns.Column>
                    <p className="is-size-6">&nbsp;</p>
                    <label className="label">회원 탈퇴하고 싶어요</label>
                    <Buttons colortype="warn">회원 탈퇴</Buttons>
                  </Columns.Column>
                </Columns>
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

export default MyPage;
