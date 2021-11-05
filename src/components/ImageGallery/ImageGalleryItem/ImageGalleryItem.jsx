import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ props: { urlToImage, title }, onClick }) => {
  return (
    <li className={s.imageGalleryItem}>
      <img
        src={urlToImage}
        alt={title}
        className={s.imageGalleryItemImage}
        onClick={(e) => onClick(e)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  urlToImage: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
};

export default ImageGalleryItem;
