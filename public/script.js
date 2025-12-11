const API = window.location.origin;

// ADD STUDENT
async function addStudent() {
    const data = {
        roll: document.getElementById("roll").value,
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        courses: document.getElementById("courses").value.split(",").map(c => c.trim())
    };

    await fetch(`${API}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    alert("Student Added!");
}

// SEARCH
async function searchStudent() {
    const key = document.getElementById("searchKey").value;

    const res = await fetch(`${API}/search/${key}`);
    const data = await res.json();

    const box = document.getElementById("results");
    box.innerHTML = "";

    data.forEach(s => {
        box.innerHTML += `
            <div class='student-box'>
                <b>${s.name}</b><br>
                Roll: ${s.roll}<br>
                Age: ${s.age}<br>
                Courses: ${s.courses.join(", ")}
            </div>
        `;
    });
}
