import React from 'react';
import CircleImage from './CircleImage/CircleImage'
class SampleComponent extends React.Component {
  constructor(){
    super();

  }
  render() {
    return (
      <div>
        <CircleImage border
          src={'https://www.gravatar.com/avatar/8ba86ec43790f7c15bc8e053e0d4f2ea?s=328&d=identicon&r=PG'}
          width={50}
        />
      </div>
    );
  }
}
SampleComponent.propTypes = {
  name: React.PropTypes.string
};
export default SampleComponent;
