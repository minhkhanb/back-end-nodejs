let btnSubmit = document.getElementById('btn-submit');
let eleName = document.getElementById('name');
let eleEmail = document.getElementById('email');
let eleJob = document.getElementById('job');

const clearStorage = document.querySelector('#btn-clear');

const storage = {
  loadData() {
    const eleNameValue = localStorage.getItem('Name');
    const eleEmailValue = localStorage.getItem('Email');
    const eleJobValue = localStorage.getItem('Job');

    console.log(eleNameValue, eleEmailValue, eleJobValue);

    this.setData(eleNameValue, eleEmailValue, eleJobValue);
  },
  setData(name, email, job) {
    eleName.value = name;
    eleEmail.value = email;
    eleJob.value = job;
  },
  saveData(name, email, job) {
    localStorage.setItem('Name', name);
    localStorage.setItem('Email', email);
    localStorage.setItem('Job', job);
  },
  clearData() {
    localStorage.removeItem('Name');
    localStorage.removeItem('Email');
    localStorage.removeItem('Job');

    this.setData('', '', '');

    eleName.focus();
  }
};

storage.loadData();

btnSubmit.onclick = function () {
  let fullName = eleName.value;
  let mail = eleEmail.value;
  let cv = eleJob.value;

  storage.saveData(fullName, mail, cv);
};

clearStorage.onclick = function () {
  storage.clearData();
};