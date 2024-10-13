const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes')
const User = require('../models/User')
const Share = require('../models/Share')
const fetchdata = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');

//Router 1 : for add new notes

router.post('/addnotes', fetchdata, [
   body('Title', 'enter a valid email').isLength({ min: 3 }),
   body('discription', "discription must be of 5 chatacter").isLength({ min: 5 }),
   body('tag', 'enter a valid tag').isLength({ min: 3 })
], async (req, res) => {
   const error = validationResult(req);

   if (!error.isEmpty()) {
      return res.status(400).send({ error: error.array() })
   }
   try {
      let notes = await new Notes(req.body)
      notes.user = req.user.id;
      const savenotes = await notes.save();
      res.send(savenotes)

   } catch (error) {
      res.status(500).send("something went wrong in router 1")
   }
})

//Router 2 : fetching data from user's id

router.get("/fetchnotes", fetchdata, async (req, res) => {

   const notes = await Notes.find({ user: req.user.id });
   res.send(notes)

})

//Router 3:to update the existing notes 

router.put('/updatenotes/:id', fetchdata, async (req, res) => {
   const { Title, discription, tag } = req.body;
   const newNote = {};
   if (Title) { newNote.Title = Title }
   if (discription) { newNote.body = discription }
   if (tag) { newNote.tag = tag }

   let note = await Notes.findById(req.params.id);
   if (!note) {
      return res.status(401).send("Not found")
   }

   if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed")
   }

   note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
   res.json(note)
})

//Roter 4 : deleting an existing note

router.delete('/deletenote/:id', fetchdata, async (req, res) => {
   try {
      let note = await Notes.findById(req.params.id);
      if (!note) {
         return res.status(401).send("Not found")
      }

      if (note.user.toString() !== req.user.id) {
         return res.status(401).send("Not allowed")
      }
      note = await Notes.findByIdAndDelete(req.params.id)
      res.json({ "sucess": "note has been sucessfully deleted", note: note })
   } catch (error) {
      res.status(500).send("internal server error")
   }

})

// Router 5: Sharing Notes
router.post('/sharenote',fetchdata, async(req , res)=>{
   try {
      let shareNotes = await new Share(req.body)
      shareNotes.sender = req.user.id;
      const sender_Mail = await User.find({ _id : req.user.id });
      shareNotes.senderMail = sender_Mail[0].email;
      const reciever = await User.find({ email : req.body.reciever });
      
      if(!reciever[0].email){res.send({error : "user does not exist"});}
      else{
      shareNotes.reciever = reciever[0]._id;
      const savenotes = await shareNotes.save();
      res.send(savenotes);}
   } catch (error) {
      res.status(500).send("something went wrong in router 5")
   }
})

//Router 6 : Fetching shared notes

router.get('/sharednotes' , fetchdata , async(req, res)=>{
   try{
      const shareNotes = await Share.find({ reciever : req.user.id });
      res.send(shareNotes)
   }catch(error){
      res.status(500).send("something went wrong in router 6")
   }
})

module.exports = router;