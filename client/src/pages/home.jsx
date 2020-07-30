import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import axios from 'axios';

import Post from '../components/Post';
export class home extends Component {
  state = {
    posts: null
  };
  componentDidMount() {
    axios
      .get('/screams')
      .then((result) => {
        this.setState({
          posts: result.data
        });
      })
      .catch((err) => console.error(err));
  }
  render() {
    let recentPostsMarkup = this.state.posts ? (
      this.state.posts.map((post) => (
        <Post key={post.screamId} post={post}>
          {post.body}
        </Post>
      ))
    ) : (
      <p>Loading ...</p>
    );

    return (
      <Grid container spacing={6}>
        <Grid item sm={8} xs={12}>
          {recentPostsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile...</p>
        </Grid>
      </Grid>
    );
  }
}

export default home;
