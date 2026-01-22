const router = require('express').Router();
const Bookmark = require('../../models/Bookmark');
const { authMiddleware } = require('../../utils/auth');

router.use(authMiddleware);

router.post('/', async (req, res) => {
  try {
    const bookmark = await Bookmark.create({
      ...req.body,
      user: req.user._id
    });
    res.status(201).json(bookmark);
  } catch (err) {
    res.status(400).json({ message: 'Error creating bookmark', error: err });
  }
});

router.get('/', async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user._id });
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookmarks', error: err });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({ _id: req.params.id, user: req.user._id });
    if (!bookmark) return res.status(404).json({ message: 'Bookmark not found' });
    res.json(bookmark);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookmark', error: err });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!bookmark) return res.status(404).json({ message: 'Bookmark not found or not yours' });
    res.json(bookmark);
  } catch (err) {
    res.status(500).json({ message: 'Error updating bookmark', error: err });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!bookmark) return res.status(404).json({ message: 'Bookmark not found or not yours' });
    res.json({ message: 'Bookmark deleted', bookmark });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting bookmark', error: err });
  }
});

module.exports = router;