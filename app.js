const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const fs = require('fs');
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// middleware
app.get('/', (req, res) => {
  fs.readFile('note.json', (err, data) => {
    if (err) throw err;
    let note = JSON.parse(data);
    res.json(note)
  });
});

app.post('/', (req, res) => {
  fs.readFile('note.json', (err, data) => {
    if (err) throw err;
    let note = JSON.parse(data);
    note.push(req.body)
    console.log(note);
    let stringNote = JSON.stringify(note);

    fs.writeFile('note.json', stringNote, (err, data) => {
      if (err) throw err;

    });
    res.json(note);
  });
});

app.put('/', (req, res) => {
  fs.readFile('note.json', (err, data) => {
    if (err) throw err;
    let note = JSON.parse(data);
    note.push(req.body)
    console.log(note);
    let stringNote = JSON.stringify(note);

    fs.writeFile('note.json', stringNote, (err) => {
      if (err) throw err;
      res.send('Data written to file');
    });
  });
})

app.delete("/:id", (req, res) => {
  fs.readFile('note.json', (err, data) => {
    if (err) throw err;
    let note = JSON.parse(data);


    const removedArr = note.filter(todo => todo.id != req.params.id);
    let stringNote = JSON.stringify(removedArr);
    fs.writeFile('note.json', stringNote, (err) => {
      if (err) throw err;
      res.send('Data written to file');
    });
    res.json(removedArr)
  });
})

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
