import { useEffect, useState } from "react";
import axios from "axios";

const Generator = () => {
  const URL =
    "https://api.thecatapi.com/v1/images/search?has_breeds=1&api_key=live_FBcWiq7ShR1SNrp23RX0Yb7kdoYKL3UawBgr2ZdSMYiQxdGk0t4FvKcFAbXN153H&";
  const [catinfo, setCat] = useState([]);
  const [showCat, setShowCat] = useState(false);
  const [banList, setBanList] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(URL);
      console.log("Fetched data:", res.data);
      const filteredData = res.data.filter((cat) => {
        const bannedBreeds = banList.map((bannedBreed) => bannedBreed);
        console.log("Banned breeds:", bannedBreeds);
        return !bannedBreeds.some((bannedBreed) =>
          cat.breeds.some((breed) => breed.name === bannedBreed)
        );
      });
      console.log("Filtered data:", filteredData);
      if (filteredData.length > 0) {
        setCat(filteredData);
        setShowCat(true);
      } else {
        alert("No suitable images found. Please adjust your ban list.");
      }
    } catch (error) {
      console.error("Error fetching cat data:", error);
    }
  };

  const addToBanList = (attribute) => {
    setBanList([...banList, attribute]);
    console.log("Adding to ban list:", banList);
  };

  const removeFromBanList = (attribute) => {
    setBanList(banList.filter((item) => item !== attribute));
  };

  console.log(catinfo);
  return (
    <div>
      <div className="banlist">
        <h2>Ban List</h2>
        <h3>Select an attribute in your listing to ban it</h3>
        {banList.map((attribute, index) => (
          <button key={index} onClick={() => removeFromBanList(attribute)}>
            {attribute}
          </button>
        ))}
      </div>
      <div className="generate">
        <button onClick={fetchData} className="discover">
          Discover
        </button>
        {showCat && (
          <div className="cat-info">
            <h2>{catinfo[0].breeds[0].name}</h2>
            <div className="attr">
              <button onClick={() => addToBanList(catinfo[0].breeds[0].name)}>
                {catinfo[0].breeds[0].name}
              </button>
              <button>{catinfo[0].breeds[0].weight.imperial} lbs</button>
              <button>{catinfo[0].breeds[0].origin}</button>
              <button>{catinfo[0].breeds[0].life_span} years</button>
            </div>

            <img src={catinfo[0].url} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Generator;
