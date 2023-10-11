require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require('axios');

const app = express();

const corsOptions = {
  origin: process.env.REACT_APP_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(express.json());

//get repos
app.get('/repos/:username', async (req, res) => {
    const { username } = req.params;
    const limit = req.query.limit || 6;
    let headers = {}
    if(req.query.token){
      headers = {
        Authorization: `Bearer ${req.query.token}`,
      };
    }
  
    try {
      const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
        headers,
      });
  
      const repos = response.data;
      res.json({data: repos.slice(0,limit), length :repos.length});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch data from GitHub API' });
    }
});
  
// get user data

app.get('/user/:username', async (req, res) => {
  const { username } = req.params;
  let headers = {}
  if(req.query.token){
    headers = {
      Authorization: `Bearer ${req.query.token}`,
    };
  }

  try {
    const response = await axios.get(`https://api.github.com/users/${username}`, {headers});

    const userData = response.data;
    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data from GitHub API' });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
