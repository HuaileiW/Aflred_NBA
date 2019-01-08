const alfy = require('alfy');
const moment = require('moment');
const flow = require('lodash').flow;

const startTime = moment().format('YYYY-MM-DD');
const endTime = moment().add('3', 'day').format('YYYY-MM-DD');

alfy.fetch(`https://matchweb.sports.qq.com/kbs/list?from=NBA_PC&columnId=100000&startTime=${startTime}&endTime=${endTime}`, {
  transform: ({ data }) => ({ ...data }),
})
  .then((games) => {
    const items = dataFlow(games);

    alfy.output(items);
  })
  .catch(error => {
    alfy.error(`出错了...  ${error}`)
  });

const isTodaysGame = gameTime => moment().endOf('day') > moment(gameTime);
const isBeforeStart = matchPeriod => matchPeriod === '0';
const isGameLive = matchPeriod => matchPeriod === '1';
const gameStatus = matchPeriod => isBeforeStart(matchPeriod) ?
  '未开始' :
  isGameLive(matchPeriod) ?
  '直播中' :
  '已结束';

const getTitle = ({ rightName, leftName, leftGoal, rightGoal, isPay,  matchPeriod }) => {
  const beforeGame = isBeforeStart(matchPeriod);
  const isLive = isGameLive(matchPeriod);
  const showVip = isPay === '1' && (beforeGame || isLive) ? ' 会员' : '';
  const title = beforeGame ?
    `${leftName} @ ${rightName}` :
    `${leftName}(${leftGoal}) @ ${rightName}(${rightGoal})`;

  return `${title}${showVip} ${gameStatus(matchPeriod)}`;
}

const getSubTitle = ({ startTime: gameTime, matchPeriod }) => {
  const beforeGame = isBeforeStart(matchPeriod);
  const isInToday = isTodaysGame(gameTime);

  return beforeGame ?
    `${moment(gameTime).format('MM-DD')} 距离开始还有${moment(gameTime).diff(moment(), 'hours')}小时` :
    isTodaysGame(gameTime) ? '今日' : ''
}

const mapData = (games) => {
  let items = [];
  for (let date in games) {
    games[date].forEach(game => {
      const { webUrl, matchPeriod } = game;
      const beforeGame = isBeforeStart(matchPeriod);
      const title = getTitle(game)
      const subtitle = getSubTitle(game);

      const item = {
        title,
        subtitle,
        arg: webUrl,
      }
      items.push(item);
    })
  }
  return items;
}


const dataFlow = flow([
  mapData,
]);
