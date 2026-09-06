(() => {
  const base = "/demo/casale-taverniti";

  function addCasaleNavigation() {
    document.querySelectorAll(".nav-panel > div").forEach((menu) => {
      if (menu.querySelector(`a[href='${base}/il-casale/']`)) return;
      const life = [...menu.querySelectorAll("a")].find((link) => link.href.includes("/vita-al-casale"));
      const link = document.createElement("a");
      link.href = `${base}/il-casale/`;
      link.innerHTML = "<span>02</span>Il Casale";
      if (location.pathname.includes("/il-casale")) link.className = "active";
      menu.insertBefore(link, life || null);
      [...menu.querySelectorAll("a")].forEach((item, index) => {
        const number = item.querySelector("span");
        if (number) number.textContent = String(index + 1).padStart(2, "0");
      });
    });

    document.querySelectorAll(".site-footer nav").forEach((menu) => {
      if (menu.querySelector(`a[href='${base}/il-casale/']`)) return;
      const link = document.createElement("a");
      link.href = `${base}/il-casale/`;
      link.textContent = "Il Casale";
      const life = [...menu.querySelectorAll("a")].find((item) => item.href.includes("/vita-al-casale"));
      menu.insertBefore(link, life || null);
    });
  }

  function enhanceHome() {
    if (!document.querySelector(".home-page")) return;
    const storyLink = document.querySelector(".story-card a");
    if (storyLink) {
      storyLink.href = `${base}/il-casale/`;
      storyLink.innerHTML = "SCOPRI GLI AMBIENTI <b>↗</b>";
    }
    if (document.querySelector(".home-casale-preview")) return;
    const anchor = document.querySelector(".time-section");
    if (!anchor) return;
    anchor.insertAdjacentHTML("beforebegin", `
      <section class="home-casale-preview reveal">
        <div class="home-casale-preview__head">
          <div><p class="kicker">DENTRO IL CASALE</p><h2>Una casa vera,<br><i>tutta per voi.</i></h2></div>
          <div><p>Dalla tavola alla camera, ogni ambiente conserva la materia e il ritmo della casa di campagna. Nessuna stanza condivisa: durante il soggiorno il Casale appartiene soltanto a voi.</p><a href="${base}/il-casale/">VISITA TUTTI GLI AMBIENTI <b>↗</b></a></div>
        </div>
        <div class="home-casale-preview__gallery">
          <figure><img src="${base}/immagini/casale/tavola-cucina.jpg" alt="La tavola apparecchiata accanto alla cucina del casale" loading="lazy"><figcaption>LA TAVOLA E LA CUCINA</figcaption></figure>
          <figure><img src="${base}/immagini/casale/camera.jpg" alt="Camera matrimoniale con pareti in pietra e soffitto in legno" loading="lazy"><figcaption>LA CAMERA IN PIETRA</figcaption></figure>
          <figure><img src="${base}/immagini/casale/vista-dalla-finestra.jpg" alt="Il paesaggio visibile dalla finestra del casale" loading="lazy"><figcaption>LA CAMPAGNA DALLA FINESTRA</figcaption></figure>
        </div>
      </section>`);
  }

  function enhanceLife() {
    if (!document.querySelector(".life-page") || document.querySelector(".life-new-chapter")) return;
    const anchor = document.querySelector(".life-close");
    if (!anchor) return;
    const images = [
      ["pomodori-raccolti.jpg", "Pomodori appena raccolti", "DALL’ORTO · POMODORI"],
      ["fichi-dindia-maturi.jpg", "Fichi d'India maturi sulla pianta", "DALLA TERRA · FICHI D’INDIA"],
      ["fichi-dindia.jpg", "Fichi d'India nel paesaggio del casale", "FRUTTI DI FINE ESTATE"],
      ["biscotti-della-casa.jpg", "Biscotti preparati in casa", "DALLA CUCINA · BISCOTTI"],
      ["preparazione-artigianale.jpg", "Una preparazione artigianale al Casale", "GESTI FATTI A MANO"]
    ];
    const cards = images.map(([file, alt, caption]) => `<figure><img src="${base}/immagini/nuove/${file}" alt="${alt}" loading="lazy"><figcaption>${caption}</figcaption></figure>`).join("");
    anchor.insertAdjacentHTML("beforebegin", `
      <section class="life-new-chapter reveal">
        <div class="life-new-chapter__intro">
          <div><p class="kicker">NUOVI RACCONTI · DALLA CASA ALLA TAVOLA</p><h2>Ogni stagione<br>lascia un <i>segno.</i></h2></div>
          <p>La vita del Casale comincia fuori dalla porta: nella strada che arriva tra le case di pietra, nei frutti raccolti quando sono maturi e nelle preparazioni fatte ancora a mano. Sono gesti semplici, ma danno alla giornata il suo sapore.</p>
        </div>
        <div class="life-new-chapter__rail">${cards}</div>
        <p class="carousel-hint">TRASCINA PER CONTINUARE IL RACCONTO →</p>
      </section>`);
  }

  function applyEnhancements() {
    addCasaleNavigation();
    enhanceHome();
    enhanceLife();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", applyEnhancements);
  else applyEnhancements();
  window.addEventListener("load", applyEnhancements);
  setTimeout(applyEnhancements, 1200);
})();
