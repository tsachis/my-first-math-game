/**
 * Created by tshushan on 24/11/2017.
 */

class MathGame {
  constructor() {
    this.generator = new ChallengeGenerator();
    this.answerKeys = '0123456789'.split('');
    this.answer = '';
    this.SCORE_PLUS = 10;
    this.score = 0;

  }

  run() {
    this.nextChallenge();
    this.renderScore();
    document.addEventListener('keyup', this.handleKeyPress.bind(this), false);
  }

  renderChallenge() {
    document.querySelector('.challenge').innerHTML = `${this.challenge.text}`;
  }

  nextChallenge() {
    this.answer = '';
    this.challenge = this.generator.generate();
    this.renderChallenge();
    this.renderAnswer();
  }

  renderAnswer() {
    document.querySelector('.challenge-answer').innerHTML = this.answer;
  }

  checkAnswer(currentAnswer) {
    if (this.challenge.result === parseInt(currentAnswer)) {
      this.playSuccessSound();
      this.showSuccessAnimation().then(() => {
        this.updateScore(this.SCORE_PLUS);
        this.nextChallenge();
      });
    }
  }

  playSuccessSound() {
    new Audio('./audio/good.mp3').play();
  }

  updateScore(addition) {
    this.score += addition;
    this.renderScore();
  }

  renderScore() {
    document.querySelector('.odometer').innerHTML =  this.score;
  }

  showSuccessAnimation() {
    const promise = new Promise((resolve) => {
      document.querySelector('.thumbsup').classList.add('show');
      setTimeout(() => {
        document.querySelector('.thumbsup').classList.remove('show');
        resolve();
      }, 500);
    });
    return promise;
  }

  handleKeyPress(event) {
    if (this.answerKeys.indexOf(event.key) >= 0 || event.keyCode === 8) {
      if (this.answerKeys.indexOf(event.key) >= 0) {
        this.answer += event.key;
      }
      if (event.keyCode === 8 && this.answer) {
        this.answer = this.answer.slice(0, -1);
      }
      this.renderAnswer();
      setTimeout(this.checkAnswer.bind(this, this.answer), 200);
    }
  }
}

(function() {
  const mathGame = new MathGame();
  mathGame.run();
})();
