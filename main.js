// main.js

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

// =========================
// HEADER — CURRENT UCL CHAMPION (MANUAL)
// =========================
function renderChampionStrip() {
  const host = document.getElementById("champion-strip");
  if (!host) return;

  const data = window.CURRENT_UCL_CHAMPION;
  if (!data) {
    host.innerHTML = "";
    return;
  }

  const player = String(data.playerLabel || "").trim();
  const teamKey = String(data.teamKey || "").trim();
  const team = String(data.teamLabel || "").trim();
  const date = String(data.date || "").trim();
  const note = String(data.note || "UCL CHAMPION").trim();

  if (!player && !team) {
    host.innerHTML = "";
    return;
  }

  const logo = teamKey ? window.getLogoPath(teamKey) : "";

  host.innerHTML = `
    <div class="champion-pill" role="status" aria-label="${note}: ${player} — ${team} (${date})">
      <div class="champion-tag" data-text="${note}">${note}</div>

      <div class="champion-main">
        <div class="champion-who">${player}</div>
        <div class="champion-sep">—</div>

        <div class="champion-team">
          ${teamKey ? `<img class="champion-logo" src="${logo}" alt="${team}" onerror="this.style.display='none'">` : ""}
          <span class="champion-teamname">${team}</span>
        </div>
      </div>

      ${date ? `<div class="champion-date">${date}</div>` : ""}
      <div class="champion-scan" aria-hidden="true"></div>
    </div>
  `;
}


let currentTournamentId = null;

// =========================
// LC DRAFT MUSIC
// =========================
let lcDraftMusic = null;

function startLcDraftMusic() {
  try {
    if (!lcDraftMusic) {
      lcDraftMusic = new Audio("assets/sounds/gimndrafta.mp3");
      lcDraftMusic.loop = true;
      lcDraftMusic.volume = 0.35;   // можешь менять громкость тут (0.0 - 1.0)
      lcDraftMusic.preload = "auto";
    }

    // если уже играет — не перезапускаем
    if (!lcDraftMusic.paused) return;

    const p = lcDraftMusic.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  } catch (e) {}
}

function stopLcDraftMusic() {
  if (!lcDraftMusic) return;
  try {
    lcDraftMusic.pause();
    lcDraftMusic.currentTime = 0;
  } catch (e) {}
}

/**
 * Точка входа приложения.
 * По умолчанию показываем экран сезонов.
 */
function initApp() {
  initNavigation();
  renderChampionStrip();
  navigateToView("seasons");
}



/**
 * Инициализация навигации:
 * - клики по кнопкам ANDREY / MAKS / LC DRAFT / WC DRAFT
 * - клик по заголовку FIFAHUB 2.0 возвращает на сезоны
 */
function initNavigation() {
  const nav = document.getElementById("hub-nav");
  const heroTitle = document.querySelector(".hero-title");

  // клики по кнопкам навигации
  if (nav) {
    nav.addEventListener("click", (event) => {
      const button = event.target.closest(".nav-button");
      if (!button) return;

      const view = button.dataset.view;
      if (!view) return;

      setActiveNavButton(view);
      navigateToView(view);
    });
  }

  // клик по заголовку – домой (сезоны)
  if (heroTitle) {
    heroTitle.addEventListener("click", () => {
      setActiveNavButton(null);
      navigateToView("seasons");
    });
  }
}

/**
 * Подсветка активной кнопки в навигации.
 */
function setActiveNavButton(viewName) {
  const nav = document.getElementById("hub-nav");
  if (!nav) return;

  const buttons = nav.querySelectorAll(".nav-button");
  buttons.forEach((btn) => {
    const btnView = btn.dataset.view;
    if (viewName && btnView === viewName) {
      btn.classList.add("is-active");
    } else {
      btn.classList.remove("is-active");
    }
  });
}

/**
 * "Роутер" по экранам.
 * Каждый экран полностью заменяет содержимое #view-root.
 */
function navigateToView(viewName) {
  const root = document.getElementById("view-root");
  if (!root) return;

    if (viewName !== "lc-draft") stopLcDraftMusic();


  // очищаем контейнер
  root.innerHTML = "";

  switch (viewName) {
    case "andrey":
      renderAndreyView(root);
      break;

    case "maks":
      renderMaksView(root);
      break;

    case "lc-draft":
      renderLcDraftView(root);
      break;

    case "wc-draft":
      renderWcDraftView(root);
      break;

        case "fc26-tournaments":
      renderFc26TournamentsView(root);
      break;

    case "tournament-empty":
      renderTournamentEmptyView(root);
      break;

    case "hof":
      renderHallOfFameView(root);
      break;


    case "seasons":
    default:
      renderSeasonsView(root);
      break;
  }
}

function renderHallOfFameView(root) {
  // SCORERS
  const list = Array.isArray(window.HOF_SCORERS) ? window.HOF_SCORERS : [];
const scorersSorted = list
  .slice()
  .sort((a, b) => (Number(a.rank) || 999) - (Number(b.rank) || 999));


  // LEGENDS
  const legends = Array.isArray(window.HOF_LEGENDS) ? window.HOF_LEGENDS : [];

  // cups icons (LEGENDS)
  const CUP_ICONS = {
    lc: "assets/halloffames/cups/lcfame.png",
    wc: "assets/halloffames/cups/wcfame.png",
    euro: "assets/halloffames/cups/eurofame.png",
    supercup: "assets/halloffames/cups/supercupfame.png"
  };

  const section = document.createElement("section");
  section.className = "hof-view";

  section.innerHTML = `
    <div class="hof-section">
      <div class="hof-section-title">SCORERS</div>

      <div class="hof-scorers-list">
        ${scorersSorted.map((p) => {

          const rank = Number(p.rank) || 0;
          const medal = rank === 1 ? "gold" : (rank === 2 ? "silver" : (rank === 3 ? "bronze" : null));
const rowClass = medal ? `hof-scorer-row hof-scorer-row--${medal}` : `hof-scorer-row hof-scorer-row--plain`;

          const clubLogo = p.teamKey ? window.getLogoPath(p.teamKey) : "";
          const goals = (typeof p.goals === "number") ? p.goals : "—";

          return `
            <div class="${rowClass}">

              <div class="hof-medal-badge">#${rank}</div>

              <div class="hof-photo">
                <img src="${p.photo}" alt="${p.name}" onerror="this.style.opacity='0'">
              </div>

              <div class="hof-mid">
                <div class="hof-name-row">
                  ${clubLogo ? `<img class="hof-club-logo" src="${clubLogo}" alt="${p.teamKey}" onerror="this.style.display='none'">` : ""}
                  <div class="hof-name">${p.name}</div>
                </div>
              </div>

              <div class="hof-goals">
                <div class="hof-goals-num">${goals}</div>
                <div class="hof-goals-label">GOALS</div>
              </div>

              <div class="hof-row-scan" aria-hidden="true"></div>
            </div>
          `;
        }).join("")}
      </div>
    </div>

    <div class="hof-divider"></div>

    <div class="hof-section hof-section--legends">
      <div class="hof-section-title hof-section-title--legends">LEGENDS</div>

      <div class="hof-legends-list">
        ${legends.map((p) => {
          const clubLogo = p.teamKey ? window.getLogoPath(p.teamKey) : "";
          const pos = String(p.position || "").toUpperCase();
          const quote = p.quote || "«…»";

          const trophies = p.trophies || {};
          const trophyKeys = Object.keys(trophies).filter(k => trophies[k]);

          const trophiesHtml = trophyKeys.length
            ? trophyKeys.map((k) => {
                const count = trophies[k];
                const icon = CUP_ICONS[k];
                if (!icon) return "";
                return `
                  <div class="hof-trophy">
                    <img class="hof-trophy-icon" src="${icon}" alt="${k}" onerror="this.style.display='none'">
                    ${count > 1 ? `<span class="hof-trophy-x">x${count}</span>` : ``}
                  </div>
                `;
              }).join("")
            : `<div class="hof-trophy-empty">—</div>`;

          return `
            <div class="hof-legend-row"
                 data-hof-legend="1"
                 data-quote="${String(quote).replaceAll('"', '&quot;')}">
              <div class="hof-photo">
                <img src="${p.photo}" alt="${p.name}" onerror="this.style.opacity='0'">
              </div>

              <div class="hof-mid">
                <div class="hof-name-row">
                  ${clubLogo ? `<img class="hof-club-logo" src="${clubLogo}" alt="${p.teamKey}" onerror="this.style.display='none'">` : ""}
                  <span class="hof-pos hof-pos--${pos.toLowerCase()}">${pos}</span>

                  <div class="hof-name">${p.name}</div>
                </div>
              </div>

              <div class="hof-trophies">
                ${trophiesHtml}
              </div>

              <div class="hof-row-scan" aria-hidden="true"></div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;

  root.appendChild(section);

  // --- GLOBAL MODAL (always centered) ---
let modal = document.getElementById("hof-modal");
let quoteEl = document.getElementById("hof-modal-quote");

// если модалки ещё нет — создаём и кладём в body
if (!modal) {
  modal = document.createElement("div");
  modal.className = "hof-modal";
  modal.id = "hof-modal";
  modal.setAttribute("aria-hidden", "true");

  modal.innerHTML = `
    <div class="hof-modal-card">
      <div class="hof-modal-quote" id="hof-modal-quote"></div>
      <div class="hof-modal-hint">CLICK TO CLOSE</div>
    </div>
  `;

  document.body.appendChild(modal);
  quoteEl = document.getElementById("hof-modal-quote");
}


  // MODAL (legend quote)
section.addEventListener("click", (e) => {
  const row = e.target.closest("[data-hof-legend]");
  if (!row) return;

  // если уже открыто — закрываем
  if (document.body.classList.contains("hof-modal-open")) {
    document.body.classList.remove("hof-modal-open");
    modal.setAttribute("aria-hidden", "true");
    return;
  }

  const quote = row.getAttribute("data-quote") || "«…»";
  quoteEl.textContent = quote;

  document.body.classList.add("hof-modal-open");
  modal.setAttribute("aria-hidden", "false");
});

modal.onclick = () => {
  document.body.classList.remove("hof-modal-open");
  modal.setAttribute("aria-hidden", "true");
};


}




