
const form = document.getElementById("registrationForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    document.querySelectorAll(".error").forEach(function(error) {
        error.textContent = "";
    });

    document.getElementById("success").textContent = "";

    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();
    const email = document.getElementById("email").value.trim();
    const course = document.getElementById("course").value;
    const password = document.getElementById("password").value;
    const file = document.getElementById("document").files[0];

    let valid = true;

    if (name === "") {
        document.getElementById("nameError").textContent =
            "Name is required";
        valid = false;
    }

    if (roll === "") {
        document.getElementById("rollError").textContent =
            "Roll number is required";
        valid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById("emailError").textContent =
            "Enter a valid email address";
        valid = false;
    }

    if (course === "") {
        document.getElementById("courseError").textContent =
            "Please select a course";
        valid = false;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password)) {
        document.getElementById("passwordError").textContent =
            "Use 8+ characters with uppercase, lowercase, number and symbol";
        valid = false;
    }

    if (!file) {
        document.getElementById("documentError").textContent =
            "Please upload a document";
        valid = false;
    } else {
        const allowed = ["application/pdf", "image/jpeg", "image/png"];

        if (!allowed.includes(file.type)) {
            document.getElementById("documentError").textContent =
                "Upload a PDF, JPG or PNG file";
            valid = false;
        } else if (file.size > 2 * 1024 * 1024) {
            document.getElementById("documentError").textContent =
                "File size must be below 2 MB";
            valid = false;
        }
    }

    if (!valid) return;

    const students = JSON.parse(
        localStorage.getItem("students") || "[]"
    );

    const duplicate = students.some(function(student) {
        return student.roll.toLowerCase() === roll.toLowerCase();
    });

    if (duplicate) {
        document.getElementById("rollError").textContent =
            "This roll number is already registered";
        return;
    }

    const student = {
        name: name,
        roll: roll,
        email: email,
        course: course,
        document: file.name
    };

    students.push(student);

    localStorage.setItem("students", JSON.stringify(students));

    document.getElementById("success").textContent =
        "Registration successful!";

    form.reset();
});
