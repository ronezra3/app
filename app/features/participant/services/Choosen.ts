export class Choosen {
  chosenId;

  setChosenId(id) {
    this.chosenId = id;
  }
  
  getChosenId() {
    return this.chosenId ? this.chosenId : "1";
  }
  

}
