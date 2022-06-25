import * as Yup from 'yup';

import { BorderRadius, Colors, FontSize, Media, Shadows } from '../../styles';
import { Columns, Section } from 'react-bulma-components';
import { onAddCard, onUpdateCardById } from '../../api/cardApi';
import { useEffect, useState } from 'react';

import Buttons from '../common/Buttons';
import { FontWeight } from '../../styles/font';
import IconInput from '../common/IconInput';
import IconTag from '../tag/IconTag';
import ModalFooter from '../modals/ModalFooter';
import { REACT_QUERY_KEY } from '../../constants/query';
import { cardChangeState } from '../../state/cardState';
import { makeCardFromRequest } from '../../utils/cardUtils';
import { onAddTag } from '../../api/tagApi';
import styled from '@emotion/styled';
import useCardChangeWithFolder from '../../hooks/useCardChangeWithFolder';
import useCardChangeWithTag from '../../hooks/useCardChangeWithTag';
import useDebounce from '../../hooks/useDebounce';
import { useFormik } from 'formik';
import { useQueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';

const CardAddForm = ({ onClose, active, method = 'CREATE', currentCardId }) => {
  const queryClient = useQueryClient();
  const currentCard = queryClient.getQueryData([REACT_QUERY_KEY.CARDS_BY_ID, currentCardId]);

  const folders = queryClient.getQueryData(REACT_QUERY_KEY.FOLDERS);
  const tagList = queryClient.getQueryData(REACT_QUERY_KEY.TAGS) || [];
  const [open, setOpen] = useState(currentCard ? currentCard.isPublic : false);
  const setCardChange = useSetRecoilState(cardChangeState);
  const [searchedTags, setSearchedTags] = useState(new Set());
  const [selectedTags, setSelectedTags] = !currentCard ? useState(new Set()) : useState(new Set());
  const [addableTag, setAddableTag] = useState();

  const cardModificationWithFolder = useCardChangeWithFolder(method);
  const cardModificationWithTag = useCardChangeWithTag(method);

  const initialValues = currentCard
    ? {
        link: currentCard.link,
        title: currentCard.title,
        content: currentCard.content,
        folderId: currentCard.folderId,
        tagIdSet: currentCard.tags ? currentCard.tags.map(tag => tag.tagId) : [],
      }
    : {
        link: '',
        title: '',
        content: '',
        folderId: '',
        tagKeyword: '',
        tagIdSet: [],
      };

  const validationSchema = Yup.object().shape({
    link: Yup.string().strict(true).required('링크 url을 입력하세요'),
    title: Yup.string()
      .strict(true)
      .required('제목을 입력하세요')
      .max(15, '최대 15글자로 입력해주세요'),
    content: Yup.string().strict(true).required('내용을 입력하세요'),
    tagKeyword: Yup.string(),
  });

  const { errors, handleBlur, handleSubmit, handleChange, touched, values, setValues } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, formikHelper) => {
      values.isPublic = open;
      if (!values.folderId) {
        values.folderId = folders[0].folderId;
      }
      values.tagIdSet = Array.from(selectedTags).map(tag => tag.tagId);

      try {
        const response = !currentCard
          ? await onAddCard(values)
          : await onUpdateCardById(currentCardId, values);
        const newCard = makeCardFromRequest(
          currentCard ? currentCard.cardId : response.data.cardId,
          { body: values },
        );
        cardModificationWithFolder(parseInt(values.folderId), newCard);
        cardModificationWithTag(values.tagIdSet, newCard, currentCard && currentCard.tags);

        queryClient.setQueryData(
          REACT_QUERY_KEY.CARDS_BY_DEFAULT,
          [newCard].concat(queryClient.getQueryData(REACT_QUERY_KEY.CARDS_BY_DEFAULT)),
        );

        if (currentCard) {
          queryClient.invalidateQueries([REACT_QUERY_KEY.CARDS_BY_ID, currentCardId]);
        }
      } catch (error) {
        console.log(error);
      }
      formikHelper.resetForm();
      formikHelper.setStatus({ success: true });
      formikHelper.setSubmitting(false);
      setCardChange(true);
      onClose();
    },
  });

  const inputTagValidation = tagName => {
    return !tagName || tagName.length > 10 ? false : true;
  };

  const inputTagHasOnlySpace = tagName => {
    return tagName === '' || tagName.trim() === '' ? true : false;
  };

  const handlePushSelectedTags = tag => {
    const pickedTagList = new Set(selectedTags);
    pickedTagList.add(tag);
    setSelectedTags(pickedTagList);
    setSearchedTags(searchedTags => {
      const newSerachedTags = new Set(searchedTags);
      newSerachedTags.delete(tag);
      return newSerachedTags;
    });
  };

  const handlePopSelectedTags = tag => {
    const pickedTagList = new Set(selectedTags);
    pickedTagList.delete(tag);
    setSelectedTags(pickedTagList);
    setSearchedTags(searchedTags => {
      const newSerachedTags = new Set(searchedTags);
      if (tagList.filter(t => t.tagName.indexOf(values.tagKeyword) >= 0).includes(tag)) {
        newSerachedTags.add(tag);
      }
      return newSerachedTags;
    });
  };

  const handleSearchTagsChange = val => {
    setSearchedTags(
      new Set(
        tagList.filter(tag => {
          return (
            tag.tagName.indexOf(val) !== -1 && !Array.from(selectedTags).find(pc => pc === tag)
          );
        }),
      ),
    );
  };

  const handleTagSAddButtonClick = async () => {
    onAddTag({ tagName: addableTag, isPublic: false })
      .then(response => {
        const resultTag = { tagId: response.data.tagId, tagName: addableTag, isPublic: false };
        queryClient.setQueryData(REACT_QUERY_KEY.TAGS, tagList.concat(resultTag));
        setSearchedTags(new Set(Array.from(searchedTags).concat(resultTag)));
      })
      .catch(error => {
        console.log(error);
        alert('태그 등록 실패');
      });
    setAddableTag(undefined);
  };

  const handleAddableTagsChange = val => {
    inputTagHasOnlySpace(values.tagKeyword)
      ? setAddableTag(undefined)
      : !tagList.find(tag => tag.tagName === val) && setAddableTag(val);
  };

  const debounceValue = useDebounce(values.tagKeyword, 350);

  useEffect(() => {
    if (currentCard && currentCard.tags) {
      setSelectedTags(
        new Set(
          tagList.filter(tag => currentCard.tags.find(current => current.tagId === tag.tagId)),
        ),
      );
    }
  }, [currentCard]);

  useEffect(() => {
    if (!inputTagValidation(debounceValue)) {
      return;
    }
    handleSearchTagsChange(debounceValue);
    handleAddableTagsChange(debounceValue);
  }, [values.tagKeyword, debounceValue]);

  useEffect(() => {
    if (!active) {
      setValues(initialValues);
      setOpen(false);
      setSearchedTags(new Set());
      setSelectedTags(new Set());
    }
  }, [active]);

  return (
    <form onSubmit={handleSubmit}>
      <Section>
        <Columns className="is-mobile">
          <Columns.Column className="is-10 is-offset-1">
            <label className="label">링크 URL</label>
            <IconInput
              type="text"
              name="link"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.link}
              autocomplete="off"
              placeholder="링크 url 입력"
              required
            />
            <p
              className="m-2"
              style={{ color: errors.link ? Colors.warningFirst : Colors.successFirst }}
            >
              &nbsp;{touched.link && (errors.link || '링크 url 입력 완료!')}
            </p>
          </Columns.Column>
          <Columns.Column className="is-10 is-offset-1">
            <label className="label">제목</label>
            <IconInput
              type="text"
              name="title"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.title}
              autocomplete="off"
              placeholder="제목 입력"
              required
            />
            <p
              className="m-2"
              style={{ color: errors.title ? Colors.warningFirst : Colors.successFirst }}
            >
              &nbsp;{touched.title && (errors.title || '폴더이름 입력 완료!')}
            </p>
          </Columns.Column>
          <Columns.Column className="is-10 is-offset-1">
            <label className="label">내용</label>
            <StyledTextArea
              className="textarea has-fixed-size"
              name="content"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.content}
              placeholder=" 내용 입력"
              required
            />
            <p
              className="m-2"
              style={{ color: errors.content ? Colors.warningFirst : Colors.successFirst }}
            >
              &nbsp;{touched.content && (errors.content || '폴더내용 입력 완료!')}
            </p>
          </Columns.Column>
          <Columns.Column className="is-5 is-offset-1">
            <label className="label">폴더 선택</label>
            <StyledSelectWrapper className="select">
              <select
                name="folderId"
                value={values.folderId}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {folders &&
                  folders.map((f, i) => {
                    return (
                      <option
                        key={i}
                        value={f.folderId}
                        selected={currentCard && currentCard.folderId === f.filderId}
                      >
                        {[...Array(f.level)].map((v, i) => {
                          console.log(f.level);
                          if (i === 0) {
                            return;
                          }
                          return <span key={i}>- </span>;
                        })}
                        {f.name}
                      </option>
                    );
                  })}
              </select>
            </StyledSelectWrapper>
          </Columns.Column>
          <Columns.Column className="is-5 is-offset-1">
            <label className="label">공개 여부</label>
            <Buttons
              type="button"
              style={{ width: '70%' }}
              colortype={open ? 'success' : 'warn'}
              onClick={() => {
                setOpen(!open);
              }}
            >
              {!open && '비'}공개
            </Buttons>
          </Columns.Column>
          <Columns.Column className="is-8 is-offset-1">
            <label className="label">태그 선택</label>
            <IconInput
              type="text"
              name="tagKeyword"
              value={values.tagKeyword}
              onChange={handleChange}
              autocomplete="off"
              placeholder="태그 선택"
            />
            {!addableTag && <p className="mt-1">&nbsp;</p>}
            {addableTag && (
              <p className="mt-1">
                <StyledAddTagText onClick={handleTagSAddButtonClick}>
                  &#39;{addableTag}&#39;
                </StyledAddTagText>
                &nbsp;태그 추가하기
              </p>
            )}
          </Columns.Column>
          <Columns.Column className="is-10 is-offset-1" style={{ minHeight: '120px' }}>
            <label className="label">검색된 태그</label>
            {searchedTags.size !== 0 ? (
              Array.from(searchedTags).map((value, index) => {
                return (
                  <IconTag
                    size={'small'}
                    key={index}
                    onClick={() => {
                      handlePushSelectedTags(value);
                    }}
                  >
                    {value.tagName}
                  </IconTag>
                );
              })
            ) : (
              <Section className="p-3 pl-5 has-text-grey">검색된 태그가 없어요!</Section>
            )}
          </Columns.Column>
          <Columns.Column className="is-10 is-offset-1" style={{ minHeight: '120px' }}>
            <label className="label">선택된 태그</label>
            {Array.from(selectedTags).map((value, index) => {
              return (
                <IconTag
                  size={'small'}
                  key={index}
                  onClick={() => {
                    handlePopSelectedTags(value);
                  }}
                >
                  {value.tagName}
                </IconTag>
              );
            })}
          </Columns.Column>
        </Columns>
        <ModalFooter
          confirm={method === 'CREATE' ? '추가하기' : '변경하기'}
          cancel={'취소하기'}
          onClose={onClose}
        />
      </Section>
    </form>
  );
};

const StyledSelectWrapper = styled.div`
  @media ${Media.desktop} {
    font-size: ${FontSize.medium};
  }
  @media ${Media.mobile} {
    font-size: ${FontSize.normal};
  }
`;

const StyledTextArea = styled.textarea`
  font-family: 'ImcreSoojin';
  box-shadow: ${Shadows.input};
  border: 2px solid ${Colors.mainFirst};
  border-radius: ${BorderRadius.input};
`;

const StyledAddTagText = styled.span`
  color: ${Colors.warningFirst};
  font-size: ${FontSize.medium};
  :hover {
    cursor: pointer;
    font-weight: ${FontWeight.bolder};
  }
`;

export default CardAddForm;
