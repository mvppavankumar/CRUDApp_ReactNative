import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();
const port = 3301;

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "QWERT!@#$%",
    database: "crudhybridapp"
});
// app.use(cors({
//     origin: ["http://192.168.100.121:3301"],
//     methods: ["POST", "GET"],
//     credentials: true
// }))
app.use(cors());
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1); // Exit the process on connection error
    } else {
        console.log('Connected to MySQL');
    }
});
// app.use(cors({
//     origin: ["http://192.168.100.118:3300"],
//     methods: ["POST", "GET"],
//     credentials: true
// }))
app.post('/addBooks', async (req, res) => {
    try {
        console.log("REQUEST");
        console.log(req.body);

        const { bookName, bookAuthor, email, addedBy } = req.body;
        console.log(req.body)

        const sql = `INSERT INTO tbl_books (name, author, date_added, email, added_by) 
            VALUES (?, ?, CURRENT_TIMESTAMP, ?, ?)`;


        const result = await query(sql, [bookName, bookAuthor, email, addedBy]);

        console.log('Record inserted successfully');
        res.status(200).json({ ok: true, message: 'Record inserted successfully' });
    } catch (error) {
        console.error('Error inserting record:', error);
        res.status(500).json({ ok: false, message: 'Internal Server Error' });
    }
});
app.get('/books', (req, res) => {
    const { search } = req.query;

    if (search) {
        // If there's a search query, perform a search
        const sql = 'SELECT * FROM tbl_books WHERE name LIKE ? OR author LIKE ?';
        const searchQuery = `%${search}%`;

        db.query(sql, [searchQuery, searchQuery], (err, result) => {
            if (err) {
                console.error('Error executing search query:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log(result);
                res.status(200).json(result);
            }
        });
    } else {
        // If no search query, fetch all books
        const sql = 'SELECT * FROM tbl_books';

        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log(result);
                res.status(200).json(result);
            }
        });
    }
});
app.get('/books/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM tbl_books WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log(result);
            res.status(200).json(result);
        }
    });
});
app.put('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { bookName, bookAuthor, email, addedBy } = req.body;
        console.log(req.body);
        console.log(req);
        const sql = `
        UPDATE tbl_books
        SET
          name = ?,
          author = ?,
          email = ?,
          added_by = ?
        WHERE id = ?
      `;

        const result = await query(sql, [bookName, bookAuthor, email, addedBy, id]);

        if (result.affectedRows > 0) {
            console.log(`Book with id ${id} updated successfully`);
            res.status(200).json({ ok: true, message: 'Book updated successfully' });
        } else {
            console.error(`Book with id ${id} not found`);
            res.status(404).json({ ok: false, message: 'Book not found' });
        }
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ ok: false, message: 'Internal Server Error' });
    }
});
app.delete('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const sql = `
            DELETE FROM tbl_books
            WHERE id = ?
        `;

        const result = await query(sql, [id]);

        if (result.affectedRows > 0) {
            console.log(`Book with id ${id} deleted successfully`);
            res.status(200).json({ ok: true, message: 'Book deleted successfully' });
        } else {
            console.error(`Book with id ${id} not found`);
            res.status(404).json({ ok: false, message: 'Book not found' });
        }
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ ok: false, message: 'Internal Server Error' });
    }
});

function query(sql, params) {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

app.listen(3301, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${port}`);
});
