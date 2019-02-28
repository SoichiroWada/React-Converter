import React from 'react';

const scaleNames = {
  c: 'Celsius （摂氏：C)',
  f: 'Fahrenheit（華氏：F）'
};

const Temperature = (props) => {

  function handleChange(e) {
    props.onTemperatureChange(e.target.value);
    console.log('e.target.value:',e.target.value);
    console.log('props in handleChange:',props);
  }

    const temperature = props.temperature;
    const scale = props.scale;
    // console.log('this.props in render:', this.props)
    return (
      <fieldset className="rain">
        <legend>Enter temperature in {scaleNames[scale]}</legend>
        <input id="input" value={temperature} onChange={handleChange} />
      </fieldset>
    );
}

export default Temperature

// class TemperatureInput extends React.Component {
//     constructor(props) {
//       super(props);
//       this.handleChange = this.handleChange.bind(this);
//     }
  
//     handleChange(e) {
//       this.props.onTemperatureChange(e.target.value);
//       // console.log('e.target.value:',e.target.value);
//       // console.log('this.props in handleChange:',this.props);
//     }
  
//     render() {
//       const temperature = this.props.temperature;
//       const scale = this.props.scale;
//       // console.log('this.props in render:', this.props)
//       return (
//         <fieldset>
//           <legend>Enter temperature in {scaleNames[scale]}{` ( ${scale.toUpperCase()} ) `}:</legend>
//           <input value={temperature} onChange={this.handleChange} />
//         </fieldset>
//       );
//     }
//   }

// export default TemperatureInput

