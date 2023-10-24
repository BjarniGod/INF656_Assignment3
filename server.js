const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


// Pareses JSON
app.use(express.json());

// Middleware for validating contact data
app.use((req, res, next) => {
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        const { name, phoneNumber, email } = req.body;
        if (!name || typeof name !== 'string' || !phoneNumber || typeof phoneNumber !== 'string' || !email || typeof email !== 'string') {
            return res.status(400).send("Invalid contact data.");
        }
    }
    next();
});

// GET all contacts or a single contact by ID
app.get('/contacts/:id?', (req, res) => {
    const contacts = JSON.parse(fs.readFileSync('contacts.json', 'utf8'));
    const id = req.params.id;
    if (id) {
        const contact = contacts.find(contact => contact.id === id);
        if (!contact) return res.status(404).send("Contact not found.");
        return res.json(contact);
    }
    res.json(contacts);
});

// POST to add a new contact
app.post('/contacts', (req, res) => {
    const contacts = JSON.parse(fs.readFileSync('contacts.json', 'utf8'));
    const newContact = {
        id: uuidv4(),  // <-- Use uuid to generate a unique ID
        ...req.body
    };
    contacts.push(newContact);
    fs.writeFileSync('contacts.json', JSON.stringify(contacts, null, 2));
    res.json(newContact);
});

// PUT or PATCH to update an existing contact by ID
app.put('/contacts/:id', (req, res) => {
    const contacts = JSON.parse(fs.readFileSync('contacts.json', 'utf8'));
    const id = req.params.id;
    const index = contacts.findIndex(contact => contact.id === id);
    if (index === -1) return res.status(404).send("Contact not found.");
    contacts[index] = { ...contacts[index], ...req.body };
    fs.writeFileSync('contacts.json', JSON.stringify(contacts, null, 2));
    res.json(contacts[index]);
});

// DELETE a contact by ID
app.delete('/contacts/:id', (req, res) => {
    const contacts = JSON.parse(fs.readFileSync('contacts.json', 'utf8'));
    const id = req.params.id;
    const newContacts = contacts.filter(contact => contact.id !== id);
    if (newContacts.length === contacts.length) return res.status(404).send("Contact not found.");
    fs.writeFileSync('contacts.json', JSON.stringify(newContacts, null, 2));
    res.send("Contact deleted.");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
