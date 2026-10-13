import Decimal from 'decimal.js';
import {
  CalculationDecimal, INTERNAL_PRECISION, convert, createConversionSession,
  parseInput, formatResult, displayValue,
} from './convert';
import { units, referenceUnits } from './units';

// Independent audit fixtures, not generated from the production registry.
// A rational fixture [n, d] checks that d source units equal n reference units.
const expectedFactors = {
  length: {
    kilo: '1000', meter: '1', centi: '0.01', milli: '0.001',
    inch: '0.0254', feet: '0.3048', yard: '0.9144', mile: '1609.344',
    sun: ['1', '33'], shaku: ['10', '33'], ken: ['20', '11'],
    cho: ['1200', '11'], ri: ['43200', '11'], kairi: '1852',
    fuji: '3776', everest: '8848.86', tokyoLondon: '9553000', equator: '40075017',
    lightSec: '299792458', earthOrbit: '149597870700', lightYear: '9460730472580800',
  },
  mass: {
    milligram: '0.000001', gram: '0.001', kilogram: '1', ton: '1000',
    avoirdupoisGrain: '0.00006479891', avoirdupoisDram: '0.0017718451953125',
    avoirdupoisOunce: '0.028349523125', avoirdupoisPound: '0.45359237',
    avoirdupoisStone: '6.35029318', avoirdupoisUShundredweight: '45.359237',
    avoirdupoisLonghundredweight: '50.80234544', avoirdupoisShortTon: '907.18474',
    avoirdupoisLongTon: '1016.0469088', troyGrain: '0.00006479891',
    troyPennyweight: '0.00155517384', troyOunce: '0.0311034768', troyPound: '0.3732417216',
    monme: '0.00375', ryo: '0.0375', kin: '0.6', kan: '3.75',
    sumoWrestler: '160', africanElephant: '6000', blueWhale: '190000',
  },
  area: {
    squareKiloMeter: '1000000', squareMeter: '1', squareCentiMeter: '0.0001',
    squareMilliMeter: '0.000001', are: '100', hectare: '10000',
    squareInch: '0.00064516', squareFeet: '0.09290304', squareYard: '0.83612736',
    squarePerch: '25.29285264', squareMile: '2589988.110336', acre: '4046.8564224',
    cho: ['1200000', '121'], tan: ['120000', '121'], se: ['12000', '121'],
    tsubo: ['400', '121'], gou: ['40', '121'], shaku: ['4', '121'],
    Canada: '9985000000000', Japan: '378000000000', Australia: '7692024000000',
    USA: '9834000000000', China: '9597000000000', LandOnEarth: '147244000000000',
  },
  time: {
    milli: '0.001', second: '1', minute: '60', hour: '3600', day: '86400', week: '604800',
    month28: '2419200', month29: '2505600', month30: '2592000', month31: '2678400',
    year: '31536000', fourYears: '126144000', decade: '315360000', century: '3153600000',
  },
};

const Oracle = Decimal.clone({ precision: 100, rounding: Decimal.ROUND_HALF_EVEN });
function fraction(factor) {
  return Array.isArray(factor) ? factor : [factor, '1'];
}

Object.keys(expectedFactors).forEach(category => {
  describe(`${category}: every supported unit`, () => {
    test('fixtures cover the complete supported inventory', () => {
      expect(Object.keys(units[category]).sort()).toEqual(Object.keys(expectedFactors[category]).sort());
    });
    Object.keys(expectedFactors[category]).forEach(unit => {
      const [numerator, denominator] = fraction(expectedFactors[category][unit]);
      test(`${unit}: exact reference value and reverse`, () => {
        expect(convert(denominator, category, unit, referenceUnits[category]).toString()).toBe(numerator);
        expect(convert(numerator, category, referenceUnits[category], unit).toString()).toBe(denominator);
      });
    });
    test('every unit pair agrees with a 100-digit oracle, including tiny/huge/negative decimals', () => {
      const names = Object.keys(expectedFactors[category]);
      names.forEach(from => names.forEach(to => {
        const [sn, sd] = fraction(expectedFactors[category][from]);
        const [tn, td] = fraction(expectedFactors[category][to]);
        ['0', '0.123000045', '-9876.54321', '1e1000', '1e-1000', '9007199254740993'].forEach(input => {
          const expected = new Oracle(input).times(sn).times(td).dividedBy(new Oracle(sd).times(tn))
            .toSignificantDigits(INTERNAL_PRECISION);
          const actual = convert(input, category, from, to);
          expect(actual.toString()).toBe(expected.toString());
          const back = convert(actual.toString(), category, to, from);
          const difference = new Oracle(back).minus(input).abs();
          const tolerance = new Oracle(input).abs().times('1e-28');
          expect(difference.lte(tolerance)).toBe(true);
        });
      }));
    });
  });
});

