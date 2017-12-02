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

  generate(min , max, op = '+') {
    const a = this.getRandomNumber(min, max),
          b = op === '-' ? this.getRandomNumber(min, a) : this.getRandomNumber(min, max),
          text = this.getText(a, b, op),
          result = eval(`${a} ${op} ${b}`);
    return {
      a,
      b,
      text,
      result
    }
  }
}

