/**
 * Created by tshushan on 24/11/2017.
 */

class ChallengeGenerator {
  constructor() {
    this.MAX_NUMBER = 10;
  }

  getRandomNumber() {
    return Math.floor(Math.random() * this.MAX_NUMBER);
  }

  getText(a, b) {
    return `${a} + ${b} = `;
  }

  generate() {
    const a = this.getRandomNumber(),
          b = this.getRandomNumber(),
          text = this.getText(a, b),
          result = a + b;
    return {
      a,
      b,
      text,
      result
    }
  }
}

