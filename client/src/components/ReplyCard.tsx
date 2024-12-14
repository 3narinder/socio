import React from "react";
import { User, Reply } from "../shared/interface";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import moment from "moment";
import { BiLike, BiSolidLike } from "react-icons/bi";

interface ReplyCardProps {
  user: User;
  reply: Reply;
  handleLike: (url: string) => void; // Add this type definition
}

const ReplyCard: React.FC<ReplyCardProps> = ({ user, reply, handleLike }) => {
  return (
    <div className="w-full py-3">
      <div className="flex gap-3 items-center mb-1">
        <Link to={`/profile/${reply?.userId?._id}`}>
          <img
            src={reply?.userId?.profileUrl || NoProfile}
            alt={reply?.userId?.firstName}
            className="w-10 h-10 rounded-full object-cover"
          />
        </Link>

        <div>
          <Link to={`/profile/${reply?.userId?._id}`}>
            <p className="font-medium text-base text-ascent-1">
              {reply?.userId?.firstName} {reply?.userId?.lastName}
            </p>
          </Link>

          <span className="text-ascent-2 text-sm">
            {moment(reply?.createdAt || "2024-05-22").fromNow()}
          </span>
        </div>
      </div>

      <div className="ml-2">
        <p className="text-ascent-2">{reply?.comment}</p>

        <div className="mt-2 flex gap-6">
          <p
            className="flex items-center gap-2 text-base text-ascent-2 cursor-pointer"
            onClick={handleLike}
          >
            {reply?.likes?.includes(user?._id) ? (
              <BiSolidLike size={20} color="blue" />
            ) : (
              <BiLike size={20} />
            )}
            {reply?.likes?.length} Likes
          </p>

          {/* <span
            className="text-blue cursor-pointer"
            onClick={() => setReplyComments(comment?._id)}
          >
            Reply
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default ReplyCard;
