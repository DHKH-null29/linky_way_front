// import AnimatedIcon from './icons/AnimatedIcon';

import { useRecoilState, useSetRecoilState } from 'recoil';

import { Columns } from 'react-bulma-components';
import IconTag from '../components/IconTag';
import { currentCardState } from '../state/cardState';
import { currentTagState } from '../state/tagState';
import { onGetTagList } from '../api/tagApi';
import { useEffect } from 'react';

// import { cardBytagIdSelector } from '../state/cardState';

const TagList = () => {
  const setTagList = useSetRecoilState(currentCardState);
  const [tags, setTags] = useRecoilState(currentTagState);

  useEffect(() => {
    if (!tags || tags.length === 0) {
      onGetTagList()
        .then(response => {
          setTags(response.data);
          console.log(response);
          setTagList(response.data);
        })
        .catch(error => {
          setTags(JSON.stringify(error));
          alert('인증이 필요합니다.');
        });
    }
  }, [tags]);

  // const handleTagListClick = () => {
  //   onGetTagList()
  //     .then(response => {
  //       setTags(response.data);
  //       console.log(response);
  //     })
  //     .catch(error => {
  //       setTags(JSON.stringify(error));
  //       alert('인증이 필요합니다.');
  //     });
  // };

  return (
    <div>
      <Columns className="is-mobile">
        <Columns.Column className="is-1">
          {/* <AnimatedIcon.SkipBack onClick={handleTagListClick} size={30} /> */}
        </Columns.Column>
        <Columns.Column className="is-8" size>
          {tags.map((value, index) => {
            return (
              <IconTag writable={true} key={value.tagId} tagId={value.tagId} index={index}>
                {value.tagName}
              </IconTag>
            );
          })}
        </Columns.Column>
        <Columns.Column className="is-1">
          {/* <AnimatedIcon.SkipForward onClick={handleTagListClick} size={30} /> */}
        </Columns.Column>
      </Columns>
    </div>
  );
};

export default TagList;
