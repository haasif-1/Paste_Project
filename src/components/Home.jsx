import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../css/Home.module.css";
import { addToPaste, updateToPaste } from "../features/pasteSlice";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");

  const allPastes = useSelector((state) => state.paste.pastes);

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      const pasteToEdit = allPastes.find((paste) => paste._id === id);
      if (pasteToEdit) {
        setTitle(pasteToEdit.title);
        setContent(pasteToEdit.content);
      }
    }
  }, [id]);

  function createFunction() {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    // length validation
    if (trimmedTitle.length < 1 || trimmedContent.length < 1) {
      toast.error("Title and content must be at least 1 characters");
      return;
    }

    const isDuplicateTitle = allPastes.some(
      (paste) =>
        paste.title.toLowerCase() === trimmedTitle.toLowerCase() &&
        paste._id !== id
    );

    if (isDuplicateTitle) {
      toast.error("Title must be unique");
      return;
    }

    const pasteData = {
      title: trimmedTitle,
      content: trimmedContent,
      _id: id ?? Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    if (id) {
      dispatch(updateToPaste(pasteData));
      toast.success("Paste updated successfully");
    } else {
      dispatch(addToPaste(pasteData));
      toast.success("Paste created successfully");
    }

    setTitle("");
    setContent("");
    setSearchParams({});
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`${styles.input} ${styles.titleInput}`}
        />

        <button className={styles.actionButton} onClick={createFunction}>
          {id ? "Update my paste" : "Create My Paste"}
        </button>
      </div>

      <textarea
        placeholder="Enter your paste content here..."
        rows={20}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={styles.textarea}
      />
    </div>
  );
};

export default Home;
