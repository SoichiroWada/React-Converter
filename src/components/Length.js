import React from 'react';
import LengthInput from './LengthInput';

const valuesInMeters = {
  kilometer:1000,
  meter:1,
  centimeter:0.01,
  inch:0.0254,
  feet:0.3048,
  yard:0.9144,
  mile:1609.344,
  sun:0.0303030303030,
  syaku:0.3030303030303,
  ri:3927.27272727272,
  equator:40075017,
  lightsecond:299792458,
  earthorbit:149597870000,
  lightyear:9460730472580800,
}

const kiloToEarthOrbit = (kilo) => kilo * 0.00000000106338137944496; 
const kiloToLightSec = (kilo) => kilo * 0.00000333564095198152; 
const kiloToLight = (kilo) => kilo * 0.000000000000105700083402; 
const kiloToEquator = (kilo) => kilo * 0.0000249532127261385; 
const kiloToMeter = (kilo) => kilo * 1000 ; 
const kiloToCenti = (kilo) => kilo * 1000 * 100 ; 
const kiloToMile = (kilo) => kilo * 0.6213712 ; 
const kiloToInch = (kilo) => kilo * 39370.1 ; 
const kiloToFeet = (kilo) => kilo * 3280.84 ;
const kiloToYard = (kilo) => kilo * 1093.61 ;
const kiloToSun = (kilo) => kilo * 33000 ;
const kiloToShaku = (kilo) => kilo * 3300 ;
const kiloToRi = (kilo) => kilo * 0.25462962962963 ;

const meterToEarthOrbit = (meter) => meter * 0.00000000000106338137944496; 
const meterToLightSec = (meter) => meter * 0.00000000333564095198152; 
const meterToLight = (meter) => meter * 0.000000000000000105700083; 
const meterToEquator = (meter) => meter * 0.0000000249532127261385; 
const meterToKilo = (meter) => meter / 1000;
const meterToCenti = (meter) => meter * 100; 
const meterToMile = (meter) => meter * 0.0006213712; 
const meterToInch = (meter) => meter * 39.3701; 
const meterToFeet = (meter) => meter * 3.28084;
const meterToYard = (meter) => meter * 1.09361;
const meterToSun = (meter) => meter * 33;
const meterToShaku = (meter) => meter * 3.3;
const meterToRi = (meter) => meter * 0.00025462962962963;

const centiToEarthOrbit = (centi) => centi * 0.00000000000001063381379445; 
const centiToLightSec = (centi) => centi * 0.000000000033356409519815; 
const centiToLight = (centi) => centi * 0.000000000000000001057001; 
const centiToEquator = (centi) => centi * 0.000000000249532127261385; 
const centiToKilo = (centi) => centi / 100000; 
const centiToMeter = (centi) => centi / 100; 
const centiToMile = (centi) => centi * 0.000006213712; 
const centiToInch = (centi) => centi * 0.393701; 
const centiToFeet = (centi) => centi * 0.0328084;
const centiToYard = (centi) => centi * 0.0109361;
const centiToSun = (centi) => centi * 0.33;
const centiToShaku = (centi) => centi * 0.033;
const centiToRi = (centi) => centi * 0.0000025462962962963;

const inchToEarthOrbit = (inch) => inch * 0.000000000000027009887065452; 
const inchToLightSec = (inch) => inch * 0.000000000084725280266750; 
const inchToLight = (inch) => inch * 0.000000000000000002684782; 
const inchToEquator = (inch) => inch * 0.000000000633811260985837; 
const inchToKilo = (inch) => inch * 0.0000254;
const inchToMeter = (inch) => inch * 0.0254;
const inchToCenti = (inch) => inch * 2.54;
const inchToMile = (inch) => inch * 15782.8282828 / 1000000000;
const inchToFeet = (inch) => inch * 83.33333333333333333 / 1000;
const inchToYard = (inch) => inch * 0.0277777777777777777;
const inchToSun = (inch) => inch * 83.8201 / 1000;
const inchToShaku = (inch) => inch * 83.8201 / 1000;
const inchToRi = (inch) => inch * 6.46759214 / 1000000;

