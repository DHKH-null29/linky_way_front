import { Colors, Shadows } from '../styles';

import { Icon } from 'react-bulma-components';
import Swal from 'sweetalert2';
import TagIcon from './icons/TagIcon';
import { currentTagState } from '../state/tagState';
import { onDeleteTag } from '../api/tagApi';
import { onSelectCardsByeTagId } from '../api/cardApi';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

const IconTag = ({ size, tagId, index, children, writable }) => {
  const [tags, setTags] = useRecoilState(currentTagState);

  const handleTagClick = () => {
    onSelectCardsByeTagId(tagId)
      .then(response => {
        console.log(response);
        console.log(tags);
      })
      .catch(error => {
        console.log(error);
        alert(error.details);
      });
  };

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
            const newTags = [...tags];
            newTags.splice(index, 1);
            setTags(newTags);
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
  const SpanClassName = 'tag is-warning is-rounded is-' + size;
  const IconClassName = 'is' + size;
  return (
    <StyledTag className={SpanClassName} onClick={handleTagClick}>
      <Icon className={IconClassName}>
        <TagIcon />
        &nbsp;
      </Icon>
      {children}
      {writable && (
        <button className="delete is-small" onClick={handleTagDeleteButtonClick}></button>
      )}
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
