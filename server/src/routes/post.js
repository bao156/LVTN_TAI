import express from 'express'
import * as postController from '../controllers/post'
import verifyToken from '../middlewares/verifyToken'

const router = express.Router()

router.get('/all', postController.getPosts)
router.get('/limit', postController.getPostsLimit)
router.get('/new-post', postController.getNewPosts)

router.use(verifyToken)
router.post('/create-new', postController.createNewPost)
router.get('/limit-admin', postController.getPostsLimitAdmin)
router.put('/update-admin', postController.updatePost)
router.put('/update-admin/:postId', postController.updatePostAdmin);
router.delete('/delete/:postId', postController.deletePost)

// New route to handle updating the like
router.put('/update-like', postController.updatePostLike);

export default router