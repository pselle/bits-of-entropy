import React from 'react';

class EmojiComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="emoji-component">
        <label>{this.props.emoji}</label>
        <input type="number" step="0.1" defaultValue={this.props.probability} name={this.props.index} onChange={this.props.onChange} />
      </div>
    );
  }

}

export default EmojiComponent;