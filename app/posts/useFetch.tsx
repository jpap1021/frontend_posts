import React, { useReducer, useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
  comments?: string[];
}

export interface State {
  data:
    | (Post | { comments: any[]; id: number; title: string; body: string })[]
    | undefined;
  isLoading: boolean;
  error: boolean;
}

export interface Action {
  type: string;
  payload?: any;
  comment?: string;
}

export const useFetch = ({
  dispatch,
}: any): {
  handleAddComment: (postId: number, comment: string) => void;
} => {
  const [initialStateLoaded, setInitialStateLoaded] = useState(false);

  const handleAddComment = (postId: number, comment: string) => {
    dispatch({ type: "ADD_COMMENT", payload: { postId, comment } });
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_START" });

      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const jsonData = await response.json();
        dispatch({ type: "FETCH_SUCCESS", payload: jsonData });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR" });
      }
    };

    if (!initialStateLoaded) {
      fetchData();
      setInitialStateLoaded(true);
    }
  }, [initialStateLoaded, dispatch]);

  return { handleAddComment };
};
