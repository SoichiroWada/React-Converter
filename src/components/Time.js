import React from 'react';
import TimeInput from './TimeInput';

//below criterion value is that 1 that scale equals what meter
const valuesInSecond = {
  milli:0.001,
  second:1,
  minute:60,
  hour:3600,
  day:3600*24,
  week:3600*24*7,
  month28:3600*24*28,
  month29:3600*24*29,
  month30:3600*24*30,
  month31:3600*24*31,
  year:3600*24*365,
  fourYears:3600*24*365*4,
  decade:3600*24*365*10,
  century:3600*24*365*100,
}

function tryConvert(timeStr, originalScale, targetScale) {

  if (originalScale === targetScale){
    return timeStr;
  }

  const input = parseFloat(timeStr);
  if (Number.isNaN(input)) {
    return '';
  }
  const ratio = valuesInSecond[originalScale]/valuesInSecond[targetScale];
  const output = input*ratio;
  const string = output.toString(10);
  const stringArray = string.split('');

  const testResultForFourZeros = consectiveZerosUnderDotFinder(stringArray, 4)
  const testResultForNineNines = consectiveNineFinder(stringArray)
  const dotPosition = dotPositionFinder(stringArray) ? dotPositionFinder(stringArray)+1: null;

  if (testResultForNineNines) {
    const realLastNinePosition = testResultForNineNines + 1;

    if (dotPosition) {
      if (dotPosition < realLastNinePosition) {
        const differenceBetweenDotAndlastNine = realLastNinePosition - dotPosition;
        const valueForMathRound = differenceBetweenDotAndlastNine;
        const adjusted = Math.round(output*(10**valueForMathRound))/(10**valueForMathRound)
        return adjusted
      }
      else if (realLastNinePosition < dotPosition) {
        const differenceBetweenDotAndlastNine = dotPosition - realLastNinePosition;
        const valueForMathRound = differenceBetweenDotAndlastNine;
        const adjusted = Math.round(output/(10**valueForMathRound))*(10**valueForMathRound)
        return adjusted
      }
    } else {
      const difference = stringArray.length - realLastNinePosition;
      const valueForMathRound = difference;
      const adjusted = Math.round(output/(10**valueForMathRound))*(10**valueForMathRound)
      return adjusted;
    }
  }

  // zero continues after dot for 4 zeros
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

class TimeCalculator extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.clear = this.clear.bind(this);
    this.alertMessage = this.alertMessage.bind(this);

    this.state = { 
      originalScale:'',
      timeStr:'',
      alertMessage:'OFF',
    };
  }

  handleChange(timeStr, scale) {
    this.setState({originalScale: scale, timeStr:timeStr});
  }

  clear(){
    console.clear();
    this.setState({ originalScale:'', timeStr:'', alertMessage: 'OFF'});
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
    const timeStr = this.state.timeStr;
    const aStyle = this.state.alertMessage === "OFF" ? {display: "none"} : {display:"inline"};

    const milli = tryConvert(timeStr, originalScale, "milli")
    const second = tryConvert(timeStr, originalScale, "second")
    const minute = tryConvert(timeStr, originalScale, "minute")
    const hour = tryConvert(timeStr, originalScale, "hour")
    const day = tryConvert(timeStr, originalScale, "day")
    const week = tryConvert(timeStr, originalScale, "week")
    const month28 = tryConvert(timeStr, originalScale, "month28")
    const month29 = tryConvert(timeStr, originalScale, "month29")
    const month30 = tryConvert(timeStr, originalScale, "month30")
    const month31 = tryConvert(timeStr, originalScale, "month31")
    const year = tryConvert(timeStr, originalScale, "year")
    const fourYears = tryConvert(timeStr, originalScale, "fourYears")
    const decade = tryConvert(timeStr, originalScale, "decade")
    const century = tryConvert(timeStr, originalScale, "century")

    return (
      <div>
        <h5 id="h5">
          <span id="alertM" style={aStyle}>カナ漢字変換をOFFにしてください</span>
        </h5>
      <div className="uBody row">
        <div className="col s12 m6">
            <TimeInput
                scale="milli"
                timeN={milli}
                onClear={this.clear}
                onAlert={this.alertMessage}
                onLengthChange={this.handleChange} />

            <TimeInput
              scale="second"
              timeN={second}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />

          <TimeInput
              scale="minute"
              timeN={minute}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
          <TimeInput
              scale="hour"
              timeN={hour}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />              
          <TimeInput
              scale="day"
              timeN={day}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
          <TimeInput
              scale="week"
              timeN={week}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
          <TimeInput
              scale="month28"
              timeN={month28}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
        </div>

        <div className="col s12 m6">
            <TimeInput
              scale="month29"
              timeN={month29}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <TimeInput
              scale="month30"
              timeN={month30}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <TimeInput
              scale="month31"
              timeN={month31}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <TimeInput
              scale="year"
              timeN={year}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <TimeInput
              scale="fourYears"
              timeN={fourYears}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />              
            <TimeInput
              scale="decade"
              timeN={decade}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />                           
            <TimeInput
              scale="century"
              timeN={century}
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

export default TimeCalculator