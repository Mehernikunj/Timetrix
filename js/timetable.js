document.addEventListener("DOMContentLoaded", () => {
    const subjectsContainer = document.getElementById("subjects-container");
    const addSubjectButton = document.getElementById("add-subject");
    const timetableForm = document.getElementById("timetable-form");
    const timetableBody = document.getElementById("timetable-body");
    const timetableType = document.getElementById("timetableType");
    const activityLabel = document.getElementById("activityLabel");
    const totalTimesDiv = document.getElementById("total-times");
    const clearButton = document.getElementById("clear-form");
    const toggleThemeButton = document.getElementById("toggle-theme");

    const startTimes = {
        Monday: "09:00",
        Tuesday: "09:00",
        Wednesday: "09:00",
        Thursday: "09:00",
        Friday: "09:00"
    };

    let subjectCount = 1;

    const updateActivityLabel = () => {
        switch (timetableType.value) {
            case "School":
            case "College":
                activityLabel.textContent = "Subject:";
                break;
            case "Gym":
                activityLabel.textContent = "Exercise:";
                break;
            case "Office":
                activityLabel.textContent = "Work:";
                break;
            case "Hospital":
                activityLabel.textContent = "Doctor Specialization:";
                break;
            case "Other":
                activityLabel.textContent = "Task:";
                break;
            default:
                activityLabel.textContent = "";
        }
    };

    const addSubject = () => {
        const subjectGroup = document.createElement("div");
        subjectGroup.classList.add("subject-group");

        subjectGroup.innerHTML = `
            <label>Subject/Activity:</label>
            <input type="text" class="subject" required>
            <label>Duration (in minutes):</label>
            <input type="number" class="duration" required min="1">
            <label>Preferred Day:</label>
            <select class="preferredDay" required>
                <option value="">Select Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
            </select>
        `;
        
        subjectsContainer.appendChild(subjectGroup);
        subjectCount++;
    };

    const generateTimetable = (event) => {
        event.preventDefault();
        const subjects = document.querySelectorAll(".subject");
        const durations = document.querySelectorAll(".duration");
        const preferredDays = document.querySelectorAll(".preferredDay");

        const timetableData = {};
        let totalDuration = {};

        // Clear existing table data
        timetableBody.innerHTML = "";
        totalTimesDiv.innerHTML = "";

        subjects.forEach((subject, index) => {
            const day = preferredDays[index].value;
            const duration = parseInt(durations[index].value);

            if (day) {
                if (!timetableData[day]) {
                    timetableData[day] = [];
                    totalDuration[day] = 0;
                }

                const startTime = startTimes[day];
                const endTime = addMinutesToTime(startTime, duration);
                timetableData[day].push({
                    type: timetableType.value,
                    subject: subject.value,
                    startTime: startTime,
                    endTime: endTime
                });

                totalDuration[day] += duration;

                // Update the start time for the next subject
                startTimes[day] = endTime;
            }
        });

        // Generate timetable rows
        for (const day in timetableData) {
            timetableData[day].forEach(item => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${item.type}</td>
                    <td>${day}</td>
                    <td>${item.subject}</td>
                    <td>${item.startTime}</td>
                    <td>${item.endTime}</td>
                `;
                timetableBody.appendChild(row);
            });
            totalTimesDiv.innerHTML += `<p>Total time for ${day}: ${totalDuration[day]} minutes</p>`;
        }
    };

    const addMinutesToTime = (startTime, minutes) => {
        const [hours, mins] = startTime.split(":").map(Number);
        const totalMinutes = hours * 60 + mins + minutes;
        const newHours = Math.floor(totalMinutes / 60) % 24;
        const newMinutes = totalMinutes % 60;
        return `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(2, "0")}`;
    };

    const clearForm = () => {
        subjectsContainer.innerHTML = "";
        subjectCount = 1;
        startTimes.Monday = "09:00";
        startTimes.Tuesday = "09:00";
        startTimes.Wednesday = "09:00";
        startTimes.Thursday = "09:00";
        startTimes.Friday = "09:00";
        totalTimesDiv.innerHTML = "";
        timetableBody.innerHTML = "";
        timetableForm.reset();
        updateActivityLabel();
    };

    const toggleTheme = () => {
        document.body.classList.toggle("dark-mode");
    };

    // Event Listeners
    addSubjectButton.addEventListener("click", addSubject);
    timetableForm.addEventListener("submit", generateTimetable);
    clearButton.addEventListener("click", clearForm);
    timetableType.addEventListener("change", updateActivityLabel);
    toggleThemeButton.addEventListener("click", toggleTheme);

    // Initialize with first subject
    addSubject();
});
