export default function Checkbox({ listItem, handleChange }) {
  return (
    <input
      type="checkbox"
      name={listItem.content}
      id={listItem.id}
      checked={listItem.checked}
      onChange={handleChange}
    />
  );
}
