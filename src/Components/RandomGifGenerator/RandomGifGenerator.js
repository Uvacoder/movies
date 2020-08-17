import React from 'react';
import Communication from 'communication/Communication';
import { Button, Divider, Modal, Space } from 'antd';
import './RandomGifGenerator.scss'

// const RANDOM_WORD_API = "https://random-word-api.herokuapp.com/word?number=1" // standard dictionary word - need to change setup function before implementing
const RANDOM_WORD_API = "http://api.urbandictionary.com/v0/random" // urban/slang words

class RandomGifGenerator extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      word: null,
      gifData: null,
      definition: null,
      example: null
    }
  }

  componentDidMount() {
    this.warning()
  }
  
  warning = () => {
    Modal.warning({
      title: 'Caution! Enter at you own risk.',
      content: 'This site is using random words provided by Urbandictionary, they might be controversial. Generated images can be blunt. If you are not OK with it please leave.',
    });
   
  }

  getGifApiUrl = (word) => {
    return `http://api.giphy.com/v1/gifs/search?q=${word}&api_key=${process.env.REACT_APP_GIPHY_API_KEY}&limit=1`
  }

  setup = async() => {
    const randomWord = await Communication.get(RANDOM_WORD_API);
    const wordDefinition = randomWord.list[0];
    const gif = await Communication.get(this.getGifApiUrl(wordDefinition.word));
    
    if (!gif?.data[0]) {
      this.setup();
      return;
    }

    this.setState({
      gifData: gif,
      word: wordDefinition.word,
      definition: wordDefinition.definition,
      example: wordDefinition.example
    });
  };

  renderGif = () => {
    if (!this.state.gifData) {
        return null;
    } 
    return (

      <div className='rnd-gif-container__content'>
        <Divider className='rnd-gif-container__content-divider'/>
        <p className='rnd-gif-container__content-found'>Word found for you by The Great Lord of Internet:</p>
        <p className='rnd-gif-container__content-word'>{this.state.word}</p>
        <Divider/>
        <p className='rnd-gif-container__content-definition-title'>Definition:</p>
        <p className='rnd-gif-container__content-definition'>{this.state.definition}</p>
        <Divider/>
        <p className='rnd-gif-container__content-example'>Usage example:</p>
        <p className='rnd-gif-container__content-example-content'>{this.state.example}</p>
        <Divider/>
        <img src={this.state.gifData.data[0].images.original.url} className='rnd-gif-container__content-gif' alt={this.state.word}/>
      </div>
    );
  };

  render() {
    return (
      <div className='rnd-gif-container'>
        <div className='rnd-gif-container__data'>
          <Button type='primary' onClick={this.setup}>Get Random Gif</Button>
          {this.renderGif()}
        </div>
        <div className='rnd-gif-container__footer'>
          Random words generated from <a href='https://www.urbandictionary.com/'>Urbandictionary</a>, GIFs provided by <a href='https://www.giphy.com'>GIPHY</a>
        </div>
      </div>
    );   
  };   
};

export default RandomGifGenerator;