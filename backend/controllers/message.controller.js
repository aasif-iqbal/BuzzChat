import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import mongoose from "mongoose";

const sendMessage = async (req, res) => {
  try {
  
    let senderId = req.user._id; 
    //console.log('req.body', senderId);

    let { id: receiverId } = req.params;
    const { message } = req.body;
    
    console.log('senderID',senderId);
    console.log('ReciverID',req.params);

    //  senderId = senderId.trim();
    //  receiverId = id.trim();

      // Validate the ObjectId format
      if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
          return res.status(400).json({ message: 'Invalid sender or receiver ID' });
      }

      let conversation = await Conversation.findOne({
          participants: { $all: [senderId, receiverId] },
      });

      if (!conversation) {
          conversation = await Conversation.create({
              participants: [senderId, receiverId],
          });
      }
  // Ensure the messages array is initialized
//   if (!conversation.messages) {
//     conversation.messages = [];
// }
		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});
     
    console.log("newMessage",newMessage);
    
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    console.log('here');
    // Socket io functionality will go here.  
    Promise.all([await newMessage.save(), await conversation.save()]);

    res.status(201).json(message);
  } catch (error) {
    console.log(error);
  }
};

export { sendMessage };
