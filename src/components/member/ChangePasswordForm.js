import * as Yup from 'yup';

import {
  onChangePasswordByMember,
  onChangePasswordWithVerifiedEmailByNoAuthUser,
  onSelectMemberByEmail,
} from '../../api/memberApi';

import AnimatedIcon from '../icons/AnimatedIcon';
import Buttons from '../common/Buttons';
import { Colors } from '../../styles';
import IconInput from '../common/IconInput';
import { PASSWORD } from '../../constants/business';
import Swal from 'sweetalert2';
import styled from '@emotion/styled';
import { useFormik } from 'formik';
import { useQuery } from 'react-query';

const ChangePasswordForm = ({ purpose, authRequest, email }) => {
  const initialValues = {
    password: '',
    checkPassword: '',
  };

  const PASSWORD_VALIDATION = PASSWORD.VALIDATION;

  useQuery('EMAIL', () => onSelectMemberByEmail(email), {
    onError: error => {
      Swal.fire({
        icon: 'warning',
        text: error.details || error.message,
        timer: 1000,
      }).then(() => {
        setTimeout(() => (window.location.href = '/'), 50);
      });
    },
  });

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required(PASSWORD_VALIDATION.REQUIRE)
      .matches(PASSWORD_VALIDATION.REGEX, PASSWORD_VALIDATION.MESSAGE),
    checkPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
      .required('확인 비밀번호를 입력해주세요.'),
  });

  const { errors, handleBlur, handleSubmit, handleChange, touched, values } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, formikHelper) => {
      try {
        const changePasswordCallBack = authRequest
          ? () => onChangePasswordByMember(values.password)
          : () =>
              onChangePasswordWithVerifiedEmailByNoAuthUser(email, values.password).then(() => {
                setTimeout(() => (window.location.href = '/login'), 200);
              });
        changePasswordCallBack().then(() => {
          Swal.fire({
            icon: 'success',
            text: '비밀번호 변경 성공',
          });
        });
        formikHelper.resetForm();
        formikHelper.setStatus({ success: true });
        formikHelper.setSubmitting(false);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: '비밀번호 변경 실패',
        });
      }
    },
  });

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
    <StyledForm onSubmit={handleSubmit}>
      <label className="label">{purpose}</label>
      <IconInput
        id="password"
        name="password"
        type="password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        autocomplete="off"
        placeholder="사용하실 새 비밀번호를 입력하세요"
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
      <label className="label">비밀번호 확인</label>
      <IconInput
        name="checkPassword"
        type="password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.checkPassword}
        autocomplete="off"
        placeholder="비밀번호를 확인해주세요"
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
      <Buttons type={'submit'}>비밀번호 변경</Buttons>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  width: 100%;
`;

export default ChangePasswordForm;
