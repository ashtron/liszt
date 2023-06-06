export default function NewItemInput({ handleKeyDown, handleChange, newItemContent }) {
  return (
    <input
      type="text"
      autoFocus
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      value={newItemContent}
    ></input>
  );
}
