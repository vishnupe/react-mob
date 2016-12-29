import React from 'react';
import './circle-image.css'
class CircleImage extends React.Component {
  constructor(){
    super();
  }
  render() {
    const divStyle = {
      display: 'inline-block'
    }
    const imageStyle = {
      width: this.props.width ? this.props.width+'px' : '75px',
    }
    const className = 'circle-image' + ' ' + (this.props.border ? 'circle-image-border' : '');
    return (
      <div style={divStyle}>
        <img className = {className}
          src={this.props.src}
          style={imageStyle}
        />
      </div>
    );
  }
}
CircleImage.propTypes = {
  src: React.PropTypes.string.isRequired,
  width: React.PropTypes.number,
  border: React.PropTypes.bool
};
export default CircleImage;
