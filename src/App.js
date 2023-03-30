import './app.scss';
import HorizontalSlideShow from './components/HorizontalSlideShow';

import React, { useEffect, useState } from 'react';

const SLIDE_WITDTH = 30;

const DATA = [
  {
    id: 1,
    img: './image/jirasin-yossri-W_29nYyiIpA-unsplash.jpg',
    des: 'Image 1',
  },
  {
    id: 2,
    img: './image/kellen-riggin-bBGpZ63zNi0-unsplash.jpg',
    des: 'Image 2',
  },
  {
    id: 3,
    img: './image/lake-wakatipu-mountains-queenstown-new-zealand-landscape-5535x2991-7265.jpg',
    des: 'Image 3',
  },
  {
    id: 4,
    img: './image/marek-okon-L4h2cvheWuc-unsplash.jpg',
    des: 'Image 4',
  },
  {
    id: 5,
    img: './image/wp4676576-4k-pc-wallpapers.jpg',
    des: 'Image 5',
  },
];

const length = DATA.length;
DATA.push(...DATA);

const sleep = (ms = 0) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const createItem = (position, idx) => {
  const item = {
    className: 'carousel-slide-active',
    styles: {
      transform: `translateX(${position * SLIDE_WITDTH}rem)`,
    },
    player: DATA[idx],
  };

  switch (position) {
    case length - 1:
    case length + 1:
      item.styles = { ...item.styles, filter: 'grayscale(1)' };
      item.className = 'carousel-slide-not-active';
      break;
    case length:
      break;
    default:
      item.styles = { ...item.styles, filter: 'grayscale(1)' };
      item.className = 'carousel-slide-not-active1';
      break;
  }

  return item;
};

const keys = Array.from(Array(DATA.length).keys());

const App = () => {
  const [items, setItems] = useState(keys);
  const [isTicking, setIsTicking] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [name, setName] = useState('Image 1');
  const [des, setDes] = useState('Image 1');

  const bigLength = items.length;

  const prevClick = (jump = 1) => {
    if (!isTicking) {
      setIsTicking(true);
      setItems((prev) => {
        return prev.map((_, i) => prev[(i + jump) % bigLength]);
      });
    }
  };

  const nextClick = (jump = 1) => {
    if (!isTicking) {
      setIsTicking(true);
      setItems((prev) => {
        return prev.map((_, i) => prev[(i - jump + bigLength) % bigLength]);
      });
    }
  };

  const handleDotClick = (idx, name, des) => {
    setName(des);
    setDes(des);
    if (idx < activeIdx) prevClick(activeIdx - idx);
    if (idx > activeIdx) nextClick(idx - activeIdx);
  };

  useEffect(() => {
    if (isTicking) sleep(300).then(() => setIsTicking(false));
  }, [isTicking]);

  useEffect(() => {
    setActiveIdx((length - (items[0] % length)) % length) // prettier-ignore
  }, [items]);

  return (
    <div className='carousel__wrap'>
      <div className='carousel__inner'>
        <div className='carousel__container'>
          <ul className='carousel__slide'>
            {items.map((pos, i) => (
              <HorizontalSlideShow
                key={i}
                idx={i}
                pos={pos}
                activeIdx={activeIdx}
                createItem={createItem}
                handleDotClick={handleDotClick}
              />
            ))}
          </ul>
        </div>
      </div>
        <div className='infoImage'>
          <h3 className='infoImage--title'>Info image</h3>
          <p className='infoImage--text'>Name: {name}</p>
          <p className='infoImage--text'>Description: {des}</p>
        </div>
    </div>
  );
};

export default App;
