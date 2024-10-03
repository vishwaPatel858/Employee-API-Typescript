"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Typescript");
var dotenv = require("dotenv");
var express_1 = require("express");
var app = (0, express_1.default)();
var mongoose_1 = require("mongoose");
var employee_route_ts_1 = require("./routes/employee_route.ts");
app.use(express_1.default.json());
app.use("/employee", employee_route_ts_1.router);
dotenv.config();
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("listening on port ".concat(port));
});
var mongoDbUrl = process.env.MONGO_DB_URL || "";
mongoose_1.default
    .connect(mongoDbUrl)
    .then(function () { return console.log("connected to MongoDB"); })
    .catch(function (err) {
    return console.log("Error While connecting to MongoDB ".concat(err.message));
});
