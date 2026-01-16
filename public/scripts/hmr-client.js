// src/client/hmr-client.ts
var isFirstConnection = true;
var connectHMR = () => {
  const evtSource = new EventSource("/__hmr");
  evtSource.onopen = () => {
    if (!isFirstConnection) {
      console.log("\u267B\uFE0F Serveur red\xE9marr\xE9, rechargement de la page...");
      window.location.reload();
    } else {
      console.log("\u{1F680} Connexion HMR \xE9tablie");
      isFirstConnection = false;
    }
  };
  evtSource.onmessage = (event) => {
    try {
      if (event.data === "connected") return;
      const data = JSON.parse(event.data);
      if (data.file) {
        console.log("\u{1F514} Signal HMR re\xE7u pour :", data.file);
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        links.forEach((link) => {
          const linkUrl = new URL(link.href, window.location.origin);
          if (linkUrl.pathname.includes(data.file)) {
            const nextHref = linkUrl.pathname + "?t=" + Date.now();
            link.href = nextHref;
            console.log("\u{1F485} Style mis \xE0 jour avec succ\xE8s !");
          }
        });
      }
    } catch (err) {
      console.error("\u274C Erreur lors du traitement du message HMR :", err);
    }
  };
  evtSource.onerror = () => {
    console.warn("\u{1F50C} Connexion HMR perdue (le serveur red\xE9marre peut-\xEAtre...)");
  };
};
connectHMR();
//# sourceMappingURL=hmr-client.js.map
