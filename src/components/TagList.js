// import AnimatedIcon from './icons/AnimatedIcon';

import { Columns } from 'react-bulma-components';
import IconTag from '../components/IconTag';
import { currentTagState } from '../state/tagState';
import { onGetTagList } from '../api/tagApi';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const TagList = () => {
  const [tags, setTags] = useRecoilState(currentTagState);

  useEffect(() => {
    if (!tags || tags.length === 0) {
      onGetTagList()
        .then(response => {
          setTags(response.data);
        })
        .catch(error => {
          setTags(JSON.stringify(error));
          alert('인증이 필요합니다.');
        });
    }
  }, [tags]);

  const tag = (value, index, size) => {
    return (
      <IconTag size={size} writable={true} key={value.tagId} tagId={value.tagId} index={index}>
        {value.tagName}
      </IconTag>
    );
  };

  return (
    <Columns className="is-mobile">
      <Columns.Column>
        {tags.map((value, index) => {
          return (
            <span key={index}>
              <span className="is-hidden-mobile">{tag(value, index, 'large')}</span>
              <span className="is-hidden-tablet is-hidden-desktop">
                {tag(value, index, 'small')}
              </span>
            </span>
          );
        })}
      </Columns.Column>
    </Columns>
  );
};

export default TagList;
