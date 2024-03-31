import TextUtil from "../utilities/text.util";
const classes =
  "input bg-stone-300 rounded-md p-2 text-base text-stone-900 font-medium mr-2";
const classes2 = classes + " w-5/6";
export default function Input({ name, label, textarea = false, ...props }) {
  if (!label) label = TextUtil.camelCaseToSpaces(name);
  return (
    <div className="mb-4 b-2">
      <label
        htmlFor={name}
        className="block text-sm uppercase font-medium text-gray-700"
      >
        {label}
      </label>
      {textarea ? (
        <textarea name={name} className={classes2} {...props} />
      ) : (
        <input name={name} className={classes} {...props} />
      )}
    </div>
  );
}
