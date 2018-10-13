/**
 * Created by tshushan on 24/11/2017.
 */

class ChallengeGenerator {
  constructor() {
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getText(a, b, op) {
    return `${a} ${op} ${b} = `;
  }

  getResult(a, b, op) {
    switch (op) {
      case '-':
        return a - b;
      case '*':
        return a * b;
      case ':':
      case '/':
        return a / b;
      default:
        return a + b;
    }
  }

  getNumbers(min, max, op = '+') {
    let a = this.getRandomNumber(min, max);
    let b;
    if (op === '+' || op === '*') {
      b = this.getRandomNumber(min, max);
    } else if (op === '-') {
      b = this.getRandomNumber(min, a);
    } else {
      b = this.getRandomNumber(min, a);
      a *= b;
    }
    return {
      a,
      b
    }
  }

  generate(min , max, op = '+') {
    const { a, b } = this.getNumbers(min, max, op),
          text = this.getText(a, b, op),
          result = this.getResult(a, b, op);
    return {
      a,
      b,
      text,
      result
    }
  }
}

