// src/client/zest-htmx.ts
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("htmx:beforeSwap", (e) => {
    if (e.detail.xhr.status === 404 || e.detail.xhr.status === 500) {
      e.detail.shouldSwap = true;
      e.detail.isError = false;
    }
  });
  document.body.addEventListener("htmx:responseError", (evt) => {
    console.error("HTMX Error:", evt.detail.xhr.status, evt.detail.xhr.responseText);
  });
});
//# sourceMappingURL=zest-htmx.js.map
