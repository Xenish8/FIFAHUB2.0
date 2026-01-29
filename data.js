// data.js

const FIFA_SEASONS = [
    {
      id: "fifa19",
      label: "FIFA 19",
      year: 2019,
      short: "19",
      // коричневый
      color: "#8B5A2B",
      colorSoft: "rgba(139, 90, 43, 0.16)",
      isCurrent: false,
      backgroundPath: "assets/clubs/fifa19-loko.png",
      champion: {
        teamName: "Клуб сезона 19",
        logoPath: "assets/logos/fifa19.png",
        note: "Сезон 19 – сюда позже перенесём реальную инфу."
      }
    },
    {
        id: "fifa20",
        label: "FIFA 20",
        year: 2020,
        short: "20",
        // зелёный
        color: "#16A34A",
        colorSoft: "rgba(22, 163, 74, 0.16)",
        isCurrent: false,
        backgroundPath: "assets/clubs/fifa20-lpzg.png", // ← путь к картинке для FIFA 20
        champion: {
          teamName: "Клуб сезона 20",
          logoPath: "assets/logos/fifa20.png",
          note: "Сезон 20 – доминирование, трофеи, серия матчей и т.д."
        }
      },
      
    {
      id: "fifa21",
      label: "FIFA 21",
      year: 2021,
      short: "21",
      // фиолетовый
      color: "#7C3AED",
      colorSoft: "rgba(124, 58, 237, 0.18)",
      isCurrent: false,
      backgroundPath: "assets/clubs/fifa21-bayern.png", // ← путь к картинке для FIFA 20
      champion: {
        teamName: "Клуб сезона 21",
        logoPath: "assets/logos/fifa21.png",
        note: "Сезон 21 – комментарий подставишь из своей статистики."
      }
    },
    {
      id: "fifa22",
      label: "FIFA 22",
      year: 2022,
      short: "22",
      // голубой
      color: "#2563EB",
      colorSoft: "rgba(37, 99, 235, 0.18)",
      isCurrent: false,
      backgroundPath: "assets/clubs/fifa22-psg.png", // ← путь к картинке для FIFA 20
      champion: {
        teamName: "Клуб сезона 22",
        logoPath: "assets/logos/fifa22.png",
        note: "Сезон 22 – отдельные турниры и кубки."
      }
    },
    {
      id: "fifa23",
      label: "FIFA 23",
      year: 2023,
      short: "23",
      // красный
      color: "#EF4444",
      colorSoft: "rgba(239, 68, 68, 0.18)",
      isCurrent: false,
      backgroundPath: "assets/clubs/fifa23-eng.png", // ← путь к картинке для FIFA 20
      champion: {
        teamName: "Клуб сезона 23",
        logoPath: "assets/logos/fifa23.png",
        note: "Сезон 23 – напишешь свой текст, почему он особенный."
      }
    },
    {
      id: "fifa24",
      label: "FIFA 24",
      year: 2024,
      short: "24",
      // золотистый
      color: "#FACC15",
      colorSoft: "rgba(250, 204, 21, 0.20)",
      isCurrent: false,
      backgroundPath: "assets/clubs/fifa24-real.png", // ← путь к картинке для FIFA 20
      champion: {
        teamName: "Клуб сезона 24",
        logoPath: "assets/logos/fifa24.png",
        note: "Сезон 24 – можно подчеркнуть «золотую эру»."
      }
    },
    {
      id: "fifa25",
      label: "FIFA 25",
      year: 2025,
      short: "25",
      // розовый
      color: "#EC4899",
      colorSoft: "rgba(236, 72, 153, 0.20)",
      isCurrent: false,
      backgroundPath: "assets/clubs/fifa25-abnf.png", // ← путь к картинке для FIFA 20
      champion: {
        teamName: "Клуб сезона 25",
        logoPath: "assets/logos/fifa25.png",
        note: "Сезон 25 – яркий, с розовым акцентом."
      }
    },
    {
      id: "fifa26",
      label: "FIFA 26",
      year: 2026,
      short: "26",
      // временный цвет, потом выберешь сам
      color: "#00F5D4",
        colorSoft: "rgba(0, 245, 212, 0.18)",
      isCurrent: true,
      backgroundPath: "assets/clubs/fifa26-actually.png", // ← путь к картинке для FIFA 20
      champion: {
        teamName: "Клуб сезона 26",
        logoPath: "assets/logos/fifa26.png",
        note: "Текущий сезон – сюда можно писать то, что происходит сейчас."
      }
    }
  ];
  
  function getSeasonById(id) {
    return FIFA_SEASONS.find((s) => s.id === id);
  }
  
  function getCurrentSeason() {
    return FIFA_SEASONS.find((s) => s.isCurrent) || FIFA_SEASONS[FIFA_SEASONS.length - 1];
  }

  // -------------------------
// ТРОФЕИ: КАРКАС ДЛЯ АНДРЕЯ
// -------------------------

/**
 * Вспомогательная функция для получения логотипа через icons.js.
 * teamKey должен совпадать с ключом в window.ICONS (см. icons.js).
 */
function getTeamLogoPath(teamKey) {
  if (typeof window !== "undefined" && typeof window.getLogoPath === "function") {
    return window.getLogoPath(teamKey);
  }
  // fallback, если вдруг icons.js не подгрузился
  return (typeof ICONS !== "undefined" && ICONS[teamKey]) ? ICONS[teamKey] : (ICONS && ICONS["none"]);
}

