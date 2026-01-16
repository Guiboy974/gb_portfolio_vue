require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const notionToken = process.env.NOTION_TOKEN;
const databaseId = process.env.NOTION_DATABASE_ID;

app.get('/api/notion', async (req, res) => {
  try {
    // Vérifier que les variables sont définies
    if (!notionToken) {
      console.error('NOTION_TOKEN is not defined');
      return res.status(500).json({
        error: 'Server configuration error: NOTION_TOKEN is not defined'
      });
    }

    if (!databaseId) {
      console.error('NOTION_DATABASE_ID is not defined');
      return res.status(500).json({
        error: 'Server configuration error: NOTION_DATABASE_ID is not defined'
      });
    }

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
     // Affiche l'erreur brute
    console.error('Notion API error:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

/* app.get('/', (req, res) => {
  res.send('✅ Backend Render en ligne !');
}); */

// Servir les fichiers frontend Vue.js (public)
app.use(express.static(path.join(__dirname, 'public')));

// Route fallback (SPA Vue Router)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Lancer le serveur
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend + Frontend disponible sur le port ${PORT}`);
});