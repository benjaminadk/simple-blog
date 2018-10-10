import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { compose } from 'react-apollo'
import Card from '@material-ui/core/Card'
import Chip from '@material-ui/core/Chip'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { formatDate } from '../../utils/formatDate'

const styles = theme => ({
  card: {
    marginTop: '5vh',
    marginBottom: '5vh'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  iconButtons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  iconButton: {
    transition: theme.transitions.create(['transform', 'color'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard
    }),
    '&:hover': {
      backgroundColor: 'transparent',
      transform: 'scale(1.25)',
      color: theme.palette.primary.main
    },
    '&:active': {
      color: theme.palette.primary.dark
    }
  },
  image: {
    height: '15vh',
    minWidth: '15vh',
    backgroundSize: 'cover',
    marginBottom: '4vh'
  },
  postedOn: {
    marginTop: '2vh',
    marginBottom: '4vh'
  },
  chip: {
    margin: theme.spacing.unit / 2,
    height: 28,
    fontSize: 11
  }
})

class AllPosts extends Component {
  handleViewPost = postId => this.props.history.push(`/post/${postId}`)

  handleEditPost = post => {
    this.props.handleBlog(post)
    this.props.history.push('/edit')
  }

  render() {
    const { post, isAdmin, handleDeletePost, classes } = this.props
    return (
      <Card raised className={classes.card}>
        <div className={classes.content}>
          <div className={classes.iconButtons}>
            <Tooltip title="View Post">
              <IconButton
                classes={{ root: classes.iconButton }}
                disableRipple
                onClick={() => this.handleViewPost(post.id)}
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
            {isAdmin && (
              <Tooltip title="Edit Post">
                <IconButton
                  classes={{ root: classes.iconButton }}
                  disableRipple
                  onClick={() => this.handleEditPost(post)}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            )}
            {isAdmin && (
              <Tooltip title="Delete Post">
                <IconButton
                  classes={{ root: classes.iconButton }}
                  disableRipple
                  onClick={() => handleDeletePost(post.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
          </div>
          <img className={classes.image} src={post.image} alt="title" />
          <Typography variant="display2" align="center">
            {post.title}
          </Typography>
          <Typography variant="subheading">{post.subTitle}</Typography>
          <Typography variant="caption" className={classes.postedOn}>
            {`Posted On ${formatDate(post.createdAt)}`}
          </Typography>
          <div>
            {post.tags && post.tags.map(t => <Chip key={t} label={t} className={classes.chip} />)}
          </div>
        </div>
      </Card>
    )
  }
}

export default compose(
  withStyles(styles),
  withRouter
)(AllPosts)