const mileToEarthOrbit = (mile) => mile * 0.00000000171134697217116; 
const mileToLightSec = (mile) => mile * 0.00000536819541301657; 
const mileToLight = (mile) => mile * 0.000000000000170107847651; 
const mileToEquator = (mile) => mile * 0.000040158302679845; 
const mileToKilo = (mile) => mile * 1.609344;
const mileToMeter = (mile) => mile * 1609.344;
const mileToCenti = (mile) => mile * 160934.4;
const mileToInch = (mile) => mile * 63360;
const mileToFeet = (mile) => mile * 5280;
const mileToYard = (mile) => mile * 1760;
const mileToSun = (mile) => mile * 53108.4;
const mileToShaku = (mile) => mile * 5310.84;
const mileToRi = (mile) => mile * 0.4097866666666;

const feetToEarthOrbit = (feet) => feet * 0.000000000000324118634083029; 
const feetToLightSec = (feet) => feet * 0.00000000101670332962946; 
const feetToLight = (feet) => feet * 0.000000000000000032217384; 
const feetToEquator = (feet) => feet * 0.00000000760573899554336; 
const feetToKilo = (feet) => feet * 0.0003048;
const feetToMeter = (feet) => feet * 0.3048;
const feetToCenti = (feet) => feet * 30.48;
const feetToInch = (feet) => feet * 12;
const feetToMile = (feet) => feet * 189.393939 / 1000000;
const feetToYard = (feet) => feet * 0.333333333333333333333333;
const feetToSun = (feet) => feet * 10.0584;
const feetToShaku = (feet) => feet * 1.00584;
const feetToRi = (feet) => feet * 7.7611111111;

const yardToEarthOrbit = (yard) => yard * 0.000000000000972358865998815; 
const yardToLightSec = (yard) => yard * 0.00000000305011928565167; 
const yardToLight = (yard) => yard * 0.000000000000000096652448; 
const yardToEquator = (yard) => yard * 0.000000022817286533717200; 
const yardToKilo = (yard) => yard * 0.0009144;
const yardToMeter = (yard) => yard * 0.9144;
const yardToCenti = (yard) => yard * 91.44;
const yardToInch = (yard) => yard * 36;
const yardToMile = (yard) => yard * 0.000568182;
const yardToFeet = (yard) => yard * 3;
const yardToSun = (yard) => yard * 30.1752;
const yardToShaku = (yard) => yard * 3.01752;
const yardToRi = (yard) => yard * 0.000232833;

const equatorToEarthOrbit = (equator) => equator * 0.0000426150087812569; 
const equatorToLightSec = (equator) => equator * 0.133675811150659; 
const equatorToLight = (equator) => equator * 0.000000004235930842353650; 
const equatorToKilo = (equator) => equator * 40075; 
const equatorToMeter = (equator) => equator * 40075000; 
const equatorToCenti = (equator) => equator * 4007500000; 
const equatorToInch = (equator) => equator * 1577755903.9025; 
const equatorToMile = (equator) => equator * 24901.442825; 
const equatorToFeet = (equator) => equator * 131479663;
const equatorToYard = (equator) => equator * 43826421;
const equatorToSun = (equator) => equator * 1322475000;
const equatorToShaku = (equator) => equator * 132247500;
const equatorToRi = (equator) => equator * 10204.282;

const lightToEarthOrbit = (light) => light * 10060.36462049; 
const lightToLightSec = (light) => light * 31557600; 
const lightToKilo = (light) => light * 9460730472580.8; 
const lightToMeter = (light) => light * 9460730472580.8 * 1000; 
const lightToCenti = (light) => light * 9460730472580.8 * 1000 * 100; 
const lightToInch = (light) => light * 372469703264994000; 
const lightToMile = (light) => light * 5878623554478; 
const lightToFeet = (light) => light * 31039142963662000;
const lightToYard = (light) => light * 10346349452119100;
const lightToEquator = (light) => light * 236075620.0269690; 
const lightToSun = (light) => light * 312204105595166000;
const lightToShaku = (light) => light * 31220410559516600;
const lightToRi = (light) => light * 2408982110548.37;

const lightSecToEarthOrbit = (lightSec) => lightSec * 0.00031879371753347; 
const lightSecToLight = (lightSec) => lightSec * 0.000000032; 
const lightSecToKilo = (lightSec) => lightSec * 299792.458; 
const lightSecToMeter = (lightSec) => lightSec * 299792458; 
const lightSecToCenti = (lightSec) => lightSec * 29979245800; 
const lightSecToInch = (lightSec) => lightSec * 11802852665.1264; 
const lightSecToMile = (lightSec) => lightSec * 186282.339419918; 
const lightSecToFeet = (lightSec) => lightSec * 983571087.90472;
const lightSecToYard = (lightSec) => lightSec * 327856029.99338;
const lightSecToEquator = (lightSec) => lightSec * 7.480784978; 
const lightSecToSun = (lightSec) => lightSec * 9893151114;
const lightSecToShaku = (lightSec) => lightSec * 989315111.4;
const lightSecToRi = (lightSec) => lightSec * 76336.036661481;

