import React from 'react';
import LengthInput from './LengthInput';

const kiloToEquator = (kilo) => { return kilo * 0.0000249532127261385}; 
const kiloToMeter = (kilo) => { return kilo * 1000 }; 
const kiloToCenti = (kilo) => { return kilo * 1000 * 100 }; 
const kiloToMile = (kilo) => { return kilo * 0.6213712 }; 
const kiloToInch = (kilo) => { return kilo * 39370.1 }; 
const kiloToFeet = (kilo) => { return kilo * 3280.84 };
const kiloToSun = (kilo) => { return kilo * 33000 };
const kiloToShaku = (kilo) => { return kilo * 3300 };
const kiloToRi = (kilo) => { return kilo * 0.25462962962963 };

const meterToEquator = (meter) => { return meter * 0.0000000249532127261385}; 
const meterToKilo = (meter) => { return meter / 1000 }; 
const meterToCenti = (meter) => { return meter * 100 }; 
const meterToMile = (meter) => { return meter * 0.0006213712 }; 
const meterToInch = (meter) => { return meter * 39.3701 }; 
const meterToFeet = (meter) => { return meter * 3.28084 };
const meterToSun = (meter) => { return meter * 33 };
const meterToShaku = (meter) => { return meter * 3.3 };
const meterToRi = (meter) => { return meter * 0.00025462962962963 };

const centiToEquator = (centi) => { return centi * 0.000000000249532127261385}; 
const centiToKilo = (centi) => { return centi / 100000 }; 
const centiToMeter = (centi) => { return centi / 100 }; 
const centiToMile = (centi) => { return centi * 0.000006213712 }; 
const centiToInch = (centi) => { return centi * 0.393701 }; 
const centiToFeet = (centi) => { return centi * 0.0328084 };
const centiToSun = (centi) => { return centi * 0.33 };
const centiToShaku = (centi) => { return centi * 0.033 };
const centiToRi = (centi) => { return centi * 0.0000025462962962963 };

const inchToEquator = (inch) => { return inch * 0.000000000633811260985837}; 
const inchToKilo = (inch) => { return inch * 0.0000254 };
const inchToMeter = (inch) => { return inch * 0.0254 };
const inchToCenti = (inch) => { return inch * 2.54 };
const inchToMile = (inch) => { return inch * 15782.8282828 / 1000000000 };
const inchToFeet = (inch) => { return inch * 83.3333 / 1000 };
const inchToSun = (inch) => { return inch * 83.8201 / 1000 };
const inchToShaku = (inch) => { return inch * 83.8201 / 1000 };
const inchToRi = (inch) => { return inch * 6.46759214 / 1000000 };

const mileToEquator = (mile) => { return mile * 0.000040158302679845}; 
const mileToKilo = (mile) => { return mile * 1.609344 };
const mileToMeter = (mile) => { return mile * 1609.344 };
const mileToCenti = (mile) => { return mile * 160934.4 };
const mileToInch = (mile) => { return mile * 63360 };
const mileToFeet = (mile) => { return mile * 5280 };
const mileToSun = (mile) => { return mile * 53108.4 };
const mileToShaku = (mile) => { return mile * 5310.84 };
const mileToRi = (mile) => { return mile * 0.4097866666666 };

const feetToEquator = (feet) => { return feet * 0.00000000760573899554336}; 
const feetToKilo = (feet) => { return feet * 0.0003048 };
const feetToMeter = (feet) => { return feet * 0.3048 };
const feetToCenti = (feet) => { return feet * 30.48 };
const feetToInch = (feet) => { return feet * 12 };
const feetToMile = (feet) => { return feet * 189.393939 / 1000000 };
const feetToSun = (feet) => { return feet * 10.0584 };
const feetToShaku = (feet) => { return feet * 1.00584 };
const feetToRi = (feet) => { return feet * 7.7611111111 };

const equatorToKilo = (equator) => { return equator * 40075 }; 
const equatorToMeter = (equator) => { return equator * 40075000 }; 
const equatorToCenti = (equator) => { return equator * 4007500000 }; 
const equatorToInch = (equator) => { return equator * 1577756757.5 }; 
const equatorToMile = (equator) => { return equator * 24901.45084 }; 
const equatorToFeet = (equator) => { return equator * 131479663 };
const equatorToSun = (equator) => { return equator * 1322475000 };
const equatorToShaku = (equator) => { return equator * 132247500 };
const equatorToRi = (equator) => { return equator * 10204.2824074074 };

