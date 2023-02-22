import { TextAnalyticsClient } from "@azure/ai-text-analytics";
import { DefaultAzureCredential } from '@azure/identity';
import cors from 'cors';
import express from 'express';
import htmlExpress from 'html-express-js';
import createError from 'http-errors';
import path from 'path';
import {
  analyzeSentiment,
  detectLanguage,
  entitiesLinking,
  entitiesRecognitionGeneral,
  entitiesRecognitionPii,
  extractKeyPhrases,
  keyPhrases,
  languages,
  recognizeEntities,
  recognizeLinkedEntities,
  recognizePiiEntities,
  sentiment
} from "./text/index.js";

const app = express();
const port = process.env.PORT || 80;

const endpoint = process.env.COGNITIVE_SERVICES_ENDPOINT;
if (!endpoint) throw Error('value for COGNITIVE_SERVICES_ENDPOINT not found');
const client = new TextAnalyticsClient(endpoint, new DefaultAzureCredential());

// set up engine
app.engine(
  'js',
  htmlExpress()
);

app.set('view engine', 'js');
app.set('views', `/app-ui/build`);
// To serve CSS and other static files from the public dir
app.use(express.static(path.join("/app-ui", "build")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join("/app-ui/", "build", "index.html"));
});

app.post('/analyzeSentiment', (req, res) => {
  analyzeSentiment(client, req)
    .then((response) => res.json(response))
    .catch((ex) => res.send(ex.message));
});

app.post('/detectLanguage', (req, res) => {
  detectLanguage(client, req)
    .then((response) => res.json(response))
    .catch((ex) => res.send(ex.message));
});

app.post('/entitiesLinking', (req, res) => {
  entitiesLinking(client, req)
    .then((response) => res.json(response))
    .catch((ex) => res.send(ex.message));
});

app.post('/entitiesRecognitionGeneral', (req, res) => {
  entitiesRecognitionGeneral(client, req)
    .then((response) => res.json(response))
    .catch((ex) => res.send(ex.message));
});

app.post('/entitiesRecognitionPii', (req, res) => {
  entitiesRecognitionPii(client, req)
    .then((response) => res.json(response))
    .catch((ex) => res.send(ex.message));
});

app.post('/extractKeyPhrases', (req, res) => {
  extractKeyPhrases(client, req)
    .then((response) => res.json(response))
    .catch((ex) => res.send(ex.message));
});

app.post('/keyPhrases', (req, res) => {
  keyPhrases(client, req)
    .then((response) => res.json(response))
    .catch((ex) => res.send(ex.message));
});

app.post('/languages', (req, res) => {
  languages(client, req)
    .then((response) => res.json(response))
    .catch((ex) => res.send(ex.message));
});

app.post('/recognizeEntities', (req, res) => {
  recognizeEntities(client, req)
    .then((response) => res.json(response))
    .catch((ex) => res.send(ex.message));
});

app.post('/recognizeLinkedEntities', (req, res) => {
  recognizeLinkedEntities(client, req)
    .then((response) => res.json(response))
    .catch((ex) => res.send(ex.message));
});

app.post('/recognizePiiEntities', (req, res) => {
  recognizePiiEntities(client, req)
    .then((response) => res.json(response))
    .catch((ex) => res.send(ex.message));
});

app.post('/sentiment', (req, res) => {
  sentiment(client, req)
    .then((response) => res.json(response))
    .catch((ex) => res.send(ex.message));
});

app.get('/health', (req, res) => {
  res.send('200: OK');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  // res.render("error");
  res.send("error");
});

app.listen(port, () => {
  console.log(`Application listening on port ${port}`);
})
