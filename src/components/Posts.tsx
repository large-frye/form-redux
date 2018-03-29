import * as React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

interface IPost { title: string, url: string, thumbnail: string }
interface IPostComponent { posts: Array<IPost> }
interface IPostStyle { root: any, gridList?: any, titleStyle?: any, img: any }

const styles: IPostStyle = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  img: {
    width: '100%',
    height: 'auto'
  }
};

const onClick = (e: React.MouseEvent<any>) => {
  alert(e.currentTarget.id);
}

const Posts = ({ posts }: IPostComponent) => (
  <div style={styles.root}>
    <GridList cols={5}>
      {posts.map((post, i) => (
        <a id={`${i}_${encodeURIComponent(post.title)}`} key={i} href="{post.url}" target="_blank" className="post-link" 
        onClick={onClick}>
          <GridTile
            key={`${post.thumbnail}_${i}`}
            title={post.thumbnail}
            actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
            titleStyle={styles.titleStyle}
            titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          >
            <img src={post.thumbnail !== 'self' ? post.thumbnail : null} style={styles.img} />
          </GridTile>
        </a>
      ))}
    </GridList>
  </div>
)

export default Posts