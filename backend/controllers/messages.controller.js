import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

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

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.message.push(newMessage._id);
    }

    // TODO: socket IO functionality

    // await conversation.save();
    // await newMessage.save();
    // optimising above 2 lines

    await Promise.all([conversation.save(), newMessage.save()]); //this will run in parallel
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("error in messagecontroller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export default sendMessage;
