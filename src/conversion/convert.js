import Decimal from 'decimal.js';
import { units } from './units';

export const INTERNAL_PRECISION = 30;
// Isolate our configuration from other users of decimal.js. Half-even avoids
// systematic tie bias, including for negative values.
export const CalculationDecimal = Decimal.clone({
  precision: INTERNAL_PRECISION, rounding: Decimal.ROUND_HALF_EVEN,
});
// Guard precision is ONLY for exact intermediate products, never display.
const FactorDecimal = CalculationDecimal.clone({ precision: 80 });
const factors = Object.create(null);
const ratios = Object.create(null);
Object.keys(units).forEach(category => {
  factors[category] = Object.create(null);
  ratios[category] = Object.create(null);
  Object.keys(units[category]).forEach(unit => {
    const definition = units[category][unit];
    factors[category][unit] = {
      numerator: new FactorDecimal(definition.numerator),
      denominator: new FactorDecimal(definition.denominator),
    };
  });
});

// These bounds protect editable fields/formatting from unbounded allocations.
// They comfortably exceed binary floating point's range (roughly 1e±308).
export const MAX_INPUT_DIGITS = 1000;
export const MAX_EXPONENT = 10000;
const decimalPattern = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i;

export function parseInput(text) {
  if (typeof text !== 'string') return null;
  const trimmed = text.trim();
  if (trimmed.length > MAX_INPUT_DIGITS + 16 || !decimalPattern.test(trimmed)) return null;
  try {
    const value = new CalculationDecimal(trimmed);
    if (!value.isFinite() || value.sd() > MAX_INPUT_DIGITS || Math.abs(value.e) > MAX_EXPONENT) return null;
    // decimal.js accepts exponents outside its representable range as zero.
    // Reject that underflow rather than silently accepting a nonzero input.
    const coefficient = trimmed.split(/e/i)[0];
    if (value.isZero() && /[1-9]/.test(coefficient)) return null;
    const exponent = trimmed.split(/e/i)[1];
    if (exponent && Math.abs(Number(exponent)) > MAX_EXPONENT) return null;
    return value;
  } catch (error) {
    return null;
  }
}

function hasUnit(category, unit) {
  return category === 'temperature'
    ? unit === 'c' || unit === 'f'
    : Boolean(factors[category] && factors[category][unit]);
}

function ratioFor(category, from, to) {
  const key = `${from}:${to}`;
  if (!ratios[category][key]) {
    const source = factors[category][from];
    const target = factors[category][to];
    // Cross-multiply exact definitions. Never round a recurring factor or
    // cache a rounded decimal ratio (which would damage e.g. 1 ken = 6 shaku).
    ratios[category][key] = {
      numerator: source.numerator.times(target.denominator),
      denominator: source.denominator.times(target.numerator),
    };
  }
  return ratios[category][key];
}

function convertValue(value, category, from, to) {
  if (from === to) return value.toSignificantDigits(INTERNAL_PRECISION);
  if (category === 'temperature') {
    // Preserve the complete span between the input's least significant digit
    // and the integer offset. Even a tiny offset can break a rounding tie in
    // an enormous value, so a fixed number of guard digits is insufficient.
    const precision = Math.max(80, value.sd() + 10, value.e + 10, value.sd() - value.e + 10);
    const WorkDecimal = precision > 80 ? FactorDecimal.clone({ precision }) : FactorDecimal;
    const input = new WorkDecimal(value);
    // Single final division; offsets and integer multiplications remain in
    // guard precision. Celsius is the temperature reference.
    const numerator = from === 'c' ? input.times('9').plus('160') : input.minus('32').times('5');
    return new CalculationDecimal(numerator).dividedBy(from === 'c' ? '5' : '9');
  }
  const ratio = ratioFor(category, from, to);
  const precision = value.sd() + ratio.numerator.sd() + 2;
  const WorkDecimal = precision > 80 ? FactorDecimal.clone({ precision }) : FactorDecimal;
  const numerator = new WorkDecimal(value).times(ratio.numerator);
  // Round only once to 30 significant digits, after the exact product.
  return new CalculationDecimal(numerator).dividedBy(ratio.denominator);
}

export function convert(text, category, from, to) {
  if (!hasUnit(category, from) || !hasUnit(category, to)) return null;
  const value = parseInput(text);
  return value === null ? null : convertValue(value, category, from, to);
}

// One session per mounted calculator: parse once per edit and reuse the Decimal
// results when only display precision or the IME notification changes.
export function createConversionSession(category) {
  let previousText;
  let previousUnit;
  let previousResult;
  return (text, from) => {
    if (text === previousText && from === previousUnit) return previousResult;
    const value = parseInput(text);
    const values = Object.create(null);
    const valid = value !== null && hasUnit(category, from);
    if (valid) {
      const targets = category === 'temperature' ? ['c', 'f'] : Object.keys(units[category]);
      targets.forEach(to => { values[to] = convertValue(value, category, from, to); });
    }
    previousText = text;
    previousUnit = from;
    previousResult = { values, valid, invalid: Boolean(text.trim()) && !valid };
    return previousResult;
  };
}

export const DEFAULT_DISPLAY = Object.freeze({ mode: 'significant', digits: 12 });

export function formatResult(value, settings = DEFAULT_DISPLAY) {
  if (value === null || value === undefined) return '';
  const { mode, digits } = settings;
  const minimum = mode === 'decimal' ? 0 : 1;
  if (!['decimal', 'significant'].includes(mode) || !Number.isInteger(digits) || digits < minimum || digits > 30) {
    throw new RangeError('Display precision must be 0–30 decimal places or 1–30 significant digits.');
  }
  if (mode === 'decimal') {
    const rounded = value.toDecimalPlaces(digits);
    // Avoid thousands of characters for huge results. The rounding is still
    // to decimal places; only its notation changes above this threshold.
    return rounded.e > 60 ? rounded.toString() : (rounded.isZero() ? new CalculationDecimal('0') : rounded).toFixed(digits);
  }
  const rounded = value.toSignificantDigits(digits);
  return rounded.isZero() ? '0' : rounded.toString();
}

export function displayValue(text, from, to, result, settings) {
  // Preserve the active input, including incomplete decimal/scientific syntax.
  return from === to ? text : formatResult(result, settings);
}
