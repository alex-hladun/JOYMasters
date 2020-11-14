import dotenv from 'dotenv'
import './App.css';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
// dotenv.config({path:__dirname+'../.env'})


const key = process.env.REACT_APP_KEY
// console.log(process.env)

console.log(key)
const prizes = [
  900000,
  700000,
  600000,
  528000,
  440000,
  396000,
  368500,
  341000,
  319000,
  297000,
  275000,
  253000,
  231000,
  209000,
  198000,
  187000,
  176000,
  165000,
  154000,
  143000,
  132000,
  123200,
  114400,
  105600,
  96800,
  88000,
  84700,
  81400,
  78100,
  74800,
  71500,
  68200,
  64900,
  62150,
  59400,
  56650,
  53900,
  51700,
  49500,
  47300,
  45100,
  42900,
  40700,
  38500,
  36300,
  34100,
  31900,
  30140,
  28600,
  27720,
]



const teams = {
  "40000015": "Kevin M",
  "40000006": "Alex H",
  "40002605": "Anthony P",
  "40001434": "Andrew F",
  "40000047": "Aaron B",
  "40003543": "No Team",
  "40002583": "Tania D",
  "40000216": "Alex V",
  "40002512": "Aaron B",
  "40001638": "Alex V",
  "40001313": "Terry M",
  "40001333": "Tania D",
  "40000432": "Richard T",
  "40000007": "Dale G",
  "40000017": "Anthony P",
  "40000991": "Lindsay B",
  "40001682": "Dale G",
  "40001092": "Kevin M",
  "40000002": "Chris K",
  "40001543": "Kathy R",
  "40001565": "Richard T",
  "40000019": "Aaron B",
  "40000423": "Kathy R",
  "40000003": "Kathy R",
  "40002541": "Kathy R",
  "40000811": "Alex V",
  "40001199": "Dana",
  "40000013": "Andrew F",
  "40002569": "Kevin M",
  "40002650": "Dana",
  "40000314": "Tania D",
  "40000322": "Alex H",
  "40000583": "Anthony P",
  "40000016": "Chris K",
  "40000764": "Alex H",
  "40000014": "Kevin M",
  "40000842": "Chris K",
  "40001009": "No Team",
  "40002471": "Terry M",
  "40001109": "No Team",
  "40002711": "Lindsay B",
  "40000010": "Lindsay B",
  "40000045": "Alex V",
  "40000653": "Richard T",
  "40000770": "Terry M",
  "40000785": "Alex V",
  "40001274": "Andrew F",
  "40001343": "Richard T",
  "40001373": "Terry M",
  "40000009": "Andrew F",
  "40001536": "Lindsay B",
  "40003460": "Chris K",
  "40002429": "Kevin M",
  "40000731": "Chris K",
  "40000954": "Dana",
  "40000965": "Richard T",
  "40001174": "Aaron B",
  "40001211": "Terry M",
  "40001594": "Andrew F",
  "40000201": "Kathy R",
  "40000430": "Dana",
  "40000638": "Dana",
  "40000012": "Dale G",
  "40001044": "Anthony P",
  "40004111": "Kathy R",
  "40001290": "Tania D",
  "40001424": "Terry M",
  "40001447": "Kevin M",
  "40000001": "Lindsay B",
  "40000270": "Alex H",
  "40000535": "Alex V",
  "40000561": "Dale G",
  "40000596": "Tania D",
  "40000890": "Alex H",
  "40001971": "Aaron B",
  "40001189": "Andrew F",
  "40000004": "Dale G",
  "40001560": "Lindsay B",
  "40000817": "Alex H",
  "40001012": "Anthony P",
  "40001317": "Dana",
  "40004310": "No Team",
  "40003646": "No Team",
  "40000285": "Richard T",
  "40000363": "Tania D",
  "40000509": "Chris K",
  "40000808": "Dale G",
  "40000898": "No Team",
  "40001087": "Anthony P",
  "40004357": "No Team",
  "40002317": "No Team",
  "40000479": "No Team",
  "40000677": "No Team",
  "40002547": "Aaron B"
}

function App() {

  const [leaderboard, setLeaderboard] = useState({})
  const [players, setPlayers] = useState([])
  const [teamTotal, setTeamTotal] = useState({})
  const [teamArray, setTeamArray] = useState([])
  let Players;
  let playerHTML = useRef('')
  let leaderboardHTML;

  useEffect(() => {
    axios.get(`https://api.sportsdata.io/golf/v2/json/Leaderboard/375?key=${key}`).then((res, err) => {
      console.log('axios res', res)
      const leaderData = res.data.Players
      setPlayers(res.data.Players)
      const rankCount = {}

      leaderData.forEach((player, index) => {
        if (rankCount[player.Rank] && prizes[index]) {
          rankCount[player.Rank].count++
          rankCount[player.Rank].cumPrize += prizes[index]
        } else if (prizes[index]) {
          rankCount[player.Rank] = {
            count: 1,
            cumPrize: prizes[index]
          }
        }
      })

      setLeaderboard(rankCount)

      const teamTotals = {
        'Alex H': 0,
        "Anthony P": 0,
        "Andrew F": 0,
        "Aaron B": 0,
        "Tania D": 0,
        "Alex V": 0,
        "Terry M": 0,
        "Dana": 0,
        "Richard T": 0,
        "Dale G": 0,
        "Lindsay B": 0,
        "Kevin M": 0,
        "Kathy R": 0,
        "Chris K": 0,
        "No Team": 0
      }

      leaderData.forEach((player, index) => {
        if (rankCount[player.Rank] && rankCount[player.Rank].cumPrize && rankCount[player.Rank].count) {
          teamTotals[teams[player.PlayerID]] += (rankCount[player.Rank].cumPrize / rankCount[player.Rank].count)
        }
      })

      console.log('teamtotals', teamTotals)


      const teamTotalArray = [];
      Object.keys(teamTotals).forEach(team => {
        console.log('Team in teamTotals', team, teamTotals[team])
        teamTotalArray.push({
          name: team,
          total: teamTotals[team]
        })
      })


      console.log("App -> teamTotalArray", teamTotalArray)

      const sortedTeamArray = teamTotalArray.sort(function (a, b) { return b.total - a.total })

      console.log('sorted team array', sortedTeamArray)

      setTeamArray(sortedTeamArray)
      setTeamTotal(teamTotals)

      // playerHTML = players.

      // leaderboardHTML = 


    }).catch(err => console.log('err', err))
  }, [])


  return (
    <div className="App">
      {teamArray[0] && teamArray.map((team, index) => {
        if (team.name !== 'No Team') {
          console.log(team)
          return (
            <div>
              {index + 1} - {team.name} - {team.total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </div>
          )
        }
      })}
      <br></br>
      {players[0] && players.map((player, index) => {

        if (leaderboard[player.Rank]) {
          return (
            <div>
              {player.Rank} - {player.Name} - {(leaderboard[player.Rank].cumPrize / leaderboard[player.Rank].count).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} ({teams[player.PlayerID]})
            </div>
          )
        } else {
          return (
            <div>
              {player.Rank} - {player.Name} - $0 ({teams[player.PlayerID]})
            </div>
          )
        }
      })}
      test
    </div>
  );
}

export default App;
