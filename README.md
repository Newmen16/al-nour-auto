# Al-Nour Auto — Site Vitrine & Simulateur

Site vitrine d'un concessionnaire automobile algérien spécialisé dans les marques chinoises : catalogue, simulateur de financement Mourabaha, et captation de leads via WhatsApp.

**Langues :** Arabe (par défaut, RTL) / Anglais (LTR) — bascule instantanée sans rechargement.

## Stack

| Technologie | Rôle |
|---|---|
| Vite 6 | Bundler & serveur de dev |
| React 19 | UI |
| TypeScript 5.8 | Typage strict |
| Tailwind CSS v4 | Styles |
| Three.js | Hero 3D interactif (studio procédural qui suit le curseur) |

Aucun backend : les leads partent directement via un lien `wa.me` pré-rempli.

## Démarrage

```bash
npm install
npm run dev       # serveur de dev (Vite)
```

## Scripts

| Commande | Description |
|---|---|
| `npm run dev` | Lancer le serveur de développement |
| `npm run build` | Typecheck (`tsc --noEmit`) puis build de production (`dist/`) |
| `npm run preview` | Prévisualiser le build de production |
| `npm run typecheck` | Vérifier les types sans compiler |

## Fonctionnalités

- **Catalogue** : Geely, Chery, Jetour, Baic, Changan, DFSK — fiches techniques et prix indicatifs en DZD.
- **Simulateur Mourabaha** : prix (2 M – 8 M DZD), apport 20–70 %, durée 12–60 mois, mensualité et coût total calculés en temps réel.
- **Formulaire de lead** : nom, sélection des 58 wilayas, validation du mobile algérien (05/06/07 + 8 chiffres), modèle souhaité, ouverture WhatsApp avec message pré-rempli.
- **Accessibilité** : contraste WCAG AA, navigation clavier, `prefers-reduced-motion` respecté, `lang`/`dir` mis à jour au changement de langue.

## Configuration

Tout est centralisé dans [`src/config.ts`](src/config.ts) :

```ts
export const WHATSAPP_NUMBER = "213560123456";   // à remplacer par le vrai numéro
export const SHOWROOM_PHONE_DISPLAY = "+213 560 12 34 56";
export const SHOWROOM_PHONE_TEL = "+213560123456";
```

> ⚠️ Les numéros sont des **placeholders**. Les prix et spécifications sont des **données indicatives de simulation**.

## Structure du projet

```
src/
├── App.tsx              # Composition de la page
├── main.tsx             # Point d'entrée
├── config.ts            # Constantes (WhatsApp, fourchettes du simulateur)
├── types.ts             # Types partagés
├── components/          # Nav, Hero, HeroStudio (3D), Catalog, CarModal,
│                         # Simulator, LeadForm, Process, Footer, ...
├── data/                # cars.ts (catalogue), wilayas.ts (58 wilayas)
├── i18n/                # context.tsx + ar.ts / en.ts (dictionnaires)
└── lib/                 # finance.ts (Mourabaha), format.ts, phone.ts
```

## Déploiement

```bash
npm run build   # génère dist/
```

Le dossier `dist/` est statique : hébergeable sur GitHub Pages, Netlify, Vercel ou tout serveur de fichiers.

## Licence

Projet privé — tous droits réservés.
