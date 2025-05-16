import React from "react";

const NvJoueurForm = ({
  handleSubmit,
  name,
  setName,
  department,
  setDepartment,
  category,
  handleCheckboxChange,
}) => {
  return (
    <div>
      <h1 className="font-morning text-4xl text-center">Joueurs</h1>
      <div className="flex flex-col items-center">
        <h2 className="font-morning text-2xl">Ajouter un joueur</h2>
        <form onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom du joueur"
            className="m-[10px] placeholder:text-gray-500 placeholder:text-xs"
          />
          <input
            type="number"
            value={department}
            onChange={(e) => setDepartment(Number(e.target.value))}
            placeholder="Département"
            className="m-[10px] placeholder:text-gray-500 placeholder:text-xs"
          />

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

          <button
            type="submit"
            className="text-lavender-blush bg-chili-red hover:bg-red-300 hover:text-gunmetal text-sm font-medium rounded-lg px-4 py-1.5 mb-2"
          >
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

export default NvJoueurForm;
