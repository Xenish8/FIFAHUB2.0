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
        { teamKey: "betis",       fifaId: "fifa26" }  // 31 Athletic Club Bilbao
        
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
  teamKey: "betis",
  teamLabel: "BETIS",
  date: "20.12.2025",
  note: "UCL CHAMPION"
};


// =========================
// FC 26 — TOURNAMENTS (MANUAL LIST)
// Добавляй новые турниры по аналогии
// type: "championsLeague" | "superCup" | "worldCup" | "euro"
// =========================



window.FC26_TOURNAMENTS = [

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




  