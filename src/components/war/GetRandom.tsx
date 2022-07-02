import { useEffect, useState } from "react";
import { HamsterModel } from "../../models/HamsterModel";
import { fixUrl, picImport } from "../../utils";
import styles from "../../styles/getrandom.module.css";

const GetRandom = () => {

  const [hamsOne, sethamsOne] = useState<null | HamsterModel>(null)
  const [hamsTwo, sethamsTwo] = useState<null | HamsterModel>(null)
  const [wins, setwins] = useState<null | HamsterModel>(null)
  const [lost, setlost] = useState<null | HamsterModel>(null)
  const [wellPlayed, setwellPlayed] = useState<boolean>(false)
  const [wellPlayed1, setwellPlayed1] = useState<boolean>(false)


  const winningHamsOne = () => {

    if (hamsOne != null) {
      let newWins = hamsOne.wins + 1
      let newGames = hamsOne.games + 1
      let newResult = hamsOne.wins - hamsOne.defeats

      const getWins = {
        ...hamsOne,
        wins: newWins,
        games: newGames,
        result: newResult
      }

      setwins(getWins)
      setwellPlayed(true)

      fetch(fixUrl(`/hamsters/${hamsOne.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(getWins),
      })

    }

    if (hamsTwo != null) {
      let newDefeats = hamsTwo.defeats + 1
      let newGames = hamsTwo.games + 1
      let newResult = hamsTwo.wins - hamsTwo.defeats

      const getLost = {
        ...hamsTwo,
        defeats: newDefeats,
        games: newGames,
        result: newResult
      }
      setlost(getLost)

      fetch(fixUrl(`/hamsters/${hamsTwo.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(getLost),
      })

    }
  }

  const winningHamsTwo = () => {
    console.log('second wins')

    if (hamsTwo != null) {
      let newWins = hamsTwo.wins + 1
      let newGames = hamsTwo.games + 1
      let newResult = hamsTwo.wins - hamsTwo.defeats

      const getWins = {
        ...hamsTwo,
        wins: newWins,
        games: newGames,
        result: newResult
      }
      setwins(getWins)
      setwellPlayed1(true)

      fetch(fixUrl(`/hamsters/${hamsTwo.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(getWins),

      })

    }
    if (hamsOne != null) {
      let newDefeats = hamsOne.defeats + 1
      let newGames = hamsOne.games + 1
      let newResult = hamsOne.wins - hamsOne.defeats

      const getLost = {
        ...hamsOne,
        defeats: newDefeats,
        games: newGames,
        result: newResult
      }
      setlost(getLost)

      fetch(fixUrl(`/hamsters/${hamsOne.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(getLost),

      })
    }
  }

  const NewBattle = () => {
    window.location.reload();
  }
  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(fixUrl('/hamsters/random'))
      const apiData: any = await response.json()

      sethamsOne(apiData as HamsterModel)
    }
    getData()

  }, [])
  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(fixUrl('/hamsters/random'))
      const apiData: any = await response.json()

      sethamsTwo(apiData as HamsterModel)
    }
    getData()

  }, [])

  return (
    <div className={styles.battle}>
      <p className={styles.message}>Choose the cutest hamster by clicking on
      the vote button</p>
      <div className={styles.voting}>

        {hamsOne && hamsTwo ?
          <div className={styles.hamster1}>
            <img className={styles.size} src={picImport(hamsTwo.imgName)} />
            <h3 className={styles.text}>My name is {hamsTwo.name} and I'm {hamsTwo.age}yrs old</h3>
            {wellPlayed1 ? <div>
              <p>wins {wins?.wins} losts {wins?.defeats}</p> </div> : null}
            {wellPlayed ? <div>
              <p>wins {lost?.wins} losts {lost?.defeats}</p> </div> : null}

            <button className={styles.vote} disabled={wellPlayed || wellPlayed1}
             onClick={winningHamsTwo}>Vote for me!</button>
          </div> : <p>waiting for next</p>
        }

{hamsOne && hamsTwo ?
          <div className={styles.hamster2}>
            <img className={styles.size} src={picImport(hamsOne.imgName)} />
            <h3 className={styles.text}>My name is {hamsOne.name} and I'm {hamsOne.age}yrs old</h3>
            {wellPlayed ? <div>
              <p>Wins {wins?.wins} Losts {wins?.defeats}</p> </div> : null}
            {wellPlayed1 ? <div>
              <p>Wins {lost?.wins} Losts {lost?.defeats}</p> </div> : null}

            <button className={styles.vote} disabled={wellPlayed || wellPlayed1} onClick={winningHamsOne}>Vote for me!</button>
          </div> : <p>waiting for the next</p>
        }
      </div>

      {wins != null ?
        <div className={styles.winninghamster}>
          <p> 🏆The winner is {wins.name} 🏆
          <br /> Total victory-{wins.wins} <br />Total defeats-{wins.defeats} <br />Total matches-{wins.games} </p>
          <button className={styles.newbattle}onClick={NewBattle}>Start a new match</button>
        </div>
        : <p></p>}
    </div>
  )
}
export default GetRandom;
