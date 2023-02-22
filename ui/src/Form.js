import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import JSONPretty from 'react-json-pretty';

function Form() {
  const [langFeature, setLangFeature] = useState("/analyzeSentiment");
  const [promptText, setPromptText] = useState("Hello world");
  const [langResult, setLangResult] = useState({});

  const handleChange = (event: SelectChangeEvent) => {
    setLangFeature(event.target.value);
  };

  const handleTextChange  = (event: SelectChangeEvent) => {
    setPromptText(event.target.value);
  };

  async function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    // const form = e.target;
    // const formData = new FormData(form);
    const body = {
      prompt: promptText
    }

    const response = await fetch(langFeature, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(body),
    });
    const data = await response.json();
    setLangResult(data);
  }

  return (
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Feature</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={langFeature}
            label="Feature"
            onChange={handleChange}
          >
            <MenuItem value={'/analyzeSentiment'}>Analyze Sentiment</MenuItem>
            <MenuItem value={'/detectLanguage'}>Detect Language</MenuItem>
            <MenuItem value={'/entitiesLinking'}>Entities Linking</MenuItem>
            <MenuItem value={'/entitiesRecognitionGeneral'}>Entities Recognition General</MenuItem>
            <MenuItem value={'/entitiesRecognitionPii'}>Entities Recognition Pii</MenuItem>
            <MenuItem value={'/extractKeyPhrases'}>Extract Key Phrases</MenuItem>
            <MenuItem value={'/keyPhrases'}>Key Phrases</MenuItem>
            <MenuItem value={'/languages'}>Languages</MenuItem>
            <MenuItem value={'/recognizeEntities'}>Recognize Entities</MenuItem>
            <MenuItem value={'/recognizeLinkedEntities'}>Recognize Linked Entities</MenuItem>
            <MenuItem value={'/recognizePiiEntities'}>Recognize Pii Entities</MenuItem>
            <MenuItem value={'/sentiment'}>Sentiment</MenuItem>
          </Select>
        </FormControl>
        <TextField
          required
          id="outlined-required"
          label="Phrase"
          value={promptText}
          onChange={handleTextChange}
        />
        <br />
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      </Box>
      <br />
      <JSONPretty data={langResult} style={{ fontSize: "16px" }}></JSONPretty>
    </>
  )
}

export default Form;
