import React from 'react';
import WeightInput from './WeightInput';

const valuesInWeight = {
  milligram:1*(10**-6),
  gram:1*(10**-3),
  kilogram:1,
  ton:1000,
  avoirdupoisGrain:64.79891*(10**-6),
  avoirdupoisDram:1.7718451953125*(10**-3),
  avoirdupoisOunce:28.349523125*(10**-3),
  avoirdupoisPound:0.45359237,
  avoirdupoisStone:6.35029318,
  avoirdupoisUShundredweight:45.359237,
  avoirdupoisLonghundredweight:50.80234544,
  avoirdupoisShortTon:907.18474,
  avoirdupoisLongTon:1016.0469088,
  troyGrain:64.79891*(10**-6),
  troyPennyweight:1.55517384*(10**-3),
  troyOunce:31.1034768*(10**-3),
  troyPound:373.2417216*(10**-3),
  monme:3.75*(10**-3),
  ryo:37.5*(10**-3),
  kin:600*(10**-3),
  kan:3.75,
  sumoWrestler:160,
  africanElephant:6000,
  blueWhale:190000,
}


function tryConvert(weightStr, originalScale, targetScale) {
  console.log('%%%%%%%%%%%%%%%%%%START%%%%%%%%%%%%%%%%%%%%%%%')
  if (originalScale === targetScale){
    return weightStr;
  }

  const input = parseFloat(weightStr);
  if (Number.isNaN(input)) {
    return '';
  }
  const ratio = valuesInWeight[originalScale]/valuesInWeight[targetScale];
  const output = input*ratio;
  console.log('output', output)
  const string = output.toString(10);
  const stringArray = string.split('');

  const testResultForFourZeros = consectiveZerosUnderDotFinder(stringArray, 4)
  console.log('testResultForFourZeros####', testResultForFourZeros)
  const testResultForNineNines = consectiveNineFinder(stringArray)
  console.log('testResultForNineNines★★★', testResultForNineNines)

  const dotPosition = dotPositionFinder(stringArray) ? dotPositionFinder(stringArray)+1: null;
  console.log('dotPosition', dotPosition)

  if (testResultForNineNines) {
    const realLastNinePosition = testResultForNineNines + 1;
    console.log('realLastNinePosition', realLastNinePosition)

    if (dotPosition) {
      if (dotPosition < realLastNinePosition) {
        const differenceBetweenDotAndlastNine = realLastNinePosition - dotPosition;
        console.log('differenceBetweenDotAndlastNine', differenceBetweenDotAndlastNine)

        const valueForMathRound = differenceBetweenDotAndlastNine;
        console.log('valueForMathRound', valueForMathRound)
        const adjusted = Math.round(output*(10**valueForMathRound))/(10**valueForMathRound)
        console.log('output', output)
        console.log('adjusted', adjusted)
        return adjusted
      }
      else if (realLastNinePosition < dotPosition) {
        const differenceBetweenDotAndlastNine = dotPosition - realLastNinePosition;
        console.log('differenceBetweenDotAndlastNine', differenceBetweenDotAndlastNine)

        const valueForMathRound = differenceBetweenDotAndlastNine;
        console.log('valueForMathRound', valueForMathRound)
        const adjusted = Math.round(output/(10**valueForMathRound))*(10**valueForMathRound)
        console.log('output', output)
        console.log('adjusted', adjusted)
        return adjusted
      }
    } else {
      const difference = stringArray.length - realLastNinePosition;
      const valueForMathRound = difference;
      const adjusted = Math.round(output/(10**valueForMathRound))*(10**valueForMathRound)
      return adjusted;
    }
  }

  // zero continues after dot for 4 zeros if leading not zero number exists
  if (dotPosition && testResultForFourZeros) {
    const zeroStartingPositionForFourZeros = testResultForFourZeros-2;
    const slicedStringToArray = stringArray.slice(0, zeroStartingPositionForFourZeros-1);
    const joined = slicedStringToArray.join('');
    const converted = Number(joined);
    return converted;
  }
  
  const rounded = Math.round(output * 1000000000) / 1000000000;
  return rounded
  // return output;
}

