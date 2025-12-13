import "./meteors.css";

export function Meteors({ number = 20 }: { number?: number }) {
  const meteors = new Array(number).fill(null);

  return (
    <>
      {meteors.map((_, idx) => (
        <span
          key={idx}
          className="meteor"
          style={{
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            animationDelay: Math.random() * 2 + "s",
            animationDuration: 2 + Math.random() * 2 + "s",
          }}
        />
      ))}
    </>
  );
}