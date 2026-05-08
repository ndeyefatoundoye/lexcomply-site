# LexComply — Site Web Officiel
**lexcomplyconsulting.com**

## Structure du projet
```
lexcomply-site/
├── index.html          # Point d'entrée HTML
├── package.json        # Dépendances
├── vite.config.js      # Configuration Vite
├── vercel.json         # Configuration Vercel
├── public/
│   └── favicon.svg     # Icône du site
└── src/
    ├── main.jsx        # Point d'entrée React
    └── App.jsx         # Composant principal (site complet)
```

## Déploiement sur Vercel

### Option 1 — Via GitHub (recommandé)
1. Créez un repo GitHub : `lexcomply-site`
2. Uploadez tous ces fichiers
3. Sur Vercel → "New Project" → importez le repo GitHub
4. Vercel détecte Vite automatiquement → "Deploy"
5. Connectez votre domaine `lexcomplyconsulting.com`

### Option 2 — Via Vercel CLI
```bash
npm install -g vercel
cd lexcomply-site
npm install
vercel
```

## Connexion du domaine Namecheap → Vercel
1. Sur Vercel → Settings → Domains → Ajouter `lexcomplyconsulting.com`
2. Vercel vous donne 2 enregistrements DNS
3. Sur Namecheap → Advanced DNS → Ajouter ces enregistrements
4. Attendre 24h max → site en ligne ✅

## Stack technique
- React 18
- Vite 5
- Déploiement : Vercel (gratuit)
- Domaine : Namecheap
