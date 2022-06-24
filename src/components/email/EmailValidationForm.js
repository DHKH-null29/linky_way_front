import * as Yup from 'yup';

import { Colors, FontSize } from '../../styles';
import { EMAIL, EMAIL_CODE } from '../../constants/business';
import { onRequestEmailCode, onVerifyEmailCode } from '../../api/emailApi';
import { useEffect, useState } from 'react';

import AnimatedIcon from '../icons/AnimatedIcon';
import Buttons from '../common/Buttons';
import { Columns } from 'react-bulma-components';
import CountdownTimer from '../common/CountDownTimer';
import { FontWeight } from '../../styles/font';
import IconInput from '../common/IconInput';
import Swal from 'sweetalert2';
import styled from '@emotion/styled';
import { useFormik } from 'formik';

const EmailValidationForm = ({ onSuccess, isJoinRequest = false, email, setEmail }) => {
  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  const [isFirstRequest, setIsFirstRequest] = useState(true);

  useEffect(() => {
    if (isJoinRequest) {
      setIsFirstRequest(false);
    }
  }, []);

  const initialValues = {
    email: isJoinRequest ? email : '',
    code: '',
  };

  const EMAIL_VALIDATION = EMAIL.VALIDATION;

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .strict(true)
      .matches(EMAIL_VALIDATION.REGEX, EMAIL_VALIDATION.MESSAGE)
      .required(EMAIL_VALIDATION.REQUIRE),
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
      setEmail && setEmail(values.email);
      onVerifyEmailCode(values)
        .then(() => {
          onSuccess();
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            text: error.details || error.message,
          });
        });
    },
  });

  const handleSendEmailCodeButton = () => {
    if (errors.email) {
      return;
    }
    setCurrentTime(new Date().getTime());
    setIsFirstRequest(false);
    onRequestEmailCode(values.email);
    Swal.fire({
      icon: 'success',
      text: '인증 코드를 발송했어요!',
    });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <IconInput
        disabled={isJoinRequest ? true : false}
        type="text"
        name="email"
        autocomplete="off"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        placeholder="이메일 입력"
        leftIconComponent={<AnimatedIcon.Email />}
      />
      <p
        className="mt-3"
        style={{ color: errors.email ? Colors.warningFirst : Colors.successFirst }}
      >
        &nbsp;{touched.email && (errors.email || '입력 완료')}
      </p>
      <p className="is-size-6">&nbsp;</p>
      <div className="control">
        <Buttons type={'button'} onClick={handleSendEmailCodeButton}>
          {isFirstRequest ? '전송하기' : '재전송'}
        </Buttons>
      </div>
      <p className="is-size-3">&nbsp;</p>
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
      {!isFirstRequest && (
        <>
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
            className="mt-3"
            style={{ color: errors.code ? Colors.warningFirst : Colors.successFirst }}
          >
            &nbsp;{touched.code && (errors.code || '입력 완료')}
          </p>
          <Columns className="is-mobile">
            <Columns.Column className="is-half">
              {!isFirstRequest && (
                <CountdownTimer targetDate={currentTime + EMAIL_CODE.EXPIRATION_MILLS} />
              )}
            </Columns.Column>
          </Columns>
          <div className="control">
            <Buttons type={'submit'}>인증하기</Buttons>
          </div>
        </>
      )}
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
