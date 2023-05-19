import { render, screen, fireEvent } from "@testing-library/react";
import CommentPage from "@/app/comments/[id]/page";
import { usePost } from "../../posts/usePosts";

jest.mock("../../posts/usePosts");

describe("CommentPage", () => {
  it("snapshot", () => {
    const postId = 1;
    const comments = ["Comment 1", "Comment 2"];
    (usePost as jest.Mock).mockImplementation(() => ({
      posts: [{ id: postId, comments }],
      handleAddComment: jest.fn(),
    }));
    const { container } = render(<CommentPage params={{ id: postId }} />);
    expect(container).toMatchSnapshot();
  });

  it("updates inputComment state when the textarea value changes", () => {
    const postId = 1;
    const handleAddCommentMock = jest.fn();
    (usePost as jest.Mock).mockImplementation(() => ({
      posts: [],
      handleAddComment: handleAddCommentMock,
    }));

    render(<CommentPage params={{ id: postId }} />);
    const openButton = screen.getByRole("button", { name: "Add Comment" });
    fireEvent.click(openButton);

    const textarea = screen.getByTestId("comment-textarea");
    const form = screen.getByTestId("comment-form");

    fireEvent.change(textarea, { target: { value: "This is a comment" } });

    fireEvent.submit(form);

    expect(handleAddCommentMock).toHaveBeenCalledWith(
      postId,
      "This is a comment"
    );
  });
});