/**
 * TROPHY_DATA – общий объект, куда потом добавим и Макса.
 * Сейчас – только последняя собранная версия трофеев Андрея.
 */
const TROPHY_DATA = {
  andrey: {
    // 4 турнира в правильном порядке сверху вниз
    superCup: {
      title: "SuperCup",
      themeColor: "#D1D5DB", // серебристый
      items: [
        { teamKey: "leipzig",     fifaId: "fifa23" }, // RB Leipzig
        { teamKey: "real-madrid", fifaId: "fifa24" }
      ]
    },

    worldCup: {
      title: "World Cup",
      themeColor: "#FACC15", // жёлтый
      items: [
        // FIFA 21
        {
          teamKey: "switzerland",
          fifaId: "fifa21",
          streakId: "cl-leipzig-1",
          streakIndex: 1,
        },
        {
          teamKey: "switzerland",
          fifaId: "fifa21",
          streakId: "cl-leipzig-1",
          streakIndex: 1,
          streakLength: 2             // есть только на первом
        },
        { teamKey: "portugal",    fifaId: "fifa21" },

        // FIFA 22
        { teamKey: "wales",       fifaId: "fifa22" },

        // FIFA 23
        { teamKey: "japan",       fifaId: "fifa23" },
        { teamKey: "england",     fifaId: "fifa23" }
      ]
    },

    euro: {
      title: "EURO",
      themeColor: "#EF4444", // красный
      items: [
        // FIFA 21
        { teamKey: "switzerland", fifaId: "fifa21" },
        { teamKey: "spain",       fifaId: "fifa21" },

        // FIFA 22
        { teamKey: "netherlands", fifaId: "fifa22" },
        { teamKey: "wales",       fifaId: "fifa22" },

        // FIFA 23
        { teamKey: "england",     fifaId: "fifa23" },

        // FIFA 24 — строго по порядку
        { teamKey: "england",     fifaId: "fifa24" },
        { teamKey: "norway",      fifaId: "fifa24" },
        { teamKey: "spain",       fifaId: "fifa24" },
        { teamKey: "norway",      fifaId: "fifa24" },
        {
          teamKey: "portugal",
          fifaId: "fifa24",
          streakId: "cl-leipzig-1",
          streakIndex: 1,
        },
        {
          teamKey: "portugal",
          fifaId: "fifa24",
          streakId: "cl-leipzig-1",
          streakIndex: 1,
          streakLength: 2             // есть только на первом
        },
        { teamKey: "belgium",     fifaId: "fifa24" },
        { teamKey: "england",     fifaId: "fifa24" },
        { teamKey: "italy",       fifaId: "fifa24" },
        { teamKey: "france",      fifaId: "fifa24" },
        { teamKey: "croatia",     fifaId: "fifa24" },
        { teamKey: "austria",     fifaId: "fifa24" }
      ]
    },

    championsLeague: {
      title: "Champions League",
      themeColor: "#7C3AED", // пурпурный
      // 31 трофей в ПРАВИЛЬНОМ ПОРЯДКЕ
      items: [
        // FIFA 19
        { teamKey: "lokomotiv",      fifaId: "fifa19" }, // 1
        { teamKey: "lokomotiv",      fifaId: "fifa19" }, // 2

        // FIFA 20
        {
          teamKey: "leipzig",
          fifaId: "fifa20",
          streakId: "cl-leipzig-1",
          streakIndex: 1,
        }, // 3
        {
          teamKey: "leipzig",
          fifaId: "fifa20",
          streakId: "cl-leipzig-1",
          streakIndex: 1,
          streakLength: 2             // есть только на первом
        }, // 4
        { teamKey: "leipzig", fifaId: "fifa20" }, // 5 – обычный, уже не серия
        { teamKey: "leipzig", fifaId: "fifa20" }, // 6 – обычный


        // FIFA 21
        { teamKey: "atm", fifaId: "fifa21" }, // 7
        { teamKey: "inter",           fifaId: "fifa21" }, // 8
        {
          teamKey: "bayern",
          fifaId: "fifa21",
          streakId: "cl-leipzig-1",
          streakIndex: 1,
        }, // 9
        {
          teamKey: "bayern",
          fifaId: "fifa21",
          streakId: "cl-leipzig-1",
          streakIndex: 1,
          streakLength: 2
        }, // 10
        { teamKey: "bayern",          fifaId: "fifa21" }, // 11
        { teamKey: "bayern",          fifaId: "fifa21" }, // 12
        { teamKey: "inter",           fifaId: "fifa21" }, // 13
        { teamKey: "man-city",        fifaId: "fifa21" }, // 14 (Manchester City)

        // FIFA 22
        { teamKey: "bayern",          fifaId: "fifa22" }, // 15
        { teamKey: "bayern",          fifaId: "fifa22" }, // 16
        { teamKey: "atm", fifaId: "fifa22" }, // 17

        // FIFA 24 – Real Madrid ×13 (18–30)
        { teamKey: "real-madrid",     fifaId: "fifa24" }, // 18
        {
          teamKey: "real-madrid",
          fifaId: "fifa24",
          streakId: "cl-leipzig-1",
          streakIndex: 1,
        },
        {
          teamKey: "real-madrid",
          fifaId: "fifa24",
          streakId: "cl-leipzig-1",
          streakIndex: 1,
          streakLength: 2
        },
        {
          teamKey: "real-madrid",
          fifaId: "fifa24",
          streakId: "cl-leipzig-1",
          streakIndex: 1,
          streakLength: 3
        },
        {
          teamKey: "real-madrid",
          fifaId: "fifa24",
          streakId: "cl-leipzig-1",
          streakIndex: 1,
          streakLength: 4
        },
        {
          teamKey: "real-madrid",
          fifaId: "fifa24",
          streakId: "cl-leipzig-1",
          streakIndex: 1,
          streakLength: 5
        },
        {
          teamKey: "real-madrid",
          fifaId: "fifa24",
          streakId: "cl-leipzig-1",
          streakIndex: 1,
          streakLength: 6
        },
        {
          teamKey: "real-madrid",
          fifaId: "fifa24",
          streakId: "cl-leipzig-1",
          streakIndex: 1,
        },
        {
          teamKey: "real-madrid",
          fifaId: "fifa24",
          streakId: "cl-leipzig-1",
          streakIndex: 1,
          streakLength: 2
        },
        {
          teamKey: "real-madrid",
          fifaId: "fifa24",
          streakId: "cl-leipzig-1",
          streakIndex: 1,
          streakLength: 3
        },
        {
          teamKey: "real-madrid",
          fifaId: "fifa24",
          streakId: "cl-leipzig-1",
          streakIndex: 1,
          streakLength: 4
        },
        {
          teamKey: "real-madrid",
          fifaId: "fifa24",
          isManualLegendStreak: true,
          manualLegendStreakValue: 5,
          isLegend: true   // ← добавляем ЭТО
        },
        
        { teamKey: "real-madrid",     fifaId: "fifa24" }, // 30

        // FIFA 25
        { teamKey: "at-bilbao",       fifaId: "fifa25" },  // 31 Athletic Club Bilbao
        { teamKey: "betis",       fifaId: "fifa26" },  // 31 Athletic Club Bilbao
              {
          teamKey: "barca",
          fifaId: "fifa26",
          streakId: "cl-leipzig-1",
          streakIndex: 1,
        },

                    {
          teamKey: "barca",
          fifaId: "fifa26",
          streakId: "cl-leipzig-1",
          streakIndex: 1,
          streakLength: 2
        }
        
      ]
    }
  },

  maks: {
    // SuperCup оставляем, но без трофеев
    superCup: {
      title: "SuperCup",
      themeColor: "#D1D5DB", // серебристый
      items: []
    },

    // WORLD CUP (по первому скрину: France 21, Scotland 23)
    worldCup: {
      title: "World Cup",
      themeColor: "#FACC15", // жёлтый
      items: [
        { teamKey: "france",   fifaId: "fifa21" },
        { teamKey: "scotland", fifaId: "fifa23" }
      ]
    },

    // EURO (по второму скрину: Netherlands 21, 24, 24)
    euro: {
      title: "EURO",
      themeColor: "#EF4444", // красный
      items: [
        { teamKey: "netherlands", fifaId: "fifa21" },
        {
          teamKey: "netherlands",
          fifaId: "fifa24",
          streakId: "cl-leipzig-1",
          streakIndex: 1,
        },
        {
          teamKey: "netherlands",
          fifaId: "fifa24",
          streakId: "cl-leipzig-1",
          streakIndex: 1,
          streakLength: 2
        }
      ]
    },

    // CHAMPIONS LEAGUE (по третьему скрину, слева-направо, сверху-вниз)
    championsLeague: {
      title: "Champions League",
      themeColor: "#7C3AED", // пурпурный
      items: [
        // ряд 1
        { teamKey: "benfica",       fifaId: "fifa20" },
        {
          teamKey: "valencia",
          fifaId: "fifa20",
          streakId: "cl-leipzig-1",
          streakIndex: 1,
        },
        {
          teamKey: "valencia",
          fifaId: "fifa20",
          streakId: "cl-leipzig-1",
          streakIndex: 1,
          streakLength: 2
        },
        { teamKey: "liverpool",     fifaId: "fifa21" },
        { teamKey: "real-madrid",   fifaId: "fifa21" },
        { teamKey: "barca",         fifaId: "fifa22" },

        // ряд 2
        { teamKey: "ajax",          fifaId: "fifa22" },
        { teamKey: "milan",         fifaId: "fifa22" },
        { teamKey: "bayern",        fifaId: "fifa22" },
        { teamKey: "psg",           fifaId: "fifa22" },
        { teamKey: "psg",           fifaId: "fifa22" },
        { teamKey: "milan",         fifaId: "fifa22" },

        // ряд 3
        { teamKey: "galatasaray",   fifaId: "fifa23" },
        { teamKey: "real-madrid",   fifaId: "fifa24" },
        { teamKey: "nottingham-f",  fifaId: "fifa25" }
      ]
    }
  }
  
  // max: {} – добавим позже
  
};

