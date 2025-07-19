
'use client';

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const percentage = () => {
    const value = parseFloat(display) / 100;
    setDisplay(String(value));
  };

  const toggleSign = () => {
    if (display !== '0') {
      setDisplay(display.charAt(0) === '-' ? display.slice(1) : '-' + display);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-black/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/10">
        {/* Display */}
        <div className="mb-6">
          <div className="bg-black/30 rounded-2xl p-6 text-right">
            <div className="text-4xl font-light text-white truncate" suppressHydrationWarning={true}>
              {display}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <button
            onClick={clear}
            className="!rounded-button bg-gray-500/30 text-white text-lg font-medium h-16 hover:bg-gray-500/50 transition-colors"
          >
            AC
          </button>
          <button
            onClick={toggleSign}
            className="!rounded-button bg-gray-500/30 text-white text-lg font-medium h-16 hover:bg-gray-500/50 transition-colors"
          >
            +/-
          </button>
          <button
            onClick={percentage}
            className="!rounded-button bg-gray-500/30 text-white text-lg font-medium h-16 hover:bg-gray-500/50 transition-colors"
          >
            %
          </button>
          <button
            onClick={() => inputOperation('÷')}
            className="!rounded-button bg-orange-500 text-white text-2xl font-light h-16 hover:bg-orange-600 transition-colors"
          >
            ÷
          </button>

          {/* Row 2 */}
          <button
            onClick={() => inputNumber('7')}
            className="!rounded-button bg-gray-700/50 text-white text-xl font-light h-16 hover:bg-gray-600/50 transition-colors"
          >
            7
          </button>
          <button
            onClick={() => inputNumber('8')}
            className="!rounded-button bg-gray-700/50 text-white text-xl font-light h-16 hover:bg-gray-600/50 transition-colors"
          >
            8
          </button>
          <button
            onClick={() => inputNumber('9')}
            className="!rounded-button bg-gray-700/50 text-white text-xl font-light h-16 hover:bg-gray-600/50 transition-colors"
          >
            9
          </button>
          <button
            onClick={() => inputOperation('×')}
            className="!rounded-button bg-orange-500 text-white text-2xl font-light h-16 hover:bg-orange-600 transition-colors"
          >
            ×
          </button>

          {/* Row 3 */}
          <button
            onClick={() => inputNumber('4')}
            className="!rounded-button bg-gray-700/50 text-white text-xl font-light h-16 hover:bg-gray-600/50 transition-colors"
          >
            4
          </button>
          <button
            onClick={() => inputNumber('5')}
            className="!rounded-button bg-gray-700/50 text-white text-xl font-light h-16 hover:bg-gray-600/50 transition-colors"
          >
            5
          </button>
          <button
            onClick={() => inputNumber('6')}
            className="!rounded-button bg-gray-700/50 text-white text-xl font-light h-16 hover:bg-gray-600/50 transition-colors"
          >
            6
          </button>
          <button
            onClick={() => inputOperation('-')}
            className="!rounded-button bg-orange-500 text-white text-2xl font-light h-16 hover:bg-orange-600 transition-colors"
          >
            -
          </button>

          {/* Row 4 */}
          <button
            onClick={() => inputNumber('1')}
            className="!rounded-button bg-gray-700/50 text-white text-xl font-light h-16 hover:bg-gray-600/50 transition-colors"
          >
            1
          </button>
          <button
            onClick={() => inputNumber('2')}
            className="!rounded-button bg-gray-700/50 text-white text-xl font-light h-16 hover:bg-gray-600/50 transition-colors"
          >
            2
          </button>
          <button
            onClick={() => inputNumber('3')}
            className="!rounded-button bg-gray-700/50 text-white text-xl font-light h-16 hover:bg-gray-600/50 transition-colors"
          >
            3
          </button>
          <button
            onClick={() => inputOperation('+')}
            className="!rounded-button bg-orange-500 text-white text-2xl font-light h-16 hover:bg-orange-600 transition-colors"
          >
            +
          </button>

          {/* Row 5 */}
          <button
            onClick={() => inputNumber('0')}
            className="!rounded-button bg-gray-700/50 text-white text-xl font-light h-16 col-span-2 hover:bg-gray-600/50 transition-colors"
          >
            0
          </button>
          <button
            onClick={inputDecimal}
            className="!rounded-button bg-gray-700/50 text-white text-xl font-light h-16 hover:bg-gray-600/50 transition-colors"
          >
            .
          </button>
          <button
            onClick={performCalculation}
            className="!rounded-button bg-orange-500 text-white text-2xl font-light h-16 hover:bg-orange-600 transition-colors"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}
