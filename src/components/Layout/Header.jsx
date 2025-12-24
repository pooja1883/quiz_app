import { CatchingPokemon } from "@mui/icons-material";

export default function Header() {
  return (
    <header className="bg-dark text-white py-3 shadow-sm">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <CatchingPokemon
            style={{ fontSize: 36, color: "#ffcb05" }} // yellow accent (Pokémon vibe)
          />

          <h3 className="m-0 fw-bold">PokéPuzzle</h3>
        </div>
        </div>
    </header>
  );
}
