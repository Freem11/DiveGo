import React, { useContext } from 'react';
import Button from '../../reusables/button';
import { SliderContext } from '../../reusables/slider/context';
import Emilio from '../../../images/EmilioNew.png';
import CarrouselData from '../carrouselData.json';
import style from '../style.module.scss';

export default function PageOne() {
  const { slideForward } = useContext(SliderContext);

  return (

    <div className={style.pageContainer}>

    <div className={style.topContainer}>
      <div className={style.titleContainer}>
        <h1 style={{color: 'white'}}>{CarrouselData.PageOne.title}</h1>
      </div>

      <div className={style.contentContainer}>
        <p style={{color: 'white'}}>{CarrouselData.PageOne.content}</p>
      </div>
    </div>
    
    <img src={Emilio} height='400vh' className={style.emilio}/>

      <div className={style.buttonContainer}>
          <Button onClick={slideForward} className="btn-lg">
            {CarrouselData.PageOne.buttonOneText}
          </Button>
      </div>
    </div>
  );
};
