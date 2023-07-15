import MaterialController from "./material/material.controller";
import App from "./app";

const app = new App([new MaterialController()]);

//starting the App
app.listen();
