import axios from 'axios';
import notFoundImage from '../assets/images/404.JPG';

export const onSelectCardLinkPreview = async url => {
  return axios({
    url: `https://rlp-proxy.herokuapp.com/v2?url=${url}`,
    method: 'get',
  })
    .then(response => {
      const result = response.data.metadata;
      return {
        title: result.title,
        description: result.description,
        image: result.image,
        ok: true,
      };
    })
    .catch(() => {
      return {
        title: '링크를 찾을 수 없어요!',
        description: '존재하지 않거나 사라진 링크입니다.',
        image: notFoundImage,
        ok: false,
      };
    });
};
