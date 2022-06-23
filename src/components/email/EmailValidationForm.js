import * as Yup from 'yup';

import { Colors, FontSize } from '../../styles';
import { onRequestEmailCode, onVerifyEmailCode } from '../../api/emailApi';

import AnimatedIcon from '../icons/AnimatedIcon';
import Buttons from '../common/Buttons';
import { Columns } from 'react-bulma-components';
import CountdownTimer from '../common/CountDownTimer';
import { EMAIL_CODE } from '../../constants/business';
import { FontWeight } from '../../styles/font';
import IconInput from '../common/IconInput';
import Swal from 'sweetalert2';
import { currentJoinFormState } from '../../state/joinState';
import { onJoin } from '../../api/memberApi';
import styled from '@emotion/styled';
import { useFormik } from 'formik';
import { useRecoilState } from 'recoil';
import { useState } from 'react';

const EmailValidationForm = () => {
  const [currentJoinForm, setCurrentJoinForm] = useRecoilState(currentJoinFormState);
  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  const initialValues = {
    email: currentJoinForm.email,
    code: '',
  };

  const validationSchema = Yup.object().shape({
    code: Yup.string()
      .strict(true)
      .length(EMAIL_CODE.LENGTH, EMAIL_CODE.MESSAGE)
      .required(EMAIL_CODE.MESSAGE),
  });

  const { errors, handleBlur, handleSubmit, handleChange, touched, values } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, formikHelper) => {
      formikHelper.setStatus({ success: true });
      formikHelper.setSubmitting(false);
      onVerifyEmailCode(values).then(() => {
        setCurrentJoinForm;
        onJoin(currentJoinForm)
          .then(() => {
            setCurrentJoinForm(undefined);
            Swal.fire({
              icon: 'success',
              text: '회원가입 성공!',
            }).then(() => {
              window.location.href = '/';
            });
          })
          .catch(error => {
            Swal.fire({
              icon: 'fail',
              text: error.details || error.message || '회원가입 실패!',
            });
          });
      });
    },
  });

  return (
    <StyledForm onSubmit={handleSubmit}>
      <div className="control">
        <h2 className="container has-text-centered title is-2">이메일 인증</h2>
      </div>
      <p className="is-size-1">&nbsp;</p>
      <div className="p-2 mt-2">
        <p style={{ fontSize: FontSize.normal, fontWeight: FontWeight.bolder }}>
          메일을 받지 못하셨나요..?
        </p>
        <SubDescription className="pt-2">
          &nbsp;- 정확한 이메일 주소를 입력했나 확인하세요
        </SubDescription>
        <SubDescription className="pt-2">
          &nbsp;- 네트워크 사정에 의한 전송지연일 수 있습니다.
        </SubDescription>
        <SubDescription className="pt-2">
          &nbsp;- 잦은 재요청 시 전송이 제한될 수 있습니다.
        </SubDescription>
      </div>
      <br />
      <IconInput
        type="text"
        name="code"
        autocomplete="off"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.code}
        placeholder="인증코드를 입력해주세요."
        leftIconComponent={<AnimatedIcon.Password />}
      />
      <p
        className="mt-2"
        style={{ color: errors.code ? Colors.warningFirst : Colors.successFirst }}
      >
        &nbsp;{touched.code && (errors.code || '입력 완료')}
      </p>
      <Columns className="is-mobile">
        <Columns.Column className="is-half">
          <CountdownTimer targetDate={currentTime + EMAIL_CODE.EXPIRATION_MILLS} />
        </Columns.Column>
        <Columns.Column className="is-half">
          <a
            onClick={() => {
              setCurrentTime(new Date().getTime());
              onRequestEmailCode(values.email);
            }}
          >
            재전송
          </a>
        </Columns.Column>
      </Columns>
      <div className="control">
        <Buttons type={'submit'}>인증하기</Buttons>
      </div>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  width: 100%;
`;

const SubDescription = styled.p`
  font-size: ${FontSize.small};
  color: darkGrey;
`;

export default EmailValidationForm;
