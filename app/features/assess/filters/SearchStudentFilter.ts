/*@ngInject*/
export function SearchStudent(lodash) {
  return function (students, searchString) {
    if (!searchString) {
      return students;
    }

    return lodash.filter(students, function (student) {
      return lodash.contains(student.getFullName().toLowerCase(), searchString.toLowerCase());
    });
  };
}