describe('exact definitions and variants', () => {
  [
    ['length', 'feet', 'inch', '12'], ['length', 'yard', 'feet', '3'],
    ['length', 'mile', 'feet', '5280'], ['length', 'ken', 'shaku', '6'],
    ['length', 'shaku', 'sun', '10'], ['length', 'cho', 'ken', '60'],
    ['length', 'ri', 'cho', '36'], ['area', 'squareFeet', 'squareInch', '144'],
    ['area', 'squareYard', 'squareFeet', '9'], ['area', 'acre', 'squareFeet', '43560'],
    ['area', 'squareMile', 'acre', '640'], ['area', 'squarePerch', 'squareFeet', '272.25'],
    ['area', 'cho', 'tan', '10'], ['area', 'tan', 'se', '10'],
    ['area', 'se', 'tsubo', '30'], ['area', 'tsubo', 'gou', '10'], ['area', 'gou', 'shaku', '10'],
    ['mass', 'avoirdupoisPound', 'avoirdupoisOunce', '16'],
    ['mass', 'avoirdupoisPound', 'avoirdupoisGrain', '7000'],
    ['mass', 'avoirdupoisOunce', 'avoirdupoisDram', '16'],
    ['mass', 'avoirdupoisStone', 'avoirdupoisPound', '14'],
    ['mass', 'avoirdupoisUShundredweight', 'avoirdupoisPound', '100'],
    ['mass', 'avoirdupoisLonghundredweight', 'avoirdupoisPound', '112'],
    ['mass', 'avoirdupoisShortTon', 'avoirdupoisPound', '2000'],
    ['mass', 'avoirdupoisLongTon', 'avoirdupoisPound', '2240'],
    ['mass', 'troyPound', 'troyOunce', '12'], ['mass', 'troyOunce', 'troyPennyweight', '20'],
    ['mass', 'troyPennyweight', 'troyGrain', '24'], ['mass', 'troyGrain', 'avoirdupoisGrain', '1'],
    ['mass', 'kan', 'monme', '1000'], ['mass', 'kin', 'monme', '160'], ['mass', 'ryo', 'monme', '10'],
    ['time', 'year', 'day', '365'], ['time', 'fourYears', 'day', '1460'],
    ['time', 'decade', 'day', '3650'], ['time', 'century', 'day', '36500'],
    ['time', 'month28', 'day', '28'], ['time', 'month29', 'day', '29'],
    ['time', 'month30', 'day', '30'], ['time', 'month31', 'day', '31'],
    ['length', 'lightYear', 'lightSec', '31557600'],
  ].forEach(([category, from, to, expected]) => {
    test(`1 ${from} = ${expected} ${to}`, () => {
      expect(convert('1', category, from, to).toString()).toBe(expected);
    });
  });
  test('astronomical light-year uses 365.25 days, duration year uses 365 days', () => {
    expect(convert('1', 'length', 'lightYear', 'lightSec').toString()).toBe('31557600');
    expect(convert('1', 'time', 'year', 'second').toString()).toBe('31536000');
  });
  test('international definitions are distinct from historical survey units', () => {
    const surveyFoot = new Oracle('1200').div('3937');
    expect(convert('1', 'length', 'feet', 'meter').eq(surveyFoot)).toBe(false);
    const surveyAcre = surveyFoot.pow(2).times('43560');
    expect(convert('1', 'area', 'acre', 'squareMeter').eq(surveyAcre)).toBe(false);
    expect(units.area.acre.note).toContain('not U.S. survey');
    expect(units.length.shaku.note).toContain('not kujirajaku');
    expect(units.mass.kin.note).toContain('not Chinese');
    expect(units.mass.ryo.note).toContain('historical');
  });
  test('all comparison quantities explicitly carry approximate metadata', () => {
    const approximate = { length: ['fuji', 'everest', 'tokyoLondon', 'equator'],
      mass: ['sumoWrestler', 'africanElephant', 'blueWhale'],
      area: ['Canada', 'Japan', 'Australia', 'USA', 'China', 'LandOnEarth'] };
    Object.keys(approximate).forEach(category => approximate[category].forEach(unit => {
      expect(units[category][unit].exact).toBe(false);
      expect(units[category][unit].note).toContain('概算');
    }));
  });
});

