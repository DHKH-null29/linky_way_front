import { useMutation, useQueryClient } from 'react-query';

import { Container } from 'react-bulma-components';
import { REACT_QUERY_KEY } from '../../constants/query';
import TagAddForm from './TagAddForm';
import TagModifier from './TagModifier';
import TagModifierTitle from './TagModifierTitle';
import { onDeleteTag } from '../../api/tagApi';

const TagManager = () => {
  const queryClient = useQueryClient();

  const getTagList = queryClient.getQueryData(REACT_QUERY_KEY.TAGS);
  const deleteTag = useMutation(tagId => onDeleteTag(tagId), {
    onMutate: async tagId => {
      await queryClient.cancelQueries(REACT_QUERY_KEY.TAGS);
      queryClient.setQueryData(REACT_QUERY_KEY.TAGS, [
        ...getTagList.filter(tag => tag.tagId !== tagId),
      ]);
      return { getTagList };
    },
  });

  return (
    <Container>
      <TagModifierTitle left={'태그'} right={'공유'} />
      <hr className="mb-2 mt-0" />
      {getTagList &&
        getTagList.map((value, index) => {
          return (
            <TagModifier
              {...value}
              key={index}
              index={index}
              onDelete={() => {
                deleteTag.mutate(value.tagId);
              }}
            />
          );
        })}
      <hr />
      <br />
      <TagModifierTitle left={'태그'} right={'공유'} />
      <hr className="mb-2 mt-0" />
      <TagAddForm />
    </Container>
  );
};

export default TagManager;
