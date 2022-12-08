import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Tb3DCubeSphere, TbPhoto, TbX } from 'react-icons/tb';

import CardPrimaryButton from '../UI/Card/CardPrimaryButton';
import CardRadioBar from '../UI/Card/CardRadioBar';
import CardSecondaryButton from '../UI/Card/CardSecondaryButton';
import Carousel from './Carousel';
import css from './Images.module.css';
import Model from './Model';

const Images = () => {
  const router = useRouter();
  let currentItem: { id: string; setID: number; image: string } | null = null;

  if (router.query.id && router.query.setID && router.query.image) {
    currentItem = {
      id: router.query.id as string,
      setID: parseInt(router.query.setID as string),
      image: router.query.image as string,
    };
  }
  const [mode, setMode] = useState("IMAGES");

  if (!currentItem) {
    return (
      <div className={`${css.center} center`}>
        <h1>Something went wrong 🤔</h1>
        <CardSecondaryButton
          text="Go back"
          handler={() => router.push("/dashboard")}
        />
      </div>
    );
  }

  return (
    <div className={css.imagesContainer}>
      <Head>
        <title>Images</title>
      </Head>

      <CardPrimaryButton
        icon={<TbX />}
        handler={() => router.back()}
        customClass={css.closeActions}
      />
      <CardRadioBar
        values={["IMAGES", "MODEL"]}
        names={["Images", "Model"]}
        icons={[<TbPhoto key={"IMAGES"} />, <Tb3DCubeSphere key={"MODEL"} />]}
        selectedValue={mode}
        changeHandler={(value) => setMode(value)}
      />

      {mode == "IMAGES" ? (
        <Carousel setID={currentItem.setID} image={currentItem.image} />
      ) : (
        <Model id={currentItem.id} />
      )}
    </div>
  );
};

export default Images;
