import { React, useState, useEffect } from "react";

const Joueurs = () => {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  // Stocke la ou les catégories dans un tableau, et pas un texte seul
  const [category, setCategory] = useState([]);
  const [genre, setGenre] = useState();

  useEffect(() => {
    fetch("http://localhost:5000/api/players")
      .then((res) => res.json())
      .then(setPlayers);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, department, category }),
    });
    const newPlayer = await res.json();
    setPlayers([...players, newPlayer]);
    setName("");
    setDepartment("");
    setCategory([]);
    console.log(department);
    console.log(category);
  };

  // Mettre à jour le tableau des catégories à chaque fois qu'elles sont cochées
  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setCategory((prev) => [...prev, value]);
    } else {
      setCategory((prev) => prev.filter((v) => v !== value));
    }
  };

  return (
    <div>
      <h1>Joueurs</h1>
      {/* div qui prend la partie "Ajouter un joueur", et le tableau "Liste des inscrits" */}
      <div className="flex justify-around pt-10">
        <div className="flex flex-col items-center mb-15">
          <h2>Ajouter un joueur</h2>
          <form onSubmit={handleSubmit}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nom du joueur"
              className="mr-[10px] placeholder:text-gray-500 placeholder:text-xs text-sm h-7 w-60"
            />
            <input
              type="number"
              value={department}
              onChange={(e) => setDepartment(Number(e.target.value))}
              placeholder="Département"
              className="m-[10px] placeholder:text-gray-500 placeholder:text-xs text-sm h-7 w-24"
            />

            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="m-[10px] text-sm h-7 w-40"
            >
              <option value="">-- Genre --</option>
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
            </select>

            <div className="flex flex-col">
              <label>
                <input
                  type="checkbox"
                  value="Simple Dames"
                  checked={category.includes("Simple Dames")}
                  onChange={handleCheckboxChange}
                  className="mr-[1vh]"
                />
                Simple Dames
              </label>

              <label>
                <input
                  type="checkbox"
                  value="Simple Hommes"
                  checked={category.includes("Simple Hommes")}
                  onChange={handleCheckboxChange}
                  className="mr-[1vh]"
                />
                Simple Hommes
              </label>

              <label>
                <input
                  type="checkbox"
                  value="Double Mixte"
                  checked={category.includes("Double Mixte")}
                  onChange={handleCheckboxChange}
                  className="mr-[1vh]"
                />
                Double Mixte
              </label>

              <label>
                <input
                  type="checkbox"
                  value="Double Hommes"
                  checked={category.includes("Double Hommes")}
                  onChange={handleCheckboxChange}
                  className="mr-[1vh]"
                />
                Double Hommes
              </label>

              <label>
                <input
                  type="checkbox"
                  value="Double Dames"
                  checked={category.includes("Double Dames")}
                  onChange={handleCheckboxChange}
                  className="mr-[1vh]"
                />
                Double Dames
              </label>
            </div>

            {category.length > 0 ? (
              <button
                type="submit"
                className="text-lavender-blush bg-chili-red hover:bg-red-300 hover:text-gunmetal text-sm font-medium rounded-lg px-4 py-1.5 mt-4 mb-8"
              >
                Ajouter
              </button>
            ) : (
              <button
                type="submit"
                className="text-chili-red bg-lavender-blush text-sm font-medium rounded-lg px-4 py-1.5 mt-4 mb-8 border-2"
                disabled
              >
                Ajouter
              </button>
            )}
          </form>
        </div>

        <div>
          <h2>Liste de tous les joueurs inscrits</h2>
          <table className="columns-3">
            <thead>
              <tr>
                <th>Joueur</th>
                <th>Département</th>
                <th>Catégorie (s)</th>
              </tr>
            </thead>
            <tbody>
              {players.map((p) => (
                <tr key={p.id}>
                  <td className="border-b-2 border-non-photo-blue">{p.name}</td>{" "}
                  <td className="border-b-2 border-non-photo-blue">
                    {p.department}
                  </td>{" "}
                  <td className="border-b-2 border-non-photo-blue">
                    {p.category.join(" / ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Joueurs;
