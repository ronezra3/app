const template = `
<assess-question-title question="$ctrl.question"></assess-question-title>
<ol>
  <li ng-repeat="answer in $ctrl.question.answers">
    <correct-answer-picker question="$ctrl.question" answer="answer" is-disabled="true"></correct-answer-picker>
    <div class="answer-content">{{answer.content}}</div>
  </li>
</ol>
`;

export class StudentQuestionMock {
  template = template;
  bindings : any = {
    question: '<'
  };
}
