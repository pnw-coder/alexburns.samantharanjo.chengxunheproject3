const cookieHelper = require('./cookie.helper.cjs');

const express = require('express');
const router = express.Router();
const PasswordModel = require('./db/password.model.cjs');

let passwordTest = [
    {website: "Amazon", body: "1234test!"},
    {website: "Facebook", body: "23@test!"},
];

// POST /api/password - Insert a new password
router.post('/', async function(req, res) {
    const requestBody = req.body;
    const username = cookieHelper.cookieDecryptor(req);

    if (!username) {
        res.status(401);
        return res.send("You need to be logged in to create a password.")
    }

    if (!requestBody.website || !requestBody.body) {
        res.status(401);
        return res.send("Please insert a valid website and password.")
    }

    const newPassword ={
        website: requestBody.website,
        body: requestBody.body,
    }

    try {
        const response = await PasswordModel.insertPassword(newPassword);
        return res.send(response);
    } catch (error) {
        res.status(400);
        return res.send(error);
    }
});

// GET /api/password - Get all passwords
router.get('/', async function (req, res) {
    try {
        const passwords = await PasswordModel.getAllPasswords();
        res.json(passwords);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error'});
    }
});

// GET /api/password/:id - Get a password by ID
router.get('/:id', async function(req, res) {
    const passwordId = req.params.id;
    try {
        const password = await PasswordModel.getPasswordById(passwordId);
        if (!password) {
            res.status(404).json({ error: 'Password not found' });
        } else {
            res.json(password);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT /api/password/:id = Update a password
router.put('/:id', async function(req, res) {
    const passwordId = req.params.id;
    const requestBody = req.body;
    
    try {
        const updatedPassword = await PasswordModel.updatePassword(passwordId, requestBody);
        res.json(updatedPassword);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error '});
    }
});

// DELETE /api/password/:id - Delete a password
router.delete('/:id', async function(req, res) {
    const passwordId = req.params.id;

    try {
        await PasswordModel.deletePassword(passwordId);
        res.json({ message: 'Password deleted successfully '});
    } catch (error) {
        res.status(500).json({ error: 'Internal server error'});
    }
});

module.exports = router;