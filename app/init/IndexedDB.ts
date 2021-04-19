import * as lf from 'lf';

/*@ngInject*/
export function IndexedDBConfig(lovefieldProvider) {
  var schemaBuilder : any = lovefieldProvider.schemaBuilder;

  schemaBuilder.createTable('classes')
    .addColumn('id', lf.Type.STRING)
    .addColumn('desc', lf.Type.STRING)
    .addColumn('subjectId', lf.Type.STRING)
    .addColumn('subject', lf.Type.OBJECT)
    .addColumn('teachers', lf.Type.OBJECT)
    .addColumn('code', lf.Type.STRING)
    .addColumn('grade', lf.Type.INTEGER)
    .addPrimaryKey(['id'])
    .addNullable(['desc','grade']);

  schemaBuilder.createTable('users')
    .addColumn('id', lf.Type.STRING)
    .addColumn('downloadAuthorized', lf.Type.BOOLEAN)
    .addColumn('firstName', lf.Type.STRING)
    .addColumn('gender', lf.Type.STRING)
    .addColumn('lastName', lf.Type.STRING)
    .addColumn('userName', lf.Type.STRING)
    .addColumn('avatarId', lf.Type.STRING)
    .addPrimaryKey(['id'])
    .addNullable(['gender', 'avatarId','lastName','firstName',]);

  schemaBuilder.createTable('books')
    .addColumn('id', lf.Type.STRING)
    .addColumn('author', lf.Type.STRING)
    .addColumn('maxGrade', lf.Type.INTEGER)
    .addColumn('minGrade', lf.Type.INTEGER)
    .addColumn('relativeUrl', lf.Type.STRING)
    .addColumn('subjectId', lf.Type.STRING)
    .addColumn('thumbnailType', lf.Type.STRING)
    .addColumn('title', lf.Type.STRING)
    .addColumn('type', lf.Type.STRING)
    .addColumn('version', lf.Type.INTEGER)
    .addColumn('numberOfPages', lf.Type.INTEGER)
    .addPrimaryKey(['id'])
    .addNullable(['relativeUrl', 'numberOfPages', 'author']);

  schemaBuilder.createTable('classes_books').addColumn('id', lf.Type.INTEGER)
    .addColumn('classId', lf.Type.STRING)
    .addColumn('bookId', lf.Type.STRING)
    .addPrimaryKey([{
      'name': 'id',
      'autoIncrement': true
    }]).addForeignKey('fk_bookId', {
    local: 'bookId',
    ref: 'books.id',
    action: lf.ConstraintAction.RESTRICT
  }).addForeignKey('fk_classId', {
    local: 'classId',
    ref: 'classes.id',
    action: lf.ConstraintAction.RESTRICT
  }).addUnique('uq_bookId_classId', ['classId', 'bookId']);

  schemaBuilder.createTable('class_students')
    .addColumn('id', lf.Type.INTEGER)
    .addColumn('studentId', lf.Type.STRING)
    .addColumn('classId', lf.Type.STRING)
    .addPrimaryKey([{
      'name': 'id',
      'autoIncrement': true
    }])
    .addForeignKey('fk_userId', {
      local: 'studentId',
      ref: 'users.id',
      action: lf.ConstraintAction.RESTRICT
    })
    .addForeignKey('fk_classId', {
      local: 'classId',
      ref: 'classes.id',
      action: lf.ConstraintAction.RESTRICT
    })
    .addUnique('uq_usersId_classId', ['studentId', 'classId']);

  schemaBuilder.createTable('user_classes')
    .addColumn('id', lf.Type.INTEGER)
    .addColumn('userId', lf.Type.STRING)
    .addColumn('classId', lf.Type.STRING)
    .addPrimaryKey([{
      'name': 'id',
      'autoIncrement': true
    }])
    .addForeignKey('fk_classId', {
      local: 'classId',
      ref: 'classes.id',
      action: lf.ConstraintAction.RESTRICT
    })
    .addUnique('uq_usersId_classId', ['userId', 'classId']);
}
