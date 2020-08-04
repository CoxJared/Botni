import {
  SET_POSTS,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  SET_ERRORS,
  POST_POST,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_POST,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from '../types';
import axios from 'axios';

//get all posts
export const getPosts = () => (dispatch) => {
  dispatch({
    type: LOADING_DATA
  });
  axios
    .get('/posts')
    .then(response => {
      dispatch({
        type: SET_POSTS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_POSTS,
        payload: []
      });
    });
};

export const getPost = (postId) => (dispatch) => {
  dispatch({
    type: LOADING_UI
  });
  axios.get(`/post/${postId}`)
    .then(response => {
      dispatch({
        type: SET_POST,
        payload: response.data
      });

      dispatch({
        type: STOP_LOADING_UI
      });
    })
    .catch((err) =>
      console.log(err)
    );
};

//post a post
export const postPost = (newPost, formData) => (dispatch) => {
  dispatch({
    type: LOADING_UI
  });
  axios
    .post('/post', newPost)
    .then((response) => {
      //TODO organize these reponses better
      axios
        .post(`/post/${response.data.postId}/image`, formData)
        .then((imageResponse) => {
          console.log(imageResponse);
          dispatch(clearErrors());
          // dispatch({
          //   type: POST_POST,
          //   payload: response.data
          // });
          dispatch(getPosts());
        })
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

//like a post
export const likePost = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}/like`)
    .then((response) => {
      dispatch({
        type: LIKE_POST,
        payload: response.data
      })
    })
    .catch((err) => console.log(err));
};

//unlike a post
export const unlikePost = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}/unlike`)
    .then((response) => {
      dispatch({
        type: UNLIKE_POST,
        payload: response.data
      });
    })
    .catch((err) => console.log(err));
};

//submit a comment
export const submitComment = (postId, commentData) => (dispatch) => {
  axios
    .post(`/post/${postId}/comment`, commentData)
    .then((response) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: response.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deletePost = (postId) => (dispatch) => {
  axios
    .delete(`/post/${postId}`)
    .then(() => {
      dispatch({
        type: DELETE_POST,
        payload: postId
      });
    })
    .catch(err => console.log(err));
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({
    type: LOADING_DATA
  });
  axios
    .get(`/user/${userHandle}`)
    .then((response) => {
      dispatch({
        type: SET_POSTS,
        payload: response.data.posts
      });
    })
    .catch(() => {
      dispatch({
        type: SET_POSTS,
        payload: null
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  });
};