import express from "express";
import fs from "fs";

const app = express();

// middleware to parse JSON request bodies
app.use(express.json());



// ---------- helper functions ----------
const readData = () => {
  return JSON.parse(fs.readFileSync("./data/faculty.json", "utf-8"));
};

const writeData = (data) => {
  fs.writeFileSync("./data/faculty.json", JSON.stringify(data, null, 2), "utf-8");
};

// ---------- CREATE a faculty ----------
// POST http://localhost:8080/api/v1/faculty
app.post("/api/v1/faculty", (req, res) => {
  const faculty = readData();

  const newFaculty = {
    id: faculty.length > 0 ? faculty[faculty.length - 1].id + 1 : 1,
    ...req.body,
  };

  faculty.push(newFaculty);
  writeData(faculty);

  res.status(201).json({
    message: "Faculty created successfully",
    data: newFaculty,
  });
});

// ---------- READ all faculty (optional filter by dept) ----------
// GET http://localhost:8080/api/v1/faculty
// GET http://localhost:8080/api/v1/faculty?dept=CSE
app.get("/api/v1/faculty", (req, res) => {
  const { dept } = req.query;
  let faculty = readData();

  if (dept) {
    faculty = faculty.filter((fac) => fac.dept === dept);
  }

  res.status(200).json({
    message: "All faculty fetched",
    data: faculty,
  });
});

// ---------- READ a faculty by id ----------
// GET http://localhost:8080/api/v1/faculty/:id
app.get("/api/v1/faculty/:id", (req, res) => {
  const facultyId = parseInt(req.params.id);
  const faculty = readData();

  const facultyDetails = faculty.find((fac) => fac.id === facultyId);

  if (facultyDetails) {
    res.status(200).json({
      message: "Faculty details fetched successfully",
      data: facultyDetails,
    });
  } else {
    res.status(404).json({ message: "Faculty Not found" });
  }
});

// ---------- UPDATE a faculty by id ----------
// PUT http://localhost:8080/api/v1/faculty/:id
// payload: { "name": "ABC", "dept": "CSE" }
app.put("/api/v1/faculty/:id", (req, res) => {
  const facultyId = parseInt(req.params.id);
  const faculty = readData();

  const index = faculty.findIndex((fac) => fac.id === facultyId);

  if (index !== -1) {
    // keep the original id even if the body contains a different one
    const updatedFaculty = { ...faculty[index], ...req.body, id: facultyId };

    faculty[index] = updatedFaculty;
    writeData(faculty);

    res.status(200).json({
      message: "Faculty updated successfully",
      data: updatedFaculty,
    });
  } else {
    res.status(404).json({ message: "Faculty Not found" });
  }
});

// ---------- DELETE a faculty by id ----------
// DELETE http://localhost:8080/api/v1/faculty/:id
app.delete("/api/v1/faculty/:id", (req, res) => {
  const facultyId = parseInt(req.params.id);
  const faculty = readData();

  const index = faculty.findIndex((fac) => fac.id === facultyId);

  if (index !== -1) {
    const deletedFaculty = faculty.splice(index, 1)[0];
    writeData(faculty);

    res.status(200).json({
      message: "Faculty deleted successfully",
      data: deletedFaculty,
    });
  } else {
    res.status(404).json({ message: "Faculty Not found" });
  }
});

// ---------- START SERVER ----------
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});