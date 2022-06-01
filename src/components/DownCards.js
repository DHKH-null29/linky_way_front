import { BorderRadius, Colors, FontSize, Media, Shadows } from '../styles';
import { Card, Content } from 'react-bulma-components';

import { FontWeight } from '../styles/font';
import IconTag from './IconTag';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import Swal from 'sweetalert2';
import { currentCardState } from '../state/cardState';
import { memo } from 'react';
import { onDeleteCard } from '../api/cardApi';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

const DownCards = ({ title, content, id, index, link, tagList, writable = true }) => {
  const [cards, setCards] = useRecoilState(currentCardState);

  const handleDeleteClick = async () => {
    Swal.fire({
      icon: 'question',
      text: '정말 북마크를 삭제하실거예요?',
      showCancelButton: true,
      confirmButtonColor: `${Colors.successFirst}`,
      cancelButtonColor: `${Colors.warningFirst}`,
      confirmButtonText: '네',
      cancelButtonText: '아뇽',
    }).then(async () => {
      onDeleteCard(id)
        .then(() => {
          const newCards = [...cards];
          newCards.splice(index, 1);
          setCards(newCards);
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            text: error.details,
          });
        });
    });
  };

  return (
    <StyleCard style={{ rounded: 'true' }}>
      {writable && <DeleteButton className="delete" onClick={handleDeleteClick}></DeleteButton>}
      <Card.Content className="pt-1 pb-1"></Card.Content>
      <LinkPreview
        url={link || 'https://www.naver.com'}
        descriptionLength={45}
        openInNewTab={true}
        imageHeight={100}
        siteName={null}
      ></LinkPreview>
      <CardContent>
        <StyleTitle>{title || '제목없음'}</StyleTitle>
        <StyleContent className="mb-1">{content || '설명없음'}</StyleContent>
        <TagList>
          {tagList &&
            tagList.map(value => {
              return (
                <IconTag key={value.tagId} size={'small'} style="font-size: 10px">
                  {value.name}
                </IconTag>
              );
            })}
        </TagList>
      </CardContent>
    </StyleCard>
  );
};

const StyleCard = styled(Card)`
  font-family: 'ImcreSoojin';
  width: 100%;
  border-radius: ${BorderRadius.card};
  background-color: ${Colors.card};
  box-shadow: ${Shadows.card};
  :hover {
    box-shadow: ${Shadows.section};
  }

  .Secondary {
    text-align: left;
    align-items: center;
    display: flex;
    height: 3.5rem;

    @media ${Media.desktop} {
      font-size: ${FontSize.normal};
    }
    @media ${Media.tablet} {
      font-size: ${FontSize.small};
    }
    @media ${Media.mobile} {
      font-size: ${FontSize.micro};
    }
  }
  .SiteDetails {
    display: none;
  }
  .Title {
    margin-bottom: 0;
    font-weight: ${FontWeight.bold};
    overflow-x: scroll;
    text-align: center;
    display: flex;
    align-items: center;
    @media ${Media.desktop} {
      font-size: ${FontSize.normal};
      height: 3.5rem;
    }
    @media ${Media.tablet} {
      font-size: ${FontSize.small};
      height: 3.5rem;
    }
    @media ${Media.mobile} {
      font-size: ${FontSize.micro};
      height: 2rem;
    }
  }
  .LowerContainer {
    @media ${Media.mobile} {
      padding-bottom: 0.2rem;
      padding-top: 0.2rem;
    }
  }
`;

// const StyleImage = styled(Card.Image)`
//   font-family: 'ImcreSoojin';
//   width: 100%;
//   border-radius: ${BorderRadius.image};
//   }
// `;

const CardContent = styled(Card.Content)`
  @media ${Media.desktop} {
    padding-top: 0.4rem;
    padding-bottom: 0.25rem;
  }
  @media ${Media.tablet} {
    padding-top: 0;
    padding-bottom: 0.1rem;
  }
  @media ${Media.mobile} {
    padding-bottom: 0;
    padding-top: 0;
    padding-left: 0.7rem;
    padding-right: 0.7rem;
  }
`;

const StyleTitle = styled.div`
  font-weight: ${FontWeight.bolder};
  line-height: 1.2em;
  overflow-x: scroll;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${Media.desktop} {
    font-size: ${FontSize.medium};
    min-height: ${FontSize.large};
    height: 3.5rem;
  }
  @media ${Media.tablet} {
    font-size: ${FontSize.normal};
    min-height: ${FontSize.medium};
    height: 5rem;
  }
  @media ${Media.mobile} {
    font-size: ${FontSize.small};
    min-height: ${FontSize.normal};
    height: 3rem;
  }
`;

const StyleContent = styled(Content)`
  line-height: 1em;
  overflow-y: scroll;
  @media ${Media.desktop} {
    font-size: ${FontSize.normal};
    min-height: 80px;
    max-height: 80px;
    padding-top: 0.55rem;
  }
  @media ${Media.tablet} {
    font-size: ${FontSize.small};
    min-height: 70px;
    max-height: 70px;
  }
  @media ${Media.mobile} {
    font-size: ${FontSize.micro};
    min-height: 50px;
    max-height: 50px;
  }
`;

const TagList = styled.p`
  display: -webkit-box;
  min-height: 60px;
  max-height: 60px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.6;
  text-align: center;
  display: flex;
  align-items: center;
`;

const DeleteButton = styled.button`
  background-color: ${Colors.warningFirst};
  position: absolute;
  top: 0;
  left: 0;
  @media ${Media.desktop} {
    transform: scale(1.4);
  }
`;

export default memo(DownCards);
