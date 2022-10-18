import {AddUser} from './AddUser'
import {GetUsers} from './GetUsers'
import {UpdateUser} from "./UpdateUser";
import {DeleteUser} from "./DeleteUser";
import { Request, Response } from 'express';
import path from "path";
import basicAuth from 'express-basic-auth';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const TESTER_PASS = process.env.TESTER_PASS;

const app = express();
app.use(cors())

app.use(basicAuth({
    users: { 'tester': `${TESTER_PASS}` },
    challenge: true,
    realm: 'longComplicatedString',
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/api/v1/add-user', (req: Request, res: Response) => {
    new AddUser().addUser(
        req.body['name'],
        req.body['surname'],
        req.body['bornDate'],
        req.body['street'],
        req.body['city'],
        req.body['postCode'],
        req.body['email'],
        req.body['phone'],
        req.body['varSymbol'],
        req.body['language'],
        req.body['note'],
        req.body['status']
    ).then(writeResultFromFB => {
        res.status(201).json(writeResultFromFB);
    }).catch(err => {
        console.log("error", err);
        res.json({err: err.toString()});
        // res.status(500).json({err: err.toString()});
    })
});

app.put('/api/v1/update-user/:id', (req: Request, res: Response) => {
    console.log(req.params['id'])
    new UpdateUser().updateUser(
        req.params['id'],
        req.body['name'],
        req.body['surname'],
        req.body['bornDate'],
        req.body['street'],
        req.body['city'],
        req.body['postCode'],
        req.body['email'],
        req.body['phone'],
        req.body['varSymbol'],
        req.body['language'],
        req.body['note'],
        req.body['status']
    ).then(writeResultFromFB => {
        res.json(writeResultFromFB);
    }).catch(err => {
        console.log("error", err);
        res.json({err: err.toString()});
    })
});

app.put('/api/v1/archive-user/:id', (req: Request, res: Response) => {
    new UpdateUser().archiveUser(
        req.params['id'],
    ).then(writeResultFromFB => {
        res.json(writeResultFromFB);
    }).catch(err => {
        console.log("error", err);
        res.json({err: err.toString()});
    })
});

app.delete('/api/v1/delete-user/:id', (req: Request, res: Response) => {
    new DeleteUser().deleteUser(
        req.params['id']
    ).then(log => {
        res.json(log);
    }).catch(err => {
        console.log("error", err);
        res.json({err: err.toString()});
    })
});

app.get('/api/v1/get-users', (req: Request, res: Response) => {
    new GetUsers().getUsers().then(log => {
        res.json(log);
    }).catch(err => {
        console.log("error", err);
        res.json({err: err.toString()});
    })
});

app.get('/api/v1/get-archived-users', (req: Request, res: Response) => {
    new GetUsers().getArchivedUsers().then(log => {
        res.json(log);
    }).catch(err => {
        console.log("error", err);
        res.json({err: err.toString()});
    })
});

app.get('/api/v1/get-user/:id', (req: Request, res: Response) => {
    new GetUsers().getUserById(req.params['id'],).then(log => {
        res.json(log);
    }).catch(err => {
        console.log("error", err);
        res.json({err: err.toString()});
    })
});

// serve the frontend from backend
let FRONTEND_PATH:string = process.env.FRONTEND_PATH!;
if (!FRONTEND_PATH) {
    FRONTEND_PATH = '../frontend/build'
}

app.use(express.static(FRONTEND_PATH));
app.get('/*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..',FRONTEND_PATH, 'index.html'));
});

// export because of gcloud function
exports.runApp = app;