import { getUpcomingGames, getGameOdds } from "./model";

const buildHtml = (selector) => (data) => (selector.innerHTML = data);

const bettingdApp = () => {
  const games = document.getElementById("games");
  const loadOdds = (id) => getGameOdds(id).fork(console.error, console.log);
  document.loadOdds = loadOdds;
  getUpcomingGames().fork(console.error, buildHtml(games));
};

bettingdApp();
