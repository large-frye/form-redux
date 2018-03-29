import * as React from 'react';
import { connect } from 'react-redux';
import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../actions';
import Picker from '../components/Picker';
import Posts from '../components/Posts';

interface IAppProps { selectedSubreddit: any };

const options = ['reactjs', 'memes', 'javascript', 'java'];

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  componentWillReceiveProps(nextProps: IAppProps) {
    if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = this.props;
      dispatch(fetchPostsIfNeeded(nextProps.selectedSubreddit));
    }
  }

  handleChange = (nextSubreddit: any) => {
    this.props.dispatch(selectSubreddit(nextSubreddit));
  }

  handleRefreshClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(invalidateSubreddit(selectedSubreddit));
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props
    const isEmpty = posts.length === 0
    return (
      <div>
        <Picker value={selectedSubreddit}
                onChange={this.handleChange}
                options={options} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <button onClick={this.handleRefreshClick}>
              Refresh
            </button>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={posts} />
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  const { selectedSubreddit, postsBySubreddit } = state
  const {
    isFetching,
    lastUpdated,
    didInvalidate,
    items: posts
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    lastUpdated: new Date(),
    items: [],
    didInvalidate: true
  }

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
