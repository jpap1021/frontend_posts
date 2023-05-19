import { Action, State } from "../posts/useFetch";

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, isLoading: true, error: false };
    case "FETCH_SUCCESS":
      return { ...state, isLoading: false, error: false, data: action.payload };
    case "FETCH_ERROR":
      return { ...state, isLoading: false, error: true };
    case "ADD_COMMENT":
      const { postId, comment } = action.payload;
      const updatedData = state.data?.map((post) => {
        if (post.id === +postId) {
          const comments = post.comments || [];
          return { ...post, comments: [...comments, comment] };
        }
        return post;
      });
      return { ...state, data: updatedData };
    default:
      return state;
  }
};
