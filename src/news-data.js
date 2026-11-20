// News entries. To publish an update, add a new object at the top.
// status must be one of:
//   confirmed     - stated by Rockstar, Take-Two, Sony, Microsoft or another primary source
//   reported      - published by a reliable outlet, not confirmed by a primary source
//   estimate      - a third-party number, not an official figure
//   unconfirmed   - a claim or rumour with no solid backing
//   not-announced - something people ask about that has no official word yet
// Every entry needs a date and at least one source link.
window.SITE_NEWS = [
  {
    date: '2026-11-19',
    status: 'confirmed',
    title: 'GTA 6 is out on PS5 and Xbox Series X|S',
    summary: 'Grand Theft Auto VI launched on 19 November 2026 after a 13-year wait since GTA 5. It is available on PlayStation 5 and Xbox Series X|S.',
    sources: [
      { label: 'Al Jazeera', url: 'https://www.aljazeera.com/news/2026/11/19/grand-theft-auto-vi-launches-to-rave-reviews-after-13-year-wait' }
    ]
  },
  {
    date: '2026-11-19',
    status: 'reported',
    title: 'Launch reviews put GTA 6 at 99 on Metacritic',
    summary: 'Early coverage reports a 99 Metacritic score based on more than 150 reviews. Scores can move as more reviews are added.',
    sources: [
      { label: 'Hromadske', url: 'https://hromadske.ua/en/lifestyle/274650-gta-6-launches-with-near-perfect-reviews-estimated-19-million-copies-sold' }
    ]
  },
  {
    date: '2026-11-19',
    status: 'estimate',
    title: 'Day-one sales estimated at about 19 million copies',
    summary: 'Sensor Tower estimates 19.05 million copies and roughly $1.84 billion in revenue on launch day. Rockstar and Take-Two have not published official sales figures.',
    sources: [
      { label: 'Forbes', url: 'https://www.forbes.com/sites/conormurray/2026/11/19/grand-theft-auto-vi-passes-18-billion-in-revenue-on-release-day-eclipses-the-odysseys-box-office-total/' }
    ]
  },
  {
    date: '2026-11-19',
    status: 'not-announced',
    title: 'No PC version has been announced',
    summary: 'Rockstar lists only PS5 and Xbox Series X|S. Some reports suggest a PC version could come in 2027, but there is no official date.',
    sources: [
      { label: 'Zap-Hosting', url: 'https://zap-hosting.com/en/blog/gta-6-pc-rp-fivem-servers' }
    ]
  },
  {
    date: '2026-11-19',
    status: 'not-announced',
    title: 'No online mode at launch',
    summary: 'GTA 6 launched as a single-player game. No online mode, date or crossplay has been announced, and the existing GTA Online keeps running.',
    sources: [
      { label: 'GTASide', url: 'https://gtaside.com/games/gta6/online/' }
    ]
  },
  {
    date: '2026-11-10',
    status: 'confirmed',
    title: 'Xbox Cloud Gaming streams GTA 6 to Xbox consoles, including Xbox One',
    summary: 'Xbox confirmed cloud streaming of GTA 6 on Xbox One and Xbox Series X|S for players who own the game. Reports say it does not stream to PC.',
    sources: [
      { label: 'Xbox Wire', url: 'https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/' }
    ]
  },
  {
    date: '2026-09-06',
    status: 'reported',
    title: 'YouTube updated its ad rules for violent game footage',
    summary: 'YouTube revised its advertiser-friendly guidelines for graphic gaming violence in September 2026. Videos made mainly to shock can still lose ads.',
    sources: [
      { label: 'Dexerto', url: 'https://www.dexerto.com/gta/youtube-updates-gaming-violence-monetization-rules-ahead-of-gta-6-launch-3405945/' }
    ]
  },
  {
    date: '2026-08-27',
    status: 'unconfirmed',
    title: 'Claim that players will earn real money from GTA 6 creations',
    summary: 'A content creator said Rockstar plans a marketplace where players can earn money. Rockstar has not announced any such programme for GTA 6.',
    sources: [
      { label: 'GamesRadar', url: 'https://www.gamesradar.com/games/grand-theft-auto/gta-6-user-generated-content-monetization-will-make-some-players-millionaires-claims-content-creator-who-had-a-party-with-rockstar/' }
    ]
  }
];
