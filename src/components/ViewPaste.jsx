import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../css/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const ViewPaste = () => {
  const allPastes = useSelector((state) => state.paste.pastes);

  const { id } = useParams();

  const paste = allPastes.find((p) => p._id === id);

  const copyContent = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Content copied");
    } catch {
      toast.error("Copy failed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <input
          type="text"
          placeholder="Enter Title"
          value={paste ? paste.title : ""}
          disabled
          className={`${styles.input} ${styles.titleInput}`}
        />
      </div>

      {/* TEXTAREA + COPY ICON */}
      <div className={styles.textareaWrapper}>
        <textarea
          placeholder="Enter your paste content here..."
          rows={20}
          disabled
          value={paste ? paste.content : ""}
          className={styles.textarea}
        />

        {/* COPY ICON */}
        <button
          className={styles.copyBtn}
          onClick={() => copyContent(paste?.content)}
          title="Copy content"
        >
          📋
        </button>
      </div>
    </div>
  );
};

export default ViewPaste;
