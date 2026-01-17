let isFirstConnexion = true;

const connectHMR = () => {
    const evtSource = new EventSource("/__hmr");

    evtSource.onopen = () => {
        if (!isFirstConnexion) {
            console.log("♻️ Serveur reconnecté, rechargement...")
            window.location.reload();
        } else {
            console.log("✅ Connexion HMR établie");
            isFirstConnexion = false;
        }
    };

    evtSource.onmessage = (event) => {
        if (event.data === "connected" || event.data === "ping") return;

        try {
            const data = JSON.parse(event.data);
            console.log("💎 Action HMR :", data.type, "pour", data.file);

            if (data.type === 'style') {
                const links = document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]');
                let found = false;

                links.forEach(link => {
                    const linkFilename = link.href.split('/').pop()?.split('?')[0];

                    if (linkFilename === data.file) {
                        const url = new URL(link.href, window.location.origin);
                        url.searchParams.set('t', Date.now().toString());

                        link.href = url.pathname + url.search;
                        console.log(`✅ Style mis à jour : ${linkFilename}`);
                        found = true;
                    }
                });

                if (!found) {
                    console.warn(`⚠️ Aucun <link> trouvé pour le fichier : ${data.file}`);
                }
            }
            else if (data.type === 'reload') {
                window.location.reload();
            }
        } catch (err) {
            console.error("❌ Erreur HMR :", err);
        }
    };

    evtSource.onerror = () => {
        console.warn("🔌 Connexion HMR perdue...");
    }
}

connectHMR();