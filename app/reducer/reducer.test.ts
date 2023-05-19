import { reducer } from "./reducer";

describe("reducer", () => {
  it("should handle FETCH_START action", () => {
    const data = [
      {
        comments: ["comentario1", "comentario2"],
        id: 1,
        title: "title",
        body: "body",
      },
    ];
    const initialState = { isLoading: false, error: false, data };
    const action = { type: "FETCH_START" };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual({ isLoading: true, error: false, data });
  });

  it("should handle FETCH_SUCCESS action", () => {
    const data = [
      {
        comments: ["comentario1", "comentario2"],
        id: 1,
        title: "title",
        body: "body",
      },
    ];
    const initialState = { isLoading: true, error: false, data };
    const payload = [{ id: 1, title: "Post 1", body: "Body 1" }];
    const action = { type: "FETCH_SUCCESS", payload };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual({
      isLoading: false,
      error: false,
      data: payload,
    });
  });

  it("should handle FETCH_ERROR action", () => {
    const data = [
      {
        comments: ["comentario1", "comentario2"],
        id: 1,
        title: "title",
        body: "body",
      },
    ];
    const initialState = { isLoading: true, error: false, data };
    const action = { type: "FETCH_ERROR" };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual({ isLoading: false, error: true, data });
  });

  it("should handle ADD_COMMENT action", () => {
    const initialState = {
      isLoading: false,
      error: false,
      data: [{ id: 1, title: "Post 1", body: "Body 1", comments: [] }],
    };
    const payload = { postId: 1, comment: "Comment 1" };
    const action = { type: "ADD_COMMENT", payload };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual({
      isLoading: false,
      error: false,
      data: [
        { id: 1, title: "Post 1", body: "Body 1", comments: ["Comment 1"] },
      ],
    });
  });

  it("should return the same state for unknown action types", () => {
    const data = [
      {
        comments: ["comentario1", "comentario2"],
        id: 1,
        title: "title",
        body: "body",
      },
    ];
    const initialState = { isLoading: false, error: false, data };
    const action = { type: "UNKNOWN_ACTION" };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it("should not update the post when post.id and postId are different", () => {
    const initialState = {
      isLoading: false,
      error: false,
      data: [
        { id: 1, title: "Post 1", body: "Body 1", comments: [] },
        { id: 2, title: "Post 2", body: "Body 2", comments: [] },
      ],
    };

    const action = {
      type: "ADD_COMMENT",
      payload: { postId: 3, comment: "New comment" },
    };

    const newState = reducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
