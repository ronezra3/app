export class AssessPlayController {
  /*@ngInject*/
  constructor(private StudentAssess, private lodash, private ngDialogRouter, private CurrentUser, public activity, public studentAssess) {
    this.openInitPopup();
    this.shuffleQuestions();
    this.initStudentAssess();
  }

  private openInitPopup() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log(currentUser)
    //  this.CurrentUser.get().getFullName()
    //todo: this needs to be closed onDestroy
    this.ngDialogRouter.go('assess.play.intro', {
      name: currentUser.firstName,
      minutes: this.activity.time / 60,
      immediateFeedback: this.activity.immediateFeedback
    });
  }

  private shuffleQuestions() {
    this.lodash.each(this.activity.questions, (question : any) => {
      question.answers = this.lodash.shuffle(question.answers);
    });
  }

  private initStudentAssess() {
    if (this.studentAssess.id) {
      this.updatePreviouslySelectedAnswers();
    } else {
      this.createNewStudentAssess();
    }
  }

  private updatePreviouslySelectedAnswers() {
    this.lodash.each(this.studentAssess.questions, (studentQuestion) => {
      var assessQuestion = this.lodash.find(this.activity.questions, {'index': studentQuestion.index});
      var previouslySelectedAnswers = this.lodash.map(studentQuestion.answers, (studentAnswer) => {
        return this.lodash.find(assessQuestion.answers, {'_id': studentAnswer});
      });

      this.lodash.each(previouslySelectedAnswers, (selectedAnswer : any) => {
        if (selectedAnswer) {
          selectedAnswer.selected = true;
        }
      });
    });
  }

  private createNewStudentAssess() {
    this.studentAssess = new this.StudentAssess();
    this.studentAssess.assessId = this.activity.id;
    this.studentAssess.studentId = this.CurrentUser.get().id;
    this.studentAssess.questions = this.lodash.map(this.activity.questions, (question) => {
      return {index: question.index, status: ''};
    });
  }
}
