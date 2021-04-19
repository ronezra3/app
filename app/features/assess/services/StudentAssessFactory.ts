export interface IStudentAssess {
  new(data) : IStudentAssess;
  id : string;
  questions : any[];
  studentId : string;
}

/*@ngInject*/
export function StudentAssess($resource, ENV, lodash) : IStudentAssess {
  var baseApiEndpoint = ENV.apiEndpoint + '/studentassess/:id';
  var StudentAssessResource = $resource(baseApiEndpoint, {id: '@id'}, {
    getByStudentAssess: {url: baseApiEndpoint + '/:assessId/:studentId'},
    submit: {method: 'POST', params: {classId: '@classId'}, url: baseApiEndpoint + '/submit'}
  });

  StudentAssessResource.prototype.getAverage = function () {
    var correctStudentAnswers = lodash.where(this.questions, {status: 'correct'}).length;
    return correctStudentAnswers / this.questions.length;
  };

  StudentAssessResource.prototype.isCorrectAnswer = function (question) {
    var answer = lodash.find(this.questions, {index: question.index});
    return answer.status === 'correct';
  };

  return StudentAssessResource;
}
