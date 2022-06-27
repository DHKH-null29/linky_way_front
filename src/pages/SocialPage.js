import { Columns, Container, Hero } from 'react-bulma-components';
import { currentPackageState, pickedPackageState } from '../state/socialState';
import { useEffect, useState } from 'react';

import Carousel from '../components/carousal/Carousel';
import { FontSize } from '../styles';
import { Link } from 'react-router-dom';
import Package from '../components/social/Package';
import { REACT_QUERY_KEY } from '../constants/query';
import SocialLayout from '../components/social/SocialLayout';
import Swal from 'sweetalert2';
import { onSearchPackageByCardList } from '../api/socialApi';
import styled from '@emotion/styled';
import { useQueryClient } from 'react-query';
import { useRecoilState } from 'recoil';

const SocialPage = () => {
  const queryClient = useQueryClient();
  const [currentPackages, setCurrentPackages] = useRecoilState(currentPackageState);
  const [pickedPackage, setPickedPackage] = useRecoilState(pickedPackageState);
  const [packages, setPackages] = useState(currentPackages);
  const [cards, setCards] = useState();
  const defaultPackages = queryClient.getQueryData(REACT_QUERY_KEY.TAGS_SOCIAL);

  const handlePackageClick = id => {
    if (pickedPackage === id) {
      return;
    }
    onSearchPackageByCardList(id)
      .then(response => {
        setPickedPackage(id);
        setCards(response.data);
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          text: error.details || error.message,
        });
      });
  };

  const handlePackageCopy = () => {
    Swal.fire({
      icon: 'info',
      text: '준비중입니다!',
    });
  };

  useEffect(() => {
    setPickedPackage(undefined);
    setPackages(currentPackages);
  }, [currentPackages]);

  useEffect(() => {
    if (pickedPackage) {
      setPackages([currentPackages.find(p => p.tagId + '' === pickedPackage + '')]);
      return;
    }
    setPackages(currentPackages);
  }, [pickedPackage]);

  return (
    <div>
      <SocialLayout />
      <Hero className="medium">
        <Hero.Body className="columns">
          <Container>
            <Columns.Column>
              <Columns className="is-mobile">
                <Columns.Column className="is-12">
                  <StyledLink
                    className="mr-5 is-size-4-desktop is-size-7-mobile"
                    to={'/social'}
                    onClick={() => {
                      setPickedPackage(undefined);
                      setCurrentPackages(defaultPackages);
                    }}
                  >
                    전체보기
                  </StyledLink>
                  {pickedPackage && (
                    <>
                      <StyledLink
                        className="mr-5 is-size-4-desktop is-size-7-mobile"
                        to={'/social'}
                        onClick={() => {
                          setPickedPackage(undefined);
                          setCurrentPackages(currentPackages);
                        }}
                      >
                        이전으로
                      </StyledLink>
                      <StyledLink
                        className="mr-5 is-size-4-desktop is-size-7-mobile"
                        to={'/social'}
                        onClick={handlePackageCopy}
                      >
                        복사하기
                      </StyledLink>
                    </>
                  )}
                  <p>&nbsp;</p>
                </Columns.Column>
                {currentPackages && currentPackages.length === 0 && (
                  <Hero className="pt-0 mt-0" style={{ width: '100%' }}>
                    <Hero.Body>
                      <div className="container has-text-centered">
                        <p className="subtitle has-text-danger">조회 결과가 없습니다!</p>
                      </div>
                    </Hero.Body>
                  </Hero>
                )}
                {packages &&
                  packages.map((value, index) => {
                    return (
                      <Columns.Column
                        key={index}
                        className="is-2-desktop is-4-tablet is-half-mobile"
                      >
                        <Package
                          id={value.memeberId}
                          nickname={value.nickname}
                          numberOfCard={value.numberOfCard}
                          tagName={value.tagName}
                          onClick={() => {
                            handlePackageClick(value.tagId);
                          }}
                        />
                      </Columns.Column>
                    );
                  })}
              </Columns>
            </Columns.Column>
            <Columns.Column className="is-size-3-desktop">
              {pickedPackage && <Carousel data={cards} loading={pickedPackage} />}
            </Columns.Column>
          </Container>
        </Hero.Body>
      </Hero>
    </div>
  );
};

const StyledLink = styled(Link)`
  text-decoration: 1px solid underline;
  text-underline-offset: ${FontSize.micro};
  opacity: 0.7;
`;

export default SocialPage;
