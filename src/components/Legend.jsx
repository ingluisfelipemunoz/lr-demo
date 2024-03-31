export default function Legend({ children }) {
  return (
    <legend className="uppercase font-bold mb-2 text-sm border-b-3 border-black w-full">
      {children}
    </legend>
  );
}
