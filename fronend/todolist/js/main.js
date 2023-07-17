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

let areaListTask = $('#area-list-task');
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
    .done(function (response) {
      const { success } = response;
      if (response.data && success) {
        const data = response.data;
        console.log(data);
        const html = $.map(data, function (item, index) {
          return `
          <tr>
              <td>${index}</th>
              <td>${item.name}</td>
              <td><span class="badge bg-danger"></span></td>
              <td>
                  <button class="btn btn-warning">Edit</button>
                  <button class="btn btn-danger">Delete</button>
              </td>
          </tr>
          `
        }).join(',');

        areaListTask.html(html);
      }
    });
};

$(document).ready(function () {
  getTaskList();
});