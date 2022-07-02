import PostHamster from "./PostHams";
import GalleryCard from "./GalleryCard";
import { fixUrl, picImport } from "../../utils"
import styles from "../../styles/gallery.module.css";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import allHams from "../../atoms/allHams";
import { HamsterModel } from "../../models/HamsterModel";


const Gallery = () => {
  const [data, setData] = useRecoilState<HamsterModel[]>(allHams);
  const [toggle, setToggle] = useState<boolean>(false);
  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(fixUrl("/hamsters/"));
      const apiData: any = await response.json();

      setData(apiData as HamsterModel[]);
    }
    getData();
    console.log(data);
  }, []);
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>Add another warrior to the arena?</h2>
        <h3>
          by fill in all information needed you can add new hamseter to the game{" "}
        </h3>

        <button onClick={() => setToggle(!toggle)}>
          Click Her To Add A New Hamster
        </button>
        {toggle && <PostHamster />}
      </header>
      <main className={styles.main}>
        <div className={styles.wrapper}>
          {data
            ? data.map((hamster) => (
                <GalleryCard
                  hamster={hamster}
                  key={Math.floor(Math.random() * 100) + hamster.id}
                />
              ))
            : "Loading"}
        </div>
      </main>
    </div>
  );
};

export default Gallery;
