import { FormEvent, useState } from "react";
import { useRecoilState } from "recoil";
import allHams from "../../atoms/allHams";
import { HamsterModel } from "../../models/HamsterModel";
import { fixUrl } from "../../utils";
import styles from "../../styles/posthams.module.css";


const PostHamster = () => {
  const [name, setName] = useState<string>('')
  const [age, setAge] = useState<string>('')
  const [favFood, setFavFood] = useState<string>('')
  const [loves, setLoves] = useState<string>('')
  const [imgName, setImgName] = useState<string>('')
  const [data, setData] = useRecoilState<HamsterModel[]>(allHams);

  const newHamster: HamsterModel = {
    name: name,
    age: Number(age),
    favFood: favFood,
    loves: loves,
    imgName: imgName,
    wins: 0,
    defeats: 0,
    games: 0,
    result: 0,
    id: ''
  }

  const nameIsValid = newHamster.name !== ''
  const ageIsValid = newHamster.age >= 1 && Number.isInteger(newHamster.age) === true
  const favFoodIsValid = newHamster.favFood !== ''
  const lovesIsValid = newHamster.loves !== ''
  const imgNameIsValid = newHamster.imgName !== ''
  const formIsValid = nameIsValid && ageIsValid && favFoodIsValid && lovesIsValid && imgNameIsValid


  const handleAddHamster = async () => {

    const response: Response = await fetch(fixUrl('/hamsters'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newHamster)
    })
    if (response.status === 200) {
      async function getData() {
        const response: Response = await fetch(fixUrl('/hamsters/'))
        const apiData: any = await response.json()

        setData(apiData as HamsterModel[])
      }
      getData()
    }
    setName('')
    setAge('')
    setFavFood('')
    setLoves('')
    setImgName('')

  }
  function onClickPrevDefault(e: FormEvent<HTMLFormElement>, data: HamsterModel[]): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <section>
        <form onSubmit={(e) => onClickPrevDefault(e, data)}>
          <input
            className={styles.forms}
            type="text"
            placeholder="Name"
            value={name}
            onChange={event => setName(event.target.value)}

          />
          <input
            className={styles.forms}
            type="number"
            placeholder="Age"
            value={age}
            onChange={event => setAge(event.target.value)}
          />
          <input
            className={styles.forms}
            type="text"
            placeholder="Food"
            value={favFood}
            onChange={event => setFavFood(event.target.value)}

          />
          <input
            className={styles.forms}
            type="text"
            placeholder="Loves"
            value={loves}
            onChange={event => setLoves(event.target.value)}

          />
          <input
            className={styles.forms}
            type="text"
            placeholder="Picture"
            value={imgName}
            onChange={event => setImgName(event.target.value)}
          />
          <button className={styles.forms} disabled={!formIsValid} onClick={handleAddHamster}>
            Add a hamster
          </button>
        </form>
      </section>
    </div>
  );
};

export default PostHamster;
