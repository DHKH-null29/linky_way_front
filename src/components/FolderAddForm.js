import * as Yup from 'yup';

import { Colors, FontSize, Media } from '../styles';
import { Columns, Section } from 'react-bulma-components';

import IconInput from './IconInput';
import ModalFooter from './modals/ModalFooter';
import Swal from 'sweetalert2';
import { folderListState } from '../state/folderState';
import { onAddFolder } from '../api/folderApi';
import styled from '@emotion/styled';
import { useFormik } from 'formik';
import { useRecoilState } from 'recoil';

const FolderAddForm = ({ onClose }) => {
  const [folders, setFolders] = useRecoilState(folderListState);
  const initialValues = {
    parentFolderId: undefined,
    name: '',
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .strict(true)
      .required('폴더이름을 입력하세요')
      .max(10, '최대 10글자로 입력해주세요'),
  });

  const { errors, handleBlur, handleSubmit, handleChange, touched, values } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, formikHelper) => {
      if (!values.parentFolderId) {
        values.parentFolderId = folders[0].folderId;
      }
      const result = await onAddFolder(values);
      formikHelper.resetForm();
      formikHelper.setStatus({ success: true });
      formikHelper.setSubmitting(false);
      if (result.code <= 201) {
        alert('현재 생성된 폴더 자원의 아이디가 필요합니다.');
        setFolders;
        onClose();
      } else {
        Swal.fire({
          icon: 'error',
          text: '폴더 생성 실패',
        });
      }
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <Section>
        <Columns className="is-tablet">
          <Columns.Column className="is-4">
            <label className="label">상위 폴더</label>
            <StyledSelectWrapper className="select">
              <select
                name="parentFolderId"
                value={values.parentFolderId}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {folders &&
                  folders
                    .filter(folder => folder.level <= 2)
                    .map((f, i) => {
                      return (
                        <option key={i} value={f.folderId}>
                          {f.name}
                        </option>
                      );
                    })}
              </select>
            </StyledSelectWrapper>
          </Columns.Column>
          <Columns.Column className="is-8">
            <label className="label">이름</label>
            <IconInput
              type="text"
              name="name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              autocomplete="off"
              placeholder="폴더 이름 입력"
              required
            />
            <p
              className="m-2"
              style={{ color: errors.name ? Colors.warningFirst : Colors.successFirst }}
            >
              &nbsp;{touched.name && (errors.name || '폴더이름 입력 완료!')}
            </p>
          </Columns.Column>
        </Columns>
      </Section>
      <ModalFooter confirm={'추가하기'} cancel={'취소하기'} onClose={onClose} />
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

export default FolderAddForm;
