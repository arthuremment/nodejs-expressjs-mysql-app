const mysql = require('mysql');
const express = require('express')
const bodyParser = require('body-parser')
const cors =  require("cors")

const app = express()
const port = 4000
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.listen(port, () => {
    console.log(`Serveur demarré sur le port ${port}`)
})

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "phone_directory"
});

connection.connect((err) => {
    if (err) {
        console.error("Erreur de connexion à la base de données:", err)
        return;
    }
    console.log("Connexion à la base de données réussie")
})


//CREATE
app.post('/', (req, res) => {
    const { name, phone } = req.body;
    const query = 'INSERT INTO contacts (name, phone) VALUES (?, ?)';
    connection.query(query, [name, phone], (err, results) => {
        if (err) {
            console.error("Erreur lors de la création du contact:", err);
            res.send(500).send('Erreur lors de la création du contact');
            return ;
        }
        res.sendStatus(201)
    })
})

//READ
app.get('/', (_, res) => {
    const query = 'SELECT * FROM contacts';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des contacts:', err);
            res.status(500).send('Erreur lors de la récupération des contacts')
            return ;
        }
        res.json(results)
    })
})

app.get('/', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM contacts WHERE id = ?';
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération du contact:', err);
            res.status(500).send('Erreur lors de la récupération du contact')
            return ;
        }
        res.json(result)
    })
})

//UPDATE
app.put('/:id', (req, res) => {
    const id = req.params.id;
    const { name, phone } = req.body;
    connection.query('UPDATE contacts SET name = ?, phone = ? WHERE id = ?', [name, phone, id], (error, results) => {
      if (error) {
        console.log('Erreur lors de la mise à jour:', error)
        res.sendStatus(500)
      } else {
        console.log('Mise à jour réussie !')
        res.sendStatus(200)
      }
    });
  });


//DELETE
app.delete('/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM contacts WHERE id = ?', [id], (error, results) => {
      if (error) {
        console.error('Erreur lors de la suppression du contact:', error)
        res.status(500).send('Erreur lors de la suppression du contact')
        return ;
      }
      res.sendStatus(200)
    });
  });

  // constructor
const Contact = function(contact) {
    this.name = tutorial.name;
    this.phone = tutorial.phone;
  };


  app.delete('/:id', (req, res) => {
    Contact.updateById = (id, contact, result) => {
        sql.query(
          "UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?",
          [tutorial.name, tutorial.phone, id],
          (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }
      
            if (res.affectedRows == 0) {
              // not found Tutorial with the id
              result({ kind: "not_found" }, null);
              return;
            }
      
            console.log("updated contact: ", { id: id, ...contact });
            result(null, { id: id, ...contact });
          }
        );
      };
  })

  