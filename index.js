const alfy = require('alfy');
const moment = require('moment');
const flow = require('lodash').flow;
const sortBy = require('lodash').sortBy;
const getTeamCnName = require('./teamTricode.js');

const currentHour = moment().hour();
const today = currentHour > 0 ?
  moment().subtract(1, 'day') :
  moment();
const apiDate = today.format('YYYYMMDD');

alfy.fetch(`https://data.nba.net/prod/v2/${apiDate}/scoreboard.json`, {
  transform: ({ numGames, games }) => ({ numGames, games }),
})
  .then(({ numGames, games }) => {
    const titleItem = {
      title: `今日(${moment().format('MM-DD')})比赛场次 ${numGames}场`,
    }

    const items = dataFlow(games);

    alfy.output([].concat(titleItem, items));
  })
  .catch(error => {
    alfy.error(`出错了... ${error}`)
  });


const mapData = (games) => games.map(game => {
  const { hTeam, vTeam } = game;
  // const hRecord = `${hTeam.win}-${hTeam.loss}`
  // const vRecord = `${vTeam.win}-${vTeam.loss}`
  const hTeamName = getTeamCnName(hTeam.triCode);
  const vTeamName = getTeamCnName(vTeam.triCode);
  const { text: subtitle } = game.nugget;

  return {
    title: `${vTeamName}(${vTeam.score}) @ ${hTeamName}(${hTeam.score})`,
    subtitle,
  }
});

// TODO 目前是按照两队胜场总和最多的排在前面， 以后可以根据目前排名 把排名排序
const sortGame = (games) => sortBy(games, (game) => {
  const { hTeam, vTeam } = game;
  return -(Number(hTeam.win) + Number(vTeam.win));
})

const dataFlow = flow([
  sortGame,
  mapData,
]);
