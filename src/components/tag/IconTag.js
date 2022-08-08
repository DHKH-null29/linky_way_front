import { CARD_CLASSIFIER, REACT_QUERY_KEY } from '../../constants/query';
import { Colors, Shadows } from '../../styles';

import { CARD } from '../../constants/business';
import { Icon } from 'react-bulma-components';
import NormalIcon from '../icons/NormalIcon';
import Swal from 'sweetalert2';
import { currentCardClassifier } from '../../state/cardState';
import { onDeleteTag } from '../../api/tagApi';
import { onSelectCardsByTagId } from '../../api/cardApi';
import { pagingRequestWrapper } from '../../api/config';
import styled from '@emotion/styled';
import { useLazyPagingQuery } from '../../hooks/useQuery';
import { useQueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';

const IconTag = ({ size, tagId, children, writable, onClick, highlight }) => {
  const queryClient = useQueryClient();
  const currentTagList = queryClient.getQueryData(REACT_QUERY_KEY.TAGS);
  const currentCardsByTag = queryClient.getQueryData([REACT_QUERY_KEY.CARDS_BY_TAG, tagId]);
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

  const [setEnabled, { fetchNextPage }] = useLazyPagingQuery(
    [REACT_QUERY_KEY.CARDS_BY_TAG, tagId],
    ({ pageParam }) =>
      pagingRequestWrapper(() => onSelectCardsByTagId(tagId, pageParam, CARD.GLOBAL_PAGING_SIZE)),
    {
      onSuccess: async () => {
        if (highlight) {
          setCardClassfier({
            id: tagId,
            classifier: CARD_CLASSIFIER.TAG,
            name: children,
            refetcher: fetchNextPage,
          });
        }
      },
    },
  );
  const handleTagClick = () => {
    onClick && onClick();
    console.log(currentCardsByTag);
    if (!writable) {
      return;
    }
    if (!currentCardsByTag) {
      setEnabled();
    } else {
      setCardClassfier({
        id: tagId,
        classifier: CARD_CLASSIFIER.TAG,
        name: children,
        refetcher: fetchNextPage,
      });
    }
  };

  // const selectCardByTagId = async () => {
  //   return await onSelectCardsByTagId(tagId)
  //     .then(response => response.data)
  //     .catch(() => []);
  // };

  // const { isSuccess, refetch: selectCardsByTag } = useQuery(
  //   [REACT_QUERY_KEY.CARDS_BY_TAG, tagId],
  //   selectCardByTagId,
  //   {
  //     refetchOnWindowFocus: true,
  //     enabled: false,
  //   },
  // );

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
