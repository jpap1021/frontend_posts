"use client";
import { useRouter } from "next/navigation";
import { useReducer } from "react";
import { reducer } from "../reducer/reducer";
import { State, useFetch } from "./useFetch";

const initialState: State = {
  data: undefined,
  isLoading: false,
  error: false,
};

export const usePost = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { handleAddComment } = useFetch({ state, dispatch });
  const router = useRouter();

  const posts = state?.data;
  const addComment = (id: number) => {
    router.push(`comments/${id}`, {});
  };
  return {
    posts,
    addComment,
    handleAddComment,
  };
};
