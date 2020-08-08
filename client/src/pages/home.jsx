import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

import Post from '../components/post/Post';
import Profile from '../components/profile/Profile';
import PostSkeleton from '../util/PostSkeleton';

import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';
import Garden from '../components/garden/Garden';
export class home extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.data;
    let recentPostsMarkup = !loading ? (
      posts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
      <PostSkeleton />
    );

    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          <Garden />
          {recentPostsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(mapStateToProps, { getPosts })(home);
