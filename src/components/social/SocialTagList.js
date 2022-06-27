import { currentPackageState, pickedPackageState, searchLikeState } from '../../state/socialState';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { Columns } from 'react-bulma-components';
import IconTag from '../tag/IconTag';
import { REACT_QUERY_KEY } from '../../constants/query';
import { onSearchPackageByTagName } from '../../api/socialApi';
import { socialTagHighlightState } from '../../state/tagState';
import { useQuery } from 'react-query';

const SocialTagList = ({ currentTagName }) => {
  const [tagHighlightList, setTagHighlightList] = useRecoilState(socialTagHighlightState);
  const [requestTagName, setRequestTagName] = useState(currentTagName);
  const [tagList, setTagList] = useState([]);
  const [like, setLike] = useRecoilState(searchLikeState);
  const setCurrentPackages = useSetRecoilState(currentPackageState);
  const setPickedPackage = useSetRecoilState(pickedPackageState);
  const { data: tags, refetch } = useQuery(
    requestTagName
      ? [REACT_QUERY_KEY.TAGS_SOCIAL, requestTagName, like]
      : REACT_QUERY_KEY.TAGS_SOCIAL,
    () => onSearchPackageByTagName(requestTagName, like),
  );

  useEffect(() => {
    if (!tags) {
      refetch();
    }
    setRequestTagName(currentTagName);
  }, [currentTagName]);

  useEffect(() => {
    if (tags) {
      const resArr = [];
      tags.filter(function (item) {
        const i = resArr.findIndex(x => x.tagName === item.tagName);
        if (i <= -1) {
          resArr.push(item);
        }
        return resArr;
      });
      if (currentTagName === requestTagName) {
        setTagList(resArr);
      }
      setCurrentPackages(tags);
    }
  }, [tags]);

  const handleTagClick = index => {
    if (!tagHighlightList[index]) {
      const newHighlghtList = [];
      newHighlghtList[index] = true;
      setTagHighlightList(newHighlghtList);
      setLike(false);
      setPickedPackage(false);
      setCurrentPackages(tags);
    }
  };

  const tag = (value, index, size) => {
    return (
      <IconTag
        size={size}
        writable={false}
        key={value.tagId}
        tagId={value.tagId}
        index={index}
        highlight={tagHighlightList[index]}
        onClick={() => {
          handleTagClick(index);
          setRequestTagName(value.tagName);
        }}
      >
        {value.tagName}
      </IconTag>
    );
  };

  return (
    <Columns className="is-mobile">
      <Columns.Column>
        {tagList.map((value, index) => {
          return (
            <span key={index}>
              <span className="is-hidden-mobile">{tag(value, index, 'medium')}</span>
              <span className="is-hidden-tablet is-hidden-desktop">
                {tag(value, index, 'small')}
              </span>
              &nbsp;
            </span>
          );
        })}
      </Columns.Column>
    </Columns>
  );
};

export default SocialTagList;
