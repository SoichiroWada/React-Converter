import React from 'react';
import AreaInput from './AreaInput';
import PrecisionControls, { PrecisionContext, InputStatus } from './PrecisionControls';
import { createConversionSession, displayValue } from '../conversion/convert';

class AreaCalculator extends React.Component {
  static contextType = PrecisionContext;

  conversion = createConversionSession('area');

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.clear = this.clear.bind(this);
    this.alertMessage = this.alertMessage.bind(this);

    this.state = { 
      originalScale:'',
      areaStr:'',
      alertMessage:'OFF',
    };
  }

  handleChange(areaStr, scale) {
    this.setState({originalScale:scale, areaStr:areaStr});
  }

  clear(){
    console.clear();
    this.setState({ originalScale:'', areaStr:'', alertMessage: 'OFF'});
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
    const areaStr = this.state.areaStr;
    const result = this.conversion(areaStr, originalScale);
    const aStyle = this.state.alertMessage === "OFF" ? {display: "none"} : {display:"inline"};

    const squareMeter = displayValue(areaStr, originalScale, "squareMeter", result.values["squareMeter"], this.context)
    const are = displayValue(areaStr, originalScale, "are", result.values["are"], this.context)
    const hectare = displayValue(areaStr, originalScale, "hectare", result.values["hectare"], this.context)
    const squareKiloMeter = displayValue(areaStr, originalScale, "squareKiloMeter", result.values["squareKiloMeter"], this.context)
    const squareInch = displayValue(areaStr, originalScale, "squareInch", result.values["squareInch"], this.context)
    const squareFeet = displayValue(areaStr, originalScale, "squareFeet", result.values["squareFeet"], this.context)
    const squareYard = displayValue(areaStr, originalScale, "squareYard", result.values["squareYard"], this.context)
    const squarePerch = displayValue(areaStr, originalScale, "squarePerch", result.values["squarePerch"], this.context)
    const acre = displayValue(areaStr, originalScale, "acre", result.values["acre"], this.context)
    const squareMile = displayValue(areaStr, originalScale, "squareMile", result.values["squareMile"], this.context)
    const shaku = displayValue(areaStr, originalScale, "shaku", result.values["shaku"], this.context)
    const gou = displayValue(areaStr, originalScale, "gou", result.values["gou"], this.context)
    const cho = displayValue(areaStr, originalScale, "cho", result.values["cho"], this.context)
    const tsubo = displayValue(areaStr, originalScale, "tsubo", result.values["tsubo"], this.context)
    const se = displayValue(areaStr, originalScale, "se", result.values["se"], this.context)
    const tan = displayValue(areaStr, originalScale, "tan", result.values["tan"], this.context)
    const China = displayValue(areaStr, originalScale, "China", result.values["China"], this.context)
    const Australia = displayValue(areaStr, originalScale, "Australia", result.values["Australia"], this.context)
    const Canada = displayValue(areaStr, originalScale, "Canada", result.values["Canada"], this.context)
    const squareMilliMeter = displayValue(areaStr, originalScale, "squareMilliMeter", result.values["squareMilliMeter"], this.context)
    const squareCentiMeter = displayValue(areaStr, originalScale, "squareCentiMeter", result.values["squareCentiMeter"], this.context)
    const Japan = displayValue(areaStr, originalScale, "Japan", result.values["Japan"], this.context)
    const USA = displayValue(areaStr, originalScale, "USA", result.values["USA"], this.context)
    const LandOnEarth = displayValue(areaStr, originalScale, "LandOnEarth", result.values["LandOnEarth"], this.context)

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
            <div className="col s12 m3">

                <AreaInput
                    scale="squareKiloMeter"
                    areaN={squareKiloMeter}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onHandleChange={this.handleChange} />
                <AreaInput
                    scale="squareMeter"
                    areaN={squareMeter}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onHandleChange={this.handleChange} />
                <AreaInput
                    scale="squareCentiMeter"
                    areaN={squareCentiMeter}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onHandleChange={this.handleChange} />
                <AreaInput
                    scale="squareMilliMeter"
                    areaN={squareMilliMeter}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onHandleChange={this.handleChange} />
                <AreaInput
                    scale="hectare"
                    areaN={hectare}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onHandleChange={this.handleChange} />                    
                <AreaInput
                    scale="are"
                    areaN={are}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onHandleChange={this.handleChange} />
            </div>


            <div className="col s12 m3">
                <AreaInput
                    scale="squareMile"
                    areaN={squareMile}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onHandleChange={this.handleChange} />
                <AreaInput
                    scale="acre"
                    areaN={acre}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onHandleChange={this.handleChange} />         
                <AreaInput
                    scale="squarePerch"
                    areaN={squarePerch}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onHandleChange={this.handleChange} />              
                <AreaInput
                    scale="squareYard"
                    areaN={squareYard}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onHandleChange={this.handleChange} />              
                <AreaInput
                    scale="squareFeet"
                    areaN={squareFeet}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onHandleChange={this.handleChange} />
                <AreaInput
                    scale="squareInch"
                    areaN={squareInch}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onHandleChange={this.handleChange} />                  
        </div>

        <div className="col s12 m3">
            <AreaInput
              scale="cho"
              areaN={cho}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onHandleChange={this.handleChange} />
            <AreaInput
              scale="tan"
              areaN={tan}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onHandleChange={this.handleChange} />
            <AreaInput
              scale="se"
              areaN={se}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onHandleChange={this.handleChange} />
            <AreaInput
              scale="tsubo"
              areaN={tsubo}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onHandleChange={this.handleChange} />      
            <AreaInput
              scale="gou"
              areaN={gou}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onHandleChange={this.handleChange} />                            
            <AreaInput
              scale="shaku"
              areaN={shaku}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onHandleChange={this.handleChange} />
        </div>

        <div className="col s12 m3">

            <AreaInput
              scale="Japan"
              areaN={Japan}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onHandleChange={this.handleChange} />
            <AreaInput
              scale="Canada"
              areaN={Canada}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onHandleChange={this.handleChange} />              
            <AreaInput
              scale="Australia"
              areaN={Australia}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onHandleChange={this.handleChange} />                      
            <AreaInput
              scale="USA"
              areaN={USA}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onHandleChange={this.handleChange} />              
            <AreaInput
              scale="China"
              areaN={China}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onHandleChange={this.handleChange} />              
            <AreaInput
              scale="LandOnEarth"
              areaN={LandOnEarth}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onHandleChange={this.handleChange} />

        </div>
      </div>

      </div>
    );
  }
}

export default AreaCalculator