import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import CardCarousel from '../UI/Card/CardCarousel';
import css from './Guide.module.css';

const Guide = () => {
  const router = useRouter();

  const [stage, setStage] = useState(0);
  const [showBigImage, setShowBigImage] = useState(false);

  const resetImage = () => {
    if (showBigImage) {
      setShowBigImage(false);
    }
  };

  const incrementStage = () => {
    if (stage < guides.length - 1) {
      setStage((prevState) => prevState + 1);
    } else {
      router.push("/addItem");
    }

    resetImage();
  };

  const decrementStage = () => {
    if (stage > 0) {
      setStage((prevState) => prevState - 1);
    }

    resetImage();
  };

  let guides = [
    {
      title: "Adding items",
      description:
        "Let's start! On this page, you can search sets and mini-figures, filter results and select items on which you would like to have everyday view and control by finalizing this operation which will add it to your dashboard.",
      image: "/images/guide/addItemGuide.png",
    },
    {
      title: "Finalizing",
      description:
        "Selected items will be summed up when you click finalize. Here you can change the amount of set that will be added or delete it. Just click the add button to have them in your collection.",
      image: "/images/guide/finalizeGuide.png",
    },
    {
      title: "Dashboard",
      description:
        "Here you can see all of your's items, sort them, filter and update their data. You can also see the collection value and chart that shows its changes. Updating will get the newest information and include them in calculations.",
      image: "/images/guide/dataGuide.png",
    },
    {
      title: "Items history",
      description:
        "By clicking on the item you can see its price change history and indicators.",
      image: "/images/guide/historyGuide.png",
    },
    {
      title: "Actions",
      description:
        "Long pressing on the item will enable editing mode, where you can control the number of items or delete them.",
      image: "/images/guide/actionGuide.png",
    },
    {
      title: "Images",
      description:
        "Right-click on the item will open up a page where you can see detailed photos and look carefully by zooming the image with a scroll.",
      image: "/images/guide/imageGuide.png",
    },
    {
      title: "Models",
      description:
        "There is also an experimental feature where you can play around with a 3D model of an item.",
      image: "/images/guide/modelGuide.png",
    },
    {
      title: "Settings",
      description:
        "The last functionality is the settings page. Here you can sign out, select the currency in which prices should be displayed or change the color of the application.",
      image: "/images/guide/settingsGuide.png",
    },
  ];

  return (
    <div className={`${css.guideContainer} center`}>
      <Head>
        <title>Guide</title>
      </Head>

      <h1>{guides[stage].title}</h1>
      <h2>{guides[stage].description}</h2>
      <div
        className={
          showBigImage ? css.bigImageContainer : `${css.imageContainer} center`
        }
        onClick={() => setShowBigImage((prevState) => !prevState)}
      >
        <Image
          src={guides[stage].image}
          objectFit="contain"
          layout="fill"
          alt=":((("
        />
      </div>
      <CardCarousel
        length={guides.length}
        incrementStage={incrementStage}
        decrementStage={decrementStage}
        stage={stage}
      />
    </div>
  );
};

export default Guide;
