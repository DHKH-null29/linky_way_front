import { Columns, Hero } from 'react-bulma-components';
import { useEffect, useState } from 'react';

import Package from '../components/social/Package';
import SocialLayout from '../components/social/SocialLayout';

// import { onGetSearchByPackage } from '../api/socialApi';

// import { currentPackageState } from '../state/socialState';

// import { useRecoilState } from 'recoil';

// import { onGetPackageByCardList } from '.././api/socialApi';

const SocialPage = () => {
  const [packages, setPackages] = useState([]);
  const [query, setQuery] = useState('');

  // 패키지 내부의 카드 조회 api
  // const handlePackageClick = () => {
  //   onGetPackageByCardList(tagId)
  //     .then(response => {
  //       console.log(response);
  //       console.log(packages);
  //     })
  // };

  // 태그이름 검색 패키지 조회 api
  // useEffect(tagName => {
  //   if (!packages || packages.length === 0) {
  //     onGetSearchByPackage(tagName).then(response => {
  //       setPackages(response.data);
  //       console.log(response.data);
  //     });
  //   }
  // }, []);

  useEffect(() => {
    if (query.length > 0) {
      socialSearchByPackageHandler(query, true);
      console.log(onGetSearchByPackage);
    }
  }, [query]);

  const socialSearchByPackageHandler = async (query, reset) => {
    const params = {
      query: query,
      size: 10,
    };

    const { data } = await onGetSearchByPackage(params);
    if (reset) {
      setPackages(data.documents);
    } else {
      setPackages(packages.concat(data.documents));
    }
  };

  const onGetSearchByPackage = text => {
    setQuery(text);
  };

  // console.log(onGetSearchByPackage);
  return (
    <div>
      <SocialLayout />
      <Hero className="medium">
        <Hero.Body className="columns">
          <Columns.Column>
            <Columns className="is-mobile">
              {packages &&
                packages.map((value, index) => {
                  return (
                    <Columns.Column
                      key={index}
                      className="is-3-desktop  is-6-tablet is-half-mobile"
                    >
                      <Package
                        id={value.memeberId}
                        nickname={value.nickname}
                        numberOfCard={value.numberOfCard}
                      />
                    </Columns.Column>
                  );
                })}
            </Columns>
          </Columns.Column>
        </Hero.Body>
      </Hero>
    </div>
  );
};

export default SocialPage;
