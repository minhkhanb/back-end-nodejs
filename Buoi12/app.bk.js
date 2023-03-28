let URL = ' http://localhost:3000/course';
let editingId = '';

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


let btnSubmit = document.querySelector('#sub');
btnSubmit.addEventListener('click', (e) => {
  // let name = document.querySelector('input[name="name"]').value;
  // let title = document.querySelector('input[name="title"]').value;
  // let data = {name, title};
  // fetch(URL, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     // 'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   body: JSON.stringify(data),
  // })
  //   .then((res) => res.json)
  //   .then((coure) => {
  //     let html = '';
  //     coure.forEach(coure => {
  //       html += `
  //           <div>
  //               <li>${coure.id}</li>
  //               <h3>${coure.name}</h3>
  //               <p>${coure.title}</p>
  //               <button id="delete">xóa</button>
  //           </div>
  //       `;
  //     });
  //     document.querySelector('#course').innerHTML = html;
  //   });

  let name = document.querySelector('input[name="name"]').value;
  let title = document.querySelector('input[name="title"]').value;

  let data = {name, title};

  if (!editingId) return;

  fetch(URL + '/' + editingId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((course) => {
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
    });
});

function deleteCoure(id) {

  fetch(URL + '/' + id, {
    method: 'DELETE'
  })
    .then((res) => res.json)
    .then((coure) => {
      let html = '';
      coure.forEach(coure => {
        html += `
                <div>
                    <li>${coure.id}</li>
                    <h3>${coure.name}</h3>
                    <p>${coure.title}</p>
                    <button id="delete">xóa</button>
                </div>
            `;
      });
      document.querySelector('#course').innerHTML = html;
    });
}

function edit(id) {
  console.log('id: ', id);
  fetch(URL + '/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then((res) => res.json())
    .then((course) => {
      const {name, title} = course;

      document.querySelector('input[name="name"]').value = name;
      document.querySelector('input[name="title"]').value = title;

      editingId = id;
    });
}