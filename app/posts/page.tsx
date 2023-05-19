"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { usePost } from "./usePosts";

export default function PostPage() {
  const { posts, addComment } = usePost();

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignContent: "center",
          width: "100%",
          boxShadow: "",
        }}
      >
        {posts?.map((post: any) => (
          <Box
            sx={{
              width: 500,
              height: "auto",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              margin: "20px auto",
              padding: "20px",
            }}
            key={post.id}
          >
            <Box
              sx={{
                fontWeight: "bold",
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              {post.title}
            </Box>
            <Box>{post.body}</Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => addComment(post.id)}
              >
                Add Comment
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </div>
  );
}