// const lightToKilo = (light) => { return light * 9460730472580.8}; 
// const lightToMeter = (light) => { return light * 9460730472580.8 * 1000 }; 
// const lightToCenti = (light) => { return light * 9460730472580.8 * 1000 * 100 }; 
// const lightToInch = (light) => { return light * 372469703644900000}; 
// const lightToMile = (light) => { return light * 24901.45084 }; 
// const lightToFeet = (light) => { return light * 131479663 };
// const lightToSun = (light) => { return light * 1322475000 };
// const lightToShaku = (light) => { return light * 132247500 };
// const lightToRi = (light) => { return light * 10204.2824074074 };

const sunToEquator = (sun) => { return sun * 0.000000000756157961398136}; 
const sunToKilo = (sun) => { return sun / 33 / 1000 }; 
const sunToMeter = (sun) => { return sun / 33 }; 
const sunToCenti = (sun) => { return sun / 33 * 100 }; 
const sunToInch = (sun) => { return sun * 1.19303 }; 
const sunToMile = (sun) => { return sun * 188.294112 / 10000000 }; 
const sunToFeet = (sun) => { return sun * 0.0994193 }; 
const sunToShaku = (sun) => { return sun * 0.1 }; 
const sunToRi = (sun) => { return sun / 129600 }; 

const shakuToKilo = (shaku) => { return shaku * 10 / 33 / 1000 }; 
const shakuToMeter = (shaku) => { return shaku * 10 / 33 }; 
const shakuToCenti = (shaku) => { return shaku * 10 / 33 * 100 }; 
const shakuToInch = (shaku) => { return shaku * 11.9303 }; 
const shakuToMile = (shaku) => { return shaku * 188.294112 / 1000000 }; 
const shakuToFeet = (shaku) => { return shaku * 0.994193 }; 
const shakuToEquator = (shaku) => { return shaku * 0.00000000756157961398136}; 
const shakuToSun = (shaku) => { return shaku * 10 }; 
const shakuToRi = (shaku) => { return shaku / 12960 }; 

