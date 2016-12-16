import React from 'react';
class SampleComponent extends React.Component {
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
SampleComponent.propTypes = {
  name: React.PropTypes.string
};
export default SampleComponent;