describe('temperature offsets', () => {
  test('all four temperature unit pairs agree with the high-precision oracle', () => {
    const TemperatureOracle = Oracle.clone({ precision: 1200 });
    ['c', 'f'].forEach(from => ['c', 'f'].forEach(to => {
      ['0', '-40', '0.123000045', '1e1000', '-1e1000', '1e-1000', '9007199254740993',
        '32.000000000000000000000000000001'].forEach(input => {
        let expected = new TemperatureOracle(input);
        if (from !== to) expected = from === 'c'
          ? expected.times('9').plus('160').div('5') : expected.minus('32').times('5').div('9');
        expect(convert(input, 'temperature', from, to).toString()).toBe(expected.toSignificantDigits(30).toString());
      });
    }));
  });
  test('integer offsets still break rounding ties for enormous temperatures', () => {
    const TemperatureOracle = Oracle.clone({ precision: 1200 });
    const input = '1.000000000000000000000000000025e1000';
    const expected = new TemperatureOracle(input).times('9').plus('160').div('5').toSignificantDigits(30);
    expect(expected.toString()).toBe('1.80000000000000000000000000005e+1000');
    expect(convert(input, 'temperature', 'c', 'f').toString()).toBe(expected.toString());
  });
  test('preserve small differences near the Fahrenheit offset before rounding', () => {
    const input = '32.000000000000000000000000000001';
    expect(convert(input, 'temperature', 'f', 'c').toString()).toBe('5.55555555555555555555555555556e-31');
  });
  [['0', '32'], ['100', '212'], ['-40', '-40'], ['-273.15', '-459.67'],
    ['37.5', '99.5'], ['-0.25', '31.55']].forEach(([celsius, fahrenheit]) => {
    test(`${celsius} Celsius = ${fahrenheit} Fahrenheit, both directions`, () => {
      expect(convert(celsius, 'temperature', 'c', 'f').toString()).toBe(fahrenheit);
      expect(convert(fahrenheit, 'temperature', 'f', 'c').toString()).toBe(celsius);
    });
  });
  test('very large temperatures and repeating reverse conversions', () => {
    ['1e1000', '-1e1000', '0.123456789', '-12345.6789'].forEach(input => {
      const result = convert(input, 'temperature', 'c', 'f');
      const back = convert(result.toString(), 'temperature', 'f', 'c');
      expect(new Oracle(back).minus(input).abs().lte(new Oracle(input).abs().times('1e-28'))).toBe(true);
    });
    expect(convert('1', 'temperature', 'f', 'c').toString()).toBe('-17.2222222222222222222222222222');
    expect(convert('1e-1000', 'temperature', 'c', 'c').toString()).toBe('1e-1000');
    // The tiny Celsius contribution is below 30-digit resolution around 32 F.
    expect(convert('1e-1000', 'temperature', 'c', 'f').toString()).toBe('32');
  });
});