const earthOrbitToKilo = (earthOrbit) => earthOrbit * 940396380.198; 
const earthOrbitToMeter = (earthOrbit) => earthOrbit * 940396380198; 
const earthOrbitToCenti = (earthOrbit) => earthOrbit * 94039638019800; 
const earthOrbitToInch = (earthOrbit) => earthOrbit * 37023479497590.4; 
const earthOrbitToMile = (earthOrbit) => earthOrbit * 584335039.16; 
const earthOrbitToFeet = (earthOrbit) => earthOrbit * 3085290060008.81;
const earthOrbitToYard = (earthOrbit) => earthOrbit * 1028426885348.33;
const earthOrbitToEquator = (earthOrbit) => earthOrbit * 23465.910921971; 
const earthOrbitToLight = (earthOrbit) => earthOrbit * 0.0000994; 
const earthOrbitToLightSec = (earthOrbit) => earthOrbit * 3136.824676901; 
const earthOrbitToSun = (earthOrbit) => earthOrbit * 31033080546534;
const earthOrbitToShaku = (earthOrbit) => earthOrbit * 3103308054653.4;
const earthOrbitToRi = (earthOrbit) => earthOrbit * 239452763.535228;

const sunToEarthOrbit = (sun) => sun * 0.000000000000032223678164999; 
const sunToLightSec = (sun) => sun * 0.000000000101080028847925; 
const sunToLight = (sun) => sun * 0.000000000000000003203033; 
const sunToEquator = (sun) => sun * 0.000000000756157961398136; 
const sunToKilo = (sun) => sun / 33 / 1000; 
const sunToMeter = (sun) => sun / 33; 
const sunToCenti = (sun) => sun / 33 * 100; 
const sunToInch = (sun) => sun * 1.19303; 
const sunToMile = (sun) => sun * 188.294112 / 10000000; 
const sunToFeet = (sun) => sun * 0.0994193; 
const sunToYard = (sun) => sun * 0.0331398; 
const sunToShaku = (sun) => sun * 0.1; 
const sunToRi = (sun) => sun / 129600; 

const shakuToEarthOrbit = (shaku) => shaku * 0.000000000000322236781649989; 
const shakuToLightSec = (shaku) => shaku * 0.00000000101080028847925; 
const shakuToLight = (shaku) => shaku * 0.000000000000000032030328; 
const shakuToKilo = (shaku) => shaku * 10 / 33 / 1000; 
const shakuToMeter = (shaku) => shaku * 10 / 33; 
const shakuToCenti = (shaku) => shaku * 10 / 33 * 100; 
const shakuToInch = (shaku) => shaku * 11.9303; 
const shakuToMile = (shaku) => shaku * 188.294112 / 1000000; 
const shakuToFeet = (shaku) => shaku * 0.994193; 
const shakuToYard = (shaku) => shaku * 0.331398; 
const shakuToEquator = (shaku) => shaku * 0.00000000756157961398136; 
const shakuToSun = (shaku) => shaku * 10; 
const shakuToRi = (shaku) => shaku / 12960; 

const riToEarthOrbit = (ri) => ri * 0.00000000417618901213007;
const riToLightSec = (ri) => ri * 0.0000130999727485799;
const riToLight = (ri) => ri * 0.000000000000415113086818;
const riToKilo = (ri) => ri * 3.92727272727;
const riToMeter = (ri) => ri * 3927.272727;
const riToCenti = (ri) => ri * 392727.272727;
const riToInch = (ri) => ri * 154617.036;
const riToMile = (ri) => ri * 2.4402933818;
const riToFeet = (ri) => ri * 12884.7534545;
const riToYard = (ri) => ri * 4294.90472727;
const riToEquator = (ri) => ri * 0.0000979980717971985;
const riToSun = (ri) => ri * 129600;
const riToShaku = (ri) => ri * 12960;

