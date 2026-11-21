# Suivi clients

Application web simple pour enregistrer ses clients et suivre chaque commande, de l'achat à la livraison.

## Les 4 étapes de suivi

| Étape | Signification |
|---|---|
| 🛒 **Achat** | La commande est passée ou payée |
| 🏭 **Fabrication** | Le produit est en cours de production |
| 🚚 **Envoi** | Le produit est expédié |
| 📦 **Réception** | Le client a reçu le produit |

## Fonctionnalités

- Créer, modifier et supprimer une fiche client (nom, téléphone, montant, date d'achat, notes)
- Vérification des champs : téléphone français valide, montant positif, date obligatoire
- Stepper visuel sur chaque fiche, avec la date de passage à chaque étape
- Boutons pour avancer ou reculer d'une étape en un clic
- Recherche par nom ou téléphone, filtre par étape, tri par date ou par montant
- Tableau de bord : nombre de clients et montant total par étape, plus le total global (cliquer sur une étape filtre la liste)
- Numéro de téléphone cliquable pour appeler depuis un mobile
- Fonctionne sur ordinateur et sur mobile

## Prérequis

- **Node.js** version 20 ou plus récente ([nodejs.org](https://nodejs.org), version « LTS »)
- Pour vérifier, tape `node -v` dans un terminal.

## Installation et lancement

Dans VS Code, ouvre un terminal (menu **Terminal → Nouveau terminal**), puis tape ces commandes une par une :

```bash
# 1. Aller dans le dossier de l'application
cd ~/mon-premier-projer-/suivi-clients

# 2. Installer les dépendances (seulement la première fois)
npm install

# 3. Lancer l'application
npm run dev
```

Ouvre ensuite l'adresse affichée dans le terminal (en général **http://localhost:5173**) dans ton navigateur.

Pour **arrêter** l'application : clique dans le terminal et appuie sur `Ctrl + C`.

## Où sont stockées les données ?

Dans cette première version, les données sont enregistrées **dans le navigateur** (localStorage) :

- elles restent en place quand tu fermes la page ou que tu éteins l'ordinateur ;
- elles sont **propres à ce navigateur, sur cet ordinateur** : elles ne sont pas partagées avec un autre appareil ;
- vider les données de navigation du navigateur les **efface**.

Au premier lancement, 4 clients d'exemple sont ajoutés pour montrer le rendu. Tu peux les supprimer quand tu veux.

Pour repartir de zéro avec les exemples : dans le navigateur, ouvre les outils de développement (`F12`), puis l'onglet **Application** (Chrome) ou **Stockage** (Firefox) → *Local Storage*, et supprime les clés qui commencent par `suivi-clients:`.

## Organisation du code

```
src/
├── App.jsx              Page principale : état global, filtres, fenêtres
├── constants/steps.js   Les 4 étapes (nom, icône, couleur)
├── data/
│   ├── clientStore.js   Accès aux données (SEUL fichier lié au stockage)
│   └── sampleData.js    Clients d'exemple
├── utils/
│   ├── format.js        Formats français : montants, dates, téléphone
│   └── validation.js    Règles de validation du formulaire
└── components/          Les morceaux de l'interface
    ├── Dashboard.jsx    Tableau de bord
    ├── Toolbar.jsx      Recherche, filtres, tri
    ├── ClientList.jsx   Liste et états vides
    ├── ClientCard.jsx   Une fiche client
    ├── Stepper.jsx      Indicateur des 4 étapes
    ├── ClientForm.jsx   Formulaire d'ajout / modification
    ├── ConfirmDialog.jsx Confirmation de suppression
    └── Modal.jsx        Fenêtre générique
```

**Passer plus tard à une vraie base de données :** il suffit de réécrire les fonctions de `src/data/clientStore.js` (`getClients`, `createClient`, `updateClient`, `deleteClient`, `moveClientStep`). Le reste de l'application n'a pas besoin de changer.

## Technologies

[React](https://react.dev) · [Vite](https://vite.dev) · [Tailwind CSS](https://tailwindcss.com) · icônes [Lucide](https://lucide.dev)
