import key from "./b365key";
import { Bet365 } from "./bet365";
import fromUnixTime from "date-fns/fromUnixTime";
import { compose } from "ramda";

const Team = ({ image_id, name } = {}) => ({
  name,
  image: image_id,
});

export const Game = ({ time, home, away, id } = {}) => ({
  homeTeam: Team(home),
  awayTeam: Team(away),
  time: getGameTime(time),
  eventId: id,
});

const getGameTime = (time) => fromUnixTime(time);
const gameReducer = (acc, val) => acc.concat(Game(val));
const getResults = ({ results }) => results;
const transformData = (xf) => (arr) => arr.reduce(xf, []);
const buildGames = transformData(gameReducer);

const gameToHtmlItem = ({ awayTeam, homeTeam, time, eventId }) => `
  <div>
    <h2>${awayTeam.name}(Away) vs. ${homeTeam.name}(Home)</h2>
    <h4>Date ${time}</h4>
    <button class="${eventId}" id="gameBtn" onclick="loadOdds(${eventId})">View Odds</button>
  </div>`;

const transformGames = compose(
  (x) => x.map(gameToHtmlItem),
  buildGames,
  getResults
);

const head = (arr = []) => arr[0];
const getLatestOdds = ({ odds }) => Object.values(odds).map(head);
const transformOdds = compose(getLatestOdds, getResults);

const getGameOdds = (eventId) =>
  Bet365.fetchOdds({ apiKey: key, eventId }).map(transformOdds);

const getUpcomingGames = () =>
  Bet365.fetchGames({ apiKey: key }).map(transformGames);

export { transformGames, transformOdds, getGameOdds, getUpcomingGames };
