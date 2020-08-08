import React from 'react';
import "./MovieImages.scss"
import Gallery from 'react-grid-gallery';

const MOVIE_IMAGES_GALERY_MAX_ROW_LENGHT = 2;
const MOVIE_IMAGES_GALERY_MARGIN = 1;

const MovieImages = (props) => {
  const {
      pictures
  } = props;
  
  return (
    <div className='movie-images'>
      <Gallery 
        images={pictures}
        enableImageSelection={false}
        maxRows={MOVIE_IMAGES_GALERY_MAX_ROW_LENGHT}
        margin={MOVIE_IMAGES_GALERY_MARGIN}
      />
    </div>
  );
};

MovieImages.defaultProps = {
  pictures:[{
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
    thumbnailWidth: 300,
    thumbnailHeight: 174,
    isSelected: false,
    caption: "image caption"
  }]
};

export default MovieImages

