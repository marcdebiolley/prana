# Spec : Site "Portée de Prana"

**Date :** 2026-03-16
**Statut :** Approuvé

---

## 1. Contexte & objectif

Site web one-page pour présenter la portée à venir de **Prana**, Border Collie brun femelle de 6 ans, et permettre aux familles intéressées de soumettre une candidature d'adoption motivée.

- La maman : **Prana**, Border Collie brun, 6 ans
- Le papa : Border Collie noir (pas de photo disponible)
- Portée attendue : Été 2025
- Public cible : familles francophones cherchant à adopter un chiot Border Collie

---

## 2. Architecture

**Type :** Single-page application (scroll vertical)
**Stack :** Next.js 14 (App Router) + Tailwind CSS + Framer Motion
**Hébergement :** Vercel (gratuit)
**Formulaire :** mailto (pas de backend)
**Langue :** Français uniquement

---

## 3. Sections de la page (dans l'ordre de scroll)

### 3.1 Hero
- Photo de Prana plein écran (ou demi-écran selon ratio)
- Titre : `"Portée de Prana"` — grande typographie Playfair Display
- Sous-titre : `"Border Collie · Été 2025"`
- Animation : fade-in + montée douce au chargement (Framer Motion)
- Scroll indicator discret en bas

### 3.2 Prana — La maman
- Présentation : Border Collie brun, 6 ans, caractère, qualités
- Galerie de 3 à 6 photos (grid ou carrousel minimal)
- Animation : fade-in au scroll sur chaque élément
- Hover photo : zoom subtil + ombre douce

### 3.3 Le papa
- Border Collie noir, nom si disponible
- Pas de photo → silhouette SVG élégante d'un Border Collie
- Fond légèrement contrasté pour différencier visuellement la section
- Quelques infos sur le mâle (race, couleur, caractère si connu)

### 3.4 La portée
- Statut : "À venir"
- Date estimée de naissance
- Nombre de chiots attendus (si connu)
- Ce qu'on peut dire sur les chiots (couleurs possibles, tempérament BC)

### 3.5 Adoption — Ce qu'on recherche
- Description du profil de famille idéale
- Points importants : activité physique, espace, expérience, engagement
- Style : bullet points élégants ou cartes minimalistes

### 3.6 Formulaire de contact
Champs :
- Prénom & Nom (requis)
- Email (requis)
- Situation de vie : maison/appartement, jardin oui/non, enfants, autres animaux
- Expérience avec les chiens : débutant / expérimenté / a déjà eu un Border Collie
- **Motivation** (textarea, requis) — "Pourquoi souhaitez-vous adopter un chiot de Prana ?"
- Bouton `"Envoyer ma candidature"` → génère un mailto pré-rempli avec tous les champs

### 3.7 Footer
- Nom du site
- Mention simple (pas de LOOF, élevage particulier)
- Année

---

## 4. Design system

### Palette
| Rôle | Valeur |
|------|--------|
| Fond principal | `#F9F7F4` (blanc cassé chaud) |
| Texte principal | `#1C1C1A` |
| Accent | `#8B7355` (taupe doux) |
| Fond section alternée | `#EFEDE8` |
| Blanc pur | `#FFFFFF` |

### Typographie
| Usage | Police | Poids |
|-------|--------|-------|
| Titres (h1, h2) | Playfair Display | 400 / 700 |
| Corps, labels, boutons | Inter | 400 / 500 |

### Animations (Framer Motion)
- **Hero** : `fadeIn` + `y: 20 → 0` au mount
- **Sections au scroll** : `whileInView` fade-in + `y: 30 → 0`, `once: true`
- **Photos** : `whileHover` scale `1.03` + box-shadow
- **Champs formulaire** : border-color transition au focus
- **Bouton submit** : scale `0.97` au click

---

## 5. Structure des fichiers

```
adoption-prana/
├── app/
│   ├── layout.tsx          # Fonts (Playfair + Inter), metadata
│   ├── page.tsx            # Assemblage des sections
│   └── globals.css         # Variables CSS, reset
├── components/
│   ├── Hero.tsx
│   ├── AboutPrana.tsx
│   ├── AboutFather.tsx
│   ├── Litter.tsx
│   ├── AdoptionInfo.tsx
│   ├── ContactForm.tsx
│   └── Footer.tsx
├── public/
│   └── images/             # Photos de Prana
└── docs/
    └── superpowers/specs/
```

---

## 6. Contraintes & décisions

- **Pas de backend** : formulaire via mailto, simple et sans coût
- **Pas de CMS** : contenu hardcodé, le propriétaire met à jour le code
- **Photos** : optimisées via `next/image`
- **Responsive** : mobile-first, grille adaptative
- **SEO** : metadata Next.js de base (titre, description, og:image)
- **Pas d'internationalisation** : français uniquement

---

## 7. Critères de succès

- Le site charge en < 2s
- Beau rendu mobile et desktop
- Formulaire mailto fonctionne sur tous les appareils
- Animations fluides sans saccades
- Code maintenable par un dev junior
