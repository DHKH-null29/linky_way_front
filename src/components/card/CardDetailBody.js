import { Columns, Section } from 'react-bulma-components';

import { Colors } from '../../styles';
import IconTag from '../tag/IconTag';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import ModalFooter from '../modals/ModalFooter';
import { REACT_QUERY_KEY } from '../../constants/query';
import TextContent from '../common/TextContent';
import { onSelectCardById } from '../../api/cardApi';
import { useQuery } from 'react-query';

const CardDetailBody = ({ cardId, onClose }) => {
  const { isLoading, isError, isSuccess, data } = useQuery(
    [REACT_QUERY_KEY.CARDS_BY_ID, cardId],
    () => onSelectCardById(cardId),
  );

  return (
    <div>
      {isLoading && <div>...loading</div>}
      {isError && <div>조회에 실패했어요!</div>}
      {isSuccess && (
        <Section>
          <Columns className="is-mobile">
            <Columns.Column className="is-10 is-offset-1">
              <label className="label">링크 URL</label>
              <LinkPreview
                url={data.link}
                width="100%"
                fallback={
                  <p className="m-4" style={{ color: Colors.warningFirst }}>
                    유효하지 않은 링크예요!
                  </p>
                }
              />
              <p>
                &nbsp;{'=>'}&nbsp;
                <a href={data.link}>{data.link}</a>
              </p>
            </Columns.Column>
            <Columns.Column className="is-10 is-offset-1">
              <label className="label">제목</label>
              <TextContent>{data.title}</TextContent>
            </Columns.Column>
            <Columns.Column className="is-10 is-offset-1">
              <label className="label">내용</label>
              <TextContent>{data.content}</TextContent>
            </Columns.Column>
            <Columns.Column className="is-5 is-offset-1">
              <label className="label">공개 여부</label>
              <p style={{ color: data.isPublic ? Colors.successFirst : Colors.warningFirst }}>
                <p
                  className="m-4"
                  style={{ color: data.isPublic ? Colors.successFirst : Colors.warningFirst }}
                >
                  {data.isPublic ? '예' : '아니오'}
                </p>
              </p>
            </Columns.Column>
            <Columns.Column className="is-8 is-offset-1">
              <label className="label">태그</label>
              <p>
                {data.tags ? (
                  data.tags.map(tag => {
                    return (
                      <IconTag key={tag.tagId} size={'small'}>
                        {tag.tagName}
                      </IconTag>
                    );
                  })
                ) : (
                  <p className="m-4" style={{ color: Colors.warningFirst }}>
                    태그 없음!
                  </p>
                )}
              </p>
            </Columns.Column>
          </Columns>
          <ModalFooter cancel={'닫기'} onClose={onClose} />
        </Section>
      )}
    </div>
  );
};

export default CardDetailBody;
