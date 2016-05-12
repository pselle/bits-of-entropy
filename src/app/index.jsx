import React from 'react';
import {render} from 'react-dom';
import EmojiComponent from './EmojiComponent.jsx';

// this app is the calculator
class App extends React.Component {
  constructor(props) {
    super(props);
    this.addEmoji = this.addEmoji.bind(this);
    this.storeFieldRef = this.storeFieldRef.bind(this);
    this.state = {
      emojis: [
        {
          emoji: "😀",
          probability: 0.1
        },
        {
          emoji: "🐶",
          probability: 0.2
        },
        {
          emoji: "🐱",
          probability: 0.2
        },
        {
          emoji: "🐭",
          probability: 0.5
        }
      ]
    }
  }

  updateProbability(newValue, index) {
    var newState = this.state;
    newState.emojis[index].probability = newValue;

    this.setState(newState);
  }

  addEmoji() {
    var newState = this.state;
    newState.emojis.push({
      emoji: this.state.ref.value,
      probability: 0
    });

    this.setState(newState);
  }

  removeEmoji(index) {
    var newState = this.state;
    newState.emojis.splice(index, 1);

    this.setState(newState);
  }

  storeFieldRef(ref) {
    this.setState({ref});
  }

  shannonEntropy(probabilities) {
    // where acc is the accumulator
    return -1 * Array.from(probabilities).reduce((acc, p) => { return acc + p * Math.log2(p)});
  }

  render () {
    const probabilities = this.state.emojis.map(({ probability }) => probability).filter(p => p > 0);
    const calc = this.shannonEntropy(probabilities).toFixed(1);
    const sum = probabilities.reduce((acc, p) => +acc + +p).toFixed(1);
    return (
      <div id="calculator">
        <div id="probabilityDistribution">
        <p>Current sum of probabilities (should equal 1): {sum}</p>
          {this.state.emojis.map((emoji, index) => {
            return <div className="emoji-wrapper" key={index}>
                <EmojiComponent emoji={emoji.emoji} probability={emoji.probability} key={index+1*10} onChange={(event) => this.updateProbability(event.target.value, index)} />
                <button onClick={(event) => this.removeEmoji(index)} key={index+1*.1}>Remove</button>
              </div>
          })}
        </div>
        <div className="add-emoji-form">
          <input type="text" length="1" placeholder="Put an emoji here!" ref={this.storeFieldRef}/>
          <button onClick={this.addEmoji}>Add</button>
        </div>
        <h2 className="ENTROPY">OMG SHANNON ENTROPY IS {calc}</h2>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));