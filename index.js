/**
 * Created by tshushan on 24/11/2017.
 */

class MathGame {
  constructor() {
    this.generator = new ChallengeGenerator();
    this.SCORE_PLUS = 10;
    this.SCORE_MINUS = -2;
    this.score = parseInt(window.localStorage.getItem('score')) ||  0;
    this.MIN_NUMBER = 1;
    this.MAX_NUMBER = 10;
    this.op = '+';
    this.lastAnswer = '';

  }

  run() {
    this.nextChallenge();
    this.renderScore();
  }

  renderChallenge() {
    document.querySelector('.challenge').innerHTML = `${this.challenge.text}`;
  }

  clearAndFocusAnswer() {
    const answerInput = document.querySelector('.challenge-answer input');
    answerInput.value = '';
    setTimeout(() => answerInput.focus());
  }

  nextChallenge() {
    this.lastAnswer = '';
    this.challenge = this.generator.generate(this.MIN_NUMBER, this.MAX_NUMBER, this.op);
    this.renderChallenge();
    this.clearAndFocusAnswer();
  }


  checkAnswer(currentAnswer) {
    currentAnswer = parseInt(currentAnswer);
    if (this.challenge.result === currentAnswer) {
      this.playSuccessSound();
      this.showSuccessAnimation().then(() => {
        this.updateScore(this.SCORE_PLUS);
        this.nextChallenge();
      });
    } else {
      if (currentAnswer && currentAnswer != this.lastAnswer) {
        this.lastAnswer = currentAnswer;
        this.updateScore(this.SCORE_MINUS);
      }
    }
  }

  playSuccessSound() {
    new Audio('./audio/good.mp3').play();
  }

  updateScore(addition) {
    this.score += addition;
    window.localStorage.setItem('score', this.score);
    this.renderScore();
  }

  renderScore() {
    document.querySelector('.odometer').innerHTML =  this.score;
  }

  showSuccessAnimation() {
    return new Promise((resolve) => {
      document.querySelector('.thumbsup').classList.add('show');
      setTimeout(() => {
        document.querySelector('.thumbsup').classList.remove('show');
        resolve();
      }, 500);
    });
  }

  changeOp(newOp) {
    if (this.op !== newOp) {
      this.op = newOp;
      this.nextChallenge();
    }
  }
}

window.mathGame = new MathGame();
mathGame.run();
