import Generator from "./components/Generator";
import "./App.css";

const App = () => {
  return (
    <>
      <div className="intro">
        <h1>Veni Vici!</h1>
        <h3>Discover cats from your wildest dreams!</h3>
      </div>

      <Generator />
    </>
  );
};

export default App;
