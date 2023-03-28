let URL = ' http://localhost:3000/course';
let editingId = '';
let action = 'add';

// - format code -
const getCourses = () => {
  fetch(URL)
    .then((res) => res.json())
    .then((courses) => {
      let html = '';
      courses.forEach(coure => {
        html += `
            <div>
                <li>${coure.id}</li>
                <h3>${coure.name}</h3>
                <p>${coure.title}</p>
                <button onClick="deleteCoure(${coure.id})">xóa</button>
                <button onClick="edit(${coure.id})">edit</button>
            </div>
        `;
      });
      document.querySelector('#course').innerHTML = html;
    });
};

getCourses();


let btnSubmit = document.querySelector('#sub');
btnSubmit.addEventListener('click', (e) => {
  let name = document.querySelector('input[name="name"]').value;
  let title = document.querySelector('input[name="title"]').value;
  let data = {name, title};

  if (action === 'add') {
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json)
      .then(() => {
        getCourses();
      });
  } else if (action === 'edit') {
    if (!editingId) return;

    fetch(URL + '/' + editingId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        getCourses();
      });

    editingId = null;
    action = 'add';
    btnSubmit.innerHTML = 'submit';

    document.querySelector('input[name="name"]').value = '';
    document.querySelector('input[name="title"]').value = '';

    document.querySelector('input[name="name"]').focus();
  }
});

function deleteCoure(id) {

  fetch(URL + '/' + id, {
    method: 'DELETE'
  })
    .then((res) => res.json)
    .then(() => {
      getCourses();
    });
}

function edit(id) {
  fetch(URL + '/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((course) => {
      const {name, title} = course;

      document.querySelector('input[name="name"]').value = name;
      document.querySelector('input[name="title"]').value = title;

      editingId = id;
      action = 'edit';

      btnSubmit.innerHTML = 'Chỉnh sửa';
    });
}