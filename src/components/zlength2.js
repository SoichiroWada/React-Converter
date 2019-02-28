import React from 'react';
import LengthInput from './LengthInput';

const meterToMile = (meter) => { return meter * 0.0006213712 }; 
const meterToInch = (meter) => { return meter * 39.3701 }; 
const meterToFeet = (meter) => { return meter * 3.28084 };
const meterToShaku = (meter) => { return meter * 3.3 };
const meterToRi = (meter) => { return meter * 0.00025462962962963 };

const inchToMeter = (inch) => { return inch * 0.0254 };
const inchToMile = (inch) => { return inch * 15.7828283 / 1000000 };
const inchToFeet = (inch) => { return inch * 83.3333 / 1000 };
const inchToShaku = (inch) => { return inch * 83.8201 / 1000 };
const inchToRi = (inch) => { return inch * 6.46759214 / 1000000 };

const mileToMeter = (mile) => { return mile * 1609.344 };
const mileToInch = (mile) => { return mile * 63360 };
const mileToFeet = (mile) => { return mile * 5280 };
const mileToShaku = (mile) => { return mile * 5310.84 };
const mileToRi = (mile) => { return mile * 0.4097866666666 };

const feetToMeter = (feet) => { return feet * 0.3048 };
const feetToInch = (feet) => { return feet * 12 };
const feetToMile = (feet) => { return feet * 189.393939 / 1000000 };
const feetToShaku = (feet) => { return feet * 1.00584 };
const feetToRi = (feet) => { return feet * 7.7611111111 };

const shakuToMeter = (shaku) => { return shaku * 10 / 33 }; 
const shakuToInch = (shaku) => { return shaku * 11.9303 }; 
const shakuToMile = (shaku) => { return shaku * 188.294112 / 1000000 }; 
const shakuToFeet = (shaku) => { return shaku * 0.994193 }; 
const shakuToRi = (shaku) => { return shaku / 12960 }; 

const riToMeter = (ri) => { return ri * 3927.27 };
const riToInch = (ri) => { return ri * 154617 };
const riToMile = (ri) => { return ri * 2.44029 };
const riToFeet = (ri) => { return ri * 12884.8 };
const riToShaku = (ri) => { return ri * 12960 };

function tryConvert(length, converter) {
  const input = parseFloat(length);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = converter(input);
  const rounded = Math.round(output * 10000000000) / 10000000000;
  return rounded.toString();
}

class LengthCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeMeter = this.handleChangeMeter.bind(this);
    this.handleChangeInch = this.handleChangeInch.bind(this);
    this.handleChangeMile = this.handleChangeMile.bind(this);
    this.handleChangeFeet = this.handleChangeFeet.bind(this);
    this.handleChangeShaku = this.handleChangeShaku.bind(this);
    this.handleChangeRi = this.handleChangeRi.bind(this);
    this.clear = this.clear.bind(this);

    this.state = { originalScale:'', length:'' };
  }

  handleChangeMeter(length) {
    this.setState({originalScale: 'meter', length:length});
    // console.log(this.state);
  }

  handleChangeInch(length) {
    this.setState({originalScale:'inch', length:length});
    // console.log(this.state);
  }

  handleChangeMile(length) {
    this.setState({originalScale:'mile', length:length});
    // console.log(this.state);
  }

  handleChangeFeet(length) {
    this.setState({originalScale:'feet', length:length});
    // console.log(this.state);
  }

  handleChangeShaku(length) {
    this.setState({originalScale:'shaku', length:length});
    // console.log(this.state);
  }

  handleChangeRi(length) {
    this.setState({originalScale:'ri', length:length});
    // console.log(this.state);
  }

  clear(){
    console.clear();
    this.setState({ originalScale:'', length:'' });
  }

  render() {
    const scale = this.state.originalScale;
    const length = this.state.length;

    const meter = scale === 'inch' ? tryConvert(length, inchToMeter) 
    : scale === 'mile' ? tryConvert(length, mileToMeter) 
    : scale === 'feet' ? tryConvert(length, feetToMeter) 
    : scale === 'shaku' ? tryConvert(length, shakuToMeter) 
    : scale === 'ri' ? tryConvert(length, riToMeter) :length;

    const inch = scale === 'meter' ? tryConvert(length, meterToInch) 
    : scale === 'mile' ? tryConvert(length, mileToInch) 
    : scale === 'feet' ? tryConvert(length, feetToInch) 
    : scale === 'shaku' ? tryConvert(length, shakuToInch) 
    : scale === 'ri' ? tryConvert(length, riToInch) :length;

    const mile = scale === 'meter' ? tryConvert(length, meterToMile) 
    : scale === 'inch' ? tryConvert(length, feetToInch) 
    : scale === 'feet' ? tryConvert(length, feetToMile) 
    : scale === 'shaku' ? tryConvert(length, shakuToMile) 
    : scale === 'ri' ? tryConvert(length, riToMile) :length;

    const feet = scale === 'meter' ? tryConvert(length, meterToFeet) 
    : scale === 'inch' ? tryConvert(length, inchToFeet) 
    : scale === 'mile' ? tryConvert(length, mileToFeet) 
    : scale === 'shaku' ? tryConvert(length, shakuToFeet) 
    : scale === 'ri' ? tryConvert(length, riToFeet) :length;

    const shaku = scale === 'meter' ? tryConvert(length, meterToShaku) 
    : scale === 'inch' ? tryConvert(length, inchToShaku) 
    : scale === 'mile' ? tryConvert(length, mileToShaku) 
    : scale === 'feet' ? tryConvert(length, feetToShaku) 
    : scale === 'ri' ? tryConvert(length, riToShaku) :length;

    const ri = scale === 'meter' ? tryConvert(length, meterToRi) 
    : scale === 'inch' ? tryConvert(length, inchToRi) 
    : scale === 'mile' ? tryConvert(length, mileToRi) 
    : scale === 'feet' ? tryConvert(length, feetToRi) 
    : scale === 'shaku' ? tryConvert(length, shakuToRi) :length;

    return (
      <div className="uBody">
        <h4>Length Converter（長さの変換）</h4>
        <LengthInput
            scale="meter"
            length={meter}
            onLengthChange={this.handleChangeMeter} />
        <LengthInput
            scale="inch"
            length={inch}
            onLengthChange={this.handleChangeInch} />
        <LengthInput
            scale="mile"
            length={mile}
            onLengthChange={this.handleChangeMile} />
        <LengthInput
            scale="feet"
            length={feet}
            onLengthChange={this.handleChangeFeet} />
        <LengthInput
            scale="shaku"
            length={shaku}
            onLengthChange={this.handleChangeShaku} />
        <LengthInput
            scale="ri"
            length={ri}
            onLengthChange={this.handleChangeRi} />
        <div className="center">
        <button id="btn-leng" className="waves-effect waves-light btn-large" onClick={this.clear}>CLEAR</button>
        </div>
      </div>
    );
  }
}

export default LengthCalculator
