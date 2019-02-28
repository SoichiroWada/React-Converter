import React from 'react';

function BoilingVerdict(props) {
    if (props.celsius >= 100) {
      return <p id="boil">The water would boil.</p>;
    }
    return <p id="cool">The water would not boil.</p>;
  }

export default BoilingVerdict