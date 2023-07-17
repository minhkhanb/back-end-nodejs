const express = require('express');
const cors = require('cors');
const { connectDatabase } = require('@src/config/database');
const { notFound, errorHandler } = require('@src/middlewares');

const app = express();

// Connect to database
connectDatabase();

app.use(express.json());
app.use(cors());

const courses = [
  {
    id: '1',
    name: 'NodeJS',
  },
  {
    id: '2',
    name: 'VueJS',
  },
  {
    id: '3',
    name: 'Typescript',
  },
];

app.use('/api/v1', require('@src/routes'));

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/api/course', (req, res) => {
  res.send(courses);
});

app.get('/api/course/:id', (req, res) => {
  const courseId = req.params.id;

  const course = courses.find((course) => course.id === courseId);

  if (!course) {
    res.status(404).send({ success: false, message: 'Course does not exist.' });
  }

  res.send(course);
});

app.post('/api/course/add', (req, res) => {
  const course = {
    id: req.body.id,
    name: req.body.name,
  };

  courses.push(course);

  res.send({ success: true, data: course, message: 'Add course successfully' });
});

app.put('/api/course/update/:id', (req, res) => {
  const courseId = req.params.id;
  const indexOfCourse = courses.findIndex((course) => course.id === courseId);

  if (indexOfCourse === -1) {
    res.status(404).send({ success: false, message: 'Course not found' });
  }

  courses[indexOfCourse] = {
    ...courses[indexOfCourse],
    name: req.body.name,
  };

  res.send({
    success: true,
    data: courses[indexOfCourse],
    message: 'Update course successfully',
  });
});

app.delete('/api/course/delete/:id', (req, res) => {
  const courseId = req.params.id;
  const indexOfCourse = courses.findIndex((course) => course.id === courseId);

  if (indexOfCourse === -1) {
    res.status(404).send({ success: false, message: 'Course not found' });
  }

  courses.splice(indexOfCourse, 1);

  res.send({ success: true, message: 'Delele course successfully' });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
