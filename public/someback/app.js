const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const app = express();
const path = require('path');
const cors = require('cors');
require('dotenv/config');
let PORT = process.env.PORT || 3000;

const admin = {
    login: "admin",
    password: process.env.ADMIN_PASSWD
};

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
    console.log(':) | connected to DB')
);



const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const PostSchema = mongoose.Schema({
    who: {
        type: String,
        required: true
    },
    beer: {
        type: String,
        required: true
    },
    imgLink: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const BeerSchema = mongoose.Schema({
    beername: {
        type: String,
        required: true
    },
    volume: {
        type: Number,
        required: true
    },
    voltage: {
        type: Number,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);
const Post = mongoose.model('Post', PostSchema);
const Beer = mongoose.model('Beer', BeerSchema);


app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: "super tajne" }));
app.use('/js', express.static(path.join(__dirname, 'static/js')));
app.use('/css', express.static(path.join(__dirname, 'static/css')));
app.use('/icon', express.static(path.join(__dirname, 'static/icon')));

app.get('/', (req, res) => {
    if (req.session.nickname) {
        res.redirect('/admin')
    } else {
        res.sendFile(path.join(__dirname + '/static/pages/login.html'));
    }
});

app.get('/admin', (req, res) => {
    if (req.session.nickname) {
        res.sendFile(path.join(__dirname + '/static/pages/admin.html'));
    } else {
        res.redirect('/')
    }
});

app.post('/admin', (req, res) => {
    if (req.session.nickname) {
        if (req.body.end == true) {
            req.session.destroy();
            res.json({ message: "zakończono sesję" })
        }
    } else {
        if (req.body.name == admin.login && req.body.passwd == admin.password) {
            req.session.nickname = "admin";
            res.json({ message: "zalogowano" })
        } else {
            res.json({ message: "spierdalaj :DDDD" })
        }
    }

});

app.post('/login', async (req, res) => {
    const usersTab = await User.find()
    const algorithm = 'aes-256-cbc';
    const key = '123456'
    let text = req.body.password;
    let cipher = crypto.createCipher(algorithm, key)
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64')
    let valid = false;
    for (let i = 0; i < usersTab.length; i++) {
        if (usersTab[i].username == req.body.name) {
            if (usersTab[i].password == encrypted) {
                valid = true;
            }
        }
    }
    if (valid) {
        res.json({
            name: req.body.name,
            token: "chuj",
        })
    } else {
        res.json({
            name: req.body.name,
            token: false,
        })
    }
});

app.post('/sendPost', (req, res) => {

});

app.post('/addUser', (req, res) => {
    console.log(req.body)
    const algorithm = 'aes-256-cbc';
    const key = '123456'
    let text = req.body.password;
    let cipher = crypto.createCipher(algorithm, key)
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64')
    const user = new User({
        username: req.body.name,
        password: encrypted,
    })
    user.save()
        .catch(err => {
            console.log(":( | " + err)
        });
    res.json({ message: "dodano użytkownika" })
});

app.post('/modifyUser/:userId', async (req, res) => {
    const algorithm = 'aes-256-cbc';
    const key = '123456'
    let text = req.body.password;
    let cipher = crypto.createCipher(algorithm, key)
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64')
    try {
        const userToModify = await User.updateOne(
            { _id: req.params.userId },
            { $set: { password: encrypted } }
        )
        res.json({ message: "zmieniono hasło" })
    } catch (err) {
        console.log(":( | " + err);
        res.json({ message: ":( | coś się zepsuło" })
    }
})

app.post('/addBeer', (req, res) => {
    console.log(req.body)
    const beer = new Beer({
        beername: req.body.name,
        volume: req.body.volume,
        voltage: req.body.voltage,
    })
    beer.save()
        .catch(err => {
            console.log(":( | " + err)
        });
    res.json({ message: "dodano piwko" })
});

app.post('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.log(":( | " + err);
    }
});

app.post('/beers', async (req, res) => {
    try {
        const beers = await Beer.find();
        res.json(beers);
    } catch (err) {
        console.log(":( | " + err);
    }
})

app.post('/posts', (req, res) => {
    try {

    } catch (err) {
        console.log(":( | " + err);
    }
})

app.listen(PORT, () => {
    console.log(`:) | robie wzium na: http://localhost:${PORT}`)
})

/*
const algorithm = 'aes-256-cbc';
const key = '123456'
let text = 'tekst do zaszyfrowania'
let cipher = crypto.createCipher(algorithm, key)
let encrypted = cipher.update(text, 'utf8', 'base64');
encrypted += cipher.final('base64')
console.log('encrypted :', encrypted);

var decipher = crypto.createDecipher('aes-256-cbc', key);
var decrypted = decipher.update(encrypted, 'base64', 'utf8');
decrypted += decipher.final('utf8');
console.log('decrypted :', decrypted);
*/