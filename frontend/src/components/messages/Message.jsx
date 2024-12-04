const Message = () => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src="https://imgs.search.brave.com/YfyNSZIduSszrOd2DIfVpcEZXVPxARydF3-FOuI_1pA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS9ob3d0by9pbWdf/YXZhdGFyLnBuZw"
            alt=""
          />
        </div>
      </div>

      <div className="chat-bubble text-white bg-blue-500 ">Hi! whatsup?</div>
      <div className="chat-footer opacity-50    text-xs flex gap-1 items-center">
        12:42
      </div>
    </div>
  );
};

export default Message;
