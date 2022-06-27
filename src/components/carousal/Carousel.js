import 'bulma-carousel/dist/css/bulma-carousel.min.css';

import Cards from '../card/Cards';
import { Media } from '../../styles';
import bulmaCarousel from 'bulma-carousel/dist/js/bulma-carousel.min.js';
import styled from '@emotion/styled';
import { useEffect } from 'react';

// import React from 'react';
// class Carousel extends React.Component {
const Carousel = ({ data, showNum }) => {
  if (!data) {
    return;
  }
  // componentDidMount() {

  useEffect(() => {
    setTimeout(() => {
      bulmaCarousel.attach('#carousel-items', {
        slidesToScroll: parseInt(showNum / 2),
        slidesToShow: showNum,
        loop: true,
      });
    }, 275);
  }, [data]);

  useEffect(() => {
    if (data.length < 4) {
      for (let i = 0; i < 4 - data.length; i++) {
        data.concat(undefined);
      }
    }
  }, [data]);

  const content = () => {
    return data.map((v, i) => {
      if (!v) {
        return (
          <div key={i} className="slider-item">
            &nbsp;
          </div>
        );
      }
      return (
        <div
          key={i}
          className="slider-item"
          style={{ marginRight: 0, marginLeft: '1rem', padding: '0px' }}
        >
          <Cards {...v} writable={false} />
        </div>
      );
    });
  };
  return (
    <section className="container ml-5">
      <div className="container">
        <div className="carousel">
          <Slider id="carousel-items" className="slider-container">
            {content()}
          </Slider>
        </div>
      </div>
    </section>
  );
};

Carousel.defaultProps = {
  component: 'card',
  showNum: 4,
};

const Slider = styled.div`
  opacity: 1;
  width: 100%;
  transition: all 300ms ease 0s;
  @media ${Media.desktop} {
    transform: scale(0.9);
  }
`;
export default Carousel;
