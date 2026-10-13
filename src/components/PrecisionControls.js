import React from 'react';
import { DEFAULT_DISPLAY } from '../conversion/convert';

export const PrecisionContext = React.createContext(DEFAULT_DISPLAY);

export class PrecisionProvider extends React.Component {
  state = { ...DEFAULT_DISPLAY };

  setDisplay = update => this.setState(update);

  render() {
    return (
      <PrecisionContext.Provider value={{ ...this.state, setDisplay: this.setDisplay }}>
        {this.props.children}
      </PrecisionContext.Provider>
    );
  }
}

export default function PrecisionControls() {
  return (
    <PrecisionContext.Consumer>
      {({ mode, digits, setDisplay }) => (
        <div className="precision-controls">
          <label>
            Display precision / 表示精度
            <select className="browser-default" value={mode} onChange={event => setDisplay({
              mode: event.target.value,
              digits: event.target.value === 'significant' ? Math.max(1, digits) : digits,
            })}>
              <option value="significant">Significant digits / 有効桁数</option>
              <option value="decimal">Decimal places / 小数点以下</option>
            </select>
          </label>
          <label>
            Digits / 桁数
            <select className="browser-default" value={digits} onChange={event => setDisplay({ digits: Number(event.target.value) })}>
              {Array.from({ length: 31 }, (_, digit) => digit).filter(digit => mode === 'decimal' || digit > 0).map(digit => (
                <option key={digit} value={digit}>{digit}</option>
              ))}
            </select>
          </label>
          <span>表示のみを丸めます。入力値は保持されます。</span>
        </div>
      )}
    </PrecisionContext.Consumer>
  );
}

export function InputStatus({ invalid }) {
  return invalid ? <p className="input-status" role="status">Enter a valid decimal number (e.g. -1.25 or 1e-20). / 有効な数値を入力してください。</p> : null;
}
