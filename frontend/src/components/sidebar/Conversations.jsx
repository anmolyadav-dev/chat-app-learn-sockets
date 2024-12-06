import Conversation from "./Conversation";
import useGetConversation from "../../hooks/useGetConversations.js";

const Conversations = () => {
  const { loading, conversations } = useGetConversation();
  // console.log(conversations);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1} //returns true if it is last index
        />
      ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};
export default Conversations;
