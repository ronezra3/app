import { CurrentSession } from '../../session/services/CurrentSession';

export class ParticipantPlayController {
  /*@ngInject*/
  constructor(private $state, public members, public activity, private classInfo, private SocketIO, private CurrentSession, private Choosen) {
  }

  isTeacher() {
    return this.classInfo.isTeacher();
  }

  sendChosenId(chosenId) {
    const sesion = this.CurrentSession.getInfo();
    setTimeout(() => {
      this.SocketIO.emit(sesion.id, 'choseParticipant', chosenId);
    }, 2000)

  }

  onDone() {
    if (this.isTeacher()) {
      var attending = this.CurrentSession.getAttendanceMgr().getAttending();
      // this.activity.studentsScriptIds = this.lodash(attending).chain().value(); //.sample(4)
      const chosenId = attending[Math.floor(Math.random() * attending.length)];
      this.sendChosenId(chosenId);
      this.Choosen.setChosenId(chosenId);
      // let role = this.isTeacher() ? 'teach' : 'student';

      // this.SocketIO.on('choseParticipant', (chosenId) => {

      this.$state.go(`participant-teach-results`, {
        classId: this.$state.params.classId,
        activityId: this.activity.id,
        isPlaying: true,
        disableSharing: true
      }, { replace: true });
      // });
    }
    else {


      // let role = this.isTeacher() ? 'teach' : 'student';

      this.SocketIO.on('choseParticipant', (chosenId) => {
        this.Choosen.setChosenId(chosenId);
        this.$state.go(`participant-student-results`, {
          classId: this.$state.params.classId,
          activityId: this.activity.id,
          isPlaying: true,
          disableSharing: true
        }, { replace: true });
      });
    }

  }

}
