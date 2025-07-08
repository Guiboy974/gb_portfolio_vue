require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const notionToken = process.env.NOTION_TOKEN;
if (!notionToken) {
  throw new Error('NOTION_TOKEN environment variable is not defined.');
}
const databaseId = process.enconst path = require('path');v.NOTION_DATABASE_ID;

app.get('/api/notion', async (req, res) => {
  try {
    const response = await axios.post(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {}, 
      {
        headers: {
          'Authorization': `Bearer ${notionToken}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        }
      }
    );
    res.json(response.data);
  } catch (error) {
     // Affiche l’erreur brute
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

// Servir les fichiers frontend Vue.js (public)
app.use(express.static(path.join(__dirname, 'public')));

// Route fallback (SPA Vue Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend + Frontend disponible sur le port ${PORT}`);
});