
import React from 'react';
class circleImage extends React.Component {
constructor(){
  super();
}
render() {
  return (
    <div>
      <h1>{'S A M P L E'} {this.props.name}</h1>
    </div>
  );
}
}
circleImage.propTypes = {

};
export default circleImage;