function tryConvert(length, converter) {
  const input = parseFloat(length);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = converter(input);
  const rounded = Math.round(output * 1000000000000) / 1000000000000;
  return rounded.toString();
}

class LengthCalculator extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.clear = this.clear.bind(this);
    this.alertMessage = this.alertMessage.bind(this);

    this.state = { 
      originalScale:'',
      length:'',
      alertMessage:'OFF'
    };
  }

  handleChange(length, scale) {
    this.setState({originalScale: scale, length: length});
  }

  clear(){
    console.clear();
    this.setState({ originalScale:'', length:'' });
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
    const length = this.state.length;
    const aStyle = this.state.alertMessage === "OFF" ? {display: "none"} : {display:"inline"};
    const bStyle = this.state.alertMessage === "OFF" ? {display: "inline"} : {display:"none"};

    // const earthOrbit = tryConvert(length, originalScale, "earthOrbit")

    const earthOrbit = originalScale === 'kilo' ? tryConvert(length, kiloToEarthOrbit)
                : originalScale === 'meter' ? tryConvert(length, meterToEarthOrbit) 
                : originalScale === 'centi' ? tryConvert(length, centiToEarthOrbit) 
                : originalScale === 'inch' ? tryConvert(length, inchToEarthOrbit) 
                : originalScale === 'mile' ? tryConvert(length, mileToEarthOrbit) 
                : originalScale === 'feet' ? tryConvert(length, feetToEarthOrbit) 
                : originalScale === 'yard' ? tryConvert(length, yardToEarthOrbit) 
                : originalScale === 'equator' ? tryConvert(length, equatorToEarthOrbit) 
                : originalScale === 'light' ? tryConvert(length, lightToEarthOrbit) 
                : originalScale === 'lightSec' ? tryConvert(length, lightSecToEarthOrbit) 
                : originalScale === 'sun' ? tryConvert(length, sunToEarthOrbit) 
                : originalScale === 'shaku' ? tryConvert(length, shakuToEarthOrbit)
                : originalScale === 'ri' ? tryConvert(length, riToEarthOrbit) :length;

    const lightSec = originalScale === 'kilo' ? tryConvert(length, kiloToLightSec)
                : originalScale === 'meter' ? tryConvert(length, meterToLightSec) 
                : originalScale === 'centi' ? tryConvert(length, centiToLightSec) 
                : originalScale === 'inch' ? tryConvert(length, inchToLightSec) 
                : originalScale === 'mile' ? tryConvert(length, mileToLightSec) 
                : originalScale === 'feet' ? tryConvert(length, feetToLightSec) 
                : originalScale === 'yard' ? tryConvert(length, yardToLightSec) 
                : originalScale === 'equator' ? tryConvert(length, equatorToLightSec) 
                : originalScale === 'light' ? tryConvert(length, lightToLightSec) 
                : originalScale === 'earthOrbit' ? tryConvert(length, earthOrbitToLightSec) 
                : originalScale === 'sun' ? tryConvert(length, sunToLightSec) 
                : originalScale === 'shaku' ? tryConvert(length, shakuToLightSec)
                : originalScale === 'ri' ? tryConvert(length, riToLightSec) :length;

    const light = originalScale === 'kilo' ? tryConvert(length, kiloToLight)
                : originalScale === 'meter' ? tryConvert(length, meterToLight) 
                : originalScale === 'centi' ? tryConvert(length, centiToLight) 
                : originalScale === 'inch' ? tryConvert(length, inchToLight) 
                : originalScale === 'mile' ? tryConvert(length, mileToLight) 
                : originalScale === 'feet' ? tryConvert(length, feetToLight) 
                : originalScale === 'yard' ? tryConvert(length, yardToLight) 
                : originalScale === 'equator' ? tryConvert(length, equatorToLight) 
                : originalScale === 'lightSec' ? tryConvert(length, lightSecToLight) 
                : originalScale === 'earthOrbit' ? tryConvert(length, earthOrbitToLight) 
                : originalScale === 'sun' ? tryConvert(length, sunToLight) 
                : originalScale === 'shaku' ? tryConvert(length, shakuToLight)
                : originalScale === 'ri' ? tryConvert(length, riToLight) :length;

    const equator = originalScale === 'light' ? tryConvert(length, lightToEquator)
                : originalScale === 'earthOrbit' ? tryConvert(length, earthOrbitToEquator)
                : originalScale === 'kilo' ? tryConvert(length, kiloToEquator)
                : originalScale === 'meter' ? tryConvert(length, meterToEquator) 
                : originalScale === 'centi' ? tryConvert(length, centiToEquator) 
                : originalScale === 'inch' ? tryConvert(length, inchToEquator) 
                : originalScale === 'mile' ? tryConvert(length, mileToEquator) 
                : originalScale === 'feet' ? tryConvert(length, feetToEquator) 
                : originalScale === 'yard' ? tryConvert(length, yardToEquator) 
                : originalScale === 'lightSec' ? tryConvert(length, lightSecToEquator) 
                : originalScale === 'sun' ? tryConvert(length, sunToEquator) 
                : originalScale === 'shaku' ? tryConvert(length, shakuToEquator)
                : originalScale === 'ri' ? tryConvert(length, riToEquator) :length;

    const kilo = originalScale === 'light' ? tryConvert(length, lightToKilo)
                : originalScale === 'equator' ? tryConvert(length, equatorToKilo) 
                : originalScale === 'meter' ? tryConvert(length, meterToKilo) 
                : originalScale === 'centi' ? tryConvert(length, centiToKilo) 
                : originalScale === 'inch' ? tryConvert(length, inchToKilo) 
                : originalScale === 'mile' ? tryConvert(length, mileToKilo) 
                : originalScale === 'feet' ? tryConvert(length, feetToKilo) 
                : originalScale === 'yard' ? tryConvert(length, yardToKilo) 
                : originalScale === 'lightSec' ? tryConvert(length, lightSecToKilo) 
                : originalScale === 'earthOrbit' ? tryConvert(length, earthOrbitToKilo)
                : originalScale === 'sun' ? tryConvert(length, sunToKilo) 
                : originalScale === 'shaku' ? tryConvert(length, shakuToKilo) 
                : originalScale === 'ri' ? tryConvert(length, riToKilo) :length;

    const meter = originalScale === 'light' ? tryConvert(length, lightToMeter)
                : originalScale === 'equator' ? tryConvert(length, equatorToMeter) 
                : originalScale === 'kilo' ? tryConvert(length, kiloToMeter) 
                : originalScale === 'centi' ? tryConvert(length, centiToMeter) 
                : originalScale === 'inch' ? tryConvert(length, inchToMeter) 
                : originalScale === 'mile' ? tryConvert(length, mileToMeter) 
                : originalScale === 'feet' ? tryConvert(length, feetToMeter) 
                : originalScale === 'yard' ? tryConvert(length, yardToMeter) 
                : originalScale === 'earthOrbit' ? tryConvert(length, earthOrbitToMeter) 
                : originalScale === 'lightSec' ? tryConvert(length, lightSecToMeter) 
                : originalScale === 'sun' ? tryConvert(length, sunToMeter) 
                : originalScale === 'shaku' ? tryConvert(length, shakuToMeter) 
                : originalScale === 'ri' ? tryConvert(length, riToMeter) :length;

    const centi = originalScale === 'light' ? tryConvert(length, lightToCenti)
                : originalScale === 'equator' ? tryConvert(length, equatorToCenti) 
                : originalScale === 'kilo' ? tryConvert(length, kiloToCenti)
                : originalScale === 'meter' ? tryConvert(length, meterToCenti) 
                : originalScale === 'inch' ? tryConvert(length, inchToCenti) 
                : originalScale === 'mile' ? tryConvert(length, mileToCenti) 
                : originalScale === 'feet' ? tryConvert(length, feetToCenti) 
                : originalScale === 'yard' ? tryConvert(length, yardToCenti) 
                : originalScale === 'earthOrbit' ? tryConvert(length, earthOrbitToCenti) 
                : originalScale === 'lightSec' ? tryConvert(length, lightSecToCenti) 
                : originalScale === 'sun' ? tryConvert(length, sunToCenti) 
                : originalScale === 'shaku' ? tryConvert(length, shakuToCenti) 
                : originalScale === 'ri' ? tryConvert(length, riToCenti) :length;

    const inch = originalScale === 'light' ? tryConvert(length, lightToInch)
                : originalScale === 'equator' ? tryConvert(length, equatorToInch) 
                : originalScale === 'kilo' ? tryConvert(length, kiloToInch)
                : originalScale === 'meter' ? tryConvert(length, meterToInch)
                : originalScale === 'centi' ? tryConvert(length, centiToInch) 
                : originalScale === 'mile' ? tryConvert(length, mileToInch) 
                : originalScale === 'feet' ? tryConvert(length, feetToInch) 
                : originalScale === 'yard' ? tryConvert(length, yardToInch) 
                : originalScale === 'earthOrbit' ? tryConvert(length, earthOrbitToInch) 
                : originalScale === 'lightSec' ? tryConvert(length, lightSecToInch) 
                : originalScale === 'sun' ? tryConvert(length, sunToInch) 
                : originalScale === 'shaku' ? tryConvert(length, shakuToInch) 
                : originalScale === 'ri' ? tryConvert(length, riToInch) :length;

    const mile = originalScale === 'light' ? tryConvert(length, lightToMile)
                : originalScale === 'equator' ? tryConvert(length, equatorToMile) 
                : originalScale === 'kilo' ? tryConvert(length, kiloToMile)
                : originalScale === 'meter' ? tryConvert(length, meterToMile) 
                : originalScale === 'centi' ? tryConvert(length, centiToMile) 
                : originalScale === 'inch' ? tryConvert(length, inchToMile) 
                : originalScale === 'feet' ? tryConvert(length, feetToMile) 
                : originalScale === 'yard' ? tryConvert(length, yardToMile) 
                : originalScale === 'earthOrbit' ? tryConvert(length, earthOrbitToMile) 
                : originalScale === 'lightSec' ? tryConvert(length, lightSecToMile) 
                : originalScale === 'sun' ? tryConvert(length, sunToMile) 
                : originalScale === 'shaku' ? tryConvert(length, shakuToMile) 
                : originalScale === 'ri' ? tryConvert(length, riToMile) :length;

    const feet = originalScale === 'light' ? tryConvert(length, lightToFeet)
                : originalScale === 'equator' ? tryConvert(length, equatorToFeet) 
                : originalScale === 'kilo' ? tryConvert(length, kiloToFeet)
                : originalScale === 'meter' ? tryConvert(length, meterToFeet) 
                : originalScale === 'centi' ? tryConvert(length, centiToFeet) 
                : originalScale === 'inch' ? tryConvert(length, inchToFeet) 
                : originalScale === 'mile' ? tryConvert(length, mileToFeet) 
                : originalScale === 'yard' ? tryConvert(length, yardToFeet) 
                : originalScale === 'earthOrbit' ? tryConvert(length, earthOrbitToFeet) 
                : originalScale === 'lightSec' ? tryConvert(length, lightSecToFeet) 
                : originalScale === 'sun' ? tryConvert(length, sunToFeet) 
                : originalScale === 'shaku' ? tryConvert(length, shakuToFeet) 
                : originalScale === 'ri' ? tryConvert(length, riToFeet) :length;
    
    const yard = originalScale === 'light' ? tryConvert(length, lightToYard)
                : originalScale === 'equator' ? tryConvert(length, equatorToYard) 
                : originalScale === 'kilo' ? tryConvert(length, kiloToYard)
                : originalScale === 'meter' ? tryConvert(length, meterToYard) 
                : originalScale === 'centi' ? tryConvert(length, centiToYard) 
                : originalScale === 'inch' ? tryConvert(length, inchToYard) 
                : originalScale === 'mile' ? tryConvert(length, mileToYard) 
                : originalScale === 'feet' ? tryConvert(length, feetToYard) 
                : originalScale === 'earthOrbit' ? tryConvert(length, earthOrbitToYard) 
                : originalScale === 'lightSec' ? tryConvert(length, lightSecToYard) 
                : originalScale === 'sun' ? tryConvert(length, sunToYard) 
                : originalScale === 'shaku' ? tryConvert(length, shakuToYard) 
                : originalScale === 'ri' ? tryConvert(length, riToYard) :length;

    const sun = originalScale === 'light' ? tryConvert(length, lightToSun)
                : originalScale === 'equator' ? tryConvert(length, equatorToSun) 
                : originalScale === 'kilo' ? tryConvert(length, kiloToSun)
                : originalScale === 'meter' ? tryConvert(length, meterToSun) 
                : originalScale === 'centi' ? tryConvert(length, centiToSun) 
                : originalScale === 'inch' ? tryConvert(length, inchToSun) 
                : originalScale === 'mile' ? tryConvert(length, mileToSun) 
                : originalScale === 'feet' ? tryConvert(length, feetToSun) 
                : originalScale === 'yard' ? tryConvert(length, yardToSun) 
                : originalScale === 'earthOrbit' ? tryConvert(length, earthOrbitToSun) 
                : originalScale === 'lightSec' ? tryConvert(length, lightSecToSun) 
                : originalScale === 'shaku' ? tryConvert(length, shakuToSun) 
                : originalScale === 'ri' ? tryConvert(length, riToSun) :length;

    const shaku = originalScale === 'light' ? tryConvert(length, lightToShaku)
                : originalScale === 'equator' ? tryConvert(length, equatorToShaku) 
                : originalScale === 'kilo' ? tryConvert(length, kiloToShaku)
                : originalScale === 'meter' ? tryConvert(length, meterToShaku) 
                : originalScale === 'centi' ? tryConvert(length, centiToShaku) 
                : originalScale === 'inch' ? tryConvert(length, inchToShaku) 
                : originalScale === 'mile' ? tryConvert(length, mileToShaku) 
                : originalScale === 'feet' ? tryConvert(length, feetToShaku) 
                : originalScale === 'yard' ? tryConvert(length, yardToShaku) 
                : originalScale === 'earthOrbit' ? tryConvert(length, earthOrbitToShaku) 
                : originalScale === 'lightSec' ? tryConvert(length, lightSecToShaku) 
                : originalScale === 'sun' ? tryConvert(length, sunToShaku) 
                : originalScale === 'ri' ? tryConvert(length, riToShaku) :length;

      const ri = originalScale === 'light' ? tryConvert(length, lightToRi)
                : originalScale === 'equator' ? tryConvert(length, equatorToRi) 
                : originalScale === 'kilo' ? tryConvert(length, kiloToRi)
                : originalScale === 'meter' ? tryConvert(length, meterToRi) 
                : originalScale === 'centi' ? tryConvert(length, centiToRi) 
                : originalScale === 'inch' ? tryConvert(length, inchToRi) 
                : originalScale === 'mile' ? tryConvert(length, mileToRi) 
                : originalScale === 'feet' ? tryConvert(length, feetToRi) 
                : originalScale === 'yard' ? tryConvert(length, yardToRi) 
                : originalScale === 'earthOrbit' ? tryConvert(length, earthOrbitToRi) 
                : originalScale === 'lightSec' ? tryConvert(length, lightSecToRi) 
                : originalScale === 'sun' ? tryConvert(length, sunToRi) 
                : originalScale === 'shaku' ? tryConvert(length, shakuToRi) :length;

    return (
      <div>
      <h5 id="h5">Length Converter<span id="h5j">（長さの変換）</span><br id="break"></br>
      <span id="ctl" style={bStyle}>Delete key on keyboard to clear</span>
      <span id="alertM" style={aStyle}>カナ漢字変換をOFFにしてください</span>
      </h5>
      <div className="uBody row">
        <div className="col s12 m6">

          <LengthInput
              scale="kilo"
              length={kilo}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
          <LengthInput
              scale="meter"
              length={meter}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
          <LengthInput
              scale="centi"
              length={centi}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
          <LengthInput
              scale="inch"
              length={inch}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
          <LengthInput
              scale="feet"
              length={feet}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
          <LengthInput
              scale="yard"
              length={yard}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
          <LengthInput
              scale="mile"
              length={mile}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
        </div>
        <div className="col s12 m6">
            <LengthInput
              scale="sun"
              length={sun}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <LengthInput
              scale="shaku"
              length={shaku}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <LengthInput
              scale="ri"
              length={ri}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <LengthInput
              scale="equator"
              length={equator}
              onClear={this.clear}
              onAlert={this.alertMessage}
              onLengthChange={this.handleChange} />
            <LengthInput
                scale="lightSec"
                length={lightSec}
                onClear={this.clear}
                onAlert={this.alertMessage}
                onLengthChange={this.handleChange} />
            <LengthInput
                scale="light"
                length={light}
                onClear={this.clear}
                onAlert={this.alertMessage}
                onLengthChange={this.handleChange} />
            <LengthInput
                scale="earthOrbit"
                length={earthOrbit}
                onClear={this.clear}
                onAlert={this.alertMessage}
                onLengthChange={this.handleChange} />

        </div>
        <button id="btn-leng" className="waves-effect waves-light btn" onClick={this.clear}>CLEAR</button>
      </div>
      </div>
    );
  }
}

export default LengthCalculator