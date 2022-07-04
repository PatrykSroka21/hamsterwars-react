import { useEffect, useState } from 'react'
import { HamsterModel } from "../models/HamsterModel";
import { fixUrl, picImport } from '../utils';
import styles from "../styles/start.module.css";


const Start = () => {
  const [cutest, setCutest] = useState<HamsterModel[] | null>(null)
  useEffect(() => {
    async function getCutest() {
      try {
        const response: Response = await fetch(fixUrl('/hamsters/cutest'))
        const CutestData: HamsterModel[] = await response.json()
        console.log(CutestData)
        if (CutestData.length > 1) {
          const randomCutest = []
          randomCutest.push(CutestData[Math.floor(Math.random() * CutestData.length)])
          setCutest(randomCutest)
          return
        } else {
          setCutest(CutestData)
        }
      } catch (error) {
        return error
      }
		}
    getCutest()
  }, [])

  return (
    <><section className={styles.container}>
      <main className={styles.flexbox}>
        <article>
          <h1>Welcome!</h1>
          <p>
            You just landed on the hamsterwars main page see the cutest hamster
            , let the battle begin to determin the cutest hamster and view the
            gallery to see all the hamsters add your own hamster or delete any
            hamster from our collection. 
            <br />
          
            Explore the Hamster's universe and see what you can find!!
          </p>
        </article>


        {cutest
          ? cutest.map((hamster) => (
            <section className={styles.card} key={Math.random() + hamster.id}>
              <img
                src={picImport(hamster.imgName)}
                alt={hamster.name}
                className="card__img" />

              <div className={styles.card__body}>
                <h2>{hamster.name} is the cutest hamster!<p> Total Wins: {hamster.wins}!</p> </h2>

              </div>
            </section>
          ))
          : "Loading..."}
      </main>
    </section>
    <footer className={styles.footer}>
      </footer></>
  );
};


export default Start;
