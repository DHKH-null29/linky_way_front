import * as Yup from 'yup';

import { Colors, FontSize } from '../../styles';
import { EMAIL, EMAIL_CODE } from '../../constants/business';
import { onRequestEmailCode, onVerifyEmailCode } from '../../api/emailApi';
import { useEffect, useState } from 'react';

import AnimatedIcon from '../icons/AnimatedIcon';
import Buttons from '../common/Buttons';
import { Columns } from 'react-bulma-components';
import CountdownTimer from '../common/CountDownTimer';
import { ERROR_CODE } from '../../constants/status';
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
    onRequestEmailCode(values.email).catch(error => {
      if (error.code === ERROR_CODE.BAD_REQUEST) {
        Swal.fire({
          icon: 'warning',
          text: error.details,
        });
      }
      if (error.code === ERROR_CODE.INTERNAL_SERVER_ERROR) {
        Swal.fire({
          icon: 'error',
          text: '??? ????????? ????????? ????????? ????????? ??????????????????',
        });
      }
    });
    Swal.fire({
      icon: 'success',
      text: '?????? ????????? ???????????????!',
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
        placeholder="????????? ??????"
        leftIconComponent={<AnimatedIcon.Email />}
      />
      <p
        className="mt-3"
        style={{ color: errors.email ? Colors.warningFirst : Colors.successFirst }}
      >
        &nbsp;{touched.email && (errors.email || '?????? ??????')}
      </p>
      <p className="is-size-6">&nbsp;</p>
      <div className="control">
        <Buttons type={'button'} onClick={handleSendEmailCodeButton}>
          {isFirstRequest ? '????????????' : '?????????'}
        </Buttons>
      </div>
      <p className="is-size-3">&nbsp;</p>
      <div className="p-2 mt-2">
        <p style={{ fontSize: FontSize.normal, fontWeight: FontWeight.bolder }}>
          ????????? ?????? ???????????????..?
        </p>
        <SubDescription className="pt-2">
          &nbsp;- ????????? ????????? ????????? ???????????? ???????????????
        </SubDescription>
        <SubDescription className="pt-2">
          &nbsp;- ???????????? ????????? ?????? ??????????????? ??? ????????????.
        </SubDescription>
        <SubDescription className="pt-2">
          &nbsp;- ?????? ????????? ??? ????????? ????????? ??? ????????????.
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
            placeholder="??????????????? ??????????????????."
            leftIconComponent={<AnimatedIcon.Password />}
          />
          <p
            className="mt-3"
            style={{ color: errors.code ? Colors.warningFirst : Colors.successFirst }}
          >
            &nbsp;{touched.code && (errors.code || '?????? ??????')}
          </p>
          <Columns className="is-mobile">
            <Columns.Column className="is-half">
              {!isFirstRequest && (
                <CountdownTimer targetDate={currentTime + EMAIL_CODE.EXPIRATION_MILLS} />
              )}
            </Columns.Column>
          </Columns>
          <div className="control">
            <Buttons type={'submit'}>????????????</Buttons>
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
