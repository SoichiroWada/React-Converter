import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Length from './Length';
import Weight from './Weight';
import Area from './Area';
import Time from './Time';
import Temperature from './Temperature';
import { PrecisionProvider } from './PrecisionControls';
import { units } from '../conversion/units';

let container;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});
// Testing Library unmounts rendered trees automatically after each test.
afterEach(() => {
  container.remove();
});

function mount(Component) {
  let calculator;
  render(<PrecisionProvider><Component ref={instance => { calculator = instance; }} /></PrecisionProvider>, { container });
  return calculator;
}

function inputFor(label) {
  const field = Array.from(container.querySelectorAll('fieldset')).find(element =>
    element.querySelector('legend').textContent.includes(label));
  if (!field) throw new Error(`Missing field: ${label}`);
  return field.querySelector('input');
}

function change(element, value) {
  fireEvent.change(element, { target: { value } });
}

[[Length, 'length', 'Meter（メートル）', 'Centi Meter', '100'],
  [Weight, 'mass', 'Kilo Gram', 'Milli Gram', '1000000'],
  [Area, 'area', 'Square Meter', 'Square Milli Meter', '1000000'],
  [Time, 'time', 'Second（秒）', 'Milli Second', '1000']].forEach(([Component, category, sourceLabel, targetLabel, expected]) => {
  test(`${category}: preserve all fields, editing, clear action and responsive column classes`, () => {
    mount(Component);
    expect(container.querySelectorAll('fieldset').length).toBe(Object.keys(units[category]).length);
    expect(container.querySelector('.uBody.row .col.s12')).not.toBe(null);
    expect(container.querySelector('.page-toolbar > .precision-controls + button.clear-btn')).not.toBe(null);
    change(inputFor(sourceLabel), '1');
    expect(inputFor(sourceLabel).value).toBe('1');
    expect(inputFor(targetLabel).value).toBe(expected);
    fireEvent.click(container.querySelector('button'));
    Array.from(container.querySelectorAll('fieldset input')).forEach(input => expect(input.value).toBe(''));
    expect(container.querySelector('[role="status"]')).toBe(null);
  });
});

test('changing display precision reuses the stored result and retains the entered decimal', () => {
  const calculator = mount(Length);
  change(inputFor('Meter（メートル）'), '1.23000045');
  expect(inputFor('Centi Meter').value).toBe('123.000045');
  const original = calculator.conversion(calculator.state.lengthStr, calculator.state.originalScale);
  const [mode, digits] = container.querySelectorAll('select');
  change(mode, 'decimal');
  change(digits, '2');
  expect(inputFor('Centi Meter').value).toBe('123.00');
  expect(inputFor('Meter（メートル）').value).toBe('1.23000045');
  change(mode, 'significant');
  change(digits, '30');
  expect(inputFor('Centi Meter').value).toBe('123.000045');
  expect(calculator.conversion(calculator.state.lengthStr, calculator.state.originalScale)).toBe(original);
});

test('malformed and partially typed input is retained while other fields clear', () => {
  mount(Length);
  change(inputFor('Meter（メートル）'), '1');
  ['12abc', '-', '1e-'].forEach(text => {
    change(inputFor('Meter（メートル）'), text);
    expect(inputFor('Meter（メートル）').value).toBe(text);
    expect(inputFor('Centi Meter').value).toBe('');
    expect(container.querySelector('[role="status"]')).not.toBe(null);
  });
  change(inputFor('Meter（メートル）'), '1e-20');
  expect(inputFor('Centi Meter').value).toBe('1e-18');
  expect(container.querySelector('[role="status"]')).toBe(null);
});

test('a converted field remains editable as a new source', () => {
  mount(Length);
  change(inputFor('Meter（メートル）'), '1');
  change(inputFor('inch（インチ）'), '1');
  expect(inputFor('inch（インチ）').value).toBe('1');
  expect(inputFor('Meter（メートル）').value).toBe('0.0254');
});

test('temperature boiling verdict uses the calculation result, regardless of displayed rounding', () => {
  mount(Temperature);
  const [mode, digits] = container.querySelectorAll('select');
  change(mode, 'decimal');
  change(digits, '0');
  change(inputFor('Fahrenheit'), '211.999999999');
  expect(inputFor('Celsius').value).toBe('100');
  expect(container.querySelector('#cool').textContent).toBe('The water would not boil.');
  expect(container.querySelector('#boil')).toBe(null);
  change(inputFor('Fahrenheit'), '212');
  expect(container.querySelector('#boil')).not.toBe(null);
  change(inputFor('Celsius'), '-40');
  expect(inputFor('Fahrenheit').value).toBe('-40');
  change(inputFor('Celsius'), '100abc');
  expect(inputFor('Fahrenheit').value).toBe('');
  expect(container.querySelector('#boil, #cool')).toBe(null);
  fireEvent.click(container.querySelector('button'));
  expect(inputFor('Celsius').value).toBe('');
});

test('temperature: CLEAR sits in the toolbar and the Delete key and Space bar clear both fields', () => {
  mount(Temperature);
  expect(container.querySelector('.page-toolbar > .precision-controls + button.clear-btn')).not.toBe(null);
  change(inputFor('Celsius'), '100');
  expect(inputFor('Fahrenheit').value).toBe('212');
  fireEvent.keyDown(inputFor('Fahrenheit'), { key: 'Delete' });
  expect(inputFor('Celsius').value).toBe('');
  expect(inputFor('Fahrenheit').value).toBe('');
  expect(container.querySelector('#boil, #cool')).toBe(null);
  change(inputFor('Fahrenheit'), '212');
  expect(inputFor('Celsius').value).toBe('100');
  fireEvent.keyDown(inputFor('Celsius'), { key: ' ', keyCode: 32 });
  expect(inputFor('Celsius').value).toBe('');
  expect(inputFor('Fahrenheit').value).toBe('');
  expect(container.querySelector('#boil, #cool')).toBe(null);
});

test('ambiguous definitions and approximate comparisons are visible in the UI', () => {
  mount(Length);
  expect(inputFor('Astronomical Unit').closest('fieldset').title).toContain('not orbital circumference');
  expect(inputFor('Mt. Fuji').closest('fieldset').textContent).toContain('≈');
  mount(Time);
  expect(inputFor('Year (365 days)').closest('fieldset').title).toContain('365-day');
  expect(inputFor('4 Years (1,460 days)').closest('fieldset').title).toContain('no leap days');
});

test('display preference persists when switching calculators', () => {
  mount(Length);
  change(container.querySelectorAll('select')[1], '20');
  mount(Weight);
  expect(container.querySelectorAll('select')[1].value).toBe('20');
});
