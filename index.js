const alfy = require('alfy');
const moment = require('moment');
const flow = require('lodash').flow;

const startTime = moment().format('YYYY-MM-DD');
const endTime = moment().add('3', 'day').format('YYYY-MM-DD');
const host = 'https://apps.game.qq.com/lol/match/apis/searchBMatchInfo_bak.php?p8=5&p1=115&p6=3&page=1&pagesize=10&_=1547452018654'

alfy.fetch(`${host}&p9=${startTime}%2000:00:00&p10=${endTime}%2023:59:59`, {
  transform: ({ msg: { result } }) => {
    return result;
  },
})
  .then((games) => {
    const items = dataFlow(games);
    alfy.output(items);
  })
  .catch(error => {
    alfy.error(`出错了...  ${error}`)
  });

const statusList = {
  1: '未开始',
  2: '进行中',
  3: '已结束',
  4: ''
}

const getTitle = ({ bMatchName, MatchStatus = 4, ScoreA, ScoreB }) => {
  const status = statusList[MatchStatus];
  let matchName = bMatchName
  if (MatchStatus === 2) {
    const teams = bMatchName.split('vs');
    matchName = `${teams[0]}(${ScoreA}) vs ${teams[1]}(${ScoreB})`;
  }

  return `${matchName} - ${status}`;
}

const getSubtitle = ({ MatchDate }) => {
  return MatchDate
}

const mapData = games => {
  return games.map((game) => {
    return {
      title: getTitle(game),
      subtitle: getSubtitle(game),
    }
  })
}

const dataFlow = flow([
  mapData,
]);