function getTournamentTheme(type) {
  const normalized = String(type || "")
    .trim()
    .toLowerCase();

  const map = {
    "championsleague": { label: "UCL", color: "#7C3AED" },   // фиолетовый
    "ucl":             { label: "UCL", color: "#7C3AED" },

    "supercup":        { label: "SUPERCUP", color: "#D1D5DB" }, // белый/серый
    "sc":              { label: "SUPERCUP", color: "#D1D5DB" },

    "worldcup":        { label: "WORLD CUP", color: "#FACC15" }, // жёлтый
    "wc":              { label: "WORLD CUP", color: "#FACC15" },

    "euro":            { label: "EURO", color: "#EF4444" },  // красный
    "uefaeuro":        { label: "EURO", color: "#EF4444" }
  };

  return map[normalized] || { label: "TOURNAMENT", color: "#64748b" };
}


function renderFc26TournamentsView(root) {
  const section = document.createElement("section");
  section.className = "tournaments-view";
  section.id = "fc26-tournaments-stage";

  const list = Array.isArray(window.FC26_TOURNAMENTS) ? window.FC26_TOURNAMENTS : [];

  section.innerHTML = `
    <div class="tournaments-head">
      <div class="tournaments-title">FC 26 • TOURNAMENTS</div>
      <button class="tournaments-back" data-action="back-to-seasons">BACK</button>
    </div>

    <div class="tournament-list">
      ${list.map((t) => {
        const theme = getTournamentTheme(t.type);
        const title = t.title || theme.label;
        const date = t.date || "";

        // Лого клубов (если ключи есть)
        const aLogo = t.andreyTeamKey ? window.getLogoPath(t.andreyTeamKey) : "";
        const mLogo = t.maksTeamKey ? window.getLogoPath(t.maksTeamKey) : "";
        // WINNER (если финал отмечен W)
const ko = t?.details?.knockout || {};
const andreyWon = ko?.final?.andrey?.result === "W";
const maksWon   = ko?.final?.maks?.result === "W";


return `
  <button class="tournament-btn"
          data-action="open-tournament"
          data-tid="${t.id}"
          style="--tourn-color: ${theme.color};">

    <div class="tourn-leftline">
      <span class="tourn-title">${title}</span>
      <span class="tourn-dot" aria-hidden="true"></span>
      <span class="tourn-date">${date}</span>
    </div>

    <div class="tourn-centerline">
      <span class="tourn-player ${andreyWon ? "tourn-player--winner" : (maksWon ? "tourn-player--loser" : "")}">ANDREY</span>
      <span class="tourn-dash">—</span>
      ${aLogo ? `<img class="tourn-club" src="${aLogo}" alt="ANDREY CLUB" onerror="this.style.display='none'">` : ""}

      <span class="tourn-center-gap" aria-hidden="true"></span>

      <span class="tourn-player ${maksWon ? "tourn-player--winner" : (andreyWon ? "tourn-player--loser" : "")}">MAKS</span>
      <span class="tourn-dash">—</span>
      ${mLogo ? `<img class="tourn-club" src="${mLogo}" alt="MAKS CLUB" onerror="this.style.display='none'">` : ""}
    </div>

    <div class="tourn-spacer" aria-hidden="true"></div>

    <div class="tournament-scan" aria-hidden="true"></div>
  </button>
`;
      }).join("")}
    </div>
  `;

  section.onclick = handleFc26TournamentsClick;
  root.appendChild(section);
}



function handleFc26TournamentsClick(e) {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;

  const action = btn.getAttribute("data-action");

  if (action === "back-to-seasons") {
    navigateToView("seasons");
    return;
  }

  if (action === "open-tournament") {
    currentTournamentId = btn.getAttribute("data-tid");
    navigateToView("tournament-empty");
    return;
  }
}

