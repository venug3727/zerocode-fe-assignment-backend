import express from 'express';
import { protect } from '../middleware/auth.js';
import Chat from '../models/Chat.js';
import { generateResponse } from '../services/chatService.js';

const router = express.Router();

// Get all chats for the current user
router.get('/', protect, async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user.userId });
    res.json(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ message: 'Error fetching chats' });
  }
});

// Get a specific chat
router.get('/:id', protect, async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.id,
      user: req.user.userId
    });
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    
    res.json(chat);
  } catch (error) {
    console.error('Error fetching chat:', error);
    res.status(500).json({ message: 'Error fetching chat' });
  }
});

// Create a new chat
router.post('/', protect, async (req, res) => {
  try {
    const chat = new Chat({
      user: req.user.userId,
      title: 'New Chat',
      messages: []
    });
    
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    console.error('Error creating chat:', error);
    res.status(500).json({ message: 'Error creating chat' });
  }
});

// Update chat title
router.patch('/:id/title', protect, async (req, res) => {
  try {
    const { title } = req.body;
    const chat = await Chat.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { title },
      { new: true }
    );
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    
    res.json(chat);
  } catch (error) {
    console.error('Error updating chat title:', error);
    res.status(500).json({ message: 'Error updating chat title' });
  }
});

// Delete a chat
router.delete('/:id', protect, async (req, res) => {
  try {
    const chat = await Chat.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    
    res.json({ message: 'Chat deleted' });
  } catch (error) {
    console.error('Error deleting chat:', error);
    res.status(500).json({ message: 'Error deleting chat' });
  }
});

// Send a message in a chat
router.post('/:id/messages', protect, async (req, res) => {
  try {
    const { content } = req.body;
    const chat = await Chat.findOne({
      _id: req.params.id,
      user: req.user.userId
    });
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Add user message
    const userMessage = {
      content,
      role: 'user',
      timestamp: new Date().toISOString()
    };
    chat.messages.push(userMessage);

    // Generate AI response
    const aiResponse = await generateResponse(chat.messages);
    
    // Add AI message
    const assistantMessage = {
      content: aiResponse,
      role: 'assistant',
      timestamp: new Date().toISOString()
    };
    chat.messages.push(assistantMessage);

    await chat.save();
    res.json(chat);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
});

export default router; 