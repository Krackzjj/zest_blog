zest/
├── src/
│   ├── main.ts                 # Instanciation Hono + Injection des dépendances
│   │
│   ├── core/                   # 🎨 LE MOTEUR DE RENDU (Transversal)
│   │   ├── renderer/
│   │   │   ├── Renderer.ts     # Classe Maîtresse (Layouts, Render methods)
│   │   │   └── View.ts         # Helper pour les Tagged Templates & Sanitize
│   │   └── theme/
│   │       └── style.css       # Ton CSS global (servi en statique)
│   │
│   ├── modules/                # 🧦 LOGIQUE MÉTIER
│   │   ├── posts/
│   │   │   ├── domain/         # Entité Post et interface Repository
│   │   │   ├── infra/          # Implémentation FileSystem (JSON/MD)
│   │   │   └── api/            # Routes Hono + Contrôleurs de rendu
│   │   │
│   │   └── styleguide/         # 🛠️ LABORATOIRE (Ta page x.html)
│   │       └── api/
│   │           ├── routes.ts   # Route /debug-ui
│   │           └── components/ # Tes partials de test (boutons, cards...)
│   │
│   ├── shared/                 # 🧩 UTILITAIRES
│   │   ├── schemas/            # Tes validations Zod (ex: PostSchema)
│   │   └── utils/              # Helpers divers (slugify, dates...)
│   │
│   └── public/                 # Dossier pour les fichiers statiques (CSS, JS client)
│
├── content/                    # 📂 TON "STORAGE" (Base de données fichiers)
│   └── posts/                  # Fichiers .json ou .md
├── storage/                    # 📂 UPLOADS & CACHE (Gitignored)
├── tsconfig.json               # Config TS (target: ESNext, module: NodeNext)
└── package.json                # Hono, Zod, tsx