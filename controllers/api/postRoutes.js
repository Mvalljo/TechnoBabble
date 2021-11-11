const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.findAll({
      attributes: ['id', 'title', 'content', 'date_created'],
      order: [['date_created', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: [
            'id',
            'comment_txt',
            'post_id',
            'user_id',
            'date_created',
          ]
        },
      ],
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'content', 'title', 'date_created'],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: [
            'id',
            'comment_txt',
            'post_id',
            'user_id',
            'date_created',
          ],
          include: {
            model: User,
            attributes: ['name'],
          },
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: 'No Post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update(req.body,
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!postData) {
      res.status(404).json({ message: 'No Post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No Post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