window.TROPHY_DATA = TROPHY_DATA;


// ========================
// LC DRAFT PACKS (Champions League)
// ========================
window.LC_DRAFT_PACKS = {
  bronze: {
    id: "bronze",
    rarity: "bronze",
    displayName: "Bronze Pack",
    probabilityWeight: 36,
    description: "Команды 3★",
    image: "assets/packs/bronzepack.png",
    teams: [
      "antwerp",
      "standard",
      "brondby",
      "rosenborg",
      "viking",
      "rakow",
      "legia",
      "lech-poznan",
      "moreirense",
      "nacional",
      "santa-clara",
      "vitoria-sc",
      "cfr-cluj",
      "steaua",
      "alanyaspor",
      "antalyaspor",
      "gaziantep",
      "metz",
      "young-boys",
      "malmo",
      "rapid",
      "salzburg"
    ]
  },

  silver: {
    id: "silver",
    rarity: "silver",
    displayName: "Silver Pack",
    probabilityWeight: 26,
    description: "Команды 3.5★",
    image: "assets/packs/silverpack.png",
    teams: [
      "brugge",
      "gent",
      "genk",
      "union-sg",
      "anderlecht",
      "koln",
      "augsburg",
      "hamburg",
      "copenhagen",
      "midtjylland",
      "real-oviedo",
      "elche",
      "levante",
      "udinese",
      "sassuolo",
      "parma",
      "lecce",
      "genoa",
      "cagliari",
      "twente",
      "az",
      "utrecht",
      "bodo",
      "braga",
      "famalicao",
      "basaksehir",
      "trabzonspor",
      "samsunspor",
      "lorient",
      "paris-fc",
      "brest",
      "toulouse",
      "basel",
      "rangers"
    ]
  },

  gold: {
    id: "gold",
    rarity: "gold",
    displayName: "Gold Pack",
    probabilityWeight: 18,
    description: "Команды 4★",
    image: "assets/packs/goldpack.png",
    teams: [
      "bournemouth",
      "brentford",
      "brighton",
      "burnley",
      "everton",
      "leeds-utd",
      "fulham",
      "sunderland",
      "westham-utd",
      "wolves",
      "mainz",
      "frankfurt",
      "gladbach",
      "freiburg",
      "werder",
      "hoffenheim",
      "union",
      "stuttgart",
      "wolfsburg",
      "osasuna",
      "celta",
      "girona",
      "getafe",
      "rayo",
      "espanyol",
      "mallorca",
      "real-sociedad",
      "sevilla",
      "bologna",
      "como",
      "fiorentina",
      "torino",
      "ajax",
      "feyenoord",
      "psv",
      "porto",
      "benfica",
      "fenerbahce",
      "besiktas",
      "lille",
      "nice",
      "lyon",
      "monaco",
      "lens",
      "rennes",
      "strasbourg",
      "celtic"
    ]
  },

  platinum: {
    id: "platinum",
    rarity: "platinum",
    displayName: "Platinum Pack",
    probabilityWeight: 10,
    description: "Команды 4.5★",
    image: "assets/packs/platinumpack.png",
    teams: [
      "aston-villa",
      "chelsea",
      "crystal-palace",
      "man-utd",
      "newcastle",
      "nottingham-f",
      "spurs",
      "bvb",
      "bayer",
      "leipzig",
      "at-bilbao",
      "atm",
      "betis",
      "villareal",
      "roma",
      "atalanta",
      "juventus",
      "lazio",
      "milan",
      "napoli",
      "sporting",
      "galatasaray",
      "marseille"
    ]
  },

  legendary: {
    id: "legendary",
    rarity: "legendary",
    displayName: "Legendary Pack",
    probabilityWeight: 6,
    description: "Команды 5★",
    image: "assets/packs/legendarypack.png",
    teams: [
      "liverpool",
      "man-city",
      "arsenal",
      "bayern",
      "barca",
      "real-madrid",
      "inter",
      "psg"
    ]
  },

  special: {
    id: "special",
    rarity: "special",
    displayName: "Special Pack",
    probabilityWeight: 4,
    description: "Все клубы-победители Андрея и Макса",
    image: "assets/packs/specialpack.png",
    teams: [
      "real-madrid",
      "leipzig",
      "atm",
      "inter",
      "bayern",
      "man-city",
      "at-bilbao",
      "betis",
      "benfica",
      "valencia",
      "liverpool",
      "barca",
      "psg",
      "ajax",
      "milan",
      "galatasaray",
      "nottingham-f"
    ]
  }
};

