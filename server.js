const express = require("express");
const fs = require("fs-extra");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const DATA_FILE = "database.json";

// READ ALL STUDENTS
app.get("/students", async (req, res) => {
    const data = await fs.readJson(DATA_FILE);
    res.send(data);
});

// ADD STUDENT
app.post("/add", async (req, res) => {
    const student = req.body;
    const data = await fs.readJson(DATA_FILE);

    data.push(student);
    await fs.writeJson(DATA_FILE, data, { spaces: 2 });

    res.send({ message: "Student Added", student });
});

// SEARCH STUDENT
app.get("/search/:key", async (req, res) => {
    const key = req.params.key.toLowerCase();
    const data = await fs.readJson(DATA_FILE);

    const result = data.filter(s =>
        s.name.toLowerCase().includes(key) ||
        s.roll.toLowerCase().includes(key) ||
        s.courses.some(c => c.toLowerCase().includes(key))
    );

    res.send(result);
});

// UPDATE STUDENT
app.put("/update/:roll", async (req, res) => {
    const roll = req.params.roll;
    const updated = req.body;
    let data = await fs.readJson(DATA_FILE);

    data = data.map(s => s.roll === roll ? updated : s);

    await fs.writeJson(DATA_FILE, data, { spaces: 2 });

    res.send({ message: "Updated Successfully" });
});

// DELETE STUDENT
app.delete("/delete/:roll", async (req, res) => {
    const roll = req.params.roll;
    let data = await fs.readJson(DATA_FILE);

    data = data.filter(s => s.roll !== roll);

    await fs.writeJson(DATA_FILE, data, { spaces: 2 });

    res.send({ message: "Deleted Successfully" });
});

// START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