function consectiveNineFinder (array) {
  let counter = 0;
  let dotCounter = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === '9') {
      counter++;
    } else if (array[i] === '.') {
      dotCounter++;
    } else {
      counter = 0;
    }
    if (counter === 9) {
      if (dotCounter > 1){
        return "Invalid Input";
      } else {
        return i;
      }
    }
  }
  return false;
}

function consectiveZerosUnderDotFinder (array, zeroCount) {
  console.log('consectiveZerosUnderDotFinder is invoked!')
  let counter = 0;
  let dotCounter = 0;
  let underDotPosition = false;
  const numbersStr = ['1','2','3','4','5','6','7','8','9'];
  let leadingNotZeroNumberExists = false;
  for (let i = 0; i < array.length; i++) {
      if (array[i] === '.') {
          dotCounter++;
          dotCounter === 1 ? underDotPosition = true : underDotPosition = false; 
      }
      if (numbersStr.includes(array[i])) {
          leadingNotZeroNumberExists = true;
      }
      if (leadingNotZeroNumberExists && underDotPosition && array[i] === '0') {
          counter++;
      } else {
          counter = 0;
      }
      if (counter === zeroCount) {
          return i;
      }
  }
return false;
}

function dotPositionFinder (array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === ".") {
      return i;
    }
  }
  return NaN;
}


class WeightCalculator extends React.Component {

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
    const aStyle = this.state.alertMessage === "OFF" ? {display: "none"} : {display:"inline"};

    const milligram = tryConvert(weightStr, originalScale, "milligram")
    const gram = tryConvert(weightStr, originalScale, "gram")
    const kilogram = tryConvert(weightStr, originalScale, "kilogram")
    const ton = tryConvert(weightStr, originalScale, "ton")
    const avoirdupoisGrain = tryConvert(weightStr, originalScale, "avoirdupoisGrain")
    const avoirdupoisDram = tryConvert(weightStr, originalScale, "avoirdupoisDram")
    const avoirdupoisOunce = tryConvert(weightStr, originalScale, "avoirdupoisOunce")
    const avoirdupoisPound = tryConvert(weightStr, originalScale, "avoirdupoisPound")    
    const avoirdupoisStone = tryConvert(weightStr, originalScale, "avoirdupoisStone")
    const avoirdupoisUShundredweight = tryConvert(weightStr, originalScale, "avoirdupoisUShundredweight")
    const avoirdupoisLonghundredweight = tryConvert(weightStr, originalScale, "avoirdupoisLonghundredweight")
    const avoirdupoisShortTon = tryConvert(weightStr, originalScale, "avoirdupoisShortTon")
    const avoirdupoisLongTon = tryConvert(weightStr, originalScale, "avoirdupoisLongTon")
    const troyGrain = tryConvert(weightStr, originalScale, "troyGrain")
    const troyPennyweight = tryConvert(weightStr, originalScale, "troyPennyweight")
    const troyOunce = tryConvert(weightStr, originalScale, "troyOunce")
    const troyPound = tryConvert(weightStr, originalScale, "troyPound")
    const monme = tryConvert(weightStr, originalScale, "monme")
    const ryo = tryConvert(weightStr, originalScale, "ryo")
    const kin = tryConvert(weightStr, originalScale, "kin")
    const kan = tryConvert(weightStr, originalScale, "kan")
    const sumoWrestler = tryConvert(weightStr, originalScale, "sumoWrestler")    
    const africanElephant = tryConvert(weightStr, originalScale, "africanElephant")
    const blueWhale = tryConvert(weightStr, originalScale, "blueWhale")

    return (
      <div>

        <h5 id="h5">
          <span id="alertM" style={aStyle}>カナ漢字変換をOFFにしてください</span>
        </h5>
            
        <div className="uBody row">
            <div className="col s12 m4">

                <WeightInput
                    scale="milligram"
                    weightN={milligram}
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
                    scale="kilogram"
                    weightN={kilogram}
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
        <div className='flex-container'>
            <button id="btn-leng" className="waves-effect waves-light btn" onClick={this.clear}>CLEAR</button>
        </div>
      </div>
    );
  }
}

export default WeightCalculator