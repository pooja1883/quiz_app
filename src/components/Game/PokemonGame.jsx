import { useEffect, useState } from "react";
import { saveState, loadState, clearState } from "../../storage";

import StatusBar from "./StatusBar";
import Loader from "./Loader";
import PokemonImage from "./PokemonImage";
import Choices from "./Choices";
import GameOver from "./GameOver";

const TOTAL = 10;

export default function PokemonGame() {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [choices, setChoices] = useState([]);
  const [correct, setCorrect] = useState(null);
  const [selected, setSelected] = useState(null);
  const [sprite, setSprite] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = loadState();
    if (saved) {
      setRound(saved.round);
      setScore(saved.score);
      setChoices(saved.choices);
      setCorrect(saved.correct);
      setSelected(saved.selected);
      setSprite(saved.sprite);
      setLoading(false);
    } else {
      generateQuestion();
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      saveState({ round, score, choices, correct, selected, sprite });
    }
  }, [round, score, choices, correct, selected, sprite, loading]);

  async function generateQuestion() {
    setLoading(true);
    setSelected(null);

    const ids = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 300) + 1
    );

    try {
      const results = await Promise.all(
        ids.map((id) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((r) =>
            r.json()
          )
        )
      );

      const mapped = results.map((p) => ({
        name: p.name,
        sprite: p.sprites.other["official-artwork"].front_default,
      }));

      const correctIndex = Math.floor(Math.random() * 4);

      setCorrect(mapped[correctIndex].name);
      setSprite(mapped[correctIndex].sprite);
      setChoices(mapped.map((m) => m.name));
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  }

  function handleAnswer(name) {
    setSelected(name);
    if (name === correct) setScore((s) => s + 1);
  }

  function next() {
    if (round === TOTAL) return;
    setRound((r) => r + 1);
    generateQuestion();
  }

  function reset() {
    clearState();
    setRound(1);
    setScore(0);
    setSelected(null);
    generateQuestion();
  }

  if (round > TOTAL) {
    return <GameOver score={score} reset={reset} />;
  }

  return (
    <div className="app-container d-flex flex-column align-items-center p-4">
      <h1 className="fw-bold mt-2 mb-3">Who’s That Pokémon?</h1>

      <StatusBar round={round} score={score} total={TOTAL} />

      {loading ? (
        <Loader />
      ) : (
        <>
          <PokemonImage sprite={sprite} />

          <Choices
            choices={choices}
            correct={correct}
            selected={selected}
            handleAnswer={handleAnswer}
          />

          {selected && (
            <button
              className="btn btn-primary mt-4"
              onClick={round === TOTAL ? () => setRound(round + 1) : next}
            >
              Next Question
            </button>
          )}
        </>
      )}
    </div>
  );
}