// =========================
// CURRENT UCL CHAMPION (MANUAL)
// Меняешь тут руками после ваших матчей
// =========================
window.CURRENT_UCL_CHAMPION = {
  playerLabel: "ANDREY",
  teamKey: "barca",
  teamLabel: "BARCELONA",
  date: "29.01.2026",
  note: "UCL CHAMPION"
};


// =========================
// FC 26 — TOURNAMENTS (MANUAL LIST)
// Добавляй новые турниры по аналогии
// type: "championsLeague" | "superCup" | "worldCup" | "euro"
// =========================



window.FC26_TOURNAMENTS = [

        {
    id: "fc26-ucl-2026-29-01",
    type: "championsLeague",
    title: "UCL",
    date: "29.01.2026",

    // кто играет (для логотипов и подписей)
    andreyTeamKey: "barca",
    andreyTeamLabel: "BARCELONA",
    maksTeamKey: "stuttgart",          // если лого не то — поменяешь ключ тут
    maksTeamLabel: "STUTTGART",

    // данные турнира (всё, что будет на странице)
    details: {
      groupStage: {
        andrey: { place: 8,  played: 8, w: 5, d: 0, l: 3, gf: 25, ga: 18, gd:  7, pts: 15 },
        maks:   { place: 34,  played: 8, w: 2, d: 1, l: 5, gf: 20, ga: 28, gd:  -8, pts: 7 }
      },

      // Плей-офф: если нет стадии — ставь null
      knockout: {
        r32: { andrey: null, maks: null },

        r16: { // 1/8
          andrey: {
            opponentKey: "liverpool",
            opponentLabel: "LIVERPOOL",
            agg: { f: 8, a: 5 },
            legs: [{ f: 4, a: 2 }, { f: 4, a: 3 }],
            result: "W"
          },
          maks: null
        },

        qf: { // 1/4
          andrey: {
            opponentKey: "spurs",
            opponentLabel: "TOTTENHAM",
            agg: { f: 9, a: 5 },
            legs: [{ f: 4, a: 2 }, { f: 5, a: 3 }],
            result: "W"
          },
          maks: null
        },

        sf: { // 1/2
          andrey: {
            opponentKey: "galatasaray",
            opponentLabel: "GALATASARAY",
            agg: { f: 12, a: 8 },
            legs: [{ f: 4, a: 2 }, { f: 8, a: 6 }],
            result: "W"
          },
          maks: null
        },

        final: { // финал
          andrey: {
            opponentKey: "man-city",
            opponentLabel: "MANCHESTER CITY",
            agg: { f: 4, a: 1 },
            result: "W"
          },
          maks: null
        },
      },
      awards: {
        mvp: {
          player: "Robert Lewandowski - 89",
          teamKey: "barca",
          teamLabel: "BARCELONA",
          ratingAvg: 9.16
        }
      }


    }
  },

      {
    id: "fc26-ucl-2026-16-01",
    type: "championsLeague",
    title: "UCL",
    date: "16.01.2026",

    // кто играет (для логотипов и подписей)
    andreyTeamKey: "barca",
    andreyTeamLabel: "BARCELONA",
    maksTeamKey: "gaziantep",          // если лого не то — поменяешь ключ тут
    maksTeamLabel: "GAZIANTEP",

    // данные турнира (всё, что будет на странице)
    details: {
      groupStage: {
        andrey: { place: 1,  played: 8, w: 7, d: 0, l: 1, gf: 25, ga: 12, gd:  13, pts: 21 },
        maks:   { place: 34,  played: 8, w: 0, d: 3, l: 5, gf: 17, ga: 30, gd:  -17, pts: 3 }
      },

      // Плей-офф: если нет стадии — ставь null
      knockout: {
        r32: { andrey: null, maks: null },

        r16: { // 1/8
          andrey: {
            opponentKey: "chelsea",
            opponentLabel: "CHELSEA",
            agg: { f: 7, a: 4 },
            legs: [{ f: 5, a: 3 }, { f: 2, a: 1 }],
            result: "W"
          },
          maks: null
        },

        qf: { // 1/4
          andrey: {
            opponentKey: "bvb",
            opponentLabel: "BORUSSIA DORTMUND",
            agg: { f: 10, a: 6 },
            legs: [{ f: 6, a: 2 }, { f: 4, a: 4 }],
            result: "W"
          },
          maks: null
        },

        sf: { // 1/2
          andrey: {
            opponentKey: "real-madrid",
            opponentLabel: "REAL MADRID",
            agg: { f: 10, a: 7 },
            legs: [{ f: 3, a: 3 }, { f: 7, a: 4 }],
            result: "W"
          },
          maks: null
        },

        final: { // финал
          andrey: {
            opponentKey: "psg",
            opponentLabel: "PSG",
            agg: { f: 6, a: 4 },
            result: "W"
          },
          maks: null
        },
      },
      awards: {
        mvp: {
          player: "Robert Lewandowski - 89",
          teamKey: "barca",
          teamLabel: "BARCELONA",
          ratingAvg: 9.17
        }
      }


    }
  },


      {
    id: "fc26-ucl-2026-11-01",
    type: "championsLeague",
    title: "UCL",
    date: "11.01.2026",

    // кто играет (для логотипов и подписей)
    andreyTeamKey: "brugge",
    andreyTeamLabel: "BRUGGE",
    maksTeamKey: "galatasaray",          // если лого не то — поменяешь ключ тут
    maksTeamLabel: "GALATASARAY",

    // данные турнира (всё, что будет на странице)
    details: {
      groupStage: {
        andrey: { place: 17,  played: 8, w: 3, d: 2, l: 3, gf: 21, ga: 19, gd:  2, pts: 11 },
        maks:   { place: 29,  played: 8, w: 2, d: 1, l: 5, gf: 24, ga: 32, gd:  -8, pts: 7 }
      },

      // Плей-офф: если нет стадии — ставь null
      knockout: {
        r32: { // 1/8
          andrey: {
            opponentKey: "man-city",
            opponentLabel: "MANCHESTER CITY",
            agg: { f: 8, a: 5 },
            legs: [{ f: 5, a: 5 }, { f: 3, a: 0 }],
            result: "W"
          },
          maks: null
        }, // 1/16 (у вас прочерк)

        r16: { andrey: {
            opponentKey: "arsenal",
            opponentLabel: "ARS. P0-3",
            agg: { f: 6, a: 6 },
            legs: [{ f: 0, a: 4 }, { f: 6, a: 2 }],
            result: "L"
          },
          maks: null },

        qf: { andrey: null, maks: null }, // 1/16 (у вас прочерк)

        sf: { andrey: null, maks: null }, // 1/16 (у вас прочерк)

        final: { andrey: null, maks: null }, // 1/16 (у вас прочерк)
      },
      awards: {
        mvp: {
          player: "Nicolò Tresoldi - 72",
          teamKey: "brugge",
          teamLabel: "ПОЗАНИМАЛСЯ С ФОРЛАНОМ",
        }
      }


    }
  },

    {
    id: "fc26-ucl-2026-05-01",
    type: "championsLeague",
    title: "UCL",
    date: "05.01.2026",

    // кто играет (для логотипов и подписей)
    andreyTeamKey: "betis",
    andreyTeamLabel: "REAL BETIS",
    maksTeamKey: "celta",          // если лого не то — поменяешь ключ тут
    maksTeamLabel: "CELTA VIGO",

    // данные турнира (всё, что будет на странице)
    details: {
      groupStage: {
        andrey: { place: 2,  played: 8, w: 6, d: 0, l: 2, gf: 28, ga: 16, gd:  12, pts: 18 },
        maks:   { place: 30,  played: 8, w: 2, d: 1, l: 5, gf: 21, ga: 32, gd:  -11, pts: 7 }
      },

      // Плей-офф: если нет стадии — ставь null
      knockout: {
        r32: { andrey: null, maks: null }, // 1/16 (у вас прочерк)

        r16: { // 1/8
          andrey: {
            opponentKey: "sporting",
            opponentLabel: "SPORTING",
            agg: { f: 4, a: 6 },
            legs: [{ f: 2, a: 3 }, { f: 2, a: 3 }],
            result: "L"
          },
          maks: null
        },

        qf: { andrey: null, maks: null }, // 1/16 (у вас прочерк)

        sf: { andrey: null, maks: null }, // 1/16 (у вас прочерк)

        final: { andrey: null, maks: null }, // 1/16 (у вас прочерк)
      },


    }
  },

  {
    id: "fc26-ucl-2025-12-20",
    type: "championsLeague",
    title: "UCL",
    date: "20.12.2025",

    // кто играет (для логотипов и подписей)
    andreyTeamKey: "betis",
    andreyTeamLabel: "REAL BETIS",
    maksTeamKey: "spurs",          // если лого не то — поменяешь ключ тут
    maksTeamLabel: "TOTTENHAM",

    // данные турнира (всё, что будет на странице)
    details: {
      groupStage: {
        andrey: { place: 5,  played: 8, w: 6, d: 0, l: 2, gf: 23, ga: 17, gd:  6, pts: 18 },
        maks:   { place: 3,  played: 8, w: 6, d: 2, l: 0, gf: 19, ga: 10, gd:  9, pts: 20 }
      },

      // Плей-офф: если нет стадии — ставь null
      knockout: {
        r32: { andrey: null, maks: null }, // 1/16 (у вас прочерк)

        r16: { // 1/8
          andrey: {
            opponentKey: "psg",
            opponentLabel: "PSG",
            agg: { f: 7, a: 6 },
            legs: [{ f: 2, a: 5 }, { f: 5, a: 1 }],
            result: "W"
          },
          maks: {
            opponentKey: "arsenal",
            opponentLabel: "ARSENAL",
            agg: { f: 3, a: 9 },
            legs: [{ f: 2, a: 6 }, { f: 1, a: 3 }],
            result: "L"
          }
        },

        qf: { // 1/4
          andrey: {
            opponentKey: "atalanta",
            opponentLabel: "ATALANTA",
            agg: { f: 8, a: 5 },
            legs: [{ f: 2, a: 3 }, { f: 6, a: 2 }],
            result: "W"
          },
          maks: null
        },

        sf: { // 1/2
          andrey: {
            opponentKey: "newcastle",
            opponentLabel: "NEWCASTLE",
            agg: { f: 10, a: 6 },
            legs: [{ f: 6, a: 5 }, { f: 4, a: 1 }],
            result: "W"
          },
          maks: null
        },

        final: {
          andrey: {
            opponentKey: "man-city",
            opponentLabel: "MANCHESTER CITY",
            agg: { f: 3, a: 0 },
            legs: [{ f: 3, a: 0 }], // финал 1 матч
            result: "W"
          },
          maks: null
        }
      },

      awards: {
        mvp: {
          player: "Juan Camilo Hernández Suárez - 79",
          teamKey: "betis",
          teamLabel: "REAL BETIS",
          ratingAvg: 9.33
        }
      }
    }
  }
];









