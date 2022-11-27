const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "989712",
  database: "Test",
});

db.connect((error) => {
  if (error) {
    console.log("Connection failed" + " " + error);
    return;
  }
  console.log("connected to database" + " " + db.threadId);
});

app.use(express.json());
app.use(cors());

app.get("/books", async (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (error, data) => {
    if (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
    return res.status(200).send({
      content: data,
    });
  });
});

app.post("/books", async (req, res) => {
  const q = "INSERT INTO books (`title`, `description`, `cover`) VALUES (?)";
  const values = [req.body.title, req.body.description, req.body.cover];
  db.query(q, [values], (error, data) => {
    if (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
    return res.status(201).send({
      content: data,
    });
  });
});

app.put("/books", async (req, res) => {
  bookId = req.query.book_id;
  const q =
    "UPDATE books SET `title` = ?, `description` = ?, `cover` = ? WHERE id = ?";
  const values = [req.body.title, req.body.description, req.body.cover];
  db.query(q, [...values, bookId], (error, data) => {
    if (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
    return res.status(201).send({
      content: data,
    });
  });
});

app.delete("/books", async (req, res) => {
  bookId = req.query.book_id;
  const q = `DELETE FROM books WHERE id=${bookId}`;
  db.query(q, (error, data) => {
    if (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
    return res.status(201).send({
      content: data,
    });
  });
});

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "I Am Alive",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
