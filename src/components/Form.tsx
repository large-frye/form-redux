import * as React from 'react';
import { Card, CardActions, CardHeader, CardText, CardMedia, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export interface FormProps { compiler: string; framework: string; name: string }

export class Form extends React.Component<FormProps, {}> {

  handleUserClick(event: React.MouseEvent<any>) {
    console.log(event.currentTarget);
  }

  render() {
    return <Card>
      <Card>
        <CardHeader
          title="URL Avatar"
          subtitle="Subtitle"
          avatar="images/jsa-128.jpg"
        />
        <CardMedia
          overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
        >
          <img src="http://www.nbcsports.com/philadelphia/sites/csnphilly/files/styles/article_hero_image/public/2018/03/03/usa-alex-ovechkin-capitals-maple-leafs.jpg?itok=qOv55JpW" alt="some image" />
        </CardMedia>
        <CardTitle title="Card title" subtitle="Card subtitle" />
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          {this.props.compiler}
          {this.props.framework}
          {this.props.name}'s cool
    </CardText>
        <CardActions>
          <FlatButton label="Action1" onClick={(event) => this.handleUserClick(event)} />
          <FlatButton label="Action2" />
        </CardActions>
      </Card>
    </Card>;
  }
}