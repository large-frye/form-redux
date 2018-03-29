import { combineReducers } from 'redux';
import {
  SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT, RECEIVE_POSTS, REQUEST_POSTS
} from '../actions';

const selectedSubreddit = (state = 'reactjs', action: any) => {
  switch(action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit;
    default:
      return state;
  }
}

const posts = (state = {
  isFetching: false,
  didInvalidate: true,
  items: <Array<any>>[]
}, action: any) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: true
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: true,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const postsBySubreddit = (state: any = {}, action: any) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        [action.subreddit]: posts(state[action.subreddit], action)
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit
});

export default rootReducer;