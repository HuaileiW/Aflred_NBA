const teamCode = {
  PHI: {
    en: '76ers',
    cn: '76人',
  },
  MIL: {
    en: 'Bucks',
    cn: '雄鹿',
  },
  CHI: {
    en: 'Bulls',
    cn: '公牛',
  },
  CLE: {
    en: 'Cavaliers',
    cn: '骑士',
  },
  BOS: {
    en: 'Celtics',
    cn: '凯尔特人',
  },
  LAC: {
    en: 'Clippers',
    cn: '快船',
  },
  MEM: {
    en: 'Grizzlies',
    cn: '灰熊',
  },
  ATL: {
    en: 'Hawks',
    cn: '老鹰',
  },
  MIA: {
    en: 'Heat',
    cn: '热火',
  },
  CHA: {
    en: 'Hornets',
    cn: '黄蜂',
  },
  UTA: {
    en: 'Jazz',
    cn: '爵士',
  },
  SAC: {
    en: 'Kings',
    cn: '国王',
  },
  NYK: {
    en: 'Knicks',
    cn: '尼克斯',
  },
  LAL: {
    en: 'Lakers',
    cn: '湖人',
  },
  ORL: {
    en: 'Magic',
    cn: '魔术',
  },
  DAL: {
    en: 'Mavericks',
    cn: '独行侠',
  },
  BKN: {
    en: 'Nets',
    cn: '篮网',
  },
  DEN: {
    en: 'Nuggets',
    cn: '掘金',
  },
  IND: {
    en: 'Pacers',
    cn: '步行者',
  },
  NOP: {
    en: 'Pelicans',
    cn: '鹈鹕',
  },
  DET: {
    en: 'Pistons',
    cn: '活塞',
  },
  TOR: {
    en: 'Raptors',
    cn: '猛龙',
  },
  HOU: {
    en: 'Rockets',
    cn: '火箭',
  },
  SAS: {
    en: 'Spurs',
    cn: '马刺',
  },
  PHX: {
    en: 'Suns',
    cn: '太阳',
  },
  OKC: {
    en: 'Thunder',
    cn: '雷霆',
  },
  MIN: {
    en: 'Timberwolves',
    cn: '森林狼',
  },
  POR: {
    en: 'Trailblazers',
    cn: '开拓者',
  },
  GSW: {
    en: 'Warriors',
    cn: '勇士',
  },
  WAS: {
    en: 'Wizards',
    cn: '勇士',
  },
};

module.exports = getTeamCnName = code => {
  const c = code.toUpperCase();
  return teamCode[c].cn;
};
