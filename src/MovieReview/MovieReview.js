import React from 'react';
import { Card } from 'antd';
import "./MovieReview.scss"
import { Scrollbars } from 'react-custom-scrollbars';


const MovieReview = (props) => {

    const {
        review
    } = props;

    return (
        <div className='movie-review'>
            <div className="site-card-border-less-wrapper">
                <Card title={`Review by: ${review.author}`} bordered={false} style={{ width: 360 }}>
                     <Scrollbars autoHeight >
                        <div className='movie-review__content'>{review.content}</div>
                    </Scrollbars>
                </Card>
            </div>
        </div>
    );
};

MovieReview.defaultProps = {
    review: {
        author: 'no one yet :(',
        content: 'This movie has no reviews'
    }
}

export default MovieReview

