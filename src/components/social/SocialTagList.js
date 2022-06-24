import { useRecoilState, useSetRecoilState } from 'recoil';

import { Columns } from 'react-bulma-components';
import IconTag from '../tag/IconTag';
import { REACT_QUERY_KEY } from '../../constants/query';
import { folderHighlightState } from '../../state/folderState';
import { onGetTagList } from '../../api/tagApi';
import { tagHighlightState } from '../../state/tagState';
import { useQuery } from 'react-query';

const SocialTagList = () => {
  const [tagHighlightList, setTagHighlightList] = useRecoilState(tagHighlightState);
  const setFolderHighlight = useSetRecoilState(folderHighlightState);

  const { isLoading, data: tags } = useQuery(REACT_QUERY_KEY.TAGS, () =>
    onGetTagList().then(response => response.data),
  );

  const handleTagClick = index => {
    if (!tagHighlightList[index]) {
      const newHighlghtList = [];
      newHighlghtList[index] = true;
      setTagHighlightList(newHighlghtList);
      setFolderHighlight([]);
    }
  };
  const tag = (value, index, size) => {
    return (
      <IconTag
        size={size}
        writable={true}
        key={value.tagId}
        tagId={value.tagId}
        index={index}
        highlight={tagHighlightList[index]}
        onClick={() => handleTagClick(index)}
      >
        {value.tagName}
      </IconTag>
    );
  };

  return (
    <Columns className="is-mobile">
      <Columns.Column>
        {isLoading && <div>...loading</div>}
        {!isLoading &&
          tags.map((value, index) => {
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

export default SocialTagList;
