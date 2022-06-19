import React from 'react';
import TemperatureInput from './TemperatureInput';
import BoilingVerdict from './BoilingVerdict';

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, converter) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = converter(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class Calculator extends React.Component {
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
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div className="uBody">
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
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

export default Calculator