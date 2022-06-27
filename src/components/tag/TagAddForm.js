import * as Yup from 'yup';

import { BorderRadius, Colors, Media, Shadows } from '../../styles';

import { Columns } from 'react-bulma-components';
import IconInput from '../common/IconInput';
import { REACT_QUERY_KEY } from '../../constants/query';
import Switcher from '../common/Switcher';
import { onAddTag } from '../../api/tagApi';
import styled from '@emotion/styled';
import { useFormik } from 'formik';
import { useQueryClient } from 'react-query';
import { useState } from 'react';

const TagAddForm = () => {
  const [publicChangeRequest, setPublicChangeRequest] = useState(false);
  const [off, setOff] = useState(false);
  const queryClient = useQueryClient();
  const tagList = queryClient.getQueryData(REACT_QUERY_KEY.TAGS);

  const initialValues = {
    tagName: '',
    isPublic: false,
  };
  const validationSchema = Yup.object().shape({
    tagName: Yup.string().required('태그이름을 입력해주세요').max(10, '10글자 이하만 가능합니다.'),
  });

  const { errors, handleBlur, handleSubmit, handleChange, touched, values } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, formikHelper) => {
      values.isPublic = off;
      onAddTag(values).then(response => {
        const resultTag = {
          tagId: response.data.tagId,
          tagName: values.tagName,
          isPublic: values.isPublic,
        };
        queryClient.setQueryData(REACT_QUERY_KEY.TAGS, [...tagList].concat(resultTag));
      });
      formikHelper.resetForm();
      formikHelper.setStatus({ success: true });
      formikHelper.setSubmitting(false);
    },
  });

  const handleSwitchClick = () => {
    !publicChangeRequest && setPublicChangeRequest(true);
    setOff(isPublic => !isPublic);
  };

  const handleSubmitClick = () => {
    handleSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Columns className="is-mobile">
        <Columns.Column className="is-7-desktop is-7-tablet is-9-mobile">
          <IconInput
            size={'micro'}
            id="tagName"
            name="tagName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.tagName}
            autocomplete="off"
            placeholder="태그이름 입력"
            required
          />
        </Columns.Column>
        <Columns.Column className="is-3-desktop is-3-tablet" />
        <Columns.Column className="is-2 mt-1">
          <div style={{ position: 'relative' }}>
            <Switcher isOff={!off} />
            <StyledModifier
              className="button is-size-7"
              style={{
                position: 'absolute',
                top: 0,
                opacity: 0.0,
              }}
              onClick={handleSwitchClick}
            >
              더미
            </StyledModifier>
          </div>
        </Columns.Column>
        <Columns.Column className="is-12 pt-0 has-text-left">
          <StyledModifier
            onClick={handleSubmitClick}
            className="button is-size-7 mt-3 mb-2"
            style={{ width: '30%' }}
          >
            등록하기
          </StyledModifier>
          <p
            className="ml-2 mt-0 mb-2"
            style={{
              color: errors.tagName ? Colors.warningFirst : Colors.successFirst,
              fontSize: '11px',
            }}
          >
            &nbsp;{touched.tagName && (errors.tagName || '태그 이름 확인')}
          </p>
        </Columns.Column>
      </Columns>
    </form>
  );
};

const StyledModifier = styled.span`
  border-radius: ${BorderRadius.button};
  color: white;
  background-color: ${Colors.subSecond};
  :hover {
    box-shadow: ${Shadows.button};
  }
  @media ${Media.mobile} {
    transform: scale(0.9);
  }
`;

export default TagAddForm;
