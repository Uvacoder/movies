import React from 'react';
import Gallery from 'react-grid-gallery';

const MOVIE_IMAGES_GALERY_MAX_ROWS = 2;
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
        maxRows={MOVIE_IMAGES_GALERY_MAX_ROWS}
        margin={MOVIE_IMAGES_GALERY_MARGIN}
      />
    </div>
  );
};

MovieImages.defaultProps = {
  pictures:[{
    src: "", // JPG URL
    thumbnail: "", // JPG URL
    thumbnailWidth: 288,
    thumbnailHeight: 174,
    isSelected: false,
    caption: "image caption"
  }]
};

export default MovieImages