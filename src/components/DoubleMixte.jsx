import { React, useState, useEffect } from "react";

const DoubleMixte = () => {
  const [players, setPlayers] = useState([]);
  const [paireAConstituer, setPaireAConstituer] = useState({
    woman: null,
    man: null,
  });
  const [pairesMixedList, setPairesMixedList] = useState([]);
  const [assignedPlayerIds, setAssignedPlayerIds] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/players")
      .then((res) => res.json())
      .then(setPlayers);
  }, []);

  const womenMixed = players.filter(
    (player) =>
      player.genre === "Femme" &&
      player.category.includes("Double Mixte") &&
      !assignedPlayerIds.includes(player.id)
  );

  const menMixed = players.filter(
    (player) =>
      player.genre === "Homme" &&
      player.category.includes("Double Mixte") &&
      !assignedPlayerIds.includes(player.id)
  );

  //   ajout des paires constituées dans le tableau des paires
  const addMixedPaire = async () => {
    if (!paireAConstituer.woman || !paireAConstituer.man) {
      alert("Merci de sélectionner une femme et un homme !");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/paires-mixtes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          woman_id: paireAConstituer.woman.id,
          man_id: paireAConstituer.man.id,
        }),
      });

      setAssignedPlayerIds((prev) => [
        ...prev,
        paireAConstituer.woman.id,
        paireAConstituer.man.id,
      ]);

      if (res.ok) {
        const data = await res.json();
        console.log("Paire ajoutée avec ID :", data.id);

        // Recharge les paires enregistrées
        fetch("http://localhost:5000/api/paires-mixtes")
          .then((res) => res.json())
          .then(setPairesMixedList);

        // Réinitialise la sélection
        setPaireAConstituer({ woman: null, man: null });
      } else {
        console.error("Erreur lors de l'enregistrement");
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/paires-mixtes")
      .then((res) => res.json())
      .then((data) => {
        setPairesMixedList(data);
        const ids = data.flatMap((paire) => [paire.woman_id, paire.man_id]);
        setAssignedPlayerIds(ids);
      });
  }, []);

  return (
    <div>
      <h1>Double Mixte</h1>
      <h2>Constituer les paires</h2>
      {/* div qui contient 2 blocs: chq fois, une div le sous-titre + le tableau */}
      <div className="flex justify-around">
        <div className="flex flex-col">
          <div className="font-morning text-2xl">Les meufs</div>

          <table className="columns-3">
            <thead>
              <tr>
                <th>Joueuse</th>
                <th>Département</th>
                <th>Catégorie (s)</th>
              </tr>
            </thead>
            <tbody>
              {womenMixed.map((p) => (
                <tr key={p.id}>
                  <td className="border-b-2 border-non-photo-blue">{p.name}</td>
                  <td className="border-b-2 border-non-photo-blue">
                    {p.department}
                  </td>
                  <td className="border-b-2 border-non-photo-blue">
                    {p.category.join(" / ")}
                  </td>{" "}
                  <input
                    type="radio"
                    name="woman"
                    value={p.id}
                    onChange={() =>
                      setPaireAConstituer((prev) => ({ ...prev, woman: p }))
                    }
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col">
          <div className="font-morning text-2xl">Les gars</div>

          <table className="columns-3">
            <thead>
              <tr>
                <th>Joueur</th>
                <th>Département</th>
                <th>Catégorie (s)</th>
              </tr>
            </thead>
            <tbody>
              {menMixed.map((p) => (
                <tr key={p.id}>
                  <td className="border-b-2 border-non-photo-blue">{p.name}</td>
                  <td className="border-b-2 border-non-photo-blue">
                    {p.department}
                  </td>
                  <td className="border-b-2 border-non-photo-blue">
                    {p.category.join(" / ")}
                  </td>
                  <input
                    type="radio"
                    name="man"
                    value={p.id}
                    onChange={() =>
                      setPaireAConstituer((prev) => ({ ...prev, man: p }))
                    }
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* zone où se retrouvent les 2 joueurs à coupler */}
      </div>
      <div className="pt-4 pl-4 pr-4 mt-20 ml-8 w-60 bg-gunmetal text-non-photo-blue font-medium rounded-lg">
        <h3 className="font-morning text-3xl mb-4">Joueurs sélectionnés :</h3>
        <div>
          <p className="flex">
            <p className="text-yellow-400 pr-2">
              <i class="fa-solid fa-venus"></i>
            </p>
            {paireAConstituer.woman?.name || "Aucune sélectionnée"}
          </p>

          <p className="flex">
            <p className="text-yellow-400 pr-2">
              <i class="fa-solid fa-mars"></i>
            </p>
            {paireAConstituer.man?.name || "Aucun sélectionné"}
          </p>
        </div>
        <button onClick={addMixedPaire} className="mt-8">
          Paire OK
        </button>
      </div>

      <div>
        <h2>Liste des Paires en double mixte :</h2>
        <ul>
          {pairesMixedList.map((p) => (
            <li key={p.id}>
              {p.woman_name} ({p.woman_department}) | {p.man_name} (
              {p.man_department})
            </li>
          ))}
        </ul>
      </div>

      <div>
        Est-ce qu'on mettrait pas un petit module avec sélection aléatoire des
        équipes ?
      </div>
    </div>
  );
};

export default DoubleMixte;
