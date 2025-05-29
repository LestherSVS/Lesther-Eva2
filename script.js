const students = [];
const tableBody = document.querySelector("#studentsTable tbody");
const averageDiv = document.getElementById("average");
const submitButton = document.getElementById("submitButton");
const editIndexInput = document.getElementById("editIndex");
const statsDiv = document.getElementById("stats");

document.getElementById("studentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const grade = parseFloat(document.getElementById("grade").value);
  const date = document.getElementById("date").value;

  if (!name || !lastName || isNaN(grade) || !date) {
    alert("Por favor completa todos los campos.");
    return;
  }

  const student = { name, lastName, grade, date };

  const editIndex = editIndexInput.value;
  if (editIndex === "") {
    students.push(student);
  } else {
    students[editIndex] = student;
    editIndexInput.value = "";
    submitButton.textContent = "Guardar Alumno";
  }

  renderTable();
  this.reset();
});

function renderTable() {
  tableBody.innerHTML = "";
  students.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.lastName}</td>
      <td>${formatDate(student.date)}</td>
      <td>${student.grade.toFixed(1)}</td>
      <td>
        <button onclick="editStudent(${index})">Editar</button>
        <button onclick="deleteStudent(${index})">Eliminar</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
  calculateAverage();
  updateStats();
}

function editStudent(index) {
  const student = students[index];
  document.getElementById("name").value = student.name;
  document.getElementById("lastName").value = student.lastName;
  document.getElementById("grade").value = student.grade;
  document.getElementById("date").value = student.date;
  editIndexInput.value = index;
  submitButton.textContent = "Actualizar Alumno";
}

function deleteStudent(index) {
  students.splice(index, 1);
  renderTable();
}

function calculateAverage() {
  if (students.length === 0) {
    averageDiv.textContent = "Promedio General del Curso : N/A";
    return;
  }
  const sum = students.reduce((acc, s) => acc + s.grade, 0);
  const avg = sum / students.length;
  averageDiv.textContent = `Promedio General del Curso : ${avg.toFixed(2)}`;
}

function updateStats() {
  const total = students.length;
  const mustTakeExam = students.filter(s => s.grade < 5.0).length;
  const exempted = students.filter(s => s.grade >= 5.0).length;

  statsDiv.innerHTML = `
    <p>Total de estudiantes: ${total}</p>
    <p>Estudiantes que deben rendir examen: ${mustTakeExam}</p>
    <p>Estudiantes eximidos: ${exempted}</p>
  `;
}

function formatDate(isoDate) {
  if (!isoDate) return "";
  const [y, m, d] = isoDate.split("-");
  return `${d}/${m}/${y}`;
}

renderTable();
