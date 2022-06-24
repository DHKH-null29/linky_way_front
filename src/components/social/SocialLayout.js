import * as Yup from 'yup';

import { Columns, Hero } from 'react-bulma-components';
import { FontSize, Media } from '../../styles';

import AnimatedIcon from '../icons/AnimatedIcon';
import Buttons from '../common/Buttons';
import { Colors } from '../../styles/colors';
import IconInput from '../common/IconInput';
import SocialTagList from './SocialTagList';
import { currentPackageState } from '../../state/socialState';
import { onGetSearchByPackage } from '../../api/socialApi';
import styled from '@emotion/styled';
import { useFormik } from 'formik';
import { useSetRecoilState } from 'recoil';

const SocialLayout = () => {
  const setCurrentPackages = useSetRecoilState(currentPackageState);
  const initialValues = {
    tagName: '',
  };

  const validationSchema = Yup.object().shape({
    tagName: Yup.string()
      .min(2, '최소 2글자 이상 입력하세요.')
      .max(16, '최대 16글자 이하여야 합니다.')
      .required('검색할 태그를 입력하세요.'),
  });

  const { errors, handleBlur, handleChange, handleSubmit, touched, values } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, formikHelper) => {
      try {
        formikHelper.setStatus({ success: true });
        formikHelper.setSubmitting(false);
        console.log(values);
        const result = await onGetSearchByPackage();
        setCurrentPackages(result.data);
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <StyledHero className="is-small">
      <StyledHeroBody className="column">
        <Columns.Column className="has-text-centered">
          <StyledForm className="section container" onSubmit={handleSubmit}>
            <Columns className="is-tablet">
              <Columns.Column className="is-10">
                <IconInput
                  type="text"
                  name="tagName"
                  autocomplete="off"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.tagName}
                  placeholder="검색할 태그를 입력해주세요."
                  leftIconComponent={<AnimatedIcon.Search />}
                  rightIconComponent={' '}
                />
              </Columns.Column>
              <Columns.Column className="is-2">
                <Buttons type="submit"> &nbsp;검색&nbsp;</Buttons>
              </Columns.Column>
            </Columns>
            <p
              className="pt-2"
              style={{ color: errors.tagName ? Colors.warningFirst : Colors.successFirst }}
            >
              &nbsp;{touched.tagName && errors.tagName}
            </p>
          </StyledForm>
          <TagContainer>
            <div>
              <SocialTagList />
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

export default SocialLayout;
