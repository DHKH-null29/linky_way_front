import { CARD_CLASSIFIER, REACT_QUERY_KEY } from '../../constants/query';
import { Colors, Shadows } from '../../styles';
import { useQuery, useQueryClient } from 'react-query';

import { Icon } from 'react-bulma-components';
import NormalIcon from '../icons/NormalIcon';
import Swal from 'sweetalert2';
import { currentCardClassifier } from '../../state/cardState';
import { onDeleteTag } from '../../api/tagApi';
import { onSelectCardsByeTagId } from '../../api/cardApi';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

const IconTag = ({ size, tagId, children, writable, onClick, highlight }) => {
  const queryClient = useQueryClient();
  const currentTagList = queryClient.getQueryData(REACT_QUERY_KEY.TAGS);
  const setCardClassfier = useSetRecoilState(currentCardClassifier);

  const handleTagDeleteButtonClick = async event => {
    event.stopPropagation();
    Swal.fire({
      icon: 'question',
      text: '정말 태그를 삭제하실 건가요?',
      showCancelButton: true,
      confirmButtonColor: Colors.successFirst,
      cancelButtonColor: Colors.warningFirst,
      confirmButtonText: '네',
      cancelButtonText: '아니요',
    }).then(async result => {
      if (result.isConfirmed) {
        onDeleteTag(tagId)
          .then(() => {
            queryClient.setQueryData(
              REACT_QUERY_KEY.TAGS,
              currentTagList.filter(tag => tag.tagId !== tagId),
            );
          })
          .catch(error => {
            Swal.fire({
              icon: 'error',
              text: error.details,
            });
          });
      }
    });
  };

  const handleTagClick = () => {
    onClick();
    if (!writable) {
      return;
    }
    if (!queryClient.getQueryData([REACT_QUERY_KEY.CARDS_BY_TAG, tagId])) {
      selectCardsByTag();
    } else {
      setCardClassfier({
        id: tagId,
        classifier: CARD_CLASSIFIER.TAG,
        name: children,
      });
    }
  };

  const selectCardByTagId = async () => {
    return await onSelectCardsByeTagId(tagId)
      .then(response => response.data)
      .catch(() => []);
  };

  const { isSuccess, refetch: selectCardsByTag } = useQuery(
    [REACT_QUERY_KEY.CARDS_BY_TAG, tagId],
    selectCardByTagId,
    {
      refetchOnWindowFocus: true,
      enabled: false,
    },
  );

  useEffect(() => {
    if (isSuccess && highlight) {
      setCardClassfier({
        id: tagId,
        classifier: CARD_CLASSIFIER.TAG,
        name: children,
      });
    }
  }, [isSuccess]);

  const SpanClassName = 'tag is-warning is-rounded is-' + size;
  const IconClassName = 'is' + size;
  return (
    <StyledTag
      className={SpanClassName}
      onClick={handleTagClick}
      style={{ backgroundColor: highlight ? Colors.subFirst : Colors.card }}
    >
      <Icon className={IconClassName}>
        <NormalIcon.Tag />
        &nbsp;
      </Icon>
      {children}
      {writable && <button className="delete is-small" onClick={handleTagDeleteButtonClick} />}
    </StyledTag>
  );
};

IconTag.defaultProps = {
  size: 'large',
  writable: false,
};

const StyledTag = styled.span`
  box-shadow: ${Shadows.tag};
  :hover {
    box-shadow: ${Shadows.card};
    cursor: pointer;
  }
`;

export default IconTag;
