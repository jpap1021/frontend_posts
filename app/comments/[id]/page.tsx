"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { useState } from "react";
import { usePost } from "@/app/posts/usePosts";
import styles from "./page.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CommentPage({ params }: any) {
  const { posts, handleAddComment } = usePost();
  const [open, setOpen] = useState(false);
  const [inputComment, setInputComment] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    handleAddComment(params.id, inputComment);
    handleClose();
    setInputComment("");
  };

  const commentPost =
    posts?.find((post: any) => post.id === +params.id)?.comments || [];

  const handleChange = (event: any) => {
    setInputComment(event.target.value);
  };

  return (
    <div className={styles.container_comments}>
      <h1>Comments Post id # {params.id}</h1>
      {commentPost?.map((comment: any, index: any) => (
        <div className={styles.comments} key={index}>
          {comment}
        </div>
      ))}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.container_title_modal}>
            <h2 className={styles.title_modal}>Comment</h2>
            <Button onClick={handleClose} sx={{ float: "right" }}>
              <HighlightOffIcon />
            </Button>
          </div>
          <form data-testid="comment-form" onSubmit={handleSubmit}>
            <textarea
              rows={10}
              cols={50}
              className={styles.textarea}
              name="comment"
              value={inputComment}
              onChange={handleChange}
              data-testid="comment-textarea"
            ></textarea>
            <Button
              variant="contained"
              sx={{ margin: "30px 0px 0px 0px" }}
              onClick={handleOpen}
              type="submit"
            >
              Add
            </Button>
          </form>
        </Box>
      </Modal>
      <Button sx={{ float: "right" }} onClick={handleOpen}>
        Add Comment
      </Button>
    </div>
  );
}
