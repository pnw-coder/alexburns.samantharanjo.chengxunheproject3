const cookieHelper = require('./cookie.helper.cjs');

const express = require('express');
const router = express.Router();
const PasswordModel = require('./db/password.model.cjs');


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
        user: username,
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
        return res.send(passwords);
    } catch (error) {
        res.status(500);
        return res.send('Internal server error');
    }
});

// GET /api/password/:id - Get a password by ID
router.get('/:id', async function(req, res) {
    const passwordId = req.params.id;
    try {
        const password = await PasswordModel.getPasswordById(passwordId);
        if (!password) {
            res.status(404);
            return res.send('Password not found');
        } else {
            return res.send(password);
        }
    } catch (error) {
        res.status(500);
        return res.send(error);
    }
});

// PUT /api/password/:id = Update a password
router.put('/:id', async function(req, res) {
    const passwordId = req.params.id;
    const requestBody = req.body;
    const username = cookieHelper.cookieDecryptor(req);

    if (!username) {
        res.status(400);
        return res.send("You need to be logged in to create a password.")
    }

    if (!requestBody.website || !requestBody.body) {
        res.status(400);
        return res.send("You need to include a website and password in your request");
    }
    
    try {
        const getPasswordResponse = await PasswordModel.getPasswordById(passwordId);
        if(getPasswordResponse !== null && getPasswordResponse.user !== username) {
            res.status(400);
            return res.send("You do not own this password.");
        }

        const passwordUpdateResponse = await PasswordModel.updatePassword(passwordId, requestBody);
        return res.send('Password updated successfully');
    } catch (error) {
        res.status(400);
        return res.send(error);
    }
});

// DELETE /api/password/:id - Delete a password
router.delete('/:id', async function(req, res) {
    const passwordId = req.params.id;
    const username = cookieHelper.cookieDecryptor(req);

    try {
        await PasswordModel.deletePassword(passwordId);
        return res.send('Password deleted successfully');
    } catch (error) {
        res.status(500);
        return res.send(error);
    }
});

module.exports = router;