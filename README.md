# Portfolio Guillaume Boyer

Portfolio personnel développé avec Vue.js, présentant mes projets web et compétences en développement fullstack.

🌐 **Site en ligne** : [gb-portfolio.fly.dev](https://gb-portfolio.fly.dev)

## 📋 Table des matières

- [Stack Technique](#-stack-technique)
- [Fonctionnalités](#-fonctionnalités)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Développement](#-développement)
- [Déploiement](#-déploiement)
- [Configuration](#-configuration)

## 🛠 Stack Technique

### **Frontend**

- **Vue.js 3.5** - Framework JavaScript progressif pour construire des interfaces utilisateur
- **Vite 6.0** - Build tool moderne et rapide pour le développement frontend
- **Tailwind CSS 4.0** - Framework CSS utility-first pour un design responsive
- **@headlessui/vue** - Composants UI accessibles et non stylisés
- **@heroicons/vue** - Icônes SVG optimisées pour Tailwind CSS

### **Backend**

- **Node.js 20.18** - Runtime JavaScript côté serveur
- **Express 5.1** - Framework web minimaliste pour Node.js
- **Axios** - Client HTTP pour les requêtes API
- **CORS** - Middleware pour gérer les requêtes cross-origin
- **dotenv** - Gestion des variables d'environnement

### **Services Externes**

- **Notion API** - Base de données pour gérer dynamiquement les projets
- **EmailJS** - Service d'envoi d'emails pour le formulaire de contact
- **Fly.io** - Plateforme de déploiement cloud

### **Outils de Développement**

- **Git** - Système de contrôle de version
- **Docker** - Containerisation de l'application
- **ESLint** (implicite via Vite) - Linter JavaScript

## ✨ Fonctionnalités

### **Présentation Personnelle**
- Section "À propos" avec présentation du parcours professionnel
- Stack technique affichée avec icônes SVG
- Design responsive pour tous les écrans

### **Galerie de Projets**
- Affichage dynamique des projets depuis Notion
- Grille responsive (1 colonne mobile, 2 colonnes tablette, 3 colonnes desktop)
- Images en ratio 4:3 pour une meilleure visibilité
- Modal pour agrandir les captures d'écran
- Liens vers les repositories GitHub
- Technologies utilisées pour chaque projet

### **Formulaire de Contact**
- Intégration EmailJS pour l'envoi d'emails
- Validation HTML5 des champs
- Messages de succès/erreur
- Reset automatique après envoi
- État de chargement pendant l'envoi
- Design accessible et user-friendly

## 🏗 Architecture

```
gb_portfolio_vue/
├── src/                          # Code source frontend
│   ├── components/               # Composants Vue.js
│   │   ├── Main.vue             # Galerie de projets + À propos
│   │   ├── ContactForm.vue      # Formulaire de contact
│   │   ├── Header.vue           # En-tête avec navigation
│   │   ├── Footer.vue           # Pied de page
│   │   └── icons/               # Assets statiques (logos, icônes)
│   ├── assets/                  # Styles globaux
│   │   └── main.css             # Configuration Tailwind
│   └── main.js                  # Point d'entrée Vue
│
├── public/                       # Assets publics
│   └── images/                  # Images des projets
│
├── notion-backend/              # Backend Express
│   ├── index.js                # Serveur Express + API Notion
│   ├── public/                 # Build frontend (généré)
│   ├── .env                    # Variables d'environnement (local)
│   └── package.json            # Dépendances backend
│
├── dist/                        # Build Vite (généré)
├── Dockerfile                   # Configuration Docker
├── fly.toml                     # Configuration Fly.io
├── vite.config.js              # Configuration Vite
├── package.json                # Dépendances frontend
└── README.md                   # Ce fichier
```

## 💻 Installation

### **Prérequis**

- Node.js 20.x ou supérieur
- npm ou yarn
- Compte Notion avec API token
- Compte EmailJS
- (Optionnel) Fly.io CLI pour le déploiement

### **Installation des dépendances**

```bash
# Frontend
npm install

# Backend
cd notion-backend
npm install
```

## 🚀 Développement

### **Variables d'environnement**

Créer un fichier `.env` dans `/notion-backend/` :

```env
NOTION_TOKEN=votre_notion_integration_token
NOTION_DATABASE_ID=votre_database_id
PORT=3000
```

### **Lancer le projet en local**

**Option 1 : Deux terminaux séparés**

```bash
# Terminal 1 - Backend (port 3000)
cd notion-backend
PORT=3000 node index.js

# Terminal 2 - Frontend (port 5173)
npm run dev
```

**Option 2 : Build et servir depuis le backend**

```bash
# Build le frontend et le copie dans le backend
npm run deploy

# Lancer le backend qui servira aussi le frontend
cd notion-backend
PORT=3000 node index.js

# Accéder à http://localhost:3000
```

### **Scripts disponibles**

```bash
# Frontend
npm run dev      # Serveur de développement Vite
npm run build    # Build de production + copie des images
npm run preview  # Preview du build
npm run deploy   # Build + copie vers notion-backend/public/

# Backend
cd notion-backend
npm start        # Lance le serveur Express
```

## 📦 Déploiement

### **Architecture de déploiement**

L'application est déployée sur **Fly.io** en utilisant Docker :
- Un seul conteneur exécute le backend Node.js/Express
- Le backend sert à la fois l'API Notion et les fichiers statiques du frontend
- Port interne : 8080 (configuré dans fly.toml)

### **Étapes de déploiement**

1. **Build du frontend et copie vers le backend**
   ```bash
   npm run deploy
   ```

2. **Configurer les secrets Fly.io**
   ```bash
   fly secrets set NOTION_TOKEN="votre_token"
   fly secrets set NOTION_DATABASE_ID="votre_database_id"
   ```

3. **Déployer sur Fly.io**
   ```bash
   fly deploy
   ```

### **Structure Dockerfile**

Le Dockerfile multi-stage :
1. **Stage 1** : Build du frontend Vue.js avec Vite
2. **Stage 2** : Installation des dépendances backend
3. **Stage 3** : Image finale avec Node.js exécutant le serveur Express

### **Configuration Fly.io** (fly.toml)

```toml
app = 'gb-portfolio'
primary_region = 'cdg'  # Paris

[http_service]
  internal_port = 8080
  force_https = true
  auto_stop_machines = 'stop'
  auto_start_machines = true
  min_machines_running = 0

[env]
  PORT = "8080"
```

## ⚙️ Configuration

### **Notion API**

1. Créer une intégration sur [Notion Developers](https://www.notion.so/my-integrations)
2. Obtenir le token d'intégration
3. Partager votre base de données avec l'intégration
4. Récupérer l'ID de la base de données depuis l'URL

**Structure de la base de données Notion attendue :**

| Colonne | Type | Description |
|---------|------|-------------|
| Projets | Title | Nom du projet |
| Images | Rich Text | Chemin vers l'image (`/assets/images/nom.png`) |
| GitHub | URL | Lien vers le repository |
| Techno | Rich Text | Technologies utilisées |

### **EmailJS**

1. Créer un compte sur [EmailJS](https://www.emailjs.com/)
2. Créer un service email
3. Créer un template avec les variables : `{{name}}`, `{{enterprise}}`, `{{mail}}`, `{{messages}}`
4. Obtenir :
   - Service ID
   - Template ID
   - Public Key

5. Mettre à jour dans `src/components/ContactForm.vue` :
   ```javascript
   emailjs.sendForm('votre_service_id', 'votre_template_id', this.$refs.form, {
     publicKey: 'votre_public_key',
   })
   ```

### **Images des projets**

Les images doivent être placées dans `/public/images/` et référencées dans Notion avec le chemin `/assets/images/nom-image.png`.

Le script de build copie automatiquement les images de `public/images/` vers `dist/assets/images/`.

## 🔧 Maintenance

### **Ajouter un nouveau projet**

1. Ajouter l'image du projet dans `/public/images/`
2. Créer une nouvelle entrée dans la base Notion avec :
   - Titre du projet
   - Chemin de l'image (`/assets/images/votre-image.png`)
   - Lien GitHub
   - Technologies utilisées
3. Le projet apparaîtra automatiquement sur le site

### **Modifier le design**

- Les composants Vue.js sont dans `/src/components/`
- Les styles Tailwind sont configurés dans `/src/assets/main.css`
- Configuration Tailwind : voir [documentation officielle](https://tailwindcss.com/docs)

## 📝 License

Ce projet est personnel et n'est pas sous licence open source.

## 👤 Auteur

**Guillaume Boyer**
- Portfolio : [gb-portfolio.fly.dev](https://gb-portfolio.fly.dev)
- GitHub : [@Guiboy974](https://github.com/Guiboy974)
- Email : Via le formulaire de contact du portfolio

---

Développé avec ❤️ en Vue.js
