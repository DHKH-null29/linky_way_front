// import AnimatedIcon from './icons/AnimatedIcon';

import { useEffect, useState } from 'react';

import { Columns } from 'react-bulma-components';
import IconTag from '../components/IconTag';
import { onGetTagList } from '../api/tagApi';

// import onDeleteTagList from '../api/tagApi'

// import { useRecoilState, useSetRecoilState } from 'recoil';

// import { Colors } from '../styles';

// import Swal from 'sweetalert2';

const TagList = () => {
  const [tags, setTags] = useState([]);
  // const [currentTags, setCurrentTags] = useRecoilState(currentTagState);
  // const setCardChange = useSetRecoilState(cardChangeState);

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

  // const handleTagDeleteClick = async () => {
  //   Swal.fire({
  //     icon: 'question',
  //     text: '정말 태그를 삭제하실 건가요?',
  //     showCancelButton: true,
  //     confirmButtonColor: `${Colors.successFirst}`,
  //     cancelButtonColor: `${Colors.warningFirst}`,
  //     confirmButtonText: 'Yes, delete it!',
  //     cancelButtonText: 'No, cancel!',
  //     reverseButtons: true,
  //   }).then(async result => {
  //     if (result.isConfirmed) {
  //       onDeleteTagList(id)
  //         .then(() => {
  //           const newCards = [...currentTags];
  //           newCards.splice(index, 1);
  //           setCurrentTags(newTags);
  //           setTagChange(true);
  //         })
  //         .catch(error => {
  //           Swal.fire({
  //             icon: 'error',
  //             text: error.details,
  //           });
  //         });
  //     }
  //   });
  // };
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
