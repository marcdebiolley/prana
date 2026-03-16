# Spec : Site "Portée de Prana"

**Date :** 2026-03-16
**Statut :** Approuvé

---

## 1. Contexte & objectif

Site web one-page pour présenter la portée imminente de **Prana**, Border Collie brun femelle de 6 ans, et permettre aux familles intéressées de soumettre une candidature d'adoption motivée.

- La maman : **Prana**, Border Collie brun, 6 ans
- Le papa : Border Collie noir (pas de photo disponible)
- Portée : **imminente — Printemps 2026**
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

### 3.0 Navigation
- Sticky nav minimaliste en haut (fond transparent → blanc cassé au scroll)
- Logo/nom "Portée de Prana" à gauche
- Liens anchor à droite : Prana · Le papa · La portée · Adoption · Contact
- Sur mobile : menu hamburger simple

### 3.1 Hero
- Photo de Prana plein écran (ou demi-écran selon ratio)
- Titre : `"Portée de Prana"` — grande typographie Playfair Display
- Sous-titre : `"Border Collie · Printemps 2026"`
- Badge discret : `"Portée imminente"`
- Animation : fade-in + montée douce au chargement (Framer Motion)
- Scroll indicator discret en bas

### 3.2 Prana — La maman
- Fond : `#F9F7F4`
- Présentation : Border Collie brun, 6 ans, caractère, qualités
- Galerie de 3 à 6 photos (grid ou carrousel minimal)
- Photos : `next/image` avec `fill` dans un conteneur `aspect-ratio` fixe + `overflow: hidden` obligatoire (empêche le débordement au zoom hover)
- Animation : fade-in au scroll sur chaque élément
- Hover photo : `scale(1.03)` + box-shadow (Framer Motion `whileHover`)

### 3.3 Le papa
- Fond : `#EFEDE8`
- Border Collie noir
- Pas de photo → silhouette SVG élégante d'un Border Collie, couleur `#8B7355`
- Quelques infos : race, couleur, caractère si connu

### 3.4 La portée
- Fond : `#F9F7F4`
- Statut : **"Portée imminente"**
- Date estimée : Printemps 2026
- Bloc informatif fixe sur les Border Collies : tempérament, intelligence, besoins, couleurs possibles (brun × noir)
- Si le nombre de chiots n'est pas connu : ne pas afficher ce champ (pas de placeholder "?")

### 3.5 Adoption — Ce qu'on recherche
- Fond : `#EFEDE8`
- Description du profil de famille idéale
- Points importants : activité physique, espace extérieur, expérience, engagement long terme
- Style : bullet points élégants ou cartes minimalistes
- Paragraphe sur le processus : "Après votre candidature, nous vous recontacterons par email ou téléphone pour convenir d'une rencontre."

### 3.6 Formulaire de contact
- Fond : `#F9F7F4`
- Titre : `"Soumettre ma candidature"`

**Champs (tous requis sauf indication) :**
| Champ | Type | Validation |
|-------|------|-----------|
| Prénom & Nom | text | required |
| Email | email | required, format email |
| Téléphone | tel | optionnel |
| Situation de vie | select ou radio : maison/appartement, jardin oui/non | required |
| Enfants à la maison | radio : oui/non | required |
| Autres animaux | text | optionnel |
| Expérience chiens | radio : débutant / expérimenté / a déjà eu un BC | required |
| Motivation | textarea (min 100 chars) | required |

**Bouton :** `"Envoyer ma candidature"` — disabled si champs requis vides

**Comportement mailto :**
```
mailto:marcdebiolley@gmail.com
  ?cc=muriel.vanhavre@gmail.com
  &subject=Candidature adoption — [Prénom Nom]
  &body=
    Prénom & Nom : ...
    Email : ...
    Téléphone : ...
    Situation : ...
    Enfants : ...
    Autres animaux : ...
    Expérience : ...
    Motivation : ...
```

**Fallback mobile :** Si le mailto ne s'ouvre pas, afficher un message :
> "Si le lien ne s'ouvre pas, envoyez directement un email à marcdebiolley@gmail.com"

