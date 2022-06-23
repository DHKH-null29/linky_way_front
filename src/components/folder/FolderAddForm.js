import * as Yup from 'yup';

import { Colors, FontSize, Media } from '../../styles';
import { Columns, Section } from 'react-bulma-components';
import { useMutation, useQueryClient } from 'react-query';

import { FOLDER } from '../../constants/business';
import IconInput from '../common/IconInput';
import ModalFooter from '../modals/ModalFooter';
import { REACT_QUERY_KEY } from '../../constants/query';
import Swal from 'sweetalert2';
import { onAddFolder } from '../../api/folderApi';
import styled from '@emotion/styled';
import { useFormik } from 'formik';

const FolderAddForm = ({ onClose }) => {
  const FOLDER_QUERY_KEY = REACT_QUERY_KEY.FOLDERS;
  const queryClient = useQueryClient();

  const folders = queryClient.getQueryData(FOLDER_QUERY_KEY);
  const initialValues = {
    parentFolderId: undefined,
    name: '',
  };

  const FOLDER_VALIDATION = FOLDER.NAME_VALIDATION;
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .strict(true)
      .required(FOLDER_VALIDATION.REQUIRE)
      .matches(FOLDER_VALIDATION.REGEX, FOLDER_VALIDATION.MESSAGE),
  });

  const folderAddMutation = useMutation(folder => onAddFolder(folder), {
    onMutate: () => {
      return folders;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(FOLDER_QUERY_KEY);
      onClose();
    },
    onError: (error, values, rollback) => {
      Swal.fire({
        icon: 'error',
        text: error.details || '폴더 생성 실패',
      });
      rollback && rollback();
    },
  });

  const handleAddFolder = values => {
    folderAddMutation.mutate(values);
  };

  const { errors, handleBlur, handleSubmit, handleChange, touched, values } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, formikHelper) => {
      handleAddFolder(values);
      formikHelper.setStatus({ success: true });
      formikHelper.setSubmitting(false);
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
                <option value="">없음</option>
                {folders &&
                  folders
                    .filter(folder => folder.level === FOLDER.DEPTH_LIMIT - 1)
                    .map(f => {
                      return (
                        <option key={f.folderId} value={f.folderId}>
                          {f.name || '이름없음'}
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
