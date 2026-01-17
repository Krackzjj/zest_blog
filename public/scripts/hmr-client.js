// src/client/hmr-client.ts
var isFirstConnexion = true;
var connectHMR = () => {
  const evtSource = new EventSource("/__hmr");
  evtSource.onopen = () => {
    if (!isFirstConnexion) {
      console.log("\u267B\uFE0F Serveur reconnect\xE9, rechargement...");
      window.location.reload();
    } else {
      console.log("\u2705 Connexion HMR \xE9tablie");
      isFirstConnexion = false;
    }
  };
  evtSource.onmessage = (event) => {
    if (event.data === "connected" || event.data === "ping") return;
    try {
      const data = JSON.parse(event.data);
      console.log("\u{1F48E} Action HMR :", data.type, "pour", data.file);
      if (data.type === "style") {
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        let found = false;
        links.forEach((link) => {
          const linkFilename = link.href.split("/").pop()?.split("?")[0];
          if (linkFilename === data.file) {
            const url = new URL(link.href, window.location.origin);
            url.searchParams.set("t", Date.now().toString());
            link.href = url.pathname + url.search;
            console.log(`\u2705 Style mis \xE0 jour : ${linkFilename}`);
            found = true;
          }
        });
        if (!found) {
          console.warn(`\u26A0\uFE0F Aucun <link> trouv\xE9 pour le fichier : ${data.file}`);
        }
      } else if (data.type === "reload") {
        window.location.reload();
      }
    } catch (err) {
      console.error("\u274C Erreur HMR :", err);
    }
  };
  evtSource.onerror = () => {
    console.warn("\u{1F50C} Connexion HMR perdue...");
  };
};
connectHMR();
//# sourceMappingURL=hmr-client.js.map
