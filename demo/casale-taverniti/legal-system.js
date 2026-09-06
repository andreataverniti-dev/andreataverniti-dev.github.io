(() => {
  const base = "/demo/casale-taverniti";
  const cookieName = "casale_consent";
  const getCookie = (name) => document.cookie.split("; ").find((row) => row.startsWith(`${name}=`))?.split("=")[1];
  const setConsent = () => {
    document.cookie = `${cookieName}=essential; Max-Age=15552000; Path=${base}; SameSite=Lax; Secure`;
    document.querySelector(".cookie-banner")?.setAttribute("hidden", "");
  };

  function installSemantics() {
    const main = document.querySelector("main");
    if (main && !main.id) main.id = "contenuto";
    if (!document.querySelector(".skip-link")) document.body.insertAdjacentHTML("afterbegin", '<a class="skip-link" href="#contenuto">Salta al contenuto principale</a>');
    document.documentElement.lang = "it";
    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
      if (!link.rel.includes("noopener")) link.rel = `${link.rel} noopener`.trim();
      if (!link.getAttribute("aria-label")) link.setAttribute("aria-label", `${link.textContent.trim()} (si apre in una nuova scheda)`);
    });
    const privacy = document.querySelector(".privacy");
    if (privacy && !privacy.querySelector("a")) {
      const input = privacy.querySelector("input");
      privacy.textContent = " ";
      privacy.prepend(input);
      privacy.insertAdjacentHTML("beforeend", ` Ho letto l’<a href="${base}/privacy/">informativa privacy</a> e acconsento all’uso dei dati per gestire la richiesta.`);
    }
  }

  function installFooterLinks() {
    document.querySelectorAll(".site-footer").forEach((footer) => {
      if (footer.querySelector(".legal-links")) return;
      footer.insertAdjacentHTML("beforeend", `<div class="legal-links"><a href="${base}/privacy/">Privacy</a><a href="${base}/cookie-policy/">Cookie</a><a href="${base}/note-legali/">Note legali e condizioni</a><a href="${base}/accessibilita/">Accessibilità</a><button type="button" data-open-cookie-settings>Preferenze cookie</button></div>`);
    });
  }

  function installCookieSystem() {
    if (document.querySelector(".cookie-banner")) return;
    document.body.insertAdjacentHTML("beforeend", `
      <aside class="cookie-banner" role="region" aria-label="Informazioni sui cookie" ${getCookie(cookieName) ? "hidden" : ""}>
        <h2>La vostra privacy, senza rumore.</h2>
        <p>Questo sito usa soltanto strumenti tecnici necessari al funzionamento e alla memorizzazione delle vostre preferenze. Non usa cookie pubblicitari o di profilazione. I collegamenti a WhatsApp si attivano solo quando li scegliete.</p>
        <div class="cookie-actions"><button class="primary" type="button" data-cookie-accept>Continua con i necessari</button><button type="button" data-cookie-settings>Gestisci preferenze</button><a href="${base}/cookie-policy/">Leggi la Cookie Policy</a></div>
      </aside>
      <dialog class="legal-dialog" id="cookie-settings"><div class="dialog-inner"><div class="dialog-head"><h2>Preferenze cookie</h2><button class="dialog-close" type="button" aria-label="Chiudi">×</button></div><div class="preference-row"><div><h3>Necessari</h3><p>Memorizzano la scelta sui cookie e le impostazioni di accessibilità. Non possono essere disattivati dal pannello perché servono a ricordare le preferenze richieste.</p></div><input type="checkbox" checked disabled aria-label="Cookie necessari sempre attivi"></div><div class="preference-row"><div><h3>Analisi e marketing</h3><p>Non presenti. Il sito non usa analytics, pixel pubblicitari o sistemi di profilazione.</p></div><input type="checkbox" disabled aria-label="Cookie di analisi e marketing non presenti"></div><button class="dialog-save" type="button">SALVA E CHIUDI</button></div></dialog>
      <button class="a11y-launcher" type="button" aria-label="Apri le impostazioni di accessibilità" title="Accessibilità">◐</button>`);
    const dialog = document.querySelector("#cookie-settings");
    document.querySelector("[data-cookie-accept]")?.addEventListener("click", setConsent);
    const open = () => dialog?.showModal();
    document.querySelector("[data-cookie-settings]")?.addEventListener("click", open);
    document.querySelectorAll("[data-open-cookie-settings]").forEach((button) => button.addEventListener("click", open));
    dialog?.querySelector(".dialog-close")?.addEventListener("click", () => dialog.close());
    dialog?.querySelector(".dialog-save")?.addEventListener("click", () => { setConsent(); dialog.close(); });
  }

  function installAccessibility() {
    if (document.querySelector("#a11y-settings")) return;
    document.body.insertAdjacentHTML("beforeend", `<dialog class="legal-dialog" id="a11y-settings"><div class="dialog-inner"><div class="dialog-head"><h2>Accessibilità</h2><button class="dialog-close" type="button" aria-label="Chiudi">×</button></div><p>Personalizza temporaneamente la lettura del sito. Le preferenze restano sul dispositivo.</p><div class="a11y-actions"><button type="button" data-a11y="a11y-large-text" aria-pressed="false">Testo più grande</button><button type="button" data-a11y="a11y-high-contrast" aria-pressed="false">Contrasto elevato</button><button type="button" data-a11y="a11y-underline-links" aria-pressed="false">Sottolinea i link</button><button type="button" data-a11y="a11y-reduce-motion" aria-pressed="false">Riduci animazioni</button></div><button class="dialog-save" type="button" data-a11y-reset>RIPRISTINA</button></div></dialog>`);
    const dialog = document.querySelector("#a11y-settings");
    const stored = JSON.parse(localStorage.getItem("casale_accessibility") || "[]");
    const sync = () => document.querySelectorAll("[data-a11y]").forEach((button) => button.setAttribute("aria-pressed", String(document.documentElement.classList.contains(button.dataset.a11y))));
    stored.forEach((name) => document.documentElement.classList.add(name)); sync();
    document.querySelector(".a11y-launcher")?.addEventListener("click", () => dialog.showModal());
    dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
    dialog.querySelectorAll("[data-a11y]").forEach((button) => button.addEventListener("click", () => {
      document.documentElement.classList.toggle(button.dataset.a11y); sync();
      localStorage.setItem("casale_accessibility", JSON.stringify([...document.documentElement.classList].filter((name) => name.startsWith("a11y-"))));
    }));
    dialog.querySelector("[data-a11y-reset]").addEventListener("click", () => { [...document.documentElement.classList].filter((name) => name.startsWith("a11y-")).forEach((name) => document.documentElement.classList.remove(name)); localStorage.removeItem("casale_accessibility"); sync(); });
  }

  function init() { installSemantics(); installFooterLinks(); installCookieSystem(); installAccessibility(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
  window.addEventListener("load", init); setTimeout(init, 1200);
})();
