import AnimatedIcon from './icons/AnimatedIcon';
import { Columns } from 'react-bulma-components';
import IconTag from '../components/IconTag';
import { onTagList } from '../api/tagApi';
import { useState } from 'react';

// import { useNavigate } from 'react-router-dom';

const TagList = () => {
  const [tags, setTags] = useState([]);
  //   const navigate = uesNavigate();

  const handleTagListClick = () => {
    onTagList()
      .then(response => {
        setTags(JSON.stringify(response.data));
        console.log(response);
      })
      .catch(error => {
        setTags(JSON.stringify(error));
        alert('인증이 필요합니다.');
        // navigate('/login');
        // console.log(uesNavigate);
        console.log(tags);
      });
  };
  console.log(tags);
  return (
    <div>
      <Columns>
        <Columns.Column>
          <AnimatedIcon.SkipBack onClick={handleTagListClick} />
          <IconTag>{tags.tagName}</IconTag>
          <IconTag>이아무개</IconTag>
          <IconTag>이아무개</IconTag>
          <IconTag>이아무개</IconTag>
          <IconTag>이아무개</IconTag>
          <AnimatedIcon.SkipForward onClick={handleTagListClick} />
        </Columns.Column>
      </Columns>
    </div>
  );
};

export default TagList;