function renderTournamentEmptyView(root) {
  const list = Array.isArray(window.FC26_TOURNAMENTS) ? window.FC26_TOURNAMENTS : [];
  const t = list.find(x => x.id === currentTournamentId);

  const theme = t ? getTournamentTheme(t.type) : { label: "TOURNAMENT", color: "#64748b" };
  const title = t ? (t.title || theme.label) : "TOURNAMENT";
  const date  = t ? (t.date || "") : "";

  const aTeamKey   = t?.andreyTeamKey || "";
  const mTeamKey   = t?.maksTeamKey || "";
  const aTeamLabel = t?.andreyTeamLabel || "ANDREY";
  const mTeamLabel = t?.maksTeamLabel || "MAKS";

  const aLogo = aTeamKey ? window.getLogoPath(aTeamKey) : "";
  const mLogo = mTeamKey ? window.getLogoPath(mTeamKey) : "";

  const details = t?.details || {};
  const gsA = details?.groupStage?.andrey || null;
  const gsM = details?.groupStage?.maks || null;

  const ko = details?.knockout || {};

  const champ =
  (ko?.final?.andrey?.result === "W") ? { who: "ANDREY", team: aTeamLabel, logo: aLogo } :
  (ko?.final?.maks?.result === "W")   ? { who: "MAKS",   team: mTeamLabel, logo: mLogo } :
  null;



  const awards = details?.awards || {};
  const mvp = awards?.mvp || null;

  const fmtGD = (v) => (typeof v === "number" ? (v > 0 ? `+${v}` : `${v}`) : "—");
  const fmtNum = (v) => (typeof v === "number" ? `${v}` : "—");

  const renderGsCard = (whoLabel, teamLabel, logo, row) => {
    const place = row?.place ?? null;

    return `
      <div class="gs-card">
        

        <div class="gs-place">
          
          <span class="gs-place-value">${place ? `#${place}` : "—"}</span>
        </div>

<div class="gs-table">
  <div class="gs-th">W</div><div class="gs-th">D</div><div class="gs-th">L</div>
  <div class="gs-th">GF</div><div class="gs-th">GA</div><div class="gs-th">GD</div><div class="gs-th">PTS</div>

<div class="gs-td gs-td--w">${fmtNum(row?.w)}</div>
<div class="gs-td gs-td--d">${fmtNum(row?.d)}</div>
<div class="gs-td gs-td--l">${fmtNum(row?.l)}</div>


  <div class="gs-td">${fmtNum(row?.gf)}</div>
  <div class="gs-td">${fmtNum(row?.ga)}</div>
  <div class="gs-td">${fmtGD(row?.gd)}</div>
  <div class="gs-td gs-td--pts">${fmtNum(row?.pts)}</div>
</div>

      </div>
    `;
  };

  const tieHtml = (tie) => {
    if (!tie) {
      return `<div class="tie-card tie-card--empty">—</div>`;
    }

    const oppLogo = tie.opponentKey ? window.getLogoPath(tie.opponentKey) : "";
    const aggText = (tie.agg && typeof tie.agg.f === "number" && typeof tie.agg.a === "number")
      ? `${tie.agg.f}–${tie.agg.a}`
      : "—";

    const legs = Array.isArray(tie.legs) ? tie.legs : [];
    const legsText = (legs.length === 2)
      ? `${legs[0].f}–${legs[0].a} • ${legs[1].f}–${legs[1].a}`

      : (legs.length === 1 ? `FT: ${legs[0].f}–${legs[0].a}` : "—");

    const cardClass = tie.result === "W" ? "tie-card--win" : (tie.result === "L" ? "tie-card--loss" : "");




    const canFlip = legs.length >= 2;

    return `
  <div class="tie-card ${cardClass}">
    <div class="tie-row">

      <div class="tie-crest">
        ${oppLogo ? `<img class="tie-opp-logo-big" src="${oppLogo}" alt="${tie.opponentLabel || "OPP"}" onerror="this.style.display='none'">` : ""}
      </div>

      <div class="tie-opp-name-big">
        <span>${tie.opponentLabel || "OPPONENT"}</span>
      </div>

<button class="tie-score flip-card ${canFlip ? "" : "tie-score--locked"}"
        ${canFlip ? "" : 'aria-disabled="true"'}
        data-mode="agg"
        data-agg="AGG ${aggText}"
        data-legs="${legsText}">

        <span class="flip-face flip-front">AGG ${aggText}</span>
        <span class="flip-face flip-back">${legsText}</span>
      </button>

    </div>
  </div>
`;


  };

  const renderStageRow = (label, stageObj) => {
    const aTie = stageObj?.andrey ?? null;
    const mTie = stageObj?.maks ?? null;

    const isFinal = String(label).toUpperCase() === "FINAL";

            return `
      <div class="ko-stage ${isFinal ? "ko-stage--final" : ""}">
        <div class="ko-stage-head">
          <div class="ko-stage-label">${label}</div>
        </div>

        <div class="ko-stage-grid">
          <div class="ko-col">
            ${tieHtml(aTie)}
          </div>
          <div class="ko-col">
            ${tieHtml(mTie)}
          </div>
        </div>
      </div>
    `;


  };


  const section = document.createElement("section");
  section.className = "tournament-page";
  section.style.setProperty("--tourn-color", theme.color);

    // водяные лого для афиши (если лого нет — будет "none")
  section.style.setProperty("--hero-a-logo", aLogo ? `url('${aLogo}')` : "none");
  section.style.setProperty("--hero-m-logo", mLogo ? `url('${mLogo}')` : "none");


  section.innerHTML = `


    <div class="tournament-hero tournament-hero--poster">
  <button class="tournament-hero-back" data-action="back-to-tournaments">BACK</button>

      <div class="tournament-hero-left">
        <div class="hero-line">
          <span class="hero-ucl">${title}</span>
          <span class="hero-dot" aria-hidden="true"></span>
          <span class="hero-date">${date}</span>
        </div>
      </div>

      <div class="tournament-hero-center">
        <div class="hero-player">

          ${aLogo ? `<img class="hero-club" src="${aLogo}" alt="${aTeamLabel}" onerror="this.style.display='none'">` : ""}
          <span class="hero-team">${aTeamLabel}</span>
        </div>

        <div class="hero-vs" aria-hidden="true">VS</div>


<div class="hero-player hero-player--right">
  <span class="hero-team">${mTeamLabel}</span>
  ${mLogo ? `<img class="hero-club" src="${mLogo}" alt="${mTeamLabel}" onerror="this.style.display='none'">` : ""}
</div>

      </div>

      <div class="tournament-hero-right">
  ${champ ? `
    
  ` : ``}
</div>



    </div>

    <div class="tournament-section">
      <div class="section-title">GROUP STAGE</div>
      <div class="gs-grid">
        ${renderGsCard("ANDREY", aTeamLabel, aLogo, gsA)}
        ${renderGsCard("MAKS",   mTeamLabel, mLogo, gsM)}
      </div>
    </div>

    <div class="tournament-section">
      <div class="section-title">KNOCKOUT</div>

      ${renderStageRow("1/16", ko?.r32 || null)}
      ${renderStageRow("1/8",  ko?.r16 || null)}
      ${renderStageRow("1/4",  ko?.qf  || null)}
      ${renderStageRow("1/2",  ko?.sf  || null)}
      ${renderStageRow("FINAL", ko?.final || null)}
    </div>

    <div class="tournament-section">
      <div class="section-title">AWARDS</div>
      <div class="award-fut">
  <div class="award-fut-left">
    <div class="award-fut-tag">MVP</div>

    <div class="award-fut-player">${mvp?.player || "—"}</div>

    <div class="award-fut-team">
      ${mvp?.teamKey ? `<img class="award-fut-teamlogo" src="${window.getLogoPath(mvp.teamKey)}" alt="${mvp.teamLabel || "TEAM"}" onerror="this.style.display='none'">` : ""}
      <span class="award-fut-teamname">${mvp?.teamLabel || "—"}</span>
    </div>
  </div>

  <div class="award-fut-right">
    <div class="award-fut-rating">
      <div class="award-fut-rating-num">${typeof mvp?.ratingAvg === "number" ? mvp.ratingAvg.toFixed(2) : "—"}</div>
      <div class="award-fut-rating-label">AVG RATING</div>
    </div>
  </div>
</div>

  `;

  section.onclick = (e) => {
    const actionBtn = e.target.closest("[data-action]");
    if (actionBtn && actionBtn.getAttribute("data-action") === "back-to-tournaments") {
      navigateToView("fc26-tournaments");
      return;
    }

const scoreBtn = e.target.closest(".tie-score");
if (!scoreBtn) return;
if (scoreBtn.getAttribute("aria-disabled") === "true") return;



const mode = scoreBtn.dataset.mode;
if (mode === "agg") {
  scoreBtn.dataset.mode = "legs";
  scoreBtn.classList.add("is-flipped");
} else {
  scoreBtn.dataset.mode = "agg";
  scoreBtn.classList.remove("is-flipped");
}

  };

  root.appendChild(section);
  // включаем marquee для длинных названий
requestAnimationFrame(() => applyOverflowMarquee(section));

}





/**
 * ЭКРАН СЕЗОНОВ – "домашняя" страница.
 */
function renderSeasonsView(root) {
  const section = document.createElement("section");
  section.className = "seasons-grid";
  section.id = "seasons-grid";

  root.appendChild(section);
  renderSeasonTiles(section);
}

/**
 * Рендер плиток сезонов в переданный grid-элемент.
 */
function renderSeasonTiles(grid) {
  if (!grid || typeof FIFA_SEASONS === "undefined") return;

  grid.innerHTML = "";

  FIFA_SEASONS.forEach((season) => {
    const card = document.createElement("article");
    card.className = "season-tile";

    // цвета сезона из data.js
    if (season.color) {
      card.style.setProperty("--season-color", season.color);
    }
    if (season.colorSoft) {
      card.style.setProperty("--season-color-soft", season.colorSoft);
    }

    // фон клуба-победителя
    if (season.backgroundPath) {
      card.style.setProperty(
        "--season-bg-image",
        `url('${season.backgroundPath}')`
      );
    }


    // актуальная FIFA / FC
    if (season.isCurrent) {
      card.classList.add("season-tile--current");
    }

    // FIFA 19–23, FC 24–26
    const isFc = season.year >= 2024;
    const titleText = `${isFc ? "FC" : "FIFA"} ${season.short}`;

    card.innerHTML = `
      <div class="season-tile-header">
        <div class="season-tile-title">${titleText}</div>
        <div class="season-tile-title-bar"></div>
      </div>

      <div class="season-tile-body"></div>

      ${season.isCurrent ? '<div class="season-tile-status">ACTUAL</div>' : ""}
    `;

    grid.appendChild(card);

        // Клик только по FIFA 26 → страница турниров
    if (season.id === "fifa26") {
      card.classList.add("season-tile--clickable");
      card.addEventListener("click", () => {
        navigateToView("fc26-tournaments");
      });
    }


  });
}


function getTrophyCounts(playerKey) {
  const p = (window.TROPHY_DATA && window.TROPHY_DATA[playerKey]) ? window.TROPHY_DATA[playerKey] : {};

  const cl = Array.isArray(p?.championsLeague?.items) ? p.championsLeague.items.length : 0;
  const euro = Array.isArray(p?.euro?.items) ? p.euro.items.length : 0;
  const wc = Array.isArray(p?.worldCup?.items) ? p.worldCup.items.length : 0;
  const sc = Array.isArray(p?.superCup?.items) ? p.superCup.items.length : 0;

  return { cl, euro, wc, sc, score: cl + euro + wc + sc };
}

function buildTrophySummaryHtml(playerKey) {
  const d = (window.TROPHY_DATA && window.TROPHY_DATA[playerKey]) ? window.TROPHY_DATA[playerKey] : null;

  const getLen = (zoneKey) => {
    const z = d && d[zoneKey];
    return (z && Array.isArray(z.items)) ? z.items.length : 0;
  };

  const getColor = (zoneKey, fallback) => {
    const z = d && d[zoneKey];
    return (z && z.themeColor) ? z.themeColor : fallback;
  };

  const ucl  = getLen("championsLeague");
  const euro = getLen("euro");
  const wc   = getLen("worldCup");
  const sc   = getLen("superCup");

  const total = ucl + euro + wc + sc;

  const cUcl  = getColor("championsLeague", "#7C3AED");
  const cEuro = getColor("euro",           "#EF4444");
  const cWc   = getColor("worldCup",       "#FACC15");
  const cSc   = getColor("superCup",       "#D1D5DB");

  return `
    <div class="trophy-sum-pill">
      <div class="trophy-sum-item" style="--sum-color:${cUcl}">
        <div class="trophy-sum-k">UCL</div>
        <div class="trophy-sum-v">${ucl}</div>
      </div>

      <div class="trophy-sum-sep"></div>

      <div class="trophy-sum-item" style="--sum-color:${cEuro}">
        <div class="trophy-sum-k">EURO</div>
        <div class="trophy-sum-v">${euro}</div>
      </div>

      <div class="trophy-sum-sep"></div>

      <div class="trophy-sum-item" style="--sum-color:${cWc}">
        <div class="trophy-sum-k">WC</div>
        <div class="trophy-sum-v">${wc}</div>
      </div>

      <div class="trophy-sum-sep"></div>

      <div class="trophy-sum-item" style="--sum-color:${cSc}">
        <div class="trophy-sum-k">SC</div>
        <div class="trophy-sum-v">${sc}</div>
      </div>

      <div class="trophy-sum-sep trophy-sum-sep--wide"></div>

      <div class="trophy-sum-item trophy-sum-item--total">
        <div class="trophy-sum-k">TOTAL</div>
        <div class="trophy-sum-v">${total}</div>
      </div>
    </div>
  `;
}



/**
 * ЭКРАН ANDREY – пока каркас, дальше сюда въедут реальные трофеи.
 */
function renderAndreyView(root) {
  const sum = buildTrophySummaryHtml("andrey");

  root.innerHTML = `
    <div class="andrey-layout">
      <div class="trophy-sum-wrap">
        ${sum}
      </div>
      <div id="andrey-trophies"></div>
    </div>
  `;

  renderAndreyTrophies();
}



function renderAndreyTrophies() {
  const container = document.getElementById("andrey-trophies");
  if (!container || !TROPHY_DATA || !TROPHY_DATA.andrey) return;

  const data = TROPHY_DATA.andrey;

  // Порядок зон: SuperCup → World Cup → EURO → Champions League
  renderTrophyZone(container, data.superCup);
  renderTrophyZone(container, data.worldCup);
  renderTrophyZone(container, data.euro);
  renderTrophyZone(container, data.championsLeague);
}

function renderMaksTrophies() {
  const container = document.getElementById("maks-trophies");
  if (!container || !TROPHY_DATA || !TROPHY_DATA.maks) return;

  const data = TROPHY_DATA.maks;

  // тот же порядок зон: SuperCup → World Cup → EURO → Champions League
  //renderTrophyZone(container, data.superCup);
  renderTrophyZone(container, data.worldCup);
  renderTrophyZone(container, data.euro);
  renderTrophyZone(container, data.championsLeague);
}


function renderTrophyZone(root, zone) {
  if (!zone || !zone.items) return;

  const section = document.createElement("section");
  section.className = "trophy-zone";

  // шапка зоны
  const header = document.createElement("div");
  header.className = "trophy-zone-header";
  header.style.setProperty("--zone-color", zone.themeColor || "#64748B");

  header.innerHTML = `
    <div class="trophy-zone-title">${zone.title}</div>
    <div class="trophy-zone-count">${zone.items.length}</div>
  `;

  // тело зоны – логотипы + кирпичи
  const body = document.createElement("div");
  body.className = "trophy-zone-body";

  zone.items.forEach((item) => {
    const card = createTrophyCard(item);
    body.appendChild(card);
  });

  section.appendChild(header);
  section.appendChild(body);
  root.appendChild(section);
}

function createTrophyCard(item) {
  const card = document.createElement("div");
  card.className = "trophy-card";

  // стрик – синяя рамка, для длинных стриков 4+ делаем её красной
  if (item.streakId) {
    const frame = document.createElement("div");
    frame.className = "trophy-card-streak-frame";

    if (item.streakLength >= 4) {
      frame.classList.add("trophy-card-streak-frame--danger");
    }

    card.appendChild(frame);
  }

  // если трофей помечен как легендарный – вешаем спец-класс
  if (item.isLegend) {
    card.classList.add("trophy-card--legend");
  }

  const logoPath =
    typeof window !== "undefined" && typeof window.getLogoPath === "function"
      ? window.getLogoPath(item.teamKey)
      : "";


  const img = document.createElement("img");
  img.className = "trophy-card-logo";
  img.src = logoPath;
  img.alt = item.teamKey || "";

  const brick = document.createElement("div");
  brick.className = "trophy-card-season";

  const season = FIFA_SEASONS.find((s) => s.id === item.fifaId);
  if (season) {
    const isFc = season.year >= 2024;
    const label = `${isFc ? "FC" : "FIFA"} ${season.short}`;
    brick.textContent = label;

    const color = season.color || "#4B5563";
    brick.style.background = color;
    brick.style.boxShadow = `
      0 0 0 1px ${color}55,
      0 0 18px ${color}66
    `;
  } else {
    brick.textContent = "FIFA ?";
  }

  card.appendChild(img);
  card.appendChild(brick);

  // если это НАЧАЛО серии – рисуем бейдж STREAK ×N
  if (item.streakId && item.streakIndex === 1 && item.streakLength > 1) {
    const badge = document.createElement("div");
    badge.className = "trophy-card-streak-badge";

      // если длина стрика 4 и больше — делаем плашку красной
  if (item.streakLength >= 4) {
    badge.classList.add("trophy-card-streak-badge--danger");
  }
    badge.textContent = `STREAK ×${item.streakLength}`;
    card.appendChild(badge);
  }

      // индивидуальная плашка STREAK для легендарного Реала
if (item.isManualLegendStreak) {
  const badge = document.createElement("div");
  badge.className = "trophy-card-streak-badge trophy-card-streak-badge--danger";
  badge.textContent = `STREAK ×${item.manualLegendStreakValue}`;
  card.appendChild(badge);
}

  return card;
}




/**
 * ЭКРАН MAKS.
 */
function renderMaksView(root) {
  const sum = buildTrophySummaryHtml("maks");

  root.innerHTML = `
    <div class="andrey-layout">
      <div class="trophy-sum-wrap">
        ${sum}
      </div>
      <div id="maks-trophies"></div>
    </div>
  `;

  renderMaksTrophies();
}







/**
 * ЭКРАН LC DRAFT — ОСТАВЛЕН ТОЛЬКО 1 ЭТАП + РУЛЕТКА.
 * Было удалено из LC Draft:
 * - этап "4 команды";
 * - плей-офф / финал;
 * - старые data-action (lc-draft-open-pack, lc-draft-playoff, lc-draft-final и т.д.).
 *
 * Текущая логика:
 * 1) 6 паков на экране
 * 2) DRAFT! → 3..2..1 → показываем 1 выпавший пак (по probabilityWeight)
 * 3) OPEN → запускается рулетка команд именно этого пака
 */

// --- LC Draft helpers/state ---
let lcDraftCurrentPack = null;
// Lucky Time state
let lcLuckyRunning = false;
let lcLuckyTimers = { interval: null, timeout: null };




function prettyTeamName(teamKey) {
  // безопасное отображение (на случай отсутствия "красивых" названий)
  return String(teamKey || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

function getLcDraftPackPercent(pack) {
  const packs = Object.values(window.LC_DRAFT_PACKS || {});
  const total = packs.reduce((sum, p) => sum + (p.probabilityWeight || 0), 0);
  if (!total) return 0;

  const pct = ((pack.probabilityWeight || 0) / total) * 100;
  // 1 знак после запятой (если хочешь без десятых — сделай веса суммой 100)
  return Math.round(pct * 10) / 10;
}

function pickWeightedPack() {
  const packs = Object.values(window.LC_DRAFT_PACKS || {});
  if (!packs.length) return null;

  const total = packs.reduce((sum, p) => sum + (p.probabilityWeight || 0), 0);
  if (!total) return packs[0];

  let r = Math.random() * total;
  for (const p of packs) {
    r -= (p.probabilityWeight || 0);
    if (r <= 0) return p;
  }
  return packs[packs.length - 1];
}

function shuffleCopy(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderLcDraftView(root) {
  lcDraftCurrentPack = null;

  root.innerHTML = `
    <div class="draft-layout">
      <div class="draft-header">
      </div>
      <div id="lc-draft-stage"></div>
    </div>
  `;

  renderLcDraftStageInitial();
}

function renderLcDraftStageInitial() {
  const stage = document.getElementById("lc-draft-stage");
  if (!stage || !window.LC_DRAFT_PACKS) return;

  const packs = Object.values(window.LC_DRAFT_PACKS);

  stage.innerHTML = `
    <div class="draft-pack-grid--stage1">
      ${packs
        .map((pack) => {
          const percent = getLcDraftPackPercent(pack);
          const teamsCount = (pack.teams || []).length;
          return `
            <div class="draft-pack-tile--image" data-action="lc-pack-info" data-pack-id="${pack.id}"
                 style="--pack-image: url('${pack.image || ""}')">
              <div class="draft-pack-overlay">
                <div class="draft-pack-meta">
                  <div class="draft-pack-meta-title">${pack.displayName}</div>
                  <div class="draft-pack-meta-desc">${pack.description || ""}</div>
                  <div class="draft-pack-meta-stats">
                    <span>${teamsCount} TEAMS</span>
                    <span>${percent}% DROP</span>
                  </div>
                </div>
              </div>
            </div>
          `;
        })
        .join("")}
    </div>

    <div class="draft-actions--center">
      <button class="draft-primary-btn" data-action="lc-draft-start">DRAFT!</button>
    </div>
  `;

  stage.onclick = handleLcDraftClick;
}

function renderLcDraftPackInfo(packId) {
  const stage = document.getElementById("lc-draft-stage");
  if (!stage || !window.LC_DRAFT_PACKS) return;

  const pack = window.LC_DRAFT_PACKS[packId];
  if (!pack) return;

  const teams = Array.isArray(pack.teams) ? pack.teams : [];
  const percent = getLcDraftPackPercent(pack);

  // Яркие тона паков (как в рулетке)
  const PACK_TONE = {
    bronze:    "#ff8a3d",
    silver:    "#d7dee8",
    gold:      "#ffdd35",
    platinum:  "#1ff3ff",
    legendary: "#ff2d2d",
    special:   "#2d6bff"
  };

  const tone = PACK_TONE[String(pack.id || "").toLowerCase()] || "#7c3aed";

  stage.innerHTML = `
    <section class="lc-pack-info-shell" style="--pack-tone: ${tone};">
      <div class="lc-pack-info-bg"></div>

      <div class="draft-pack-info-head">
        <div class="draft-pack-info-left">
          <div class="draft-pack-info-thumb">
            <img src="${pack.image || ""}" alt="${pack.displayName}">
          </div>
          <div>
            <div class="draft-pack-info-title">${pack.displayName}</div>
            <div class="draft-pack-info-sub">${pack.description || ""} • ${teams.length} TEAMS • ${percent}% DROP</div>
          </div>
        </div>

        <button class="draft-primary-btn lc-pack-back-btn" data-action="lc-pack-back">BACK</button>
      </div>

      <div class="draft-pack-info-grid">
        ${teams
          .map((teamKey) => {
            const logo = window.getLogoPath(teamKey);
            const name = prettyTeamName(teamKey);
            return `
              <div class="draft-team-tile" title="${name}">
                <div class="draft-team-tile-logo">
                  <img src="${logo}" alt="${name}">
                </div>
                <div class="draft-team-tile-name">${name}</div>
              </div>
            `;
          })
          .join("")}
      </div>
    </section>
  `;

  stage.onclick = handleLcDraftClick;
}


function startLcDraftRoll() {
  const stage = document.getElementById("lc-draft-stage");
  if (!stage) return;

  const grid = stage.querySelector(".draft-pack-grid--stage1");
  const actions = stage.querySelector(".draft-actions--center");
  const startBtn = stage.querySelector('[data-action="lc-draft-start"]');

  // ВАЖНО: выбираем выпавший пак СРАЗУ (по текущим весам),
  // но показываем его только после драматичной анимации.
  const chosen = pickWeightedPack();
  if (!chosen) return;

  // 1) Блокируем повторные клики по кнопке
  if (startBtn) {
    startBtn.disabled = true;
    startBtn.classList.add("is-disabled");
  }

  // 2) Прячем блок с кнопкой
  if (actions) actions.classList.add("draft-actions--hidden");

  // 3) Стартуем шевеление/перемешивание паков (если сетка есть)
  if (grid) {
    grid.classList.add("draft-pack-grid--shuffling");

    const tiles = Array.from(grid.querySelectorAll(".draft-pack-tile--image"));
    tiles.forEach((tile) => {
      const dx = (Math.random() * 2 - 1) * 18; // -18..18
      const dy = (Math.random() * 2 - 1) * 10; // -10..10
      const rot = (Math.random() * 2 - 1) * 2.2; // -2.2..2.2
      const dly = Math.random() * 220;           // 0..220ms
      tile.style.setProperty("--sh-dx", `${dx}px`);
      tile.style.setProperty("--sh-dy", `${dy}px`);
      tile.style.setProperty("--sh-rot", `${rot}deg`);
      tile.style.setProperty("--sh-delay", `${dly}ms`);
    });

    // 4) Оверлей (без текста/полоски — только атмосфера)
    const overlay = document.createElement("div");
    overlay.className = "draft-roll-overlay";
    overlay.innerHTML = ``;
    stage.appendChild(overlay);

    // 5) Драматичное "выбрасывание" паков по одному.
    const chosenPackId = chosen.id;
    const chosenTile = tiles.find((t) => t.getAttribute("data-pack-id") === chosenPackId);

    // если по какой-то причине не нашли выбранную плитку — просто показываем результат без анимации
    if (!chosenTile) {
      showChosenPack(chosen);
      return;
    }

    const others = tiles.filter((t) => t !== chosenTile);

    // перемешиваем порядок вылетов
    for (let i = others.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [others[i], others[j]] = [others[j], others[i]];
    }

    // "фальшивка" — второй финальный пак (любой другой)
    const decoyTile = others.pop() || null;

    // тайминги (делай драматичнее/быстрее только тут)
const preDelay = 0;     // стартовая пауза (ощущение "сейчас начнётся")
const stepMs = 4000;       // 1 пак убирается раз в 4 секунды
const finalsHoldMs = 3800; // когда остались 2 — держим напряжение 2 сек
const flashToResultMs = 500; // вспышка подольше перед результатом


    let idx = 0;

    window.setTimeout(() => {
      const interval = window.setInterval(() => {
        if (idx < others.length) {
          others[idx].classList.add("draft-pack-tile--eliminate");
          idx += 1;
          return;
        }

        window.clearInterval(interval);

        // 6) Остаются 2 финальных — подчёркиваем их
        chosenTile.classList.add("draft-pack-tile--final");
        if (decoyTile) decoyTile.classList.add("draft-pack-tile--final");

        // 7) Потом оба финальных исчезают и даём вспышку
        window.setTimeout(() => {
          chosenTile.classList.add("draft-pack-tile--vanish");
          if (decoyTile) decoyTile.classList.add("draft-pack-tile--vanish");

          // немного усиливаем атмосферу перед вспышкой
          overlay.classList.add("draft-roll-overlay--phase2");
          grid.classList.add("draft-pack-grid--fadeout");

          const flash = document.createElement("div");
          flash.className = "draft-roll-flash";
          stage.appendChild(flash);

          // 8) Показ результата (УЖЕ выбранного) — логика выпадения не меняется
          window.setTimeout(() => {
            showChosenPack(chosen);
          }, flashToResultMs);
        }, finalsHoldMs);
      }, stepMs);
    }, preDelay);

    return;
  }

  // если сетки нет (в теории) — просто показываем результат
  showChosenPack(chosen);
}


function showChosenPack(chosen) {
  const stage = document.getElementById("lc-draft-stage");
  if (!stage || !chosen) return;

  lcDraftCurrentPack = chosen;

  // 1) тон пака (для заливки фона)
  const PACK_STARS = {
    bronze: 3,
    silver: 3.5,
    gold: 4,
    platinum: 4.5,
    legendary: 5,
    special: null
  };

  const stars = PACK_STARS[chosen.id] ?? null;
  const ratingLine = (stars === null)
    ? "SPECIAL TEAMS"
    : `TEAMS ${stars}<span class="lc-pack-star">★</span>`;



    // Цвета заливки/свечения для экрана выпавшего пака
  const PACK_TONE = {
    bronze:   "#b87333", // бронза
    silver:   "#aeb5bf", // серебро
    gold:     "#ffd84a", // ярко-жёлтый
    platinum: "#2fe7ff", // бирюзовый
    legendary:"#ff3b2f", // красно-огненный
    special:  "#2b6cff"  // синий
  };

  const tone = PACK_TONE[chosen.id] || PACK_TONE[chosen.rarity] || "#7c3aed";
  const title = String(chosen.displayName || chosen.id || "PACK").toUpperCase();
  const teamsCount = Array.isArray(chosen.teams) ? chosen.teams.length : 0;
  const percent = getLcDraftPackPercent(chosen);

  // 2) рисуем новый эпичный экран
  stage.innerHTML = `
    <section class="lc-pack-reveal" style="--pack-tone: ${tone};">
      <div class="lc-pack-reveal-bg"></div>

      <div class="lc-pack-reveal-typewrap" id="lcTypeWrap">
        <div class="lc-pack-reveal-type" id="lcPackType"></div>
      </div>

      <div class="lc-pack-reveal-content" id="lcPackContent" aria-hidden="true">
        <div class="lc-pack-reveal-left">
          <div class="lc-pack-reveal-pack">
            <img src="${chosen.image || ""}" alt="${title}">
          </div>
        </div>

        <div class="lc-pack-reveal-right">
          <div class="lc-pack-reveal-h1">${title}</div>
          <div class="lc-pack-reveal-sub">${ratingLine}</div>


          <div class="lc-pack-reveal-meta">
            <div class="lc-pack-reveal-chip">
              <div class="k">TEAMS</div>
              <div class="v">${teamsCount}</div>
            </div>
            <div class="lc-pack-reveal-chip">
              <div class="k">DROP CHANCE</div>

              <div class="v">${percent}%</div>
            </div>
          </div>

          <div class="lc-pack-reveal-actions">
<button class="lc-pack-open-btn" data-action="lc-draft-spin">
  OPEN PACK
</button>

          </div>
        </div>
      </div>
    </section>
  `;

  // оставляем твой общий обработчик кликов
  stage.onclick = handleLcDraftClick;

  // 3) печатная машинка + затем раскрытие
  const typeEl = document.getElementById("lcPackType");
  const contentEl = document.getElementById("lcPackContent");
  const rootEl = stage.querySelector(".lc-pack-reveal");

  // НАСТРОЙКИ ЭПИЧНОСТИ (меняй тут)
  const typeSpeedMs = 250;   // скорость печати (больше = медленнее)
  const afterTypeDelayMs = 1000; // пауза после печати перед раскрытием

  typeEl.textContent = "";
  contentEl.style.opacity = "0";
  contentEl.style.transform = "translateY(14px)";
  contentEl.setAttribute("aria-hidden", "true");

  let i = 0;
  const timer = setInterval(() => {
    typeEl.textContent += title[i] || "";
    i++;

    if (i >= title.length) {
      clearInterval(timer);

      // раскрываем контент
      setTimeout(() => {
        rootEl.classList.add("is-reveal");
        contentEl.style.opacity = "1";
        contentEl.style.transform = "translateY(0)";
        contentEl.setAttribute("aria-hidden", "false");
      }, afterTypeDelayMs);
    }
  }, typeSpeedMs);
}


function renderLcRoulette(pack) {
  const stage = document.getElementById("lc-draft-stage");
  if (!stage) return;

  // Яркие тона паков (насыщенные)
  const PACK_TONE = {
    bronze:    "#ff8a3d",
    silver:    "#d7dee8",
    gold:      "#ffdd35",
    platinum:  "#1ff3ff",
    legendary: "#ff2d2d",
    special:   "#2d6bff"
  };

  const tone = PACK_TONE[String(pack.id || "").toLowerCase()] || "#7c3aed";

  stage.innerHTML = `
    <section class="lc-roulette-shell" style="--pack-tone: ${tone};">
      <div class="draft-roulette-head">
        <div class="draft-roulette-title">${pack.displayName}</div>
      </div>

      <div class="lc-roulette">
        <div class="lc-roulette-viewport" id="lc-roulette-viewport">
          <div class="lc-roulette-marker"></div>
          <div class="lc-roulette-track" id="lc-roulette-track"></div>
        </div>

        <div class="lc-roulette-result" id="lc-roulette-result"></div>
      </div>
    </section>
  `;

  stage.onclick = handleLcDraftClick;
}


function getWinnerUnderMarker(viewport, cards) {
  const rect = viewport.getBoundingClientRect();
  const markerX = rect.left + rect.width / 2;

  for (const card of cards) {
    const r = card.getBoundingClientRect();
    if (markerX >= r.left && markerX <= r.right) return card;
  }

  // fallback: ближайший по центру
  let best = null;
  let bestDist = Infinity;
  for (const card of cards) {
    const r = card.getBoundingClientRect();
    const c = (r.left + r.right) / 2;
    const d = Math.abs(c - markerX);
    if (d < bestDist) {
      bestDist = d;
      best = card;
    }
  }
  return best;
}

function startLcDraftRoulette() {
  // защита от пустого пака
  if (!lcDraftCurrentPack || !Array.isArray(lcDraftCurrentPack.teams) || lcDraftCurrentPack.teams.length === 0) {
    renderLcDraftStageInitial();
    return;
  }

  const pack = lcDraftCurrentPack;
  renderLcRoulette(pack);

  const viewport = document.getElementById("lc-roulette-viewport");
  const track = document.getElementById("lc-roulette-track");
  const result = document.getElementById("lc-roulette-result");
  if (!viewport || !track) return;

  // убираем любые переходы (иначе будут рывки/откаты)
  track.style.transition = "none";
  track.style.transform = "translate3d(0px, -50%, 0)";

  const baseTeams = shuffleCopy(pack.teams);

  // Длинный трек без пустот (повторы с перемешиванием)
  const totalCards = Math.max(220, baseTeams.length * 18);
  const trackTeams = [];
  while (trackTeams.length < totalCards) {
    trackTeams.push(...shuffleCopy(baseTeams));
  }
  trackTeams.length = totalCards;

  // Победитель + индекс ближе к концу, чтобы было «много прокрутки»
  const winnerTeam = baseTeams[Math.floor(Math.random() * baseTeams.length)];
  const winnerIndex = Math.floor(totalCards * 0.50) + Math.floor(Math.random() * Math.floor(totalCards * 0.12));
  trackTeams[winnerIndex] = winnerTeam;

  // Рендерим карточки БЕЗ названий (как ты просил)
  track.innerHTML = trackTeams
    .map((teamKey) => {
      const logo = window.getLogoPath(teamKey);
      const name = prettyTeamName(teamKey);
return `
  <div class="lc-roulette-card" data-team="${teamKey}">
    <div class="lc-roulette-card-logo">
      <img src="${logo}" alt="${name}" onerror="this.style.display='none'">
    </div>
    <div class="lc-roulette-card-name">${name}</div>
  </div>
`;

    })
    .join("");

  // Ждём 1 кадр, чтобы браузер посчитал размеры/offsetLeft
  requestAnimationFrame(() => {
    const cards = Array.from(track.querySelectorAll(".lc-roulette-card"));
    const winnerEl = cards[winnerIndex];
    if (!winnerEl) return;

    const viewportRect = viewport.getBoundingClientRect();
    const winnerRect = winnerEl.getBoundingClientRect();
    const winnerWidth = winnerRect.width;

    // Случайная остановка внутри карточки (любой пиксель)
    const insidePx = Math.floor(Math.random() * Math.max(1, Math.floor(winnerWidth)));

    // Нужно, чтобы marker (50% viewport) попал на этот пиксель победной карточки
    const winnerLeftInTrack = winnerEl.offsetLeft;
    let targetDistance = (winnerLeftInTrack + insidePx) - (viewportRect.width / 2);
    if (targetDistance < 0) targetDistance = 0;

    // === ПРОФИЛЬ СКОРОСТИ «КАК В КЕЙСАХ» (плавно → плато → длинный хвост) ===
    const duration = 38000; // 18 секунд
    let startTime = null;

    // доли времени
    const accelPart = 0.34;  // 18% — разгон
    const decelPart = 0.74;  // 34% — длинное торможение
    const plateauPart = 1 - accelPart - decelPart; // остальное — плато

    // прогресс 0..1 без рывков и без «отката»
    function progressCase(t) {
      if (t <= 0) return 0;
      if (t >= 1) return 1;

      const a = accelPart;
      const p = plateauPart;
      const d = decelPart;

      // скорость плато v0, чтобы интеграл = 1
      const v0 = 1 / (0.5 * a + p + 0.5 * d);

      if (t < a) {
        // разгон: v растёт 0 -> v0
        return 0.5 * (v0 / a) * t * t;
      }

      if (t < a + p) {
        // плато: v = v0
        const sA = 0.5 * v0 * a;
        return sA + v0 * (t - a);
      }

      // торможение: v падает v0 -> 0
      const u = t - (a + p);
      const sAP = 0.5 * v0 * a + v0 * p;
      return sAP + v0 * u - 0.5 * v0 * (u * u / d);
    }

    
   // =====================
// TICK (CS-style) — init once
// =====================

// Пул звуков, чтобы тики не "обрезались"
const baseTickEl = document.getElementById("lcTickSound");
const tickPool = [];
const TICK_POOL_SIZE = 10;

if (baseTickEl) {
  for (let i = 0; i < TICK_POOL_SIZE; i++) {
    const a = baseTickEl.cloneNode(true);
    a.volume = 0.15;
    tickPool.push(a);
  }
}

let tickPoolIdx = 0;
function playTick() {
  if (!tickPool.length) return;
  const a = tickPool[tickPoolIdx++ % tickPool.length];
  try {
    a.currentTime = 0;
    a.play();
  } catch (e) {}
}

// Геометрия: шаг между карточками (учитывает gap)
// и "центр первой карточки"
const markerX = viewport.clientWidth / 2;

const firstCard = cards[0];
const secondCard = cards[1];

const firstStart = firstCard ? firstCard.offsetLeft : 0;


const pitch = (firstCard && secondCard)
  ? (secondCard.offsetLeft - firstCard.offsetLeft)
  : (firstCard ? firstCard.offsetWidth : 0);

// Следующая позиция центра карточки, на которой надо "тикнуть"
let nextTickAt = null;

// чтобы не застрять в while, если вдруг FPS упадёт
const MAX_TICKS_PER_FRAME = 12;



    function step(now) {
      if (startTime === null) startTime = now;

      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);

      const prog = progressCase(t);
      const xPx = Math.round(targetDistance * prog); // округляем — убираем микродрожание

      track.style.transform = `translate3d(${-xPx}px, -50%, 0)`;

// =====================
// TICK (CS-style) — trigger on CENTER crossing
// =====================
if (pitch > 0 && tickPool.length) {
  const markerPosInTrack = xPx + markerX;

  // Инициализируем nextTickAt в первом кадре
  if (nextTickAt === null) {
    // ближайший следующий центр справа от текущей позиции
const k = Math.floor((markerPosInTrack - firstStart) / pitch) + 1;
nextTickAt = firstStart + (k * pitch);

  }

  // Если за один кадр перескочили несколько центров — дотикаем все
  if (markerPosInTrack >= nextTickAt) {
    let ticks = 0;

    while (markerPosInTrack >= nextTickAt && ticks < MAX_TICKS_PER_FRAME) {
      playTick();
      nextTickAt += pitch;
      ticks++;
    }

    // Если всё равно “слишком далеко убежали” (FPS упал), то догоняем без спама
    if (markerPosInTrack >= nextTickAt) {
      const jump = Math.floor((markerPosInTrack - nextTickAt) / pitch);
      nextTickAt += jump * pitch;
    }
  }
}



  

      if (t < 1) {
        requestAnimationFrame(step);
        return;
      }

      // ФИНИШ: transform больше не трогаем (чтобы не было «отката»)
      const finalWinner = getWinnerUnderMarker(viewport, cards);
      const finalKey = finalWinner?.getAttribute("data-team") || winnerTeam;
const finalName = prettyTeamName(finalKey);
const finalLogo = window.getLogoPath(finalKey);

if (result) {
  const packTitle = String(pack.displayName || pack.id || "PACK").toUpperCase();

  result.innerHTML = `
    <div class="lc-roulette-result-row">
      <div class="lc-lucky-slot" id="lcLuckySlot">
        <button class="lc-lucky-btn" data-action="lc-lucky-start">LUCKY TIME</button>
      </div>

      <div class="lc-roulette-winner">
        <div class="lc-roulette-winner-top">
          <div class="lc-roulette-winner-badge">WINNER</div>
          <div class="lc-roulette-winner-pack">${packTitle}</div>
        </div>

        <div class="lc-roulette-winner-main">
          <div class="lc-roulette-winner-logo">
            <img src="${finalLogo}" alt="${finalName}" onerror="this.style.display='none'">
          </div>

          <div class="lc-roulette-winner-info">
            <div class="lc-roulette-winner-label">CLUB</div>
            <div class="lc-roulette-winner-name">${finalName}</div>
            <div class="lc-roulette-winner-sub">LC DRAFT · FINAL RESULT</div>

          </div>
        </div>
      </div>

      <div class="lc-action-slot" id="lcActionSlot"></div>
    </div>
  `;
}


    }

    requestAnimationFrame(step);
  });
}

function lcLuckyClearTimers() {
  if (lcLuckyTimers.interval) {
    clearInterval(lcLuckyTimers.interval);
    lcLuckyTimers.interval = null;
  }
  if (lcLuckyTimers.timeout) {
    clearTimeout(lcLuckyTimers.timeout);
    lcLuckyTimers.timeout = null;
  }
}

// веса: REROLL+ 10, REROLL 20, FAIL 80 (это веса, не обязаны суммироваться в 100)
function lcLuckyPickWeighted() {
  const options = [
    { id: "rerollPlus", w: 10 },
    { id: "reroll", w: 12 },
    { id: "fail", w: 78 }
  ];

  const total = options.reduce((s, o) => s + o.w, 0);
  let r = Math.random() * total;

  for (const o of options) {
    r -= o.w;
    if (r <= 0) return o.id;
  }
  return "fail";
}

function startLcLuckyTime() {
  if (lcLuckyRunning) return;

  const actionSlot = document.getElementById("lcActionSlot");
if (actionSlot) actionSlot.innerHTML = "";

  const slot = document.getElementById("lcLuckySlot");
  if (!slot) return;

  lcLuckyRunning = true;
  lcLuckyClearTimers();

  // Кнопка исчезает, появляется панель
  slot.innerHTML = `
    <div class="lc-lucky-panel" id="lcLuckyPanel" aria-live="polite">
      <div class="lc-lucky-indicator" id="lcLuckyIndicator"></div>

      <div class="lc-lucky-item" data-id="rerollPlus">
        <span class="lc-lucky-ic lc-lucky-ic-fire">🔥</span>
        <span class="lc-lucky-txt">REROLL+</span>
      </div>

      <div class="lc-lucky-item" data-id="reroll">
        <span class="lc-lucky-ic lc-lucky-ic-ok">✓</span>
        <span class="lc-lucky-txt">REROLL</span>
      </div>

      <div class="lc-lucky-item" data-id="fail">
        <span class="lc-lucky-ic lc-lucky-ic-fail">✕</span>
        <span class="lc-lucky-txt">FAIL!</span>
      </div>

      <div class="lc-lucky-note">ROLLING…</div>
    </div>
  `;

  const panel = document.getElementById("lcLuckyPanel");
  const indicator = document.getElementById("lcLuckyIndicator");
  const items = Array.from(panel.querySelectorAll(".lc-lucky-item"));
  if (!panel || !indicator || items.length !== 3) {
    lcLuckyRunning = false;
    return;
  }

  const itemH = items[0].getBoundingClientRect().height;
  indicator.style.height = `${itemH}px`;

  let idx = 0;
  let dir = 1;

  const setActive = (i) => {
    items.forEach((el, n) => el.classList.toggle("is-active", n === i));
    indicator.style.transform = `translateY(${i * itemH}px)`;
  };

  setActive(idx);

  // Подсветка бегает 10 секунд
  lcLuckyTimers.interval = setInterval(() => {
    idx += dir;
    if (idx >= items.length - 1) { idx = items.length - 1; dir = -1; }
    if (idx <= 0) { idx = 0; dir = 1; }
    setActive(idx);
  }, 120);

  // Остановка через 10 секунд
  lcLuckyTimers.timeout = setTimeout(() => {
    lcLuckyClearTimers();

    const outcome = lcLuckyPickWeighted();
    const finalIndex = items.findIndex((el) => el.getAttribute("data-id") === outcome);

    setActive(Math.max(0, finalIndex));
    panel.classList.add("is-final");

    // Мягкая окраска под итог (без действий)
    panel.classList.remove("is-rerollplus", "is-reroll", "is-fail");
    if (outcome === "rerollPlus") panel.classList.add("is-rerollplus");
    if (outcome === "reroll") panel.classList.add("is-reroll");
    if (outcome === "fail") panel.classList.add("is-fail");

    const note = panel.querySelector(".lc-lucky-note");
    if (note) note.textContent = "RESULT";

    
renderLcLuckyAction(outcome);


    // Всё. Никаких дальнейших действий.
    setTimeout(() => { lcLuckyRunning = false; }, 450);
  }, 10000);

  
}

function lcDraftFullReset() {
  // стоп Lucky таймеров
  try { lcLuckyClearTimers(); } catch (e) {}
  lcLuckyRunning = false;

  // сброс пака
  lcDraftCurrentPack = null;

  // стоп музыки (если у тебя уже есть stopLcDraftMusic)
  try { stopLcDraftMusic(); } catch (e) {}
}

function renderLcLuckyAction(outcome) {
  const slot = document.getElementById("lcActionSlot");
  if (!slot) return;

  if (outcome === "rerollPlus") {
    slot.innerHTML = `
      <button class="lc-action-btn lc-action-btn--champ" data-action="lc-rerollplus-restart">
        REROLL+ RESTART!
      </button>
    `;
    return;
  }

  if (outcome === "reroll") {
    slot.innerHTML = `
      <button class="lc-action-btn lc-action-btn--green" data-action="lc-restart-pack">
        RESTART PACK
      </button>
    `;
    return;
  }

  // fail
  slot.innerHTML = `
    <button class="lc-action-btn lc-action-btn--red" data-action="lc-end-draft">
      END DRAFT
    </button>
  `;
}


function handleLcDraftClick(event) {
  const rawTarget = event.target;
  if (!rawTarget) return;

  const target = rawTarget.closest("[data-action]");
  if (!target) return;

  const action = target.getAttribute("data-action");

  if (action === "lc-pack-back") {
    renderLcDraftStageInitial();
    return;
  }

  if (action === "lc-pack-info") {
    const tile = rawTarget.closest("[data-pack-id]");
    const packId = tile?.getAttribute("data-pack-id");
    if (packId) renderLcDraftPackInfo(packId);
    return;
  }

if (action === "lc-draft-reset") {
  stopLcDraftMusic();
  renderLcDraftStageInitial();
  return;
}


if (action === "lc-draft-start") {
  startLcDraftMusic();   // <-- ДОБАВИТЬ ЭТУ СТРОКУ
  startLcDraftRoll();
  return;
}


  if (action === "lc-draft-spin") {
    startLcDraftRoulette();
    return;
  }

  if (action === "lc-lucky-start") {
  startLcLuckyTime();
  return;
}

if (action === "lc-rerollplus-restart") {
  // полный сброс и возвращаемся на экран паков в LC Draft
  lcDraftFullReset();
  renderLcDraftStageInitial();
  return;
}

if (action === "lc-restart-pack") {
  // повторная рулетка ЭТОГО ЖЕ пака, без ограничений
  try { lcLuckyClearTimers(); } catch (e) {}
  lcLuckyRunning = false;

  // просто повторно запускаем рулетку (lcDraftCurrentPack уже выбран)
  startLcDraftRoulette();
  return;
}

if (action === "lc-end-draft") {
  // полный сброс + на главный экран сезонов (как клик по заголовку)
  lcDraftFullReset();
  try { setActiveNavButton(null); } catch (e) {}
  navigateToView("seasons");
  return;
}


}


function renderWcDraftView(root) {
  root.innerHTML = `
    <section class="view-placeholder">
      <div class="view-placeholder-inner">
        <div class="view-placeholder-glow"></div>
        <div class="view-placeholder-title">DRAFT MODE</div>
        <div class="view-placeholder-main">
          <div class="view-placeholder-main-label">WC DRAFT 2026</div>
        </div>
   
      </div>
    </section>
  `;
}

function applyOverflowMarquee(scopeEl) {
  if (!scopeEl) return;
  const nodes = scopeEl.querySelectorAll(".tie-opp-name-big");

  nodes.forEach((el) => {
    const inner = el.querySelector("span");
    if (!inner) return;

    // сброс
    el.classList.remove("is-marquee");
    el.style.removeProperty("--marquee-shift");

    // измеряем после сброса
    const overflow = inner.scrollWidth - el.clientWidth;

    // если не переполняет — ничего не делаем
    if (overflow <= 6) return;

    // включаем анимацию и задаём сдвиг
    el.classList.add("is-marquee");
    el.style.setProperty("--marquee-shift", `${-overflow}px`);
  });
}
