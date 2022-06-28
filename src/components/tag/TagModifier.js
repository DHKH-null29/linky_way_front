import * as Yup from 'yup';

import { BorderRadius, Colors, Media, Shadows } from '../../styles';
import { useEffect, useState } from 'react';

import { Columns } from 'react-bulma-components';
import { REACT_QUERY_KEY } from '../../constants/query';
import Switcher from '../common/Switcher';
import { onChangeTag } from '../../api/tagApi';
import styled from '@emotion/styled';
import useDebounce from '../../hooks/useDebounce';
import { useFormik } from 'formik';
import { useQueryClient } from 'react-query';

const TagModifier = ({ tagId, tagName, isPublic, onDelete }) => {
  const [publicChangeRequest, setPublicChangeRequest] = useState(false);
  const [tagNameRequest, setTagNameRequest] = useState(tagName);
  const [nameChangeMode, setNameChangeMode] = useState(false);
  const [nameChangeStatus, setNameChangeStatus] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const queryClient = useQueryClient();
  const tagList = queryClient.getQueryData(REACT_QUERY_KEY.TAGS);
  const [off, setOff] = useState(isPublic);

  const initialValues = {
    tagName: tagName,
  };
  const validationSchema = Yup.object().shape({
    tagName: Yup.string().required().max(10),
  });

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, formikHelper) => {
      formikHelper.resetForm();
      formikHelper.setStatus({ success: true });
      formikHelper.setSubmitting(false);
    },
  });

  const handleSwitchClick = () => {
    !publicChangeRequest && setPublicChangeRequest(true);
    setOff(isPublic => !isPublic);
  };

  const isPublicDebounce = useDebounce(off, 1000);
  useEffect(() => {
    if (publicChangeRequest) {
      setPublicChangeRequest;
      onChangeTag(tagId, off, tagNameRequest).then(() => {
        const obj = { ...tagList.filter(tag => tag.tagId === tagId)[0] };
        obj.isPublic = off;
        queryClient.setQueryData(
          REACT_QUERY_KEY.TAGS,
          tagList.map(v => (v.tagId === obj.tagId ? obj : v)),
        );
      });
    }
  }, [isPublicDebounce]);

  useEffect(() => {
    if (tagNameRequest !== tagName) {
      onChangeTag(tagId, isPublic, tagNameRequest)
        .catch(() => {
          setTagNameRequest(tagName);
          setNameChangeStatus(false);
        })
        .then(() => {
          const obj = { ...tagList.filter(tag => tag.tagId === tagId)[0] };
          obj.tagName = tagNameRequest;
          queryClient.setQueryData(
            REACT_QUERY_KEY.TAGS,
            tagList.map(v => (v.tagId === obj.tagId ? obj : v)),
          );
        });
    }
  }, [tagNameRequest]);

  const handleTagNameChangeClick = () => {
    if (nameChangeMode) {
      setTagNameRequest(values.tagName);
      setTimeout(() => {
        handleSubmit();
        setNameChangeMode(false);
        setNameChangeStatus(true);
      }, 1000);
    } else {
      setNameChangeMode(true);
    }
  };

  const handleTagDeleteButtonClick = () => {
    onDelete();
    setDisabled(true);
  };

  useEffect(() => {
    setDisabled(false);
  }, [tagId]);

  return (
    <form onSubmit={handleSubmit}>
      <Columns
        className="is-mobile"
        style={{ pointerEvents: disabled ? 'none' : '', opacity: disabled ? '0.3' : '1' }}
      >
        <Columns.Column className="is-4 mt-1">
          {nameChangeMode && (
            <>
              <input
                className="pl-2 is-size-7-mobile is-size-6-desktop"
                id="tagName"
                name="tagName"
                onChange={handleChange}
                value={values.password}
                autoComplete="off"
                placeholder={tagNameRequest}
                style={{
                  borderColor: nameChangeStatus ? 'black' : Colors.warningFirst,
                  width: '90%',
                }}
              />
              {!nameChangeStatus && (
                <p className="pt-1 has-text-danger" style={{ fontSize: '10px' }}>
                  변경실패
                </p>
              )}
            </>
          )}
          {!nameChangeMode && (
            <span
              className="pl-2 is-size-7-mobile is-size-6-desktop"
              style={{ whiteSpace: 'nowrap' }}
            >
              {tagNameRequest}
            </span>
          )}
        </Columns.Column>
        <Columns.Column className="is-6">
          &nbsp;
          <StyledModifier
            className="button is-size-7"
            style={{ backgroundColor: !nameChangeMode ? Colors.subSecond : Colors.successFirst }}
            onClick={handleTagNameChangeClick}
          >
            {nameChangeMode ? '반영하기' : '이름수정'}
          </StyledModifier>
          &nbsp;
          {nameChangeMode && (
            <StyledModifier
              className="button is-size-7"
              style={{ backgroundColor: Colors.warningFirst }}
              onClick={() => {
                setNameChangeMode(false);
              }}
            >
              취소
            </StyledModifier>
          )}
          {!nameChangeMode && (
            <StyledModifier
              className="button is-size-7"
              style={{ backgroundColor: Colors.warningFirst }}
              onClick={handleTagDeleteButtonClick}
            >
              삭제
            </StyledModifier>
          )}
        </Columns.Column>
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
      </Columns>
    </form>
  );
};

const StyledModifier = styled.span`
  border-radius: ${BorderRadius.button};
  color: white;
  :hover {
    box-shadow: ${Shadows.button};
  }
  @media ${Media.mobile} {
    transform: scale(0.9);
  }
`;

export default TagModifier;
