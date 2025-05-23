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
    // Étape 1 : charger les paires, récupérer les IDs, puis charger les joueurs
    const chargerDonnees = async () => {
      try {
        const pairesRes = await fetch(
          "http://localhost:5000/api/paires-mixtes"
        );
        const pairesData = await pairesRes.json();

        setPairesMixedList(pairesData);
        const ids = pairesData.flatMap((paire) => [
          paire.woman_id,
          paire.man_id,
        ]);
        setAssignedPlayerIds(ids);

        const playersRes = await fetch(
          "http://localhost:5000/api/players/disponibles?categorie=Double Mixte"
        );
        const playersData = await playersRes.json();
        setPlayers(playersData);
      } catch (err) {
        console.error("Erreur lors du chargement des données :", err);
      }
    };

    chargerDonnees();
  }, []);

  const assignedSet = new Set(assignedPlayerIds);

  const womenMixed = players.filter(
    (p) =>
      p.genre === "Femme" &&
      p.category.includes("Double Mixte") &&
      !assignedSet.has(p.id)
  );

  const menMixed = players.filter(
    (p) =>
      p.genre === "Homme" &&
      p.category.includes("Double Mixte") &&
      !assignedSet.has(p.id)
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
                <th className="text-left">Joueuse</th>
                <th>Département</th>
                <th>Catégorie (s)</th>
              </tr>
            </thead>
            <tbody>
              {womenMixed.map((p) => (
                <tr key={p.id}>
                  <td className="border-b-2 border-electric-blue pr-8">
                    {p.name}
                  </td>
                  <td className="border-b-2 border-electric-blue">
                    {p.department}
                  </td>
                  <td className="border-b-2 border-electric-blue">
                    {p.category.join(" / ")}
                  </td>

                  <input
                    type="radio"
                    name="woman"
                    value={p.id}
                    onChange={() =>
                      setPaireAConstituer((prev) => ({ ...prev, woman: p }))
                    }
                    className="appearance-none w-6 h-6 border-2 ml-4 mt-1 border-gunmetal rounded-sm checked:bg-chili-red hover:bg-red-300"
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
                <th></th>
                <th className="text-left">Joueur</th>
                <th>Département</th>
                <th>Catégorie (s)</th>
              </tr>
            </thead>
            <tbody>
              {menMixed.map((p) => (
                <tr key={p.id}>
                  <input
                    type="radio"
                    name="man"
                    value={p.id}
                    onChange={() =>
                      setPaireAConstituer((prev) => ({ ...prev, man: p }))
                    }
                    className="appearance-none w-6 h-6 border-2 mr-4 mt-1 border-gunmetal rounded-sm checked:bg-chili-red hover:bg-red-300"
                  />
                  <td className="border-b-2 border-electric-blue pr-8">
                    {p.name}
                  </td>
                  <td className="border-b-2 border-electric-blue">
                    {p.department}
                  </td>
                  <td className="border-b-2 border-electric-blue">
                    {p.category.join(" / ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* zone où se retrouvent les 2 joueurs à coupler */}
      </div>

      <div className="flex justify-around">
        <div className="pt-4 pl-4 pr-4 mt-20 ml-8 w-60 bg-gunmetal text-electric-blue font-medium rounded-lg">
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

        <div className="mt-20 bg-electric-blue w-1/3 rounded-lg">
          <h2 className="text-center">Liste des Paires en double mixte :</h2>
          <ul className="pl-2">
            {pairesMixedList.map((p) => (
              <li key={p.id}>
                {p.id}- {p.woman_name} ({p.woman_department}) | {p.man_name} (
                {p.man_department})
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button className="ml-4 mt-16">
        Retour vers la page de tous les Joueurs
      </button>
      <div>
        Est-ce qu'on mettrait pas un petit module avec sélection aléatoire des
        équipes ?
      </div>
    </div>
  );
};

export default DoubleMixte;
