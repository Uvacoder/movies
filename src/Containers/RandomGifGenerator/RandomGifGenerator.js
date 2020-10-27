import React from 'react';
import { Button, Divider, Modal } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import './RandomGifGenerator.scss'
import { fetchRandomGif, clearRandomGif } from 'actions/RadnomGifGeneratorActions'
import { withRouter } from 'react-router-dom'
import GifPlaceholder from "../../Images/gifPlaceholder.svg"

const WARNING_MODAL_TITLE = 'Caution! Enter at your own risk.'
const WARNING_MODAL_CONTENT = 'This site is using random words provided by Urbandictionary, they might be controversial. Generated images can be blunt. If you are not OK with it please leave.'
const { confirm } = Modal;

class RandomGifGenerator extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isGifLoaded: false
    }
  };
  
  componentDidMount() {
    this.showWarning()
  };

  componentWillUnmount() {
    this.props.clearRandomGif()
  };
  
  showWarning = () => {
    confirm({
      title: WARNING_MODAL_TITLE,
      content: WARNING_MODAL_CONTENT,
      okText: 'Continue',
      cancelText: 'Leave',
      onCancel: () => {
        this.props.history.push("/home")
      }
    });
  };

  gifLoaded = () => {
    this.setState({
      isGifLoaded: true
    });
  };

  renderGif = () => {
    return (
      <>
       <img 
          src={this.props.gif.images.downsized_medium.url } 
          className={this.state.isGifLoaded ? 'rnd-gif-container__content-gif' : 'rnd-gif-container__content-gif-placeholder'}
          alt={this.props.shuffledWord.word} 
          onLoad={() => this.gifLoaded()}
        />
        <img 
          className={ this.state.isGifLoaded ? 'rnd-gif-container__content-placeholder-hidden' : 'rnd-gif-container__content-placeholder-visible' } 
          src={ GifPlaceholder } 
          alt={`${GifPlaceholder}`} 
        />
        <div className={ this.state.isGifLoaded ? 'rnd-gif-container__content-placeholder-hidden' : 'rnd-gif-container__content-placeholder-visible' } >
          Gif is loading...
        </div>
      </>
    );
  };

  renderContent = () => {
    if (!this.props.gif) {
      return null;
    };

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
        {this.renderGif()}
      </div>
    );
  };

  render() {
    return (
      <div className='rnd-gif-container'>
        <div className='rnd-gif-container__data'>
          <Button 
            type='primary' 
            onClick={() => {
              this.props.fetchRandomGif()
              this.setState({
                isGifLoaded: false
              });
            }}
          >
            Get Random Gif
          </Button>
          {this.renderContent ()}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RandomGifGenerator));