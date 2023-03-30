import './HorizontalSlideShow.scss';

const HorizontalSlideShow = ({
  pos,
  idx,
  activeIdx,
  createItem,
  handleDotClick,
}) => {
  const item = createItem(pos, idx, activeIdx);

  return (
    <li
      onClick={() => handleDotClick(idx, item.player.img, item.player.des)}
      className={`carousel__slide--item ${item.className} `}
      style={item.styles}
    >
      <div className='carousel__slide--itemImgLink'>
        <img src={item.player.img} alt='' />
      </div>
      {/* <div className='carousel__slide--itemBody'>
        <p>{item.player.des}</p>
      </div> */}
    </li>
  );
};

export default HorizontalSlideShow;
