import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import wheelzoom from '../../lib/wheelzoom';
import CardCarousel from '../UI/Card/CardCarousel';
import css from './Carousel.module.css';

const Carousel: FC<{ setID: number | null; image: string }> = ({
  setID,
  image,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 1024 });

  const [loaded, setLoaded] = useState(false);
  const [images, setImages] = useState<string[]>([image]);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    async function init() {
      if (setID) {
        let imagesResponse = (
          await axios.post("/api/lego/getImages", { setID })
        ).data;

        if (!imagesResponse.error) {
          if (imagesResponse.images.length > 0) {
            setImages((prevState) => [...prevState, ...imagesResponse.images]);
          }
        }
      }

      setLoaded(true);
    }

    init();
  }, [setID]);

  useEffect(() => {
    let element = document.querySelector("#itemImg");

    if (element) {
      if (!isMobile) {
        wheelzoom(element);
      } else {
        element.dispatchEvent(new CustomEvent("wheelzoom.destroy"));
      }
    }
  }, [images, isMobile]);

  const incrementStage = () => {
    if (images && stage < images?.length - 1) {
      setStage((prevState) => prevState + 1);
    }
  };

  const decrementStage = () => {
    if (images && stage > 0) {
      setStage((prevState) => prevState - 1);
    }
  };

  return (
    <div className={css.carouselContainer}>
      {loaded ? (
        <>
          <div className={`${css.imagesContainer} center`}>
            <img src={images[stage]} alt=": (((" id="itemImg" />
          </div>
          <CardCarousel
            length={images.length}
            incrementStage={incrementStage}
            decrementStage={decrementStage}
            stage={stage}
          />
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Carousel;
