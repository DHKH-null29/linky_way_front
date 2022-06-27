import * as Yup from 'yup';

import { Colors, FontSize, Shadows } from '../styles';
import { Columns, Container, Hero } from 'react-bulma-components';
import { onCheckNicknameDuplication, onNicknameChange, onMyPage, onMembershipWithdrawal } from '../api/memberApi';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import AnimatedIcon from '../components/icons/AnimatedIcon';
import Buttons from '../components/common/Buttons';
import IconInput from '../components/common/IconInput';
import Swal from 'sweetalert2';
import styled from '@emotion/styled';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const MyPage = () => {
  const USER_QUERY_KEY = 'userData'
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [validNickname, setValidNickname] = useState(false);
  const [validNicknameHistory, setValidNicknameHistory] = useState(undefined);
  const [nicknameDisabled, setNicknameDisabled] = useState(true);
  const [user, setUser] = useState({});

  const initialValues = {
    nickname: '',
  };

  const validationSchema = Yup.object().shape({
    nickname: Yup.string()
      .strict(true)
      .required('닉네임을 입력해주세요')
      .matches(/^[a-zA-Z0-9가-힣_]{2,10}$/, '2~10 글자의 문자를 입력해주세요'),
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
      formikHelper.resetForm();
      formikHelper.setStatus({ success: true });
      formikHelper.setSubmitting(false);

      nicknameModifyMutation.mutate(values.nickname);
    }
  });

  const handleNicknameChangeSubmit = (event) => {
    handleSubmit();
    event.preventDefault();
  }

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

  const nicknameModifyMutation = useMutation(inputNickname => onNicknameChange(inputNickname), {
    onMutate: async inputNickname => {
      await queryClient.cancelQueries(USER_QUERY_KEY);
      const previousValue = queryClient.getQueryData(USER_QUERY_KEY);
      if(previousValue) {
        queryClient.setQueryData(USER_QUERY_KEY, { nickname: inputNickname });
      }
      return { previousValue };
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        text: '정보가 수정되었습니다.',
      });
      setNicknameDisabled(true);
    },
    onError: (error, variables, context) => {
      Swal.fire({
        icon: 'error',
        text: `정보 수정 실패: ${error.details}`,
      }).then(() => {
        queryClient.setQueryData(USER_QUERY_KEY, context.previousValue);
      });
    },
  });         

  const { data, status, error } = useQuery(USER_QUERY_KEY, () =>
    onMyPage().then(response => response.data),
  );

  useEffect(() => {
    if (status === "success") {
      setUser(data);
    }
  }, [data]);

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }

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
              <StyledForm onSubmit={(event) => { handleNicknameChangeSubmit(event) }}>
                <p className="container has-text-centered title is-2">My Page</p>
                <DevideLine space="small" color="none" />
                <Columns>
                  <Columns.Column className="is-12 pb-0" style={{ width: '100%' }}>
                    <label className="label">가입 날짜</label>
                  </Columns.Column>
                  <Columns.Column>
                    <IconInput
                      name="calendar"
                      type="text"
                      // value={values.calendar}
                      autocomplete="off"
                      placeholder="2022년 01월 01일"
                      leftIconComponent={<AnimatedIcon.Calendar />}
                      rightIconComponent={resolveRightIconComponent('calendar')}
                      disabled={true}
                    />
                  </Columns.Column>
                </Columns>
                <Columns>
                  <Columns.Column className="is-12 pb-0" style={{ width: '100%' }}>
                    <label className="label">이메일</label>
                  </Columns.Column>
                  <Columns.Column>
                    <IconInput
                      name="email"
                      type="text"
                      value={user.email}
                      autocomplete="off"
                      leftIconComponent={<AnimatedIcon.Email />}
                      rightIconComponent={resolveRightIconComponent('email')}
                      disabled={true}
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
                      onChange={handleNicknameInputChange}
                      onBlur={handleBlur}
                      value={nicknameDisabled ? user.nickname : values.nickname}
                      placeholder={user.nickname}
                      leftIconComponent={<AnimatedIcon.CommonInput />}
                      rightIconComponent={resolveRightIconComponent('nickname')}
                      disabled={nicknameDisabled}
                    />
                  </Columns.Column>
                  <Columns.Column className="is-4">
                    <Buttons
                      type="button"
                      onClick={() =>
                        nicknameDisabled == true
                          ? setNicknameDisabled(false)
                          : handleCheckDuplicatedNameButton(values.nickname)
                      }
                    >
                      {nicknameDisabled == true ? '변경하기' : '중복확인'}
                    </Buttons>
                  </Columns.Column>
                  <p style={{ color: errors.nickname ? Colors.warningFirst : Colors.successFirst }}>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {touched.nickname &&
                      (errors.nickname ||
                        (validNickname ? '닉네임 검증 완료!' : '닉네임 입력이 확인되었어요'))}
                  </p>
                </Columns>
                {nicknameDisabled == false ? (
                  <Columns>
                    <Columns.Column>
                      <Buttons type="submit">수정완료</Buttons>
                    </Columns.Column>
                  </Columns>
                ) : (
                  <Columns></Columns>
                )}
                <DevideLine space="medium" color="none" />
                <Columns>
                  <Columns.Column>
                    <p className="is-size-6">&nbsp;</p>
                    <label className="label">비밀번호 변경</label>
                    <Buttons type="button">변경하기</Buttons>
                  </Columns.Column>
                  <Columns.Column>
                    <p className="is-size-6">&nbsp;</p>
                    <label className="label">회원 탈퇴하고 싶어요</label>
                    <Buttons type="button" colortype="warn" onClick={handleMembershipWithdrawalClick}>
                      회원 탈퇴
                    </Buttons>
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
