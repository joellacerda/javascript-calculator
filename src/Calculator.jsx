import React, { useState } from "react";

export default function Calculator() {
  const [displayValue, setDisplayValue] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  function clearDisplay() {
    setDisplayValue("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  }

  function inputDigit(digit) {
    if (waitingForOperand) {
      setDisplayValue(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplayValue(
        displayValue === "0" ? String(digit) : displayValue + digit
      );
    }
  }

  function inputDecimal() {
    if (waitingForOperand) {
      setDisplayValue("0.");
      setWaitingForOperand(false);
    } else {
      if (displayValue.indexOf(".") === -1) {
        setDisplayValue(displayValue + ".");
      }
    }
  }

  function performOperation(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForOperand) {
      if (nextOperator !== "-") {
        setOperator(nextOperator);
        return;
      } else {
        setDisplayValue("-");
        setWaitingForOperand(false);
        return;
      }
    }

    if (previousValue == null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const currentValue = previousValue || 0;
      const newValue = operate(currentValue, inputValue, operator);

      setPreviousValue(newValue);
      setDisplayValue(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  }

  function operate(a, b, op) {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return a / b;
      default:
        return b;
    }
  }

  function handleClick(event) {
    const { target } = event;

    if (target.matches("button")) {
      switch (target.value) {
        case "AC":
          clearDisplay();
          break;
        case ".":
          inputDecimal();
          break;
        case "+":
        case "-":
        case "*":
        case "/":
          performOperation(target.value);
          break;
        case "=":
          performOperation("=");
          break;
        default:
          inputDigit(target.value);
          break;
      }
    }
  }

  return (
    <div className="calculator">
      <div id="display" className="display">
        {displayValue}
      </div>
      <button
        id="clear"
        className="btn btn-light"
        onClick={handleClick}
        value="AC"
        style={{ gridColumn: "1 / span 2" }}
      >
        AC
      </button>
      <button
        id="divide"
        className="btn btn-info"
        onClick={handleClick}
        value="/"
      >
        /
      </button>
      <button
        id="multiply"
        className="btn btn-info"
        onClick={handleClick}
        value="*"
      >
        x
      </button>
      <button
        id="seven"
        className="btn btn-light"
        onClick={handleClick}
        value="7"
      >
        7
      </button>
      <button
        id="eight"
        className="btn btn-light"
        onClick={handleClick}
        value="8"
      >
        8
      </button>
      <button
        id="nine"
        className="btn btn-light"
        onClick={handleClick}
        value="9"
      >
        9
      </button>
      <button
        id="subtract"
        className="btn btn-info"
        onClick={handleClick}
        value="-"
      >
        -
      </button>
      <button
        id="four"
        className="btn btn-light"
        onClick={handleClick}
        value="4"
      >
        4
      </button>
      <button
        id="five"
        className="btn btn-light"
        onClick={handleClick}
        value="5"
      >
        5
      </button>
      <button
        id="six"
        className="btn btn-light"
        onClick={handleClick}
        value="6"
      >
        6
      </button>
      <button id="add" className="btn btn-info" onClick={handleClick} value="+">
        +
      </button>
      <button
        id="one"
        className="btn btn-light"
        onClick={handleClick}
        value="1"
      >
        1
      </button>
      <button
        id="two"
        className="btn btn-light"
        onClick={handleClick}
        value="2"
      >
        2
      </button>
      <button
        id="three"
        className="btn btn-light"
        onClick={handleClick}
        value="3"
      >
        3
      </button>
      <button
        id="equals"
        className="btn btn-info"
        onClick={handleClick}
        value="="
        style={{ gridRow: "span 2" }}
      >
        =
      </button>
      <button
        id="zero"
        className="btn btn-light"
        onClick={handleClick}
        value="0"
        style={{ gridColumn: "1 / span 2" }}
      >
        0
      </button>
      <button
        id="decimal"
        className="btn btn-light"
        onClick={handleClick}
        value="."
      >
        .
      </button>
    </div>
  );
}
