import React from "react";
import { useState } from "react";

import { HamsterModel } from "../../models/HamsterModel";

interface Props {
  hamster: HamsterModel;
}
// Remove the Hamster

const HamsterCard = ({ hamster }: Props) => {
  async function deleteAHamster(id: string) {
    await fetch(`/hamsters/${id}`, { method: "DELETE" });
    window.location.reload();
  }

  return (
    <div className="wrapper-gallery">
      <section>
        <div className="hamsterinfo">
          {hamster.imgName && (
            <img src={`/img/${hamster.imgName}`} alt="Bild på hamster" />
          )}
          {hamster.name}
          <p>
            <b>Hobby: </b>
            {hamster.loves}
          </p>
          <p>
            <b>Favoritmat: </b>
            {hamster.favFood}
          </p>
          <button onClick={() => deleteAHamster(hamster.id)}>
            Remove Hamster
          </button>
        </div>
      </section>
    </div>
  );
};
export default HamsterCard;
