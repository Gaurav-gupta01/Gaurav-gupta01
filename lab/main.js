const studentForm = document.getElementById("studentForm");
const tableBody = document.getElementById("tableBody");
// TRACKING STATE
let studentData = JSON.parse(window.localStorage.getItem("students")) || [];
let editIndex = -1; // -1 means we are in "Add" mode


// Initial Load
displayData();
// 1. Handle Form Submission (Add OR Update)
studentForm.addEventListener("submit", function (e) {
    // e.preventDefault();
    const student = {
        name: document.getElementById("Name").value,
        roll: document.getElementById("rollno").value,
        Class: document.getElementById("Class").value,
    };
    if (editIndex === -1) {
        // ADD MODE
        studentData.push(student);
    } else {
        // EDIT MODE
        studentData[editIndex] = student;
        editIndex = -1; // Reset to add mode
    }
    saveAndRefresh();
    resetForm();
});
// 2. Load Data into Form for Editing
function editRow(index) {
    editIndex = index;
    const student = studentData[index];
    // Fill inputs
    document.getElementById("Name").value = student.name;
    document.getElementById("rollno").value = student.roll;
    document.getElementById("Class").value = student.Class;
    window.scrollTo(0, 0); // Scroll up to see the form
}
// 3. Delete Data
function deleteRow(index) {
    if ("Delete this student?") {
        studentData.splice(index, 1);
        saveAndRefresh();
        if (editIndex !== -1) resetForm(); // Reset if user deletes what they were editing
    }
}
// 4. Helper: Save to LocalStorage and Refresh Table
function saveAndRefresh() {
    window.localStorage.setItem("students", JSON.stringify(studentData));
    displayData();
}
// 5. Helper: Display Data in Table
function displayData() {
    tableBody.innerHTML = "";
    if (studentData.length === 0) {
        tableBody.innerHTML =
            '<tr><td colspan="5" class="text-center text-muted py-4">No records found.</td></tr>';
        return;
    }
    studentData.forEach((student, index) => {
        tableBody.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td><strong>${student.name}</strong></td>
                    <td>${student.roll}</td>
                    <td>${student.Class}</td>
                    <td class="text-center">
                        <button onclick="editRow(${index})" class="btn btn-sm btn-success me-1">Edit</button>
                        <button onclick="deleteRow(${index})" class="btn btn-sm btn-danger">Delete</button>
                    </td>
            </tr>
        `;
    });
}

// 6. Helper: Reset Form to "Add" State
function resetForm() {
    editIndex = -1;
    studentForm.reset();
}
