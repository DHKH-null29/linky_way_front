import { Colors } from '../styles';
import { Icon } from 'react-bulma-components';
import Swal from 'sweetalert2';
import TagIcon from './icons/TagIcon';
import { currentTagState } from '../state/tagState';
import { onDeleteTag } from '../api/tagApi';
import { useRecoilState } from 'recoil';

const IconTag = ({ size, tagId, index, children, writable }) => {
  const [currentTags, setCurrentTags] = useRecoilState(currentTagState);

  const handleTagDeleteButtonClick = async () => {
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
            const newTags = [...currentTags];
            newTags.splice(index, 1);
            setCurrentTags(newTags);
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
    <span className={SpanClassName}>
      <Icon className={IconClassName}>
        <TagIcon />
        &nbsp;
      </Icon>
      {children}
      {writable && (
        <button className="delete is-small" onClick={handleTagDeleteButtonClick}></button>
      )}
    </span>
  );
};

IconTag.defaultProps = {
  size: 'large',
  writable: false,
};

export default IconTag;
