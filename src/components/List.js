import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

import "./list.css";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

export default function List() {
  const [listItems, setListItems] = useState([]);
  const [addingItem, setAddingItem] = useState(false);
  const [newItemContent, setNewItemContent] = useState("");

  useEffect(() => {
    getLists();
  }, []);

  async function getLists() {
    const { data } = await supabase.from("lists").select().order("created_at");
    setListItems(data);
  }

  async function handleChange(event) {
    event.preventDefault();

    const id = event.target.id;

    const listItem = listItems.filter((listItem) => {
      return listItem.id === id;
    })[0];

    await supabase
      .from("lists")
      .update({ ...listItem, checked: !listItem.checked })
      .eq("id", id);

    getLists();
  }

  async function handleClick(event) {
    event.preventDefault();

    setAddingItem(true);
  }

  async function handleKeyDown(event) {
    if (event.keyCode === 13) {
      const newListItem = {
        content: event.target.value,
        checked: false,
      };

      await supabase.from("lists").insert([newListItem]);

      setAddingItem(false);
      getLists();
    }
  }

  function handleNewInputChange(event) {
    event.preventDefault();

    setNewItemContent(event.target.value);
  }

  return (
    <article>
      <header>Todos</header>
      <ul>
        {listItems.map((listItem) => {
          return (
            <li key={listItem.id}>
              {listItem.content}
              <input
                type="checkbox"
                name={listItem.content}
                id={listItem.id}
                checked={listItem.checked}
                onChange={handleChange}
              />
            </li>
          );
        })}
        {addingItem ? (
          <input
            type="text"
            autoFocus
            onKeyDown={handleKeyDown}
            onChange={handleNewInputChange}
            value={newItemContent}
          ></input>
        ) : (
          ""
        )}
      </ul>
      <footer>
        <button onClick={handleClick}>+</button>
      </footer>
    </article>
  );
}
