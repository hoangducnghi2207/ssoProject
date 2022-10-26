import passport from "passport";

var express = require("express");
var Sequelize = require("sequelize");
var session = require("express-session");


const configSession = (app) => {
    // initalize sequelize with session store
    const SequelizeStore = require("connect-session-sequelize")(session.Store);

    // create database, ensure 'sqlite3' in your package.json
    const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
            "logging": false,
            define: {
                "freezeTableName": true
            },
            timezone:'+07:00',
        })
    const myStore = new SequelizeStore({
        db: sequelize
    })

    // configure express
    app.use(
        session({
            secret: "keyboard cat",
            store: myStore,
            resave: false, // we support the touch method so per the express-session docs this should be set to false
            proxy: true, // if you do SSL outside of node.,
            saveUninitialized: false,
            expiration: 300*1000,
            cookie:{expires:300*1000}
        })
    );
    myStore.sync()

    app.use(passport.authenticate('session'));
    passport.serializeUser(function (user, cb) {
        process.nextTick(function () {
            cb(null, user);
        });
    });

    passport.deserializeUser(function (user, cb) {
        process.nextTick(function () {
            return cb(null, user);
        });
        //passport gan req.user
    });
    // continue as normal
}
export default configSession