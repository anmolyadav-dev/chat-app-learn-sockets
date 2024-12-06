import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    // checking if conversation already exists

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // if conversation doesnot exists then create one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });

      // or
      // const newconversation = new Conversation({
      //     participants: [senderId , receiverId]
      // })
      // await newconversation.save()
    }

    // creating a message object
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // TODO: socket IO functionality

    // await conversation.save();
    // await newMessage.save();
    // optimising above 2 lines

    await Promise.all([conversation.save(), newMessage.save()]); //this will run in parallel
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("error in send message controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.user._id;
    // console.log(senderId, receiverId);
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");
    // console.log("conversation : ", conversation);
    if (!conversation) {
      return res.status(201).json([]);
    }
    res.status(201).json(conversation.messages);
  } catch (error) {
    console.log("error in get message controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
