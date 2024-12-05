// Manage subjects
document.getElementById("subjectForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const newSubject = document.getElementById("newSubject").value.trim();
    if (newSubject) {
        addSubjectToLocalStorage(newSubject);
        displaySubjects();
        document.getElementById("newSubject").value = "";
    }
});

function addSubjectToLocalStorage(subject) {
    const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
    subjects.push(subject);
    localStorage.setItem("subjects", JSON.stringify(subjects));
}

function displaySubjects() {
    const subjectList = document.getElementById("subjectList");
    subjectList.innerHTML = "";
    const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
    subjects.forEach((subject, index) => {
        const li = document.createElement("li");
        li.textContent = subject;
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function () {
            subjects.splice(index, 1);
            localStorage.setItem("subjects", JSON.stringify(subjects));
            displaySubjects();
        });
        li.appendChild(removeButton);
        subjectList.appendChild(li);
    });
}

// Display subjects on page load
window.addEventListener("load", displaySubjects);

// Manage timetable settings
document.getElementById("saveSettings").addEventListener("click", function () {
    const totalDays = document.getElementById("totalDays").value;
    const slotsPerDay = document.getElementById("slotsPerDay").value;

    const settings = {
        totalDays: parseInt(totalDays),
        slotsPerDay: parseInt(slotsPerDay),
    };

    localStorage.setItem("timetableSettings", JSON.stringify(settings));
    alert("Settings saved successfully!");
});

// Load settings on page load
window.addEventListener("load", function () {
    const settings = JSON.parse(localStorage.getItem("timetableSettings"));
    if (settings) {
        document.getElementById("totalDays").value = settings.totalDays;
        document.getElementById("slotsPerDay").value = settings.slotsPerDay;
    }
});
