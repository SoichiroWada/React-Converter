// Factors express one unit in meters, kilograms, square meters or seconds.
// Finite decimals and rational definitions stay as strings until calculation.
// Sources, variants and the audit of EVERY supported unit: docs/conversions.md.
const exact = (numerator, source, denominator = '1', note = '') =>
  Object.freeze({ numerator, denominator, exact: true, source, note });
const approximate = (numerator, note) =>
  Object.freeze({ numerator, denominator: '1', exact: false, source: 'legacy', note });

export const units = Object.freeze({
  length: Object.freeze({
    kilo: exact('1000', 'si'),
    meter: exact('1', 'si'),
    centi: exact('0.01', 'si'),
    milli: exact('0.001', 'si'),
    inch: exact('0.0254', 'nist'),
    feet: exact('0.3048', 'nist', '1', 'International foot / 国際フィート'),
    yard: exact('0.9144', 'nist'),
    mile: exact('1609.344', 'nist', '1', 'International mile / 国際マイル'),
    sun: exact('1', 'japan', '33'),
    shaku: exact('10', 'japan', '33', 'Standard shaku, not kujirajaku / 曲尺'),
    ken: exact('20', 'japan', '11'),
    cho: exact('1200', 'japan', '11'),
    ri: exact('43200', 'japan', '11'),
    kairi: exact('1852', 'nist'),
    fuji: approximate('3776', 'Approximate height: 3,776 m / 概算'),
    everest: approximate('8848.86', 'Reported snow height: 8,848.86 m / 概算'),
    tokyoLondon: approximate('9553000', 'Illustrative distance: 9,553 km; endpoints unspecified / 概算'),
    equator: approximate('40075017', 'Approximate equatorial circumference: 40,075,017 m / 概算'),
    lightSec: exact('299792458', 'si'),
    earthOrbit: exact('149597870700', 'iau', '1', 'Astronomical unit; not orbital circumference / 天文単位'),
    lightYear: exact('9460730472580800', 'iau', '1', 'Light travels for one Julian year (365.25 days) / ユリウス年'),
  }),
  mass: Object.freeze({
    milligram: exact('0.000001', 'si'),
    gram: exact('0.001', 'si'),
    kilogram: exact('1', 'si'),
    ton: exact('1000', 'si'),
    avoirdupoisGrain: exact('0.00006479891', 'nistMass'),
    avoirdupoisDram: exact('0.0017718451953125', 'nistMass'),
    avoirdupoisOunce: exact('0.028349523125', 'nistMass'),
    avoirdupoisPound: exact('0.45359237', 'nistMass'),
    avoirdupoisStone: exact('6.35029318', 'nistMass'),
    avoirdupoisUShundredweight: exact('45.359237', 'nistMass'),
    avoirdupoisLonghundredweight: exact('50.80234544', 'nistMass'),
    avoirdupoisShortTon: exact('907.18474', 'nistMass'),
    avoirdupoisLongTon: exact('1016.0469088', 'nistMass'),
    troyGrain: exact('0.00006479891', 'nistMass'),
    troyPennyweight: exact('0.00155517384', 'nistMass'),
    troyOunce: exact('0.0311034768', 'nistMass'),
    troyPound: exact('0.3732417216', 'nistMass'),
    monme: exact('0.00375', 'japan'),
    ryo: exact('0.0375', 'ryo', '1', 'Conventional Japanese mass: 10 monme; historical ryo varies / 10匁の慣用値'),
    kin: exact('0.6', 'japan', '1', 'Japanese kin (600 g), not Chinese jin / 日本の斤'),
    kan: exact('3.75', 'japan'),
    sumoWrestler: approximate('160', 'Illustrative mass: 160 kg; individuals vary / 概算'),
    africanElephant: approximate('6000', 'Illustrative mass: 6,000 kg; individuals vary / 概算'),
    blueWhale: approximate('190000', 'Illustrative mass: 190,000 kg; individuals vary / 概算'),
  }),
  area: Object.freeze({
    squareKiloMeter: exact('1000000', 'si'),
    squareMeter: exact('1', 'si'),
    squareCentiMeter: exact('0.0001', 'si'),
    squareMilliMeter: exact('0.000001', 'si'),
    are: exact('100', 'nist'),
    hectare: exact('10000', 'si'),
    squareInch: exact('0.00064516', 'nist'),
    squareFeet: exact('0.09290304', 'nist'),
    squareYard: exact('0.83612736', 'nist'),
    squarePerch: exact('25.29285264', 'nist'),
    squareMile: exact('2589988.110336', 'nist'),
    acre: exact('4046.8564224', 'nist', '1', 'International-foot acre, not U.S. survey acre / 国際フィートに基づく'),
    cho: exact('1200000', 'japan', '121'),
    tan: exact('120000', 'japan', '121'),
    se: exact('12000', 'japan', '121'),
    tsubo: exact('400', 'japan', '121'),
    gou: exact('40', 'japan', '121'),
    shaku: exact('4', 'japan', '121'),
    Canada: approximate('9985000000000', 'Legacy approximate total area: 9,985,000 km² / 概算'),
    Japan: approximate('378000000000', 'Legacy approximate total area: 378,000 km² / 概算'),
    Australia: approximate('7692024000000', 'Legacy approximate area: 7,692,024 km² / 概算'),
    USA: approximate('9834000000000', 'Legacy approximate total area: 9,834,000 km² / 概算'),
    China: approximate('9597000000000', 'Legacy approximate total area: 9,597,000 km² / 概算'),
    LandOnEarth: approximate('147244000000000', 'Illustrative land area: 147,244,000 km²; source unverified / 概算・出典未確認'),
  }),
  time: Object.freeze({
    milli: exact('0.001', 'si'),
    second: exact('1', 'si'),
    minute: exact('60', 'si'),
    hour: exact('3600', 'si'),
    day: exact('86400', 'si', '1', 'Fixed 24-hour duration; not a civil day / 24時間固定'),
    week: exact('604800', 'duration'),
    month28: exact('2419200', 'duration'),
    month29: exact('2505600', 'duration'),
    month30: exact('2592000', 'duration'),
    month31: exact('2678400', 'duration'),
    year: exact('31536000', 'duration', '1', 'Fixed 365-day duration / 365日固定'),
    fourYears: exact('126144000', 'duration', '1', 'Fixed 1,460-day duration; no leap days / 1460日固定'),
    decade: exact('315360000', 'duration', '1', 'Fixed 3,650-day duration / 3650日固定'),
    century: exact('3153600000', 'duration', '1', 'Fixed 36,500-day duration / 36500日固定'),
  }),
});

export const referenceUnits = Object.freeze({
  length: 'meter', mass: 'kilogram', area: 'squareMeter', time: 'second', temperature: 'c',
});

export function unitNote(category, unit) {
  const definition = units[category][unit];
  return definition.note || '';
}

export function isApproximate(category, unit) {
  return !units[category][unit].exact;
}