**Notice GDPR (obligatoire, sous le bouton) :**
> "Vos informations sont utilisées uniquement pour traiter votre candidature et ne sont pas conservées au-delà de cette démarche."

### 3.7 Footer
- Fond : `#1C1C1A` (sombre)
- Texte : blanc cassé
- Contenu :
  - Nom : "Portée de Prana"
  - Email : marcdebiolley@gmail.com
  - Téléphone : 0474 72 24 14
  - Mention : "Élevage particulier non-LOOF"
  - Copyright : `© 2026 Portée de Prana`

---

## 4. Design system

### Palette
| Rôle | Valeur |
|------|--------|
| Fond principal | `#F9F7F4` |
| Fond alterné | `#EFEDE8` |
| Texte principal | `#1C1C1A` |
| Accent | `#8B7355` |
| Accent hover | `#6B5A40` |
| Footer fond | `#1C1C1A` |
| Blanc pur | `#FFFFFF` |

**Mapping sections :**
- Hero : image pleine — pas de fond
- Prana : `#F9F7F4`
- Le papa : `#EFEDE8`
- La portée : `#F9F7F4`
- Adoption : `#EFEDE8`
- Contact : `#F9F7F4`
- Footer : `#1C1C1A`

### Typographie
| Usage | Police | Poids |
|-------|--------|-------|
| Titres (h1, h2) | Playfair Display | 400 / 700 |
| Corps, labels, boutons | Inter | 400 / 500 |

Chargement via `next/font/google` dans `layout.tsx`.

### Animations (Framer Motion)
- **Hero** : `fadeIn` + `y: 20 → 0`, duration 0.8s au mount
- **Sections au scroll** : `whileInView` + `y: 30 → 0` + `opacity: 0 → 1`, `once: true`, viewport `amount: 0.2`
- **Photos** : `whileHover` → `scale: 1.03` + box-shadow — le conteneur parent doit avoir `overflow: hidden`
- **Champs formulaire** : transition `border-color` au focus (CSS, pas Framer)
- **Bouton submit** : `whileTap` → `scale: 0.97`
- **Nav** : `backgroundColor` transition au scroll (via `useScroll` Framer Motion)

---

## 5. Structure des fichiers

```
adoption-prana/
├── app/
│   ├── layout.tsx          # Fonts, metadata, og:image
│   ├── page.tsx            # Assemblage des sections
│   └── globals.css         # Variables CSS, reset Tailwind
├── components/
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── AboutPrana.tsx
│   ├── AboutFather.tsx
│   ├── Litter.tsx
│   ├── AdoptionInfo.tsx
│   ├── ContactForm.tsx
│   └── Footer.tsx
├── public/
│   ├── images/             # Photos de Prana (optimisées)
│   └── og-image.jpg        # Photo Prana pour og:image (1200×630)
└── docs/
    └── superpowers/specs/
```

---

## 6. Contraintes & décisions

- **Pas de backend** : formulaire via mailto, zéro coût, zéro stockage de données
- **Pas de CMS** : contenu hardcodé en français, mise à jour via le code
- **Photos** : `next/image` avec `fill` + conteneur `aspect-ratio` + `overflow: hidden`
- **`og:image`** : une photo de Prana recadrée à 1200×630, placée dans `/public/og-image.jpg`
- **Favicon** : généré depuis la même photo, formats `.ico` + `.png`
- **Responsive** : mobile-first, grille adaptative
- **SEO** : metadata Next.js (titre, description, og:image, og:title)
- **Pas d'internationalisation** : français uniquement
- **Pas de réseau social** : le propriétaire n'en a pas à afficher

---

## 7. Critères de succès

- Le site charge en < 2s
- Beau rendu mobile et desktop
- Formulaire mailto fonctionne sur tous les appareils (avec fallback affiché)
- Animations fluides (60fps) sans saccades
- Code maintenable par un dev junior
- Notice GDPR présente sous le formulaire
