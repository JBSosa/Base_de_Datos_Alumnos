class Student {
  static countStudents = 0;

  constructor(name, lastName, age) {
    this._id = ++Student.countStudents;
    this._name = name;
    this._lastName = lastName;
    this._age = age;
    this._grade = [];
    this._group = null;
    this._classes = [];
  }

  get studentInfo() {
    return `ID: ${this._id} Name: ${this._name} ${this._lastName}, Age: ${this._age} Grade: ${this._grade}`;
  }

  addGrade(grade) {
    this._grade.push(grade);
  }

  addClass(className = "") {
    this._classes.push(className)
    classList.push(className);
  }

  addGroup(group = "") {
    this._group = group;
  }
}

class Class {
  static countClasses = 0;

  constructor(name) {
    this._id = ++Class.countClasses;
    this._name = name;
    this._studentsList = [];
  }
}

// Sample instances
const studentsList = [
  new Student("Juan", "Sosa", 24),
  new Student("Diana", "Vázquez", 25),
  new Student("Diego", "Barón", 24),
  new Student("Karla", "Cortéz", 27),
];
  
const classList = [new Class("Matemáticas")];

// App functions
let loadApp = () => {
  loadStudents();
};
  
const loadStudents = () => {
  studentsHTML = "";
  for (let student of studentsList) {
    studentsHTML += createStudent(student);
  }
  document.getElementById("studentList").innerHTML = studentsHTML;
};
  
const createStudent = (student) => {
  return `
    <div onclick="chargeData(${student._id})" class="studentContainer">${student._name} ${student._lastName}</div>
    `;
};
  
let removeElements = () => {
  document.getElementById("containerLeft").innerHTML = "";
};
  
let chargeData = (id) => {
  for (let student of studentsList) {
    if (student._id === id) {
      let studentData = `
        <div>
          <div>
            <h3>ID:</h3>
            <p>${student._id}</p>
            <h3>Nombre:</h3>
            <p>${student._name} ${student._lastName}</p>
            <h3>Edad:</h3>
            <p>${student._age}</p>
            <h3>Grupo:</h3>
            <p>${student._group}</p>
          </div>
          <h3>Clases:</h3>
          <div id="grades">
            <div>
              <p>${student._classes}</span></p>
            </div>
          </div>
          <div>
            <h3>Agregar Clase</h3>
            <input type="text" id="classInput" placeholder="Nombre de la clase">
            <input type="number" id="gradeInput" placeholder="Calificación">
          </div>
          <div>
            <button onclick="assignClasses(${student._id})">Agregar Clase</button>
            <button onclick="assignGroup(${student._id})">Asignar Grupo</button>
            <button onclick="deleteStudent(${student._id})">Eliminar alumno</button>
          </div>
        </div>`;
      document.getElementById("containerLeft").innerHTML = studentData;
    }
  }
  loadClasses(id);
};

let assignGroup = (studentId) => {
  const group = prompt("Ingresa el número de grupo");
  const student = findStudentById(studentId);
  student.addGroup(group);
  chargeData(studentId);
};
  
let deleteStudent = (id) => {
  const indexToDelete = studentsList.findIndex((student) => student._id === id);
  if (indexToDelete !== -1) {
    studentsList.splice(indexToDelete, 1);
    }
  document.getElementById("containerLeft").innerHTML = "";
  loadStudents();
};
  
let loadForm = () => {
  removeElements();
  
  let createForm = document.createElement("form");
  createForm.setAttribute("class", "studentForm");
  createForm.setAttribute("id", "studentForm");
  let leftContainer = document.querySelector(".containerLeft");
  leftContainer.appendChild(createForm);
  
  let formHtml = `
    <h2>Nombre</h2>
    <input type="text" id="newName" required minlength="1" placeholder="Introduce tu nombre">
    <h2>Apellido</h2>
    <input type="text" id="newLastName" required minlength="1"  placeholder="Introduce tu Apellido">
    <h2>Año de Nacimiento</h2>
    <input type="number" id="newYear" required minlength="1" placeholder="Introduce tu año de Nacimiento">
    <div>
    <button type="submit">Enviar</button>
    `;
  document.getElementById("studentForm").innerHTML = formHtml;
  
  createForm.addEventListener("submit", submitForm);
};
  
let addStudent = (name, lastName, yearOfBirth) => {
  let currentYear = new Date();
  yearOfBirth = currentYear.getFullYear() - yearOfBirth;
  let newStudent = new Student(name, lastName, yearOfBirth);
  studentsList.push(newStudent);
  console.log("Nuevo estudiante añadido:", newStudent);
};
  
let submitForm = (event) => {
  event.preventDefault();
  
  let name = document.getElementById("newName").value;
  let lastName = document.getElementById("newLastName").value;
  let yearOfBirth = document.getElementById("newYear").value;
  
  addStudent(name, lastName, parseInt(yearOfBirth));
  loadForm();
  loadStudents();
};
  
let loadClasses = (studentId) => {
  const student = findStudentById(studentId)

  let classHTML = "";
  for (let i = 0; i < student._classes.length; i++) {
    let subject = student._classes[i];
    let grade = student._grade[i];
    classHTML += createClass(subject, grade);
  }

  document.getElementById("grades").innerHTML = classHTML;
};
  
let createClass = (subject, grade) => {
  let estado = "";

  if (grade > 10) {
    grade = 10
  } else if (grade < 0) {
    grade = 0
  }

  if (grade > 7) {
    estado = "Aprobado"
  } else {
    estado = "Reprobado"
  }

  return `
    <div>
      <p>Clase: ${subject._name} <span> Calificación: ${grade} </span> <span>Estado: ${estado}</span></p>
    </div>
  `;
};
  
let assignClasses = (studentId) => {
  const className = document.getElementById('classInput').value;
  const grade = document.getElementById('gradeInput').value;
  const student = findStudentById(studentId)
  const clase = new Class(className);
  student.addClass(clase);
  student.addGrade(grade);
  loadClasses(studentId);
};
  
const findStudentById = (studentId) => {
  return studentsList.find((student) => student._id === studentId);
};  

let search = () => {
  var searchQuery = document.getElementById("searchInput").value;

  var searchQueryLower = searchQuery.toLowerCase();

  for (let student of studentsList) {
    if (student._name.toLowerCase() === searchQueryLower ||
      student._lastName.toLowerCase() === searchQueryLower ||
      (student._name +' '+ student._lastName).toLowerCase() === searchQueryLower ||
      student._id === parseInt(searchQuery, 10)) {
    chargeData(student._id);
    return;
    }
  }
}