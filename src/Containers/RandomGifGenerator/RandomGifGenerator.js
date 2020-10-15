import React from 'react';
import { Button, Divider, Modal } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import './RandomGifGenerator.scss'
import { fetchRandomGif, clearRandomGif } from 'actions/RadnomGifGeneratorActions'


const WARNING_MODAL_TITLE = 'Caution! Enter at you own risk.'
const WARNING_MODAL_CONTENT = 'This site is using random words provided by Urbandictionary, they might be controversial. Generated images can be blunt. If you are not OK with it please leave.'

class RandomGifGenerator extends React.Component {
  componentDidMount() {
    this.showWarning()
  }

  componentWillUnmount() {
    this.props.clearRandomGif()
  }
  
  showWarning = () => {
    Modal.warning({
      title: WARNING_MODAL_TITLE,
      content: WARNING_MODAL_CONTENT,
    });
  };

  renderGif = () => {
    if (!this.props.gif) {
        return null;
    } 

    return ( 
      <div className='rnd-gif-container__content'>
        <Divider className='rnd-gif-container__content-divider'/>
        <p className='rnd-gif-container__content-found'>Word found for you by The Great Lord of Internet:</p>
        <p className='rnd-gif-container__content-word'>{this.props.shuffledWord.word}</p>
        <Divider/>
        <p className='rnd-gif-container__content-definition-title'>Definition:</p>
        <p className='rnd-gif-container__content-definition'>{this.props.shuffledWord.definition}</p>
        <Divider/>
        <p className='rnd-gif-container__content-example'>Usage example:</p>
        <p className='rnd-gif-container__content-example-content'>{this.props.shuffledWord.example}</p>
        <Divider/>
        <img src={this.props.gif.images.original.url} className='rnd-gif-container__content-gif' alt={this.props.shuffledWord.word}/>
      </div>
    );
  };

  render() {
    return (
      <div className='rnd-gif-container'>
        <div className='rnd-gif-container__data'>
          <Button type='primary' onClick={() => this.props.fetchRandomGif()}>Get Random Gif</Button>
          {this.renderGif()}
        </div>
        <div className='rnd-gif-container__footer'>
          Random words generated from <a href='https://www.urbandictionary.com/'>Urbandictionary</a>, GIFs provided by <a href='https://www.giphy.com'>GIPHY</a>
        </div>
      </div>
    );   
  };   
};

const mapStateToProps = (state) => {
  return {
    shuffledWord: state.randomGifGenerator.word,
    gif: state.randomGifGenerator.gif
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchRandomGif,
  clearRandomGif
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RandomGifGenerator);