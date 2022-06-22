import * as Yup from 'yup';

import { Colors, FontSize, Shadows } from '../../styles';
import { useEffect, useState } from 'react';

import AnimatedIcon from '../icons/AnimatedIcon';
import Buttons from '../common/Buttons';
import { Columns } from 'react-bulma-components';
import IconInput from '../common/IconInput';
import Swal from 'sweetalert2';
import { currentJoinFormState } from '../../state/joinState';
import { onCheckNicknameDuplication } from '../../api/memberApi';
import { onRequestEmailCode } from '../../api/emailApi';
import styled from '@emotion/styled';
import { useFormik } from 'formik';
import { useSetRecoilState } from 'recoil';

const JoinForm = ({ setFormSubmitted }) => {
  const [validNickname, setValidNickname] = useState(false);
  const [validNicknameHistory, setValidNicknameHistory] = useState(undefined);
  const setCurrentJoinForm = useSetRecoilState(currentJoinFormState);
  const [currentEmail, setCurrentEmail] = useState();

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
      if (!validNickname) {
        Swal.fire({
          icon: 'error',
          title: '닉네임 중복 확인을 해주세요.',
        });
        return;
      }
      try {
        onRequestEmailCode(currentEmail);
        setFormSubmitted(true);
        setCurrentJoinForm(values);
        formikHelper.resetForm();
        formikHelper.setStatus({ success: true });
        formikHelper.setSubmitting(false);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: '인증코드 전송 실패',
        });
      }
    },
  });

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

  useEffect(() => {
    setCurrentEmail(values.email);
  }, [values.email]);

  return (
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
      <Columns>
        <DevideLine space="micro" color="none" />
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
          <Buttons type="button" onClick={() => handleCheckDuplicatedNameButton(values.nickname)}>
            중복확인
          </Buttons>
        </Columns.Column>
        <p style={{ color: errors.nickname ? Colors.warningFirst : Colors.successFirst }}>
          &nbsp;&nbsp;&nbsp;&nbsp;
          {touched.nickname &&
            (errors.nickname ||
              (validNickname ? '닉네임 검증 완료!' : '닉네임 입력이 확인되었어요'))}
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
        &nbsp;{touched.password && (errors.password || '비밀번호 입력이 확인되었어요')}
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
        &nbsp;
        {touched.checkPassword && (errors.checkPassword || '비밀번호 입력이 확인되었어요')}
      </p>

      <DevideLine color="none" />
      <Buttons type={'submit'}>회원가입</Buttons>
      <DevideLine space="medium" color="none" />
    </StyledForm>
  );
};

const DevideLine = styled.hr`
  background-color: ${props => (!props.color ? Colors.mainFirst : props.color)};
  opacity: 0.6;
  box-shadow: ${props => (!props.color ? Shadows.button : 'none')};
  margin-top: ${props => (!props.space ? Shadows.huge : FontSize[props.space])};
  margin-bottom: ${props => (!props.space ? FontSize.huge : FontSize[props.space])};
`;

const StyledForm = styled.form`
  width: 100%;
`;

export default JoinForm;
