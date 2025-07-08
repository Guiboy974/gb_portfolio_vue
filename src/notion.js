import axios from "axios";

// Mets ici ta clé d'intégration Notion et l'ID de ta base
const NOTION_API_KEY = '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'; // ⚠️ Sera visible dans le code !
const DATABASE_ID = '20ea118f068d8057aafdced600ef2b0c?v=20ea118f068d807bbe6c000c738ba6b3'; // ton ID de base Notion

export async function getProjectsFromNotion() {
  const response = await axios.post(
    `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
    {},
    {
      headers: {
        "Authorization": `Bearer ${NOTION_API_KEY}`,
        "Notion-Version": "2022-06-28", // à adapter à la dernière version API si besoin
        "Content-Type": "application/json"
      }
    }
    );
     // Transforme les données Notion en format plus simple
  return response.data.results.map(page => ({
    title: page.properties.Name.title[0]?.plain_text,
    img: page.properties.Image.plain_text, // selon structure de ta base
    link: page.properties.Github.url,
      // description: page.properties.Description?.rich_text[0]?.plain_text ?? ""
    }));
  }