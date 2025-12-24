export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-auto py-3">
      <div className="container text-center">
        <small>
          © {new Date().getFullYear()} PokéPuzzle. All rights reserved.
        </small>
      </div>
    </footer>
  );
}
