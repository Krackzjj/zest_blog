// src/client/hmr-client.ts
var isInitialConnection = true;
function connectHMR() {
  const es = new EventSource("/__hmr");
  es.onopen = () => {
    console.log("\u{1F680} HMR: Connect\xE9 au serveur");
    if (!isInitialConnection) {
      console.log("\u{1F504} Code serveur modifi\xE9, rechargement...");
      window.location.reload();
    }
    isInitialConnection = false;
  };
  es.onmessage = (event) => {
    if (event.data === "connected" || event.data === "ping") return;
    try {
      const payload = JSON.parse(event.data);
      if (payload.type === "style") {
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        links.forEach((link) => {
          const href = link.getAttribute("href");
          if (!href) return;
          const url = new URL(href, window.location.origin);
          url.searchParams.set("t", Date.now().toString());
          link.setAttribute("href", url.pathname + url.search);
        });
        console.log("\u{1F3A8} Style mis \xE0 jour");
      }
    } catch (err) {
      console.error("Erreur HMR:", err);
    }
  };
  es.onerror = () => {
    es.close();
    setTimeout(connectHMR, 1e3);
  };
}
connectHMR();
//# sourceMappingURL=hmr-client.js.map
