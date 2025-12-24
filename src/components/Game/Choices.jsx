export default function Choices({
  choices,
  correct,
  selected,
  handleAnswer,
}) {
  return (
    <div className="row g-3 w-100" style={{ maxWidth: 420 }}>
      {choices.map((name) => {
        let cls = "btn btn-secondary btn-answer";

        if (selected) {
          if (name === correct) cls = "btn btn-success btn-answer";
          else if (name === selected) cls = "btn btn-danger btn-answer";
        }

        return (
          <div className="col-6" key={name}>
            <button
              disabled={!!selected}
              onClick={() => handleAnswer(name)}
              className={cls}
              style={{ width: "100%", textTransform: "capitalize" }}
            >
              {name}
            </button>
          </div>
        );
      })}
    </div>
  );
}
