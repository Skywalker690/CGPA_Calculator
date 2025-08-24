const gradePoints = {
        'S': 10, 'A+': 9, 'A': 8.5, 'B+': 8, 'B': 7.5, 'C+': 7, 'C': 6.5, 'D': 6, 'P': 5.5, 'F': 0
};

function showForm() {
    document.getElementById('main-page').style.display = 'none';
    document.getElementById('form-page').style.display = 'block';
}

function showMain() {
    document.getElementById('form-page').style.display = 'none';
    document.getElementById('main-page').style.display = 'block';
}

function calculateSGPA(semester) {
    let totalCredits = 0;
    let totalGradePoints = 0;
    const credits = document.querySelectorAll(`.sem${semester}-credit`);
    const grades = document.querySelectorAll(`.sem${semester}-grade`);

    for (let i = 0; i < credits.length; i++) {
        const credit = parseInt(credits[i].value);
        const grade = grades[i].value;
        const points = gradePoints[grade] || 0;
        totalCredits += credit;
        totalGradePoints += credit * points;
    }

    const sgpa = totalCredits > 0 ? (totalGradePoints / totalCredits) : 0;
    document.getElementById(`sgpa-button-sem${semester}`).textContent = ` SGPA: ${sgpa.toFixed(2)}`;
    return { sgpa, totalCredits };
}

function calculateCGPA() {
    const sem1Data = calculateSGPA(1);
    const sem2Data = calculateSGPA(2);
    const sem3Data = calculateSGPA(3);
    const totalCredits = sem1Data.totalCredits + sem2Data.totalCredits + sem3Data.totalCredits;
    const weightedSGPA = (sem1Data.sgpa * sem1Data.totalCredits) + (sem2Data.sgpa * sem2Data.totalCredits) + (sem3Data.sgpa * sem3Data.totalCredits);
    const cgpa = totalCredits > 0 ? (weightedSGPA / totalCredits).toFixed(2) : '0.00';
    document.getElementById('cgpa-text').textContent = `Total CGPA: ${cgpa}`;
}

function clearGrades(semester) {
    const grades = document.querySelectorAll(`.sem${semester}-grade`);
    grades.forEach(grade => {
        grade.value = 'F';
    });
    calculateCGPA();
}

function updateAll() {
    calculateCGPA();
}

calculateCGPA();

// Subject data structure for each semester
const semesterSubjects = {
    1: [
        'Discrete Mathematics',
        'Engineering Chemistry and Advanced Materials',
        'Python for Engineers',
        'Introduction to Computing Essentials',
        'Basics of Electrical and Electronics Engineering',
        'Technical English and Soft Skills'
    ],
    2: [
        'Linear Algebra and Probability',
        'Fundamentals of Engineering Physics',
        'Essential foundations of Digital Logic',
        'Computer Programming in C & Shell Scripting',
        'Computer Hardware Essentials',
        'Engineering Economics'
    ],
    3: [
        'Number Theory, Transforms and Queueing Theory',
        'Data Structures and Algorithms',
        'Object Oriented Programming',
        'Computer Organization and Architecture',
        'Universal Human Values - II',
        'Essentials of Office Automation',
        'Data Structures Lab',
        'Object Oriented Programming Lab'
    ]
};

function openAttendance(semester) {
    const subjects = semesterSubjects[semester];
    const subjectsParam = encodeURIComponent(JSON.stringify(subjects));
    const url = `attendance.html?semester=${semester}&subjects=${subjectsParam}`;
    window.location.href = url;
}


