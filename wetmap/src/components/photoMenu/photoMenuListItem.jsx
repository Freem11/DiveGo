import './photoMenu.css';
import { useState, useContext, useEffect, useRef } from 'react';
import { animated, useSpring } from 'react-spring';
import { CarrouselTilesContext } from '../contexts/carrouselTilesContext';

const handleDragStart = e => e.preventDefault();

const PhotoMenuListItem = (props) => {
  const {
    id,
    setAnimalVal,
    animalVal,
    name,
    photoURL,
    selectedID,
    setSelectedID,
    tileWidth,
    setTileWidth,
    boxWidth,
    setBoxWidth,
    tilesShifted,
  } = props;


  const { tiles, setTiles } = useContext(CarrouselTilesContext);

  let photoName = photoURL.split('/').pop();

  const tileRef = useRef(null);
  const [clicked, setClicked] = useState(false);
  const [yCoord, setYCoord] = useState(0);
  const [scale, setScale] = useState(1);
  const [zdex, setZdex] = useState(0);
  const [xCoord, setXCoord] = useState(0);

  const handleSelect = (name) => {
    if (animalVal.includes(name)) {
      setAnimalVal(animalVal.filter(item => item !== name));
    }
    else {
      setAnimalVal([...animalVal, name]);
    }
  };

  let screenWidthInital = window.innerWidth;
  let screenHeigthInital = window.innerWidth;

  const [windowWidth, setWindowWidth] = useState(screenWidthInital);
  const [windowHeight, setWindowHeight] = useState(screenHeigthInital);

  window.addEventListener('resize', trackDimensions);

  function trackDimensions() {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  }

  useEffect(() => {
    if (selectedID !== id) {
      pressReleaseAnimations();
    }
  }, [selectedID]);

  const [windowW, setWindowW] = useState(window.innerWidth);
  const [windowH, setWindowH] = useState(window.innerHeight);

  window.addEventListener('resize', trackWidth);

  function trackWidth() {
    setWindowW(window.innerWidth);
    setWindowH(window.innerHeight);
    setYCoord(0);
    setXCoord(0);
    setScale(1);
    setZdex(0);
  }

  const onDoubleClick = (e, id) => {
    setSelectedID(id);

    const WidthofTile = e.target.clientWidth;
    const HeightOfTile = e.target.clientHeight;


    // I'm not sure it is the best approach to this issue... but it works pretty well
    // We get the parent with the x transformation and we add it to the final transformation
    // let transform_x = e.target.parentElement.parentElement.style.transform;
    // if (transform_x) {
    //   transform_x = transform_x.split(" ")[1];
    //   if (transform_x.length > 1) {
    //     transform_x = transform_x.split(")")[0];
    //   }
    //   transform_x = parseFloat(transform_x.replace("px", ""));
    // } else {
    //   transform_x = 0;
    // }
    // if (transform_x === NaN || transform_x < 0) {
    //   transform_x = 0;
    // }
    let ChromeMover = 0;
    if (navigator.userAgent.indexOf('Chrome') != -1) {
      ChromeMover = tilesShifted * (WidthofTile + 1);
    }
    else {
      console.log('NOT Chrome', navigator.userAgent);
    }

    // if (navigator.userAgent.indexOf("Safari") != -1) {
    //   alert('Safari');
    // }

    const distanceToItemMiddleX = WidthofTile / 2 - e.nativeEvent.layerX;
    const centererPressX = e.nativeEvent.clientX + distanceToItemMiddleX;
    const distanceToItemMiddleY = HeightOfTile / 2 - e.nativeEvent.layerY;
    const centererPressY = e.nativeEvent.clientY + distanceToItemMiddleY;

    const moverWidth = (windowW / 2 - centererPressX + ChromeMover) / 2.5;
    const moverHeigth = (windowH / 2 - centererPressY) / 2;

    if (scale === 1) {
      setYCoord(moverHeigth);
      setXCoord(moverWidth);
      setScale(2.5);
      setZdex(99);
      setClicked(true);
    }
    else {
      setYCoord(0);
      setXCoord(0);
      setScale(1);
      setZdex(0);
      setClicked(true);
    }
  };

  const onExpanderClick = (e, id) => {
    setSelectedID(id);

    const WidthofTile = e.target.parentElement.parentElement.clientWidth;
    const HeightOfTile = e.target.parentElement.parentElement.clientHeight * 0.8;

    // I'm not sure it is the best approach to this issue... but it works pretty well
    // We get the parent with the x transformation and we add it to the final transformation
    let transform_x = e.target.parentElement.parentElement.style.transform;
    if (transform_x) {
      transform_x = transform_x.split('(')[1];
      if (transform_x.length > 1) {
        transform_x = transform_x.split(',')[0];
      }
      transform_x = parseFloat(transform_x.replace('px', ''));
    }
    else {
      transform_x = 0;
    }
    if (isNaN(transform_x) || transform_x < 0) {
      transform_x = 0;
    }

    const distanceToItemMiddleX = WidthofTile / 2 - tilesShifted * WidthofTile;
    const centererPressX
      = transform_x + e.target.screenX + distanceToItemMiddleX;
    const distanceToItemMiddleY = HeightOfTile / 2;
    const centererPressY = e.target.screenY + distanceToItemMiddleY;
    // console.log("expanderX", distanceToItemMiddleX, WidthofTile, e.target.parentElement)

    const moverWidth = (windowW / 2 - distanceToItemMiddleX) / 2.5;
    const moverHeigth = (windowH / 2 - distanceToItemMiddleY) / 2.5;

    if (scale === 1) {
      setYCoord(moverHeigth);
      setXCoord(moverWidth);
      setScale(2.5);
      setZdex(99);
      setClicked(true);
    }
    else {
      setYCoord(0);
      setXCoord(0);
      setScale(1);
      setZdex(0);
      setClicked(true);
    }
  };

  const pressReleaseAnimations = () => {
    setYCoord(0);
    setXCoord(0);
    setScale(1);
    setZdex(0);
  };

  useEffect(() => {
    if (tiles) {
      pressReleaseAnimations();
      setTiles(false);
    }
  }, [tiles]);

  useEffect(() => {
    if (selectedID !== id) {
      pressReleaseAnimations();
    }
  }, [selectedID]);

  useEffect(() => {
    if (!clicked) return;

    return () => {
      setClicked(false);
    };
  }, [yCoord]);

  const move = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to:   {
      scale:     `${scale}`,
      transform: `translate3d(${xCoord}px,${yCoord}px,0)`,
    },
  });

  const picWidth = {
    width:  tileWidth,
    height: '150%',
  };

  return (
    <animated.div
      key={id}
      className={
        animalVal.includes(name) ? 'pictureBoxASelected' : 'pictureBoxA'
      }
      ref={tileRef}
      style={move}
      onDoubleClick={e => onDoubleClick(e, id)}
      onClick={() => handleSelect(name)}
    >
      <div style={{ width: tileWidth, pointerEvents: 'none' }} className="micros">
        <h4
          style={{ fontSize: '1em', pointerEvents: 'none' }}
          className={
            animalVal.includes(name)
              ? 'animalLabelAreaSelected'
              : 'animalLabelArea'
          }
        >
          {name}
        </h4>
      </div>
      <div className="backgroundImage">
        <img
          src={`https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`}
          width="100%"
          height="100%"
          onDragStart={handleDragStart}
          style={{
            marginLeft:              '-1px',
            borderBottomLeftRadius:  '10px',
            borderBottomRightRadius: '10px',
            borderBottom:            '1px grey solid',
            borderLeft:              '1px grey solid',
            borderRight:             '1px grey solid',
            objectFit:               'cover',
            zIndex:                  500,
            pointerEvents:           'none',
          }}
        />
      </div>
      {/* <OpenWithIcon onClick={(e) => onExpanderClick(e, id)} sx={{ color: "lightgrey", height: "1vw", width: "1vw", marginBottom: "20vh", position: "absolute", top: "175%", left: "90%"}} />  */}
    </animated.div>
  );
};

export default PhotoMenuListItem;
