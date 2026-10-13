import React from 'react';
import LengthInput from './LengthInput';
import PrecisionControls, { PrecisionContext, InputStatus } from './PrecisionControls';
import { createConversionSession, displayValue } from '../conversion/convert';

class LengthCalculator extends React.Component {
  static contextType = PrecisionContext;

  conversion = createConversionSession('length');

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.clear = this.clear.bind(this);
    this.alertMessage = this.alertMessage.bind(this);

    this.state = { 
      originalScale:'',
      lengthStr:'',
      alertMessage:'OFF',
    };
  }

  handleChange(lengthStr, scale) {
    this.setState({originalScale: scale, lengthStr:lengthStr});
  }

  clear(){
    console.clear();
    this.setState({ originalScale:'', lengthStr:'', alertMessage: 'OFF'});
  }
  alertMessage(arr){
    if (arr === 229){
      this.setState({
        alertMessage:"ON"
      });
    } else if (arr === 230){
      this.setState({
        alertMessage:"OFF"
      });
    }
  }

  render() {
    
    const originalScale = this.state.originalScale;
    const lengthStr = this.state.lengthStr;
    const result = this.conversion(lengthStr, originalScale);
    const aStyle = this.state.alertMessage === "OFF" ? {display: "none"} : {display:"inline"};

    const kilo = displayValue(lengthStr, originalScale, "kilo", result.values["kilo"], this.context)
    const meter = displayValue(lengthStr, originalScale, "meter", result.values["meter"], this.context)
    const centi = displayValue(lengthStr, originalScale, "centi", result.values["centi"], this.context)
    const milli = displayValue(lengthStr, originalScale, "milli", result.values["milli"], this.context)
    const inch = displayValue(lengthStr, originalScale, "inch", result.values["inch"], this.context)
    const feet = displayValue(lengthStr, originalScale, "feet", result.values["feet"], this.context)
    const yard = displayValue(lengthStr, originalScale, "yard", result.values["yard"], this.context)
    const mile = displayValue(lengthStr, originalScale, "mile", result.values["mile"], this.context)
    const sun = displayValue(lengthStr, originalScale, "sun", result.values["sun"], this.context)
    const shaku = displayValue(lengthStr, originalScale, "shaku", result.values["shaku"], this.context)
    const ken = displayValue(lengthStr, originalScale, "ken", result.values["ken"], this.context)
    const cho = displayValue(lengthStr, originalScale, "cho", result.values["cho"], this.context)
    const ri = displayValue(lengthStr, originalScale, "ri", result.values["ri"], this.context)
    const kairi = displayValue(lengthStr, originalScale, "kairi", result.values["kairi"], this.context)
    const fuji = displayValue(lengthStr, originalScale, "fuji", result.values["fuji"], this.context)
    const everest = displayValue(lengthStr, originalScale, "everest", result.values["everest"], this.context)
    const tokyoLondon = displayValue(lengthStr, originalScale, "tokyoLondon", result.values["tokyoLondon"], this.context)
    const equator = displayValue(lengthStr, originalScale, "equator", result.values["equator"], this.context)
    const earthOrbit = displayValue(lengthStr, originalScale, "earthOrbit", result.values["earthOrbit"], this.context)
    const lightSec = displayValue(lengthStr, originalScale, "lightSec", result.values["lightSec"], this.context)
    const lightYear = displayValue(lengthStr, originalScale, "lightYear", result.values["lightYear"], this.context)

    return (
      <div>
        <div className="page-toolbar">
          <PrecisionControls />
          <button className="waves-effect waves-light btn clear-btn" onClick={this.clear}>CLEAR</button>
        </div>
        <InputStatus invalid={result.invalid} />
        <h5 id="h5">
          <span id="alertM" style={aStyle}>カナ漢字変換をOFFにしてください</span>
        </h5>
      <div className="uBody row">
        <div className="col s12 m4">

          <LengthInput
              scale="kilo"
              lengthN={kilo}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
          <LengthInput
              scale="meter"
              lengthN={meter}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
          <LengthInput
              scale="centi"
              lengthN={centi}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
          <LengthInput
              scale="milli"
              lengthN={milli}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />              
          <LengthInput
              scale="inch"
              lengthN={inch}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
          <LengthInput
              scale="feet"
              lengthN={feet}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
          <LengthInput
              scale="yard"
              lengthN={yard}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
        </div>

        <div className="col s12 m4">
            <LengthInput
              scale="mile"
              lengthN={mile}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <LengthInput
              scale="sun"
              lengthN={sun}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <LengthInput
              scale="shaku"
              lengthN={shaku}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <LengthInput
              scale="ken"
              lengthN={ken}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <LengthInput
              scale="cho"
              lengthN={cho}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />                           
            <LengthInput
              scale="ri"
              lengthN={ri}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <LengthInput
              scale="kairi"
              lengthN={kairi}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
        </div>

        <div className="col s12 m4">
            
            <LengthInput
              scale="fuji"
              lengthN={fuji}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <LengthInput
              scale="everest"
              lengthN={everest}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <LengthInput
              scale="tokyoLondon"
              lengthN={tokyoLondon}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />                               
            <LengthInput
              scale="equator"
              lengthN={equator}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <LengthInput
              scale="lightSec"
              lengthN={lightSec}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <LengthInput
              scale="earthOrbit"
              lengthN={earthOrbit}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <LengthInput
              scale="lightYear"
              lengthN={lightYear}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />

        </div>
      </div>

      </div>
    );
  }
}

export default LengthCalculator