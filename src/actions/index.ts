type SubReddit = { item: string };

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';

export const selectSubreddit = (subreddit: SubReddit) => ({
  type: SELECT_SUBREDDIT,
  subreddit
});

export const invalidateSubreddit = (subreddit: SubReddit) => ({
  type: INVALIDATE_SUBREDDIT,
  subreddit
});

export const requestPosts = (subreddit: SubReddit) => ({
  type: REQUEST_POSTS,
  subreddit
});

export const receivePosts = (subreddit: SubReddit, json: any) => ({
  type: RECEIVE_POSTS,
  subreddit,
  posts: json.data.children.map((child: any) => child.data),
  receivedAt: Date.now()
});

const fetchPosts = (subreddit: SubReddit) => (dispatch: any) => {
  dispatch(requestPosts(subreddit))
  return fetch(`https://www.reddit.com/r/${subreddit}.json`)
  .then((response: any) => response.json())
  .then((json) => dispatch(receivePosts(subreddit, json)));
}

const shouldFetchPosts = (state: any, subreddit: any) => {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  }
  if (posts.isFetching) {
    return false;
  }
  return posts.didInvalidate;
}

export const fetchPostsIfNeeded = (subreddit: SubReddit) => (dispatch: any, getState: any) => {
  if (shouldFetchPosts(getState(), subreddit)) {
    return dispatch(fetchPosts(subreddit));
  }
}

