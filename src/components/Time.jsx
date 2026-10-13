import React from 'react';
import TimeInput from './TimeInput';
import PrecisionControls, { PrecisionContext, InputStatus } from './PrecisionControls';
import { createConversionSession, displayValue } from '../conversion/convert';

class TimeCalculator extends React.Component {
  static contextType = PrecisionContext;

  conversion = createConversionSession('time');

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
    const result = this.conversion(timeStr, originalScale);
    const aStyle = this.state.alertMessage === "OFF" ? {display: "none"} : {display:"inline"};

    const milli = displayValue(timeStr, originalScale, "milli", result.values["milli"], this.context)
    const second = displayValue(timeStr, originalScale, "second", result.values["second"], this.context)
    const minute = displayValue(timeStr, originalScale, "minute", result.values["minute"], this.context)
    const hour = displayValue(timeStr, originalScale, "hour", result.values["hour"], this.context)
    const day = displayValue(timeStr, originalScale, "day", result.values["day"], this.context)
    const week = displayValue(timeStr, originalScale, "week", result.values["week"], this.context)
    const month28 = displayValue(timeStr, originalScale, "month28", result.values["month28"], this.context)
    const month29 = displayValue(timeStr, originalScale, "month29", result.values["month29"], this.context)
    const month30 = displayValue(timeStr, originalScale, "month30", result.values["month30"], this.context)
    const month31 = displayValue(timeStr, originalScale, "month31", result.values["month31"], this.context)
    const year = displayValue(timeStr, originalScale, "year", result.values["year"], this.context)
    const fourYears = displayValue(timeStr, originalScale, "fourYears", result.values["fourYears"], this.context)
    const decade = displayValue(timeStr, originalScale, "decade", result.values["decade"], this.context)
    const century = displayValue(timeStr, originalScale, "century", result.values["century"], this.context)

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

      </div>
    );
  }
}

export default TimeCalculator