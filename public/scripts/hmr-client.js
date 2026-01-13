let isFirstConnection = true;

const connectHMR = () => {
    const evtSource = new EventSource("/__hmr");

    evtSource.onopen = () => {
        if (!isFirstConnection) {
            console.log("♻️ Serveur redémarré, rechargement de la page...");
            window.location.reload();
        } else {
            console.log("🚀 Connexion HMR établie");
            isFirstConnection = false;
        }
    };

    evtSource.onmessage = (event) => {
        try {
            if (event.data === "connected") return;

            const data = JSON.parse(event.data);

            if (data.file) {
                console.log("🔔 Signal HMR reçu pour :", data.file);
                const links = document.querySelectorAll('link[rel="stylesheet"]');

                links.forEach(link => {
                    const linkUrl = new URL(link.href, window.location.origin);

                    if (linkUrl.pathname.includes(data.file)) {
                        const nextHref = linkUrl.pathname + '?t=' + Date.now();
                        link.href = nextHref;
                        console.log('💅 Style mis à jour avec succès !');
                    }
                });
            }
        } catch (err) {
            console.error("❌ Erreur lors du traitement du message HMR :", err);
        }
    };

    evtSource.onerror = () => {
        console.warn("🔌 Connexion HMR perdue (le serveur redémarre peut-être...)");
    };
};

connectHMR();