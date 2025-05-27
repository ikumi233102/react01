import React, { useState, useEffect } from 'react';

export const App = () => {
  const [films, setFilms] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [starships, setStarships] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [selectedStarship, setSelectedStarship] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/films/");
        if (!response.ok) throw new Error("映画情報の取得に失敗しました");
        const data = await response.json();
        setFilms(data.results);
      } catch (err) {
        setError(err);
      }
    };
    fetchFilms();
  }, []);

  const loadAdditionalData = async (filmUrl) => {
    try {
      const filmResponse = await fetch(filmUrl);
      const filmData = await filmResponse.json();

      const [charactersData, planetsData, starshipsData, vehiclesData] = await Promise.all([
        Promise.all(filmData.characters.map(url => fetch(url).then(res => res.json()))),
        Promise.all(filmData.planets.map(url => fetch(url).then(res => res.json()))),
        Promise.all(filmData.starships.map(url => fetch(url).then(res => res.json()))),
        Promise.all(filmData.vehicles.map(url => fetch(url).then(res => res.json())))
      ]);

      setCharacters(charactersData);
      setPlanets(planetsData);
      setStarships(starshipsData);
      setVehicles(vehiclesData);

      setSelectedCharacter(charactersData[0] || null);
      setSelectedPlanet(planetsData[0] || null);
      setSelectedStarship(starshipsData[0] || null);
      setSelectedVehicle(vehiclesData[0] || null);
    } catch (err) {
      setError(err);
    }
  };

  const handleFilmSelect = (e) => {
    const selectedFilmUrl = e.target.value;
    const selectedFilmData = films.find(film => film.url === selectedFilmUrl);
    setSelectedFilm(selectedFilmData);
    loadAdditionalData(selectedFilmUrl);
  };

  const handleSelectChange = (e, type) => {
    const value = e.target.value;
    if (type === "character") setSelectedCharacter(characters.find(c => c.url === value));
    if (type === "planet") setSelectedPlanet(planets.find(p => p.url === value));
    if (type === "starship") setSelectedStarship(starships.find(s => s.url === value));
    if (type === "vehicle") setSelectedVehicle(vehicles.find(v => v.url === value));
  };

  if (error) return <p style={{ color: "red" }}>エラー: {error.message}</p>;
  if (!films.length) return <p>映画情報を読み込み中...</p>;

  return (
    <div className="p-6 font-sans space-y-4">
      <h1 className="text-2xl font-bold">映画情報</h1>
      <select onChange={handleFilmSelect} className="border p-2 rounded">
        <option value="">映画を選択</option>
        {films.map(film => (
          <option key={film.url} value={film.url}>{film.title}</option>
        ))}
      </select>

      {selectedFilm && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">{selectedFilm.title} (エピソード {selectedFilm.episode_id})</h2>
            <p><strong>監督:</strong> {selectedFilm.director}</p>
            <p><strong>プロデューサー:</strong> {selectedFilm.producer}</p>
            <p><strong>公開日:</strong> {selectedFilm.release_date}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">オープニング</h3>
            <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{selectedFilm.opening_crawl}</pre>
          </div>

          <div>
            <h3 className="text-lg font-semibold">登場キャラクター</h3>
            <select onChange={(e) => handleSelectChange(e, "character")} className="border p-2 rounded">
              <option value="">キャラクターを選択</option>
              {characters.map(char => (
                <option key={char.url} value={char.url}>{char.name}</option>
              ))}
            </select>
            {selectedCharacter && (
              <div className="bg-gray-50 p-3 rounded">
                <h4 className="font-bold">{selectedCharacter.name}</h4>
                <p><strong>身長:</strong> {selectedCharacter.height} cm</p>
                <p><strong>体重:</strong> {selectedCharacter.mass} kg</p>
                <p><strong>髪の色:</strong> {selectedCharacter.hair_color}</p>
                <p><strong>肌の色:</strong> {selectedCharacter.skin_color}</p>
                <p><strong>目の色:</strong> {selectedCharacter.eye_color}</p>
                <p><strong>誕生日:</strong> {selectedCharacter.birth_year}</p>
                <p><strong>性別:</strong> {selectedCharacter.gender}</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold">登場惑星</h3>
            <select onChange={(e) => handleSelectChange(e, "planet")} className="border p-2 rounded">
              <option value="">惑星を選択</option>
              {planets.map(planet => (
                <option key={planet.url} value={planet.url}>{planet.name}</option>
              ))}
            </select>
            {selectedPlanet && (
              <div className="bg-gray-50 p-3 rounded">
                <h4 className="font-bold">{selectedPlanet.name}</h4>
                <p><strong>気候:</strong> {selectedPlanet.climate}</p>
                <p><strong>重力:</strong> {selectedPlanet.gravity}</p>
                <p><strong>表面水:</strong> {selectedPlanet.surface_water}</p>
                <p><strong>人口:</strong> {selectedPlanet.population}</p>
                <p><strong>地形:</strong> {selectedPlanet.terrain}</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold">登場スターシップ</h3>
            <select onChange={(e) => handleSelectChange(e, "starship")} className="border p-2 rounded">
              <option value="">スターシップを選択</option>
              {starships.map(starship => (
                <option key={starship.url} value={starship.url}>{starship.name}</option>
              ))}
            </select>
            {selectedStarship && (
              <div className="bg-gray-50 p-3 rounded">
                <h4 className="font-bold">{selectedStarship.name}</h4>
                <p><strong>モデル:</strong> {selectedStarship.model}</p>
                <p><strong>メーカー:</strong> {selectedStarship.manufacturer}</p>
                <p><strong>最大速度:</strong> {selectedStarship.max_atmosphering_speed} km/h</p>
                <p><strong>乗員数:</strong> {selectedStarship.crew}</p>
                <p><strong>乗客数:</strong> {selectedStarship.passengers}</p>
                <p><strong>貨物容量:</strong> {selectedStarship.cargo_capacity} kg</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold">登場ビークル</h3>
            <select onChange={(e) => handleSelectChange(e, "vehicle")} className="border p-2 rounded">
              <option value="">ビークルを選択</option>
              {vehicles.map(vehicle => (
                <option key={vehicle.url} value={vehicle.url}>{vehicle.name}</option>
              ))}
            </select>
            {selectedVehicle && (
              <div className="bg-gray-50 p-3 rounded">
                <h4 className="font-bold">{selectedVehicle.name}</h4>
                <p><strong>モデル:</strong> {selectedVehicle.model}</p>
                <p><strong>メーカー:</strong> {selectedVehicle.manufacturer}</p>
                <p><strong>最大速度:</strong> {selectedVehicle.max_atmosphering_speed} km/h</p>
                <p><strong>乗員数:</strong> {selectedVehicle.crew}</p>
                <p><strong>乗客数:</strong> {selectedVehicle.passengers}</p>
                <p><strong>貨物容量:</strong> {selectedVehicle.cargo_capacity} kg</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};