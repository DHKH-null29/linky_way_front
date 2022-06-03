import AnimatedIcon from './icons/AnimatedIcon';
import { Columns } from 'react-bulma-components';
import IconTag from '../components/IconTag';
import { onGetTagList } from '../api/tagApi';
import { useState } from 'react';

const TagList = () => {
  const [tags, setTags] = useState([]);

  const handleTagListClick = () => {
    onGetTagList()
      .then(response => {
        setTags(response.data);
        console.log(response);
      })
      .catch(error => {
        setTags(JSON.stringify(error));
        alert('인증이 필요합니다.');
      });
  };
  console.log(handleTagListClick);

  const TagListItems = () => {
    onGetTagList().then(response => {
      console.log(response);
    });
  };
  console.log(TagListItems);

  return (
    <div>
      <Columns className="is-mobile">
        <Columns.Column className="is-1">
          <AnimatedIcon.SkipBack onClick={handleTagListClick} size={30} />
        </Columns.Column>
        <Columns.Column className="is-8" size>
          <ul>{TagListItems} </ul>

          {tags.map(value => {
            return <IconTag key={value.tagId}> {value.tagName} </IconTag>;
          })}
        </Columns.Column>
        <Columns.Column className="is-1">
          <AnimatedIcon.SkipForward onClick={handleTagListClick} size={30} />
        </Columns.Column>
      </Columns>
    </div>
  );
};

export default TagList;
