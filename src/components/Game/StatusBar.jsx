export default function StatusBar({ round, score, total }) {
  return (
    <>
      <div className="mb-1">Round {round}/{total}</div>
      <div className="mb-4">Score: {score}</div>
    </>
  );
}
