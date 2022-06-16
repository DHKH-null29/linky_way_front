import { Columns, Hero } from 'react-bulma-components';

import Layout from '../components/socialPages/Layout';
import Package from '../components/socialPages/Package';
import { currentPackageState } from '../state/socialState';
import { onGetPackageList } from '../api/socialApi';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const SocialPage = () => {
  const [packages, setPackages] = useRecoilState(currentPackageState);

  useEffect(
    tagId => {
      if (!packages || packages.length === 0) {
        onGetPackageList(tagId)
          .then(response => {
            setPackages(response.data);
          })
          .catch(error => {
            setPackages(JSON.stringify(error));
            alert('인증이 필요합니다.');
          });
      }
    },
    [packages],
  );

  return (
    <div>
      <Layout />
      <Hero className="medium">
        <Hero.Body className="columns">
          <Columns.Column>
            <Columns className="is-mobile">
              {packages.map((value, index) => {
                return (
                  <Columns.Column key={index} className="is-3-desktop  is-6-tablet is-half-mobile">
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
