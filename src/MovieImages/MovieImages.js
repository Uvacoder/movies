import React from 'react';
import "./MovieImages.scss"
import Gallery from 'react-grid-gallery';

const MovieImages = (props) => {

    const {
        pictures
    } = props;
    
    return (
        <div className='movie-images'>
             <Gallery 
                images={pictures}
                enableImageSelection={false}
                maxRows={2}
                margin={1}
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
        caption: "After Rain (Jeshu John - designerspics.com)"
    }]
}

export default MovieImages

