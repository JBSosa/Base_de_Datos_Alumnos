class Student {
  static countStudents = 0;

  constructor(name, lastName, age) {
    this._id = ++Student.countStudents;
    this._name = name;
    this._lastName = lastName;
    this._age = age;
    this._grade = null;
  }

  get studentInfo() {
    return `ID: ${this._id} Name: ${this._name} ${this._lastName}, Age: ${this._age} Grade: ${this._grade}`;
  }

  set grade(grade) {
    this._grade = grade;
  }

  addClass(className = "") {
    classList.push(className);
  }
}

class Class {
  static countClasses = 0;

  constructor(name) {
    this._id = ++Class.countClasses;
    this._name = name;
    this._studentsList = [];
  }

  addStudent(student) {
    studentsList.push(student);
  }

  setGrade(student, grade) {
    student.grade = grade;
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

setGrade()

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
          </div>
          <div id="grades">
            <div>
              <p>Class <span>10</span> <span>Estado: APROBADO</span></p>
            </div>
          </div>
            <input type="text" id="classInput" placeholder="Nombre de la clase">
          <div>
            <button onclick="assignClasses(${student._id})">Agregar</button>
            <button onclick="deleteStudent(${student._id})">Eliminar estudiante</button>
          </div>
        </div>`;
      document.getElementById("containerLeft").innerHTML = studentData;
    }
  }
  loadClasses();
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
  
let loadClasses = () => {
  let classHTML = "";
  for (subject of classList) {
    classHTML += createClass(subject);
  }
  document.getElementById("grades").innerHTML = classHTML;
};
  
let createClass = (subject) => {
  return `
    <div>
      <p>Clase: ${subject._name} <span> Calificación: ${subject._grade} </span> <span>Estado: APROBADO</span></p>
    </div>
  `;
};
  
let assignClasses = (studentId) => {
  const className = document.getElementById('classInput').value;
  const student = findStudentById(studentId);
  student.addClass(new Class(className));
  loadClasses();
};
  
const findStudentById = (studentId) => {
  return studentsList.find((student) => student._id === studentId);
};  