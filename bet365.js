import Task from "./task";
import { compose } from "ramda";
import fetch from "isomorphic-unfetch";

const fetchIt = (url) =>
  Task((rej, res) =>
    fetch(url)
      .then((x) => x.json())
      .then(res)
      .catch(rej)
  );

const makeBettingUrl = ({ sportId = 12, leagueId = 459, apiKey }) =>
  `https://api.b365api.com/v2/events/upcoming?sport_id=${sportId}&league_id=${leagueId}&token=${apiKey}`;

const makeOddsUrl = ({ eventId, apiKey }) =>
  `https://api.b365api.com/v2/event/odds?token=${apiKey}&source=bet365&event_id=${eventId}`;

const Bet365 = {
  fetchGames: compose(fetchIt, makeBettingUrl),
  fetchOdds: compose(fetchIt, makeOddsUrl),
};

const trace = (label) => (val) => {
  console.log(`${label}::`, val);
  return val;
};

export { Bet365 };
