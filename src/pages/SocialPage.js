import { Columns, Hero } from 'react-bulma-components';

import SocialLayout from '../components/social/SocialLayout';

// import Package from '../components/socialPages/Package';

// import { currentPackageState } from '../state/socialState';
// import { onGetPackageByCardList } from '../api/socialApi';
// import { useEffect } from 'react';
// import { useRecoilState } from 'recoil';

const SocialPage = () => {
  // const [packages, setPackages] = useRecoilState(currentPackageState);

  // 패키지 클릭시 카드 목록 보여주기 api
  // const handlePackageClick = () => {
  //   onGetPackageByCardList(tagId)
  //     .then(response => {
  //       console.log(response);
  //       console.log(packages);
  //     })
  // };

  // 패키지 목록 보여주는 api 사용하기
  // useEffect(
  //   tagId => {
  //     if (!packages || packages.length === 0) {
  //       onGetPackageList(tagId)
  //         .then(response => {
  //           setPackages(response.data);
  //         })
  //     }
  //   },
  //   [packages],
  // );

  return (
    <div>
      <SocialLayout />
      <Hero className="medium">
        <Hero.Body className="columns">
          <Columns.Column>
            <Columns className="is-mobile">
              {/* {packages.map((value, index) => {
                return (
                  <Columns.Column key={index} className="is-3-desktop  is-6-tablet is-half-mobile">
                    <Package
                      id={value.memeberId}
                      nickname={value.nickname}
                      numberOfCard={value.numberOfCard}
                    />
                  </Columns.Column>
                );
              })} */}
            </Columns>
          </Columns.Column>
        </Hero.Body>
      </Hero>
    </div>
  );
};

export default SocialPage;
