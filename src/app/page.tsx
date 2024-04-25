"use client";
import { useState } from "react";

interface Comment {
  body: string;
  comments: Array<Comment>;
}

const dummyComments: Array<Comment> = [
  {
    body: "Comment 1",
    comments: [],
  },
  {
    body: "Comment 2",
    comments: [],
  },
  {
    body: "Comment 3",
    comments: [],
  },
];
export default function Home() {
  const [comments, setComments] = useState(dummyComments);

  const onComment = (newComment: Comment) => {
    setComments((prev) => [newComment, ...prev]);
  };
  return (
    <div className="flex flex-col gap-5 h-screen w-screen p-6">
      <span className="text-3xl">Comments </span>

      <CommentInput onComment={onComment} />

      <div className="flex flex-col gap-5 mt-5">
        {comments.map((comment) => (
          <CommentItem comment={comment} />
        ))}
      </div>
    </div>
  );
}

interface CommentInputProps {
  onComment: (newComment: Comment) => void;
}

const CommentInput = ({ onComment }: CommentInputProps) => {
  const [commentBody, setCommentBody] = useState("");
  return (
    <div className="flex flex-col mt-4">
      <input
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
        placeholder="Enter new comment here"
        className="border-[1px] border-zinc-400 p-4 w-3/4"
      ></input>
      <button
        onClick={() => {
          onComment({ body: commentBody, comments: [] });
          setCommentBody("");
        }}
        className="border-[1px] rounded-full border-zinc-400 w-20"
      >
        Comment
      </button>
    </div>
  );
};

interface CommentItemProps {
  comment: Comment;
}
const CommentItem = ({ comment }: CommentItemProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [comments, setComments] = useState(comment.comments);

  const oncComment = (newComment: Comment) => {
    setComments((prev) => [newComment, ...prev]);
  };
  return (
    <div className="flex flex-col border-[1px] border-zinc-500 rounded-md p-3 my-4">
      <span> {comment.body} </span>
      {isReplying ? (
        <button
          onClick={() => setIsReplying(false)}
          className="border-[1px] border-zinc-400 w-20 rounded-full"
        >
          Cancel
        </button>
      ) : (
        <button
          onClick={() => setIsReplying(true)}
          className="border-[1px] border-zinc-400 w-20 rounded-full"
        >
          Reply
        </button>
      )}
      {isReplying && <CommentInput onComment={oncComment} />}
      <div className="flex flex-col gap-7">
        {comments.map((comment) => (
          <CommentItem comment={comment} />
        ))}
      </div>
    </div>
  );
};