describe('validation and previous rounding failures', () => {
  ['', ' ', '12abc', '1.2.3', '0x10', '1,000', 'Infinity', '-Infinity', 'NaN',
    '+', '-', '.', '1e', '1e+', '1e10001', '1e-10001', '0e999999', '1e-9999999999999999',
    '1'.repeat(1001), null, undefined, 0].forEach(input => {
    test(`reject ${String(input).slice(0, 40)}`, () => {
      expect(parseInput(input)).toBe(null);
      expect(convert(input, 'length', 'meter', 'meter')).toBe(null);
      expect(convert(input, 'temperature', 'c', 'f')).toBe(null);
    });
  });
  ['+.5', '-.5', '1.', '  1.25  ', '1E-20', '-0', '0e10000', '1e10000', '1e-10000'].forEach(input => {
    test(`accept decimal input ${input}`, () => { expect(parseInput(input)).not.toBe(null); });
  });
  test('unknown categories or unit IDs never produce NaN or throw', () => {
    [['bogus', 'meter', 'meter'], ['length', 'bogus', 'meter'], ['length', 'meter', 'bogus'],
      ['length', 'toString', 'meter'], ['__proto__', 'meter', 'meter'], ['temperature', 'kelvin', 'f']]
      .forEach(args => expect(convert('1', ...args)).toBe(null));
  });
  test('legitimate zeros/nines and integers above Number precision survive', () => {
    expect(convert('1.23000045', 'length', 'meter', 'centi').toString()).toBe('123.000045');
    expect(convert('0.999999999123', 'length', 'meter', 'centi').toString()).toBe('99.9999999123');
    expect(convert('9007199254740993', 'length', 'meter', 'centi').toString()).toBe('900719925474099300');
    expect(convert('1e-20', 'mass', 'kilogram', 'gram').toString()).toBe('1e-17');
    expect(convert('1e308', 'mass', 'kilogram', 'gram').toString()).toBe('1e+311');
  });
  test('long input receives one final rounding rather than a rounded input/ratio', () => {
    const text = '1234567890.'.concat('1234567890'.repeat(15));
    const expected = new Oracle(text).times('0.3048').toSignificantDigits(30).toString();
    expect(convert(text, 'length', 'feet', 'meter').toString()).toBe(expected);
  });
  test('internal precision is isolated from the global decimal.js configuration', () => {
    expect(CalculationDecimal.precision).toBe(30);
    expect(Decimal.precision).toBe(20);
  });
});

describe('formatting and cached calculation results', () => {
  test('display changes do not alter results or original text', () => {
    const calculate = createConversionSession('length');
    const first = calculate('1.23000045', 'meter');
    const saved = first.values.centi.toString();
    expect(formatResult(first.values.centi, { mode: 'decimal', digits: 2 })).toBe('123.00');
    expect(formatResult(first.values.centi, { mode: 'significant', digits: 9 })).toBe('123.000045');
    expect(first.values.centi.toString()).toBe(saved);
    expect(calculate('1.23000045', 'meter')).toBe(first);
    expect(displayValue('1.23000045', 'meter', 'meter', first.values.meter, { mode: 'decimal', digits: 0 }))
      .toBe('1.23000045');
    expect(calculate('2', 'meter')).not.toBe(first);
    expect(calculate('2', 'feet').values.meter.toString()).toBe('0.6096');
  });
  test('half-even ties, negatives and negative zero have consistent formatting', () => {
    [['1.25', '1.2'], ['1.35', '1.4'], ['-1.25', '-1.2'], ['-1.35', '-1.4'], ['-0.001', '0.0']]
      .forEach(([input, output]) => expect(formatResult(parseInput(input), { mode: 'decimal', digits: 1 })).toBe(output));
  });
  test('tiny significant values survive; large values use bounded scientific notation', () => {
    expect(formatResult(parseInput('1e-1000'))).toBe('1e-1000');
    expect(formatResult(parseInput('1e10000'), { mode: 'decimal', digits: 30 })).toBe('1e+10000');
    expect(formatResult(parseInput('1e-1000'), { mode: 'decimal', digits: 2 })).toBe('0.00');
  });
  test('display controls accept only supported precision settings', () => {
    [{ mode: 'decimal', digits: -1 }, { mode: 'decimal', digits: 31 }, { mode: 'significant', digits: 0 },
      { mode: 'significant', digits: 1.5 }, { mode: 'other', digits: 3 }]
      .forEach(setting => expect(() => formatResult(parseInput('1'), setting)).toThrow(RangeError));
    expect(formatResult(null)).toBe('');
  });
  test('empty and malformed inputs clear calculated fields but preserve the source field', () => {
    const calculate = createConversionSession('length');
    calculate('1', 'meter');
    const empty = calculate('', 'meter');
    expect(empty.invalid).toBe(false);
    expect(Object.keys(empty.values)).toEqual([]);
    const invalid = calculate('1e-', 'meter');
    expect(invalid.invalid).toBe(true);
    expect(displayValue('1e-', 'meter', 'meter', invalid.values.meter)).toBe('1e-');
    expect(displayValue('1e-', 'meter', 'feet', invalid.values.feet)).toBe('');
  });
});
