// Tracker data. Edit this file to add or correct requirements.
// required = how many the game asks for, total = how many exist.
// Counts were compiled from published launch-week guides, which do not
// always agree. Check them against the in-game pause-menu checklist.
window.TRACKER_DATA = {
  updated: '2026-11-20',
  sections: [
    {
      id: 'story',
      title: 'Story missions',
      note: 'Most guides count 91 mandatory missions across five chapters; some count up to 97.',
      items: [
        { id: 'ch1', name: 'Chapter 1', spoilerName: 'Just Like Paradise', required: 22, total: 22 },
        { id: 'ch2', name: 'Chapter 2', spoilerName: 'Paradise Lost', required: 11, total: 11 },
        { id: 'ch3', name: 'Chapter 3', spoilerName: 'Tits Ass Drug Money', required: 26, total: 26 },
        { id: 'ch4', name: 'Chapter 4', spoilerName: 'Vice City, Baby', required: 25, total: 25 },
        { id: 'ch5', name: 'Chapter 5', spoilerName: 'Top of the World, Ma', required: 7, total: 7 }
      ]
    },
    {
      id: 'collectibles',
      title: 'Collectibles',
      note: 'You do not need every collectible. The tracker marks an entry done at the required count.',
      items: [
        { id: 'card-sets', name: 'Collectible card sets', required: 15, total: 18 },
        { id: 'waink-vehicles', name: 'WAiNK vehicle scans', required: 200, total: 557, step: 5 },
        { id: 'waink-animals', name: 'Animals studied', required: 100, total: 255, step: 5 },
        { id: 'underwater', name: 'Underwater discoveries', required: 33, total: 33 },
        { id: 'reading', name: 'Magazines, books and comics', required: 30, total: 34 },
        { id: 'meditation', name: 'Meditation spots', required: 15, total: 18 },
        { id: 'flamingos', name: 'Cocaine flamingos', required: 100, total: 125, step: 5 },
        { id: 'kenton', name: 'Kenton treasure sets', required: 5, total: 7 }
      ]
    },
    {
      id: 'activities',
      title: 'Side activities',
      note: '',
      items: [
        { id: 'races', name: 'Unique races won', required: 30, total: 40 },
        { id: 'range', name: 'Shooting range gold medals', required: 42, total: 42 },
        { id: 'drone', name: 'Drone time trials', required: 42, total: 42 },
        { id: 'hoops', name: 'Basketball hoops', required: 90, total: 100, step: 5 },
        { id: 'pool', name: 'Pool opponents beaten', required: 5, total: 7 },
        { id: 'golf', name: 'Mini golf courses', required: 2, total: 3 },
        { id: 'arcade', name: 'Video games played', required: 4, total: 4 },
        { id: 'challenges', name: 'Challenges', required: 70, total: 80 },
        { id: 'stunts', name: 'Stunts', required: 300, total: 397, step: 10 },
        { id: 'styles', name: 'Styles discovered', required: 70, total: 79 }
      ]
    },
    {
      id: 'fencing',
      title: 'Fencing',
      note: 'Enter the dollar value you have fenced so far.',
      items: [
        { id: 'fence-goods', name: 'Narcotics and jewelry fenced', required: 100000, total: 100000, step: 5000, unit: '$' },
        { id: 'fence-bills', name: 'Marked bills fenced', required: 250000, total: 250000, step: 10000, unit: '$' }
      ]
    }
  ]
};