const riToEquator = (ri) => { return ri * 0.0000979980717971985};
const riToKilo = (ri) => { return ri * 3.92727 };
const riToMeter = (ri) => { return ri * 3927.27 };
const riToCenti = (ri) => { return ri * 392727 };
const riToInch = (ri) => { return ri * 154617 };
const riToMile = (ri) => { return ri * 2.44029 };
const riToFeet = (ri) => { return ri * 12884.8 };
const riToSun = (ri) => { return ri * 129600 };
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
    this.handleChangeEquator = this.handleChangeEquator.bind(this);
    this.handleChangeKilo = this.handleChangeKilo.bind(this);
    this.handleChangeMeter = this.handleChangeMeter.bind(this);
    this.handleChangeCenti = this.handleChangeCenti.bind(this);
    this.handleChangeInch = this.handleChangeInch.bind(this);
    this.handleChangeMile = this.handleChangeMile.bind(this);
    this.handleChangeFeet = this.handleChangeFeet.bind(this);
    this.handleChangeSun = this.handleChangeSun.bind(this);
    this.handleChangeShaku = this.handleChangeShaku.bind(this);
    this.handleChangeRi = this.handleChangeRi.bind(this);
    this.clear = this.clear.bind(this);

    this.state = { originalScale:'', length:'' };
  }
  handleChangeEquator(length) {
    this.setState({originalScale:'equator', length:length});
  }
  handleChangeKilo(length) {
    this.setState({originalScale:'kilo', length:length});
  }
  handleChangeMeter(length) {
    this.setState({originalScale:'meter', length:length});
  }
  handleChangeCenti(length) {
    this.setState({originalScale:'centi', length:length});
  }
  handleChangeInch(length) {
    this.setState({originalScale:'inch', length:length});
  }
  handleChangeMile(length) {
    this.setState({originalScale:'mile', length:length});
  }
  handleChangeFeet(length) {
    this.setState({originalScale:'feet', length:length});
  }
  handleChangeSun(length) {
    this.setState({originalScale:'sun', length:length});
  }
  handleChangeShaku(length) {
    this.setState({originalScale:'shaku', length:length});
  }
  handleChangeRi(length) {
    this.setState({originalScale:'ri', length:length});
  }

  clear(){
    console.clear();
    this.setState({ originalScale:'', length:'' });
  }

  render() {
    const scale = this.state.originalScale;
    const length = this.state.length;

    const equator = scale === 'kilo' ? tryConvert(length, kiloToEquator)
                : scale === 'meter' ? tryConvert(length, meterToEquator) 
                : scale === 'centi' ? tryConvert(length, centiToEquator) 
                : scale === 'inch' ? tryConvert(length, inchToEquator) 
                : scale === 'mile' ? tryConvert(length, mileToEquator) 
                : scale === 'feet' ? tryConvert(length, feetToEquator) 
                : scale === 'sun' ? tryConvert(length, sunToEquator) 
                : scale === 'shaku' ? tryConvert(length, shakuToEquator)
                : scale === 'ri' ? tryConvert(length, riToEquator) :length;

    const kilo = scale === 'equator' ? tryConvert(length, equatorToKilo) 
                : scale === 'meter' ? tryConvert(length, meterToKilo) 
                : scale === 'centi' ? tryConvert(length, centiToKilo) 
                : scale === 'inch' ? tryConvert(length, inchToKilo) 
                : scale === 'mile' ? tryConvert(length, mileToKilo) 
                : scale === 'feet' ? tryConvert(length, feetToKilo) 
                : scale === 'sun' ? tryConvert(length, sunToKilo) 
                : scale === 'shaku' ? tryConvert(length, shakuToKilo) 
                : scale === 'ri' ? tryConvert(length, riToKilo) :length;

    const meter = scale === 'equator' ? tryConvert(length, equatorToMeter) 
                : scale === 'kilo' ? tryConvert(length, kiloToMeter) 
                : scale === 'centi' ? tryConvert(length, centiToMeter) 
                : scale === 'inch' ? tryConvert(length, inchToMeter) 
                : scale === 'mile' ? tryConvert(length, mileToMeter) 
                : scale === 'feet' ? tryConvert(length, feetToMeter) 
                : scale === 'sun' ? tryConvert(length, sunToMeter) 
                : scale === 'shaku' ? tryConvert(length, shakuToMeter) 
                : scale === 'ri' ? tryConvert(length, riToMeter) :length;

    const centi = scale === 'equator' ? tryConvert(length, equatorToCenti) 
                : scale === 'kilo' ? tryConvert(length, kiloToCenti)
                : scale === 'meter' ? tryConvert(length, meterToCenti) 
                : scale === 'inch' ? tryConvert(length, inchToCenti) 
                : scale === 'mile' ? tryConvert(length, mileToCenti) 
                : scale === 'feet' ? tryConvert(length, feetToCenti) 
                : scale === 'sun' ? tryConvert(length, sunToCenti) 
                : scale === 'shaku' ? tryConvert(length, shakuToCenti) 
                : scale === 'ri' ? tryConvert(length, riToCenti) :length;

    const inch = scale === 'equator' ? tryConvert(length, equatorToInch) 
                : scale === 'kilo' ? tryConvert(length, kiloToInch)
                :scale === 'meter' ? tryConvert(length, meterToInch)
                : scale === 'centi' ? tryConvert(length, centiToInch) 
                : scale === 'mile' ? tryConvert(length, mileToInch) 
                : scale === 'feet' ? tryConvert(length, feetToInch) 
                : scale === 'sun' ? tryConvert(length, sunToInch) 
                : scale === 'shaku' ? tryConvert(length, shakuToInch) 
                : scale === 'ri' ? tryConvert(length, riToInch) :length;

    const mile = scale === 'equator' ? tryConvert(length, equatorToMile) 
                : scale === 'kilo' ? tryConvert(length, kiloToMile)
                : scale === 'meter' ? tryConvert(length, meterToMile) 
                : scale === 'centi' ? tryConvert(length, centiToMile) 
                : scale === 'inch' ? tryConvert(length, inchToMile) 
                : scale === 'feet' ? tryConvert(length, feetToMile) 
                : scale === 'sun' ? tryConvert(length, sunToMile) 
                : scale === 'shaku' ? tryConvert(length, shakuToMile) 
                : scale === 'ri' ? tryConvert(length, riToMile) :length;

    const feet = scale === 'equator' ? tryConvert(length, equatorToFeet) 
                : scale === 'kilo' ? tryConvert(length, kiloToFeet)
                : scale === 'meter' ? tryConvert(length, meterToFeet) 
                : scale === 'centi' ? tryConvert(length, centiToFeet) 
                : scale === 'inch' ? tryConvert(length, inchToFeet) 
                : scale === 'mile' ? tryConvert(length, mileToFeet) 
                : scale === 'sun' ? tryConvert(length, sunToFeet) 
                : scale === 'shaku' ? tryConvert(length, shakuToFeet) 
                : scale === 'ri' ? tryConvert(length, riToFeet) :length;

    const sun = scale === 'equator' ? tryConvert(length, equatorToSun) 
                : scale === 'kilo' ? tryConvert(length, kiloToSun)
                : scale === 'meter' ? tryConvert(length, meterToSun) 
                : scale === 'centi' ? tryConvert(length, centiToSun) 
                : scale === 'inch' ? tryConvert(length, inchToSun) 
                : scale === 'mile' ? tryConvert(length, mileToSun) 
                : scale === 'feet' ? tryConvert(length, feetToSun) 
                : scale === 'shaku' ? tryConvert(length, shakuToSun) 
                : scale === 'ri' ? tryConvert(length, riToSun) :length;

    const shaku = scale === 'equator' ? tryConvert(length, equatorToShaku) 
                : scale === 'kilo' ? tryConvert(length, kiloToShaku)
                : scale === 'meter' ? tryConvert(length, meterToShaku) 
                : scale === 'centi' ? tryConvert(length, centiToShaku) 
                : scale === 'inch' ? tryConvert(length, inchToShaku) 
                : scale === 'mile' ? tryConvert(length, mileToShaku) 
                : scale === 'feet' ? tryConvert(length, feetToShaku) 
                : scale === 'sun' ? tryConvert(length, sunToShaku) 
                : scale === 'ri' ? tryConvert(length, riToShaku) :length;

    const ri = scale === 'equator' ? tryConvert(length, equatorToRi) 
              : scale === 'kilo' ? tryConvert(length, kiloToRi)
              : scale === 'meter' ? tryConvert(length, meterToRi) 
              : scale === 'centi' ? tryConvert(length, centiToRi) 
              : scale === 'inch' ? tryConvert(length, inchToRi) 
              : scale === 'mile' ? tryConvert(length, mileToRi) 
              : scale === 'feet' ? tryConvert(length, feetToRi) 
              : scale === 'sun' ? tryConvert(length, sunToRi) 
              : scale === 'shaku' ? tryConvert(length, shakuToRi) :length;

    return (
      <div className="uBody row">
      <h4>Length Converter（長さの変換）</h4>
        <div className="col s12 m6">
          <LengthInput
              scale="kilo"
              length={kilo}
              onLengthChange={this.handleChangeKilo} />
          <LengthInput
              scale="meter"
              length={meter}
              onLengthChange={this.handleChangeMeter} />
          <LengthInput
              scale="centi"
              length={centi}
              onLengthChange={this.handleChangeCenti} />
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
              scale="equator"
              length={equator}
              onLengthChange={this.handleChangeEquator} />
        </div>
        <div className="col s12 m6">
            <LengthInput
              scale="sun"
              length={sun}
              onLengthChange={this.handleChangeSun} />
            <LengthInput
              scale="shaku"
              length={shaku}
              onLengthChange={this.handleChangeShaku} />
            <LengthInput
              scale="ri"
              length={ri}
              onLengthChange={this.handleChangeRi} />
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
                scale="feet"
                length={feet}
                onLengthChange={this.handleChangeFeet} />
        </div>
        <button id="btn-leng" className="waves-effect waves-light btn" onClick={this.clear}>CLEAR</button>
      </div>
    );
  }
}

export default LengthCalculator