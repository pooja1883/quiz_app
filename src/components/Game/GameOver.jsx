export default function GameOver({ score, reset }) {
  return (
    <div className="app-container d-flex flex-column justify-content-center align-items-center p-4">
      <h1 className="display-5 fw-bold mb-3">Game Over!</h1>
      <p className="fs-3 mb-4">Score: {score}/10</p>

      <button className="btn btn-success btn-lg" onClick={reset}>
        Play Again
      </button>
    </div>
  );
}
