import React from 'react';
import TemperatureInput from './TemperatureInput';
import BoilingVerdict from './BoilingVerdict';

import PrecisionControls, { PrecisionContext, InputStatus } from './PrecisionControls';
import { createConversionSession, displayValue } from '../conversion/convert';

class Calculator extends React.Component {
  static contextType = PrecisionContext;

  conversion = createConversionSession('temperature');

  constructor(props) {
    super(props);
    this.handleCChangeToF = this.handleCChangeToF.bind(this);
    this.handleFChangeToC = this.handleFChangeToC.bind(this);
    this.clear = this.clear.bind(this);

    this.state = { scale: 'c', temperature:'' };
  }

  handleCChangeToF(temperature) {
    this.setState({scale: 'c', temperature:temperature});
    // console.log(this.state);
  }

  handleFChangeToC(temperature) {
    this.setState({scale: 'f', temperature:temperature});
    // console.log(this.state);
  }

  clear(){
    console.clear();
    this.setState({temperature: '', scale: 'c'});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const result = this.conversion(temperature, scale);
    const celsius = displayValue(temperature, scale, 'c', result.values.c, this.context);
    const fahrenheit = displayValue(temperature, scale, 'f', result.values.f, this.context);

    return (
      <div className="uBody">
        <PrecisionControls />
        <InputStatus invalid={result.invalid} />
        <h5>Temperature Converter（温度変換）</h5>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCChangeToF} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFChangeToC} />
        <button id="btn-temp" className="waves-effect waves-light btn" onClick={this.clear}>CLEAR</button>
        <BoilingVerdict
          celsius={result.values.c} />
      </div>
    );
  }
}

export default Calculator