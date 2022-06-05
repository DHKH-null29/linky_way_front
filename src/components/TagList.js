// import AnimatedIcon from './icons/AnimatedIcon';

import { useEffect, useState } from 'react';

import { Columns } from 'react-bulma-components';
import IconTag from '../components/IconTag';
import { onGetTagList } from '../api/tagApi';

const TagList = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    onGetTagList()
      .then(response => {
        setTags(response.data);
      })
      .catch(error => {
        setTags(JSON.stringify(error));
        alert('인증이 필요합니다.');
      });
  }, []);

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
          {tags.map(value => {
            return (
              <IconTag writable={true} key={value.tagId}>
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
