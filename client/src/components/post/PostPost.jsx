import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';

//MUI
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  CircularProgress
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';

import { connect } from 'react-redux';
import { postPost, clearErrors } from '../../redux/actions/dataActions';

import imagePlaceholder from '../../images/logo-white.png';

const styles = (theme) => ({
  ...theme.styleSpreading,
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%'
  },
  postImage: {
    backgroundColor: '#ddd',
    width: 250,
    height: 250,
    padding: 10,
    margin: '0 50px 0 50px'
  }
});

class PostPost extends Component {
  state = {
    open: false,
    body: '',
    errors: {},
    imageFormData: null,
    image: imagePlaceholder
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '', open: false, errors: {} });
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleAddPicture = () => {
    const fileInput = document.getElementById('postimageInput');
    fileInput.click();
  };
  handlePostImageChange = (event) => {
    const image = event.target.files[0];
    const imageFormData = new FormData();
    console.log(image);
    imageFormData.append('image', image, image.name);
    this.setState({ image, imageFormData });

    // this.props.uploadImage(formData);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postPost({ body: this.state.body }, this.state.imageFormData);
  };

  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Post a Post!">
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Post a new Post</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <img
                alt="Post"
                src={this.state.image}
                className={classes.postImage}
              />
              <input
                type="file"
                id="postimageInput"
                hidden="hidden"
                onChange={this.handlePostImageChange}
              />
              <MyButton
                tip="Add Image"
                onClick={this.handleAddPicture}
                btnClassName="button"
              >
                <EditIcon color="primary" />
              </MyButton>
              <TextField
                name="body"
                type="text"
                label="POST!!"
                multiline
                rows="3"
                placeholder="Post at your gardeners"
                errors={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostPost.propTypes = {
  postPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  UI: state.UI
});

export default connect(mapStateToProps, { postPost, clearErrors })(
  withStyles(styles)(PostPost)
);
