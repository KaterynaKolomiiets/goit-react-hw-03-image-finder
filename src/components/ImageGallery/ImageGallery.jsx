import PropTypes from "prop-types";
import ImageGalleryItem from "./ImageGalleryItem";

import s from "./ImageGallery.module.css";

const ImageGallery = ({ props, onClick }) => {
  return (
    <ul className={s.imageGallery}>
      {props &&
        props.map((item) => (
          <ImageGalleryItem key={item.url} props={item} onClick={onClick} />
        ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  onClick: PropTypes.func,
  props: PropTypes.arrayOf(PropTypes.object),
};

export default ImageGallery;
