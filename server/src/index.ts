import express from 'express';
import cors from 'cors';
import fs from 'fs';

import InitializationRecord from './models/initialization-record';
import {Sequelize} from 'sequelize-typescript';
import Contact from './models/contact';

const app = express();
const port = 8080; // default port to listen

const sequelize =  new Sequelize({
    database: 'postgres',
    dialect: 'postgres',
    username: 'postgres',
    password: 'qwerty',
    host: 'db',
});

sequelize.addModels(['./models/*.ts']);
sequelize.addModels([Contact]);
sequelize.addModels([InitializationRecord]);

InitializationRecord.sync();
Contact.sync();

async function loadDataOnFirstRun() {
    const records = await InitializationRecord.findAll();

    if (records.length > 0) {
        console.log('No new records added: database initialized.');
        return ;
    }

    fs.readFile('src/data.json', async (err, data) => {
        if (err) throw err;
        let student = JSON.parse(data.toString());

        for (var i = 0; i < student.length; i++) {
            let entity = JSON.parse(JSON.stringify(student[i]));
            
                const contact = new Contact({
                    _id: entity._id,
                    age: entity.age,
                    eyeColor: entity.eyeColor,
                    name: entity.name,
                    gender: entity.gender,
                    company: entity.company,
                    email: entity.email,
                    phone: entity.phone,
                    address: entity.address
                });
                await contact.save();
        }

        const initialization = new InitializationRecord({
            initialized: true
        });
        await initialization.save();
    });
}

const c = {
    origin: 'http://locahost:3000'
};

// define a route handler for the default home page
app.get( '/api/contacts', cors(), async ( req, res ) => {
    loadDataOnFirstRun()
    
    const data = await Contact.findAll()
    res.json(data)
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
