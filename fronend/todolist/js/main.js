console.log('Cố gắng thực hành nhé!');
console.log('Yes, sir!');

const apiUrl = 'http://localhost:3000/api/v1';
const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE'
};

let areaListTask = $('area-list-task');
let areaForm = $('area-form');
let btnToggleForm = $('btn-submit');
let inputID = $('input-id');
let inputName = $('input-name');
let inputStatus = $('input-status');

const getTaskList = () => {
  $.ajax({
    method: METHODS.GET,
    url: `${apiUrl}/item`,
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .done(function (data) {
      console.log(data);
    });
};

$(document).ready(function () {
  getTaskList();
});