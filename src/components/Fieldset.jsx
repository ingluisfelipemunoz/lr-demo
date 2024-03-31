import Legend from "./Legend";
export default function Fieldset({ text, children }) {
  return (
    <fieldset className="border-2 border-black p-1">
      <Legend>{text}</Legend>
      {children}
    </fieldset>
  );
}