// =========================
// HALL OF FAMES — SCORERS (MANUAL)
// =========================
window.HOF_SCORERS = [
  {
    rank: 1,
    name: "Richarlison de Andrade",
    teamKey: "spurs",                 // если лого не то — меняешь только это
    goals: 36,
    photo: "assets/halloffames/richarlison.png"
  },
  {
    rank: 2,
    name: "Cristiano Ronaldo dos Santos Aveiro",
    teamKey: "juventus",
    goals: 35,
    photo: "assets/halloffames/ronaldo.png"
  },
  {
    rank: 3,
    name: "Timo Werner",
    teamKey: "leipzig",
    goals: 32,
    photo: "assets/halloffames/werner.png"
  },
    {
    rank: 4,
    name: "Robert Lewandowski",
    teamKey: "barca",
    goals: 26,
    photo: "assets/halloffames/lewandowski.png"
  }
];






// =========================
// HALL OF FAMES — LEGENDS (MANUAL)
// =========================
window.HOF_LEGENDS = [
  
  {
    name: "Guilherme Alvim Marinato",
    teamKey: "lokomotiv",
    position: "GK",
    photo: "assets/halloffames/guilherme.png",

    // trophies: lc | wc | euro | supercup
    trophies: {
      lc: 2
    },

    quote: "«Одна из первых легенд, звезда эпохи Локомотива, двухкратный обладатель самых первых трофеев Лиги Чемпионов Андрея в мезозойской FIFA 19»"
  },//ГИЛЯ

      {
    name: "Péter Gulácsi",
    teamKey: "leipzig",
    position: "GK",
    photo: "assets/halloffames/gulascsi.png",

    // trophies: lc | wc | euro | supercup
    trophies: {
      lc: 4,
      supercup:1
    },

    quote: "«Легенда Лейпцига 20 фифы. Четырёхкратный обладатель Лиги Чемпионов. Спустя три года в FIFA 23, стал обладателем Суперкубка УЕФА. Это было последнее появление Лейпцига в таблице на данный момент, в настоящее время этот некогда великий клуб - в тени»"
  },//ГУЛЯ

      {
    name: "Manuel Peter Neuer",
    teamKey: "bayern",
    position: "GK",
    photo: "assets/halloffames/neuer.png",

    // trophies: lc | wc | euro | supercup
    trophies: {
      lc: 6
    },

    quote: "«Шестикратный обладатель Лиги Чемпионов. Легенда Баварии Андрея времён FIFA 21 и FIFA 22»"
  },//НОЙЕР

            {
    name: "Odysseas Vlachodimos",
    teamKey: "benfica",
    position: "GK",
    photo: "assets/halloffames/vlahodimoz.png",

    // trophies: lc | wc | euro | supercup
    trophies: {
      lc: 1,
      
    },

    quote: "«Одиссея, Влаходимос, он же Влаходимос Великий. В FIFA 20 Победитель первой в истории Макса Лиги Чемпионов»"
  },//ВЛАХОДИМОС

        {
    name: "Yann Sommer",
    teamKey: "switzerland",
    position: "GK",
    photo: "assets/halloffames/sommer.png",

    // trophies: lc | wc | euro | supercup
    trophies: {
      wc: 2,
      euro: 1
    },

    quote: "«Двухкратный обладатель Чемпионатов мира подряд, а также обладатель Чемпионата Европы. Творец успеха сборной Швейцарии образца FIFA 21»"
  },//СОММЕР

            {
    name: "Maarten Stekelenburg",
    teamKey: "netherlands",
    position: "GK",
    photo: "assets/halloffames/steklo.png",

    // trophies: lc | wc | euro | supercup
    trophies: {
      lc: 1,
      euro: 1
      
      
    },

    quote: "«Великий вратарь с невеликим рейтингом. Благодаря своей игре основал некий клуб 74, благодаря которому, в наше время вратари с рейтингом 74 имеют почёт и уважение. Был одним из главных открытий и одним из главных творцов победы Голландии Макса на EURO в FIFA 21, а также имеет в своём активе трофей за Аякс Макса в FIFA 22, будучи вратарём запаса, но выходя в трудные минуты и совершая ключевые сейвы благодаря своему волшебному рейтингу»"
  },//СТЕКЕЛЕНБУРГ

              {
    name: "Jacobus Antonius Peter Cillessen",
    teamKey: "valencia",
    position: "GK",
    photo: "assets/halloffames/cilesen.png",

    // trophies: lc | wc | euro | supercup
    trophies: {
      lc: 2,
      
    },

    quote: "«Один из ключевых игроков праймовой Валенсии Макса FIFA 20. Двухкратный обладатель Лиги Чемпионов»"
  },//СИЛУС

                {
    name: "Gianluigi Donnarumma",
    teamKey: "psg",
    position: "GK",
    photo: "assets/halloffames/donnaruma.png",

    // trophies: lc | wc | euro | supercup
    trophies: {
      lc: 2,
      euro: 1
      
    },

    quote: "«Доннарума. Он же - донная комната. Высокорейтинговый топовый ГК, двухкратный обладатель ЛЧ в составе PSG Макса в FIFA 22, а также победитель Чемпионата Европы в FC 24 в качестве основного ГК в сборной Италии Андрея»"
  },//ДОННАЯ КОМНАТА

                  {
    name: "Mike Peterson Maignan",
    teamKey: "milan",
    position: "GK",
    photo: "assets/halloffames/maingnan.png",

    // trophies: lc | wc | euro | supercup
    trophies: {
      lc: 2,
      euro: 1
      
    },

    quote: "«Мэигнан - он же мейнголан. ГК стабильного хайрейтинга из династии банановых страстей. Правнук великого Манданды, сводный брат Онаны. Двухкратный обладатель Лиги Чемпионов в составе Милана Макса в FIFA 22, а также победитель Чемпионата Европы в составе сборной Франции Андрея в FC 24»"
  },//МЕЙНГНАН

                    {
    name: "Thibaut Nicolas Marc Courtois",
    teamKey: "real-madrid",
    position: "GK",
    photo: "assets/halloffames/courtois.png",

    // trophies: lc | wc | euro | supercup
    trophies: {
      lc: 15,
      euro: 1,
      supercup: 1
      
    },

    quote: "«ПЯТНАДЦАТИКРАТНЫЙ обладатель Лиги Чемпионов в составе Реал Мадрида, 13 из них под руководством Андрея, 2 - под руководством Макса. Обладатель Суперкубка УЕФА в FC 24, победитель Чемпионата Европы в составе сборной Бельгии Андрея в FC 24, обладатель абсолютного рекорда среди вратарей - пропущено 8 голов за весь победный розыгрыш Лиги Чемпионов старого формата»"
  },//КУРТКА

                            {
    name: "Ørjan Håskjold Nyland",
    teamKey: "norway",
    position: "GK",
    photo: "assets/halloffames/nyland.png",

    // trophies: lc | wc | euro | supercup
    trophies: {
      euro: 2
      
    },

    quote: "«Великий берег Нила. Норвежский монстр с низким рейтингом. Двухкратный победитель EURO в FC 24 за Норвегию Андрея»"
  },//НИЛАНД

                            {
    name: "Wayne Robert Hennessey",
    teamKey: "wales",
    position: "GK",
    photo: "assets/halloffames/henessy.png",

    // trophies: lc | wc | euro | supercup
    trophies: {
      wc: 1,
      euro: 1
      
    },

    quote: "«Опьянял нападающих своими аномальными сейвами, хотя и имел достаточно низкий рейтинг. Но этот фат не помешал ему стать победителем Чемпионата мира и Чемпионата Европы в составе Уэльса Андрея в FIFA 22»"
  },//ХЕНЕССИ

                      {
    name: "Matz Willy Els Sels",
    teamKey: "nottingham-f",
    position: "GK",
    photo: "assets/halloffames/sels.png",

    // trophies: lc | wc | euro | supercup
    trophies: {
      lc: 1
      
    },

    quote: "«Победитель Лиги Чемпионов в составе Ноттингем Форест Макса в FC 25. Один из самых ключевых игроков, повлиявших на результат НФ в том розыгрыше, за что и был удостоин права находиться в кагорте легенд»"
  },//АВИАСЕЙЛС


                        {
    name: "Vladislav Ignatjev",
    teamKey: "lokomotiv",
    position: "DEF",
    photo: "assets/halloffames/ignatiev.png",

    // trophies: lc | wc | euro | supercup
    trophies: {
      lc: 2
      
    },

    quote: "«Владислав Игнатьев... Для кого-то ангел несущий свет, для кого-то демон во плоти. Но к одному человеку, родом из солнечной бразилии, Владик до сих пор является в самых страшных влажных снах. Двухкратный обладатель Лиги Чемпионов в составе Локомотива в FIFA 19, Обладатель единственного в своём роде Бриллиантового мяча»"
  },//ИГНАТЬЕВ

                          {
    name: "Dayotchanculle Oswald Upamecano",
    teamKey: "leipzig",
    position: "DEF",
    photo: "assets/halloffames/upamecano.png",

    // trophies: lc | wc | euro | supercup
    trophies: {
      lc: 7,
      euro: 1
      
    },

    quote: "«Ручной негр Андрея, фигурировавший в сезонах 20,22,24. Семикратный обладатель ЛЧ. 4 - в составе Лейпцига Андрея, 2 в составе Баварии Андрея, 1 - в составе Баварии Макса. Также Чемпион Европы в FC 24 в составе Франции Андрея »"
  },//УПАМЕКАНЫЧ

                            {
    name: "Virgil van Dijk",
    teamKey: "liverpool",
    position: "DEF",
    photo: "assets/halloffames/vandike.png",

    // trophies: lc | wc | euro | supercup
    trophies: {
      lc: 1,
      euro: 4
      
    },

    quote: "«Божий сын Владислава Игнатьева. Обладатель четырёх кубков Европы в FIFA 21 и FC 24. 3 - за Голландию Макса, 1 - за Голландию Андрея. Обладатель кубка Лиги Чемпионов за Ливерпуль Макса в FIFA 21. На данный момент времени считается САМЫМ страшным, кровожадным и убийственым защитником последних лет»"
  },//ВАНДАЙК

                              {
    name: "Oluwafikayomi Oluwadamilola Tomori",
    teamKey: "milan",
    position: "DEF",
    photo: "assets/halloffames/tomori.png",

    // trophies: lc | wc | euro | supercup
    trophies: {
      lc: 2,
      euro: 2
      
    },

    quote: "«Тамара Михайловна. Машина, созданная причинять боль. Был неотъемлемой частью мерзкого состава Милана в FIFA 22, с которым стал двухкратным победителем Лиги Чемпионов. Затем, через время, в FC 24 в составе Англичан Андрея также два раза стал обладателем трофея, но уже Чемпионата Европы»"
  },//ТОМАРА

                                {
    name: "Antonio Rüdiger",
    teamKey: "real-madrid",
    position: "DEF",
    photo: "assets/halloffames/rudiger.png",

    // trophies: lc | wc | euro | supercup
    trophies: {
      lc: 15,
      supercup: 1
      
    },

    quote: "«ПЯТНАДЦАТИКРАТНЫЙ Мадридский людоед, питающийся кровью и плотью несчастных доходяг, которые посмели пересечь половину поля и вторгнуться во владения Реала. 13 трофеев ЛЧ, а также Суперкубок - в составе Реала Андрея и два трофея Лиги Чемпионов за Реал Макса»"
  },//ТОМАРА
  

];

  