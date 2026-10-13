import React from 'react';
import WeightInput from './WeightInput';
import PrecisionControls, { PrecisionContext, InputStatus } from './PrecisionControls';
import { createConversionSession, displayValue } from '../conversion/convert';

class WeightCalculator extends React.Component {
  static contextType = PrecisionContext;

  conversion = createConversionSession('mass');

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.clear = this.clear.bind(this);
    this.alertMessage = this.alertMessage.bind(this);

    this.state = { 
      originalScale:'',
      weightStr:'',
      alertMessage:'OFF',
    };
  }

  handleChange(weightStr, scale) {
    this.setState({originalScale: scale, weightStr:weightStr});
  }

  clear(){
    console.clear();
    this.setState({ originalScale:'', weightStr:'', alertMessage: 'OFF'});
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
    const weightStr = this.state.weightStr;
    const result = this.conversion(weightStr, originalScale);
    const aStyle = this.state.alertMessage === "OFF" ? {display: "none"} : {display:"inline"};

    const milligram = displayValue(weightStr, originalScale, "milligram", result.values["milligram"], this.context)
    const gram = displayValue(weightStr, originalScale, "gram", result.values["gram"], this.context)
    const kilogram = displayValue(weightStr, originalScale, "kilogram", result.values["kilogram"], this.context)
    const ton = displayValue(weightStr, originalScale, "ton", result.values["ton"], this.context)
    const avoirdupoisGrain = displayValue(weightStr, originalScale, "avoirdupoisGrain", result.values["avoirdupoisGrain"], this.context)
    const avoirdupoisDram = displayValue(weightStr, originalScale, "avoirdupoisDram", result.values["avoirdupoisDram"], this.context)
    const avoirdupoisOunce = displayValue(weightStr, originalScale, "avoirdupoisOunce", result.values["avoirdupoisOunce"], this.context)
    const avoirdupoisPound = displayValue(weightStr, originalScale, "avoirdupoisPound", result.values["avoirdupoisPound"], this.context)
    const avoirdupoisStone = displayValue(weightStr, originalScale, "avoirdupoisStone", result.values["avoirdupoisStone"], this.context)
    const avoirdupoisUShundredweight = displayValue(weightStr, originalScale, "avoirdupoisUShundredweight", result.values["avoirdupoisUShundredweight"], this.context)
    const avoirdupoisLonghundredweight = displayValue(weightStr, originalScale, "avoirdupoisLonghundredweight", result.values["avoirdupoisLonghundredweight"], this.context)
    const avoirdupoisShortTon = displayValue(weightStr, originalScale, "avoirdupoisShortTon", result.values["avoirdupoisShortTon"], this.context)
    const avoirdupoisLongTon = displayValue(weightStr, originalScale, "avoirdupoisLongTon", result.values["avoirdupoisLongTon"], this.context)
    const troyGrain = displayValue(weightStr, originalScale, "troyGrain", result.values["troyGrain"], this.context)
    const troyPennyweight = displayValue(weightStr, originalScale, "troyPennyweight", result.values["troyPennyweight"], this.context)
    const troyOunce = displayValue(weightStr, originalScale, "troyOunce", result.values["troyOunce"], this.context)
    const troyPound = displayValue(weightStr, originalScale, "troyPound", result.values["troyPound"], this.context)
    const monme = displayValue(weightStr, originalScale, "monme", result.values["monme"], this.context)
    const ryo = displayValue(weightStr, originalScale, "ryo", result.values["ryo"], this.context)
    const kin = displayValue(weightStr, originalScale, "kin", result.values["kin"], this.context)
    const kan = displayValue(weightStr, originalScale, "kan", result.values["kan"], this.context)
    const sumoWrestler = displayValue(weightStr, originalScale, "sumoWrestler", result.values["sumoWrestler"], this.context)
    const africanElephant = displayValue(weightStr, originalScale, "africanElephant", result.values["africanElephant"], this.context)
    const blueWhale = displayValue(weightStr, originalScale, "blueWhale", result.values["blueWhale"], this.context)

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

                <WeightInput
                    scale="kilogram"
                    weightN={kilogram}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onLengthChange={this.handleChange} />
                <WeightInput
                    scale="gram"
                    weightN={gram}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onLengthChange={this.handleChange} />                         
                <WeightInput
                    scale="milligram"
                    weightN={milligram}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onLengthChange={this.handleChange} />
                <WeightInput
                    scale="ton"
                    weightN={ton}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onLengthChange={this.handleChange} />                    
                <WeightInput
                    scale="avoirdupoisGrain"
                    weightN={avoirdupoisGrain}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onLengthChange={this.handleChange} />
                <WeightInput
                    scale="avoirdupoisDram"
                    weightN={avoirdupoisDram}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onLengthChange={this.handleChange} />
                <WeightInput
                    scale="avoirdupoisOunce"
                    weightN={avoirdupoisOunce}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onLengthChange={this.handleChange} />
                <WeightInput
                    scale="avoirdupoisPound"
                    weightN={avoirdupoisPound}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onLengthChange={this.handleChange} />              

            </div>

            <div className="col s12 m4">
                <WeightInput
                    scale="avoirdupoisStone"
                    weightN={avoirdupoisStone}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onLengthChange={this.handleChange} />
                <WeightInput
                    scale="avoirdupoisUShundredweight"
                    weightN={avoirdupoisUShundredweight}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onLengthChange={this.handleChange} />
                <WeightInput
                    scale="avoirdupoisLonghundredweight"
                    weightN={avoirdupoisLonghundredweight}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onLengthChange={this.handleChange} />
                <WeightInput
                    scale="avoirdupoisShortTon"
                    weightN={avoirdupoisShortTon}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onLengthChange={this.handleChange} />            
                <WeightInput
                    scale="avoirdupoisLongTon"
                    weightN={avoirdupoisLongTon}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onLengthChange={this.handleChange} />
                <WeightInput
                    scale="troyGrain"
                    weightN={troyGrain}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onLengthChange={this.handleChange} />
                <WeightInput
                    scale="troyPennyweight"
                    weightN={troyPennyweight}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onLengthChange={this.handleChange} />
                <WeightInput
                    scale="troyOunce"
                    weightN={troyOunce}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onLengthChange={this.handleChange} />                      
            </div>

            <div className="col s12 m4">
                <WeightInput
                    scale="troyPound"
                    weightN={troyPound}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onLengthChange={this.handleChange} />                 
                <WeightInput
                    scale="monme"
                    weightN={monme}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onLengthChange={this.handleChange} />
                <WeightInput
                    scale="ryo"
                    weightN={ryo}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onLengthChange={this.handleChange} />
                <WeightInput
                    scale="kin"
                    weightN={kin}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onLengthChange={this.handleChange} />
                <WeightInput
                    scale="kan"
                    weightN={kan}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onLengthChange={this.handleChange} />
                <WeightInput
                    scale="sumoWrestler"
                    weightN={sumoWrestler}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onLengthChange={this.handleChange} />                               
                <WeightInput
                    scale="africanElephant"
                    weightN={africanElephant}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onLengthChange={this.handleChange} />
                <WeightInput
                    scale="blueWhale"
                    weightN={blueWhale}
                    onClear={this.clear}
                    onAlert={this.alertMessage}
                    onLengthChange={this.handleChange} />

            </div>
        </div>
      </div>
    );
  }
}

export default WeightCalculator