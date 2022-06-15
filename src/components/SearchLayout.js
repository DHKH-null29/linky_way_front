import * as Yup from 'yup';

import { CARD_CLASSIFIER, REACT_QUERY_KEY } from '../constants/query';
import { Columns, Hero } from 'react-bulma-components';
import { FontSize, Media } from '../styles';
import { cardChangeState, currentCardClassifier, prevSearchKeywordState } from '../state/cardState';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import AnimatedIcon from '../components/icons/AnimatedIcon';
import Buttons from './Buttons';
import { Colors } from '../styles/colors';
import IconInput from './IconInput';
import Swal from 'sweetalert2';
import TagList from './TagList';
import { onSelectCardsByKeyword } from '../api/cardApi';
import styled from '@emotion/styled';
import { useFormik } from 'formik';
import { useQuery } from 'react-query';

const SearchLayout = () => {
  const [currentKeyword, setCurrentKeyword] = useState();
  const [cardClassifier, setCardClassfier] = useRecoilState(currentCardClassifier);
  const [prevKeyword, setPrevKeyword] = useRecoilState(prevSearchKeywordState);
  const cardChange = useRecoilValue(cardChangeState);
  const initialValues = {
    keyword: '',
  };
  const validationSchema = Yup.object().shape({
    keyword: Yup.string()
      .min(2, '최소 2글자 이상 입력하세요.')
      .max(16, '최대 16글자 이하여야 합니다.')
      .required('검색할 키워드를 입력하세요.'),
  });

  const { refetch: selectCardsByKeyword, refetch } = useQuery(
    REACT_QUERY_KEY.CARDS_BY_SEARCH,
    () => onSelectCardsByKeyword(currentKeyword).then(response => response.data),
    {
      refetchOnWindowFocus: true,
      enabled: false,
      onSuccess: () => {
        setPrevKeyword(currentKeyword);
      },
    },
  );
  const { errors, handleBlur, handleChange, handleSubmit, touched, values } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, formikHelper) => {
      try {
        if (prevKeyword !== currentKeyword) {
          await selectCardsByKeyword();
        }
        setCardClassfier({
          name: values.keyword,
          classifier: CARD_CLASSIFIER.SEARCH,
        });
        formikHelper.setStatus({ success: true });
        formikHelper.setSubmitting(false);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: error.details,
        });
      }
    },
  });

  useEffect(() => {
    setCurrentKeyword(values.keyword);
  }, [values.keyword]);

  useEffect(() => {
    if (cardChange) {
      setPrevKeyword('');
    }
    if (cardChange && cardClassifier.classifier === CARD_CLASSIFIER.SEARCH) {
      (async () => {
        await refetch();
        setCardClassfier({ ...cardClassifier });
      })();
    }
  }, [cardChange]);

  return (
    <StyledHero className="is-small">
      <StyledHeroBody className="column">
        <Columns.Column className="has-text-centered">
          <StyledForm className="section container" onSubmit={handleSubmit}>
            <Columns className="is-tablet">
              <Columns.Column className="is-10">
                <IconInput
                  type="text"
                  name="keyword"
                  autocomplete="off"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.keyword}
                  placeholder="검색할 키워드를 입력해주세요."
                  leftIconComponent={<AnimatedIcon.Search />}
                  rightIconComponent={' '}
                />
              </Columns.Column>
              <Columns.Column className="is-2">
                <Buttons> &nbsp;검색&nbsp;</Buttons>
              </Columns.Column>
            </Columns>
            <p
              className="pt-2"
              style={{ color: errors.keyword ? Colors.warningFirst : Colors.successFirst }}
            >
              &nbsp;{touched.keyword && errors.keyword}
            </p>
          </StyledForm>
          <TagContainer>
            <div>
              <TagList />
            </div>
          </TagContainer>
          <br />
        </Columns.Column>
      </StyledHeroBody>
    </StyledHero>
  );
};

const StyledHero = styled(Hero)`
  background-color: ${Colors.layout};
`;
const StyledHeroBody = styled(Hero.Body)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
`;

const StyledForm = styled.form`
  padding-bottom: ${FontSize.micro};
  @media ${Media.desktop} {
    width: 50%;
  }
  @media ${Media.tablet} {
    width: 80%;
    padding: ${FontSize.micro};
  }
  @media ${Media.mobile} {
    width: 100%;
    padding: 0px;
  }
`;

const TagContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;

  > div {
    @media ${Media.desktop} {
      width: 55%;
    }
    @media ${Media.tablet} {
      width: 80%;
      padding: ${FontSize.micro};
    }
    @media ${Media.mobile} {
      width: 100%;
      padding: 0px;
    }
  }
`;

export default SearchLayout;
