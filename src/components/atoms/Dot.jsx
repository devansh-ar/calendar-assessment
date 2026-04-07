export default function Dot({ color = "bg-amber-400" }) {
  return (
    <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${color}`} />
  );
}
