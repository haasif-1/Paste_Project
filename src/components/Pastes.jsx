import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../css/Pastes.module.css";
import { Link } from "react-router-dom";
import { removeFromPaste } from "../features/pasteSlice";
import toast from "react-hot-toast";

const Pastes = () => {
  const allPastes = useSelector((state) => state.paste.pastes);
  const [searchInput, setSearchInput] = useState("");

  const filteredPastes = allPastes.filter(
    (paste) =>
      paste.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      paste.content.toLowerCase().includes(searchInput.toLowerCase())
  );
  const dispatch = useDispatch();

  function handleDelete(id) {
    dispatch(removeFromPaste(id));
    toast.success("Paste deleted successfully");
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch (err) {
      toast.error("Copy failed");
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search question here..."
        className={styles.search}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <h1 className={styles.heading}>All Pastes</h1>

      {filteredPastes.map((paste) => (
        <div key={paste._id} className={styles.card}>
          <div className={styles.left}>
            <h2>{paste.title}</h2>
            <p>{paste.content}</p>
          </div>

          <div className={styles.right}>
            <div className={styles.actions}>
              <Link to={`/?id=${paste._id}`}>✏️</Link>
              <button onClick={() => handleDelete(paste._id)}>🗑️</button>
              <Link to={`/paste/${paste._id}`}>👁️</Link>
              <button onClick={() => copyToClipboard(paste.content)}>📋</button>
            </div>

            <div className={styles.date}>
              📅 {new Date(paste.createdAt).toLocaleDateString()}
            </div>

            <span className={styles.code}>CODE</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Pastes;
