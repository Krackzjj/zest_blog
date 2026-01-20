document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener("htmx:beforeSwap", (e: any) => {
        if (e.detail.xhr.status === 404 || e.detail.xhr.status === 500) {
            e.detail.shouldSwap = true;
            e.detail.isError = false;
        }
    });
    document.body.addEventListener('htmx:responseError', (evt: any) => {
        console.error('HTMX Error:', evt.detail.xhr.status, evt.detail.xhr.responseText);
    });
});