

import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { UserContext } from '../components/context/UserContext';
import { formatFacebookTime } from '../utils/Base64';
import WelcomePage from './WelcomePage';
import LoadingSpinner from '../components/LoadingSpinner ';
import toast from 'react-hot-toast';
export default function Home() {
    const [content, setContent] = useState('');
    const [newComments, setNewComments] = useState({});
    const [showComments, setShowComments] = useState({});
    const [loading, setLoading] = useState(false);
    const [loadingdel, setLoadingdel] = useState(false);
    const [LikeLoading, setLikeLoading] = useState({});
    const [CommentLoading, setCommentLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const { user, id, avatar } = useContext(UserContext);
    const handlePost = async (e) => {
        e.preventDefault();
        if (!user) {
            window.location.href = '/login'; // Redirect to login if not authenticated
        }
        if (content.trim() === '') {
            alert('Post content cannot be empty!');
            return;
        }
        try {
            await axios.post('https://ffa6ebc5-2ff4-41cb-8279-c36bb9466103-00-1lfnueh0q3ij9.picard.replit.dev:3000/post', { content }, { withCredentials: true });
            setContent('');
            toast('Post added successfully!');
            getPosts();
        } catch (error) {
            console.error('Post error', error);
        }

    };
    const handleLike = async (postId) => {
        if (!user) {
            window.location.href = '/login'; // Redirect to login if not authenticated
            return;
        }

        try {
            // Start loading only for this post
            setLikeLoading(prev => ({ ...prev, [postId]: true }));
            const res = await axios.post(`https://ffa6ebc5-2ff4-41cb-8279-c36bb9466103-00-1lfnueh0q3ij9.picard.replit.dev:3000/like/${postId}`, {}, { withCredentials: true });
            const updatedLikes = await res.data.post.likes; // assuming backend returns the updated likes array
            setLikeLoading(prev => ({ ...prev, [postId]: false }));
            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post._id === postId
                        ? {
                            ...post,
                            likes: updatedLikes,
                            likedByCurrentUser: updatedLikes.some(likeUser => likeUser?._id?.toString() === id?.toString())

                        }
                        : post
                )
            );

        } catch (error) {
            console.error('Like error', error);
        }
    };

    const getPosts = async () => {
        setLoading(true);
        const res = await axios.get('https://ffa6ebc5-2ff4-41cb-8279-c36bb9466103-00-1lfnueh0q3ij9.picard.replit.dev:3000/posts', { withCredentials: true });
        const postsWithLikeStatus = res.data.map(post => ({
            ...post,
            likedByCurrentUser: user ? post.likes.some(likeUser => likeUser?._id?.toString() === id?.toString()) : false, // Check if the current user has liked the post
        }));
        setPosts(postsWithLikeStatus);
        setLoading(false);
    };

    useEffect(() => {
        if (id) {
            getPosts();
        }

    }, [id]); // Now it waits for user to be available
    // Add user as a dependency so it triggers when the user changes

    const handleComment = async (postId) => {
        if (!user) {
            window.location.href = '/login';
            return;
        }

        const newCommentContent = newComments[postId];

        try {
            setCommentLoading(true);
            const { data: createdComment } = await axios.post(
                `https://ffa6ebc5-2ff4-41cb-8279-c36bb9466103-00-1lfnueh0q3ij9.picard.replit.dev:3000/comment/${postId}`,
                { content: newCommentContent },
                { withCredentials: true }
            );
            console.log(createdComment);

            setCommentLoading(false);
            // Update the local state: add the new comment to the correct post
            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post._id === postId
                        ? {
                            ...post,
                            comments: [...post.comments, createdComment]
                        }
                        : post
                )
            );
            toast('Comment added successfully!');

            setNewComments({ ...newComments, [postId]: '' }); // Clear the input
        } catch (error) {
            console.error('Comment error', error);
        }
    };

    const handleCommentChange = (postId, e) => {
        setNewComments({
            ...newComments,
            [postId]: e.target.value // Update the comment for this specific post
        });
    };
    if (loading) {
        return <LoadingSpinner />
    }
    const handleDelete = async (id) => {
        try {
            setDeleteLoading(true);
            await axios.delete(`https://ffa6ebc5-2ff4-41cb-8279-c36bb9466103-00-1lfnueh0q3ij9.picard.replit.dev:3000/post/${id}`, { withCredentials: true });
            setDeleteLoading(false);
            toast('Post deleted successfully!');
            getPosts(); // Refresh posts after deletion
        } catch (err) {
            console.error(err);
        }
    };
    const handleShowComments = (postId) => {
        setShowComments(prevState => ({
            ...prevState,
            [postId]: !prevState[postId], // Toggle comment visibility for the post
        }));
    };
    const handleDeleteComment = async (commentId, postId) => {

        try {
            setLoadingdel(true);
            await axios.delete(`https://ffa6ebc5-2ff4-41cb-8279-c36bb9466103-00-1lfnueh0q3ij9.picard.replit.dev:3000/comment/${postId}/${commentId}`, {
                withCredentials: true,
            });


            // Remove the deleted comment from the local state
            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post._id === postId
                        ? {
                            ...post,
                            comments: post.comments.filter(comment => comment._id !== commentId),
                        }
                        : post
                )
            );
            setLoadingdel(false);
            toast('Comment deleted successfully!');
        } catch (err) {
            console.error('Error deleting comment:', err);
        }
    };

    if (user === null) {
        return (
            <WelcomePage />
        );
    }
    return (
        <div className=' mt-[100px] '>
            <div className=' container mx-auto px-4 md:px-20'>

                {user && <form onSubmit={handlePost}
                    className='relative flex flex-col w-full max-w-lg mx-auto mt-6 p-6 bg-white shadow shadow-slate-300'>
                    <div className=' w-[50px] absolute top-[-10px] right-[-10px] h-[50px]  
                    rounded-full flex justify-center items-center'>
                        <img src={`https://ffa6ebc5-2ff4-41cb-8279-c36bb9466103-00-1lfnueh0q3ij9.picard.replit.dev:3000/${avatar}`} className="rounded-full w-[50px] h-[50px] p-2 bg-gray-200" alt="" />
                    </div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's happening?"
                    /><br />
                    <button disabled={content.trim() === ''} className=' bg-green-600 hover:bg-green-700 text-white p-2' type="submit">Post</button>
                </form>}

                <div>
                    {posts?.map(post => (
                        <div key={post._id}
                            className='flex flex-col w-full max-w-lg mx-auto mt-5 p-5 bg-white post shadow-slate-300 shadow'>
                            <div className='mb-3 flex items-center'>
                                <img className='w-[35px] h-[35px] bg-gray-300 rounded-full mr-2'
                                    src={`https://ffa6ebc5-2ff4-41cb-8279-c36bb9466103-00-1lfnueh0q3ij9.picard.replit.dev:3000/${post.author?.avatar}`} alt="" />
                                <div className='flex flex-col'>
                                    <strong>{post.author?.username || 'Unknown'}</strong>
                                    <span className='-mt-1 text-[12px] text-gray-500'>
                                        {formatFacebookTime(post.createdAt)}
                                    </span>
                                </div>
                            </div>
                            <p className=' border-b mb-2 mt-[-10px] py-5 pb-1'>{post.content}</p>

                            <div className=' flex justify-between items-center'>
                                {LikeLoading[post._id] ? <div className='spinner'></div> :
                                    <button onClick={() => handleLike(post._id)}>
                                        {post.likedByCurrentUser
                                            ? <FaHeart className="text-red-600 inline mr-1" />
                                            : <FaRegHeart className="text-red-600 inline mr-1" />}
                                        {post.likes.length}
                                    </button>

                                }
                                {id === post?.author?._id && (
                                    <button disabled={deleteLoading} className='bg-red-600 hover:bg-red-700 text-white px-2 py-1'
                                        onClick={() => handleDelete(post?._id)}>Delete Post</button>
                                )}
                            </div>
                            {/* Comment section */}
                            <div className='border-t mt-2'>
                                <button
                                    className='text-blue-600 mt-2'
                                    onClick={() => handleShowComments(post._id)}
                                >
                                    {showComments[post._id] ? 'Hide Comments' : 'Show Comments'}
                                    <span>
                                        {post.comments.length > 0 && ` (${post.comments.length})`}
                                    </span>
                                </button>
                                {showComments[post._id] && (
                                    <>
                                        <h4 className='my-2'>Comments</h4>
                                        {post.comments.map((comment, index) => (
                                            <div key={index} className='relative p-2 mb-2 bg-gray-200'>
                                                <div className='flex items-center'>
                                                    <img className='w-[35px] h-[35px] bg-gray-300 rounded-full mr-2'
                                                        src={`https://ffa6ebc5-2ff4-41cb-8279-c36bb9466103-00-1lfnueh0q3ij9.picard.replit.dev:3000/${comment.author?.avatar}`} alt="" />
                                                    <div className='flex flex-col'>
                                                        <strong>{comment.author?.username || 'Unknown'}</strong>
                                                        <span className='-mt-1 text-[12px] text-gray-500'>
                                                            {formatFacebookTime(comment.createdAt)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className='pl-[40px]'>
                                                    {comment.content}
                                                    {comment.author?._id === id && (
                                                        <button disabled={loadingdel}
                                                            onClick={() => handleDeleteComment(comment._id, post._id)}
                                                            className='text-sm text-red-600 hover:text-red-800 ml-2'
                                                        >
                                                            Delete
                                                        </button>
                                                    )}
                                                </p>
                                            </div>
                                        ))}
                                        {/* Comment input */}
                                        <input type='text' className='mt-1'
                                            value={newComments[post._id] || ''}
                                            onChange={(e) => handleCommentChange(post._id, e)}
                                            placeholder="Write a comment..."
                                        />
                                        {CommentLoading ? <div className='spinner py-1 px-2'></div> :
                                            <button className='mt-3 bg-green-600 hover:bg-green-700 text-white px-2 py-1'
                                                onClick={() => handleComment(post._id)}>Comment</button>
                                        }
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
}
