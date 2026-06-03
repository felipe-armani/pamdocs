window.addEventListener('click', (e) => {
    const el = e.target.closest('button, a, input, select, [role="button"], li, [role="listitem"], [role="tab"]') || e.target;
    const txt = el.getAttribute('aria-label') || el.placeholder || el.innerText || el.alt || '';
    const rect = el.getBoundingClientRect();
    if (window.onUserAction) {
        window.onUserAction({
            action: 'click',
            x: e.clientX,
            y: e.clientY,
            element: {
                tag: el.tagName,
                text: txt.trim().substring(0, 40),
                rect: {
                    x: rect.x,
                    y: rect.y,
                    width: rect.width,
                    height: rect.height
                }
            }
        });
    }
}, true);
