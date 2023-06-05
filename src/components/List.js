import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

import "./list.css";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

export default function List() {
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    getLists();
  }, []);

  async function getLists() {
    const { data } = await supabase.from("lists").select().order("created_at");
    setListItems(data);
  }

  async function handleCheck(event) {
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
                onChange={handleCheck}
              />
            </li>
          );
        })}
      </ul>
    </article>
  );
}
