import React, { Component } from "react";
import { getPostsAndUsers } from "../actions";
import { connect } from "react-redux";
import { List } from "semantic-ui-react";
import UserHeader from "./UserHeader";

class UserList extends Component {
  componentDidMount() {
    this.props.getPostsAndUsers();
  }

  componentDidUpdate() {}

  renderUserList = () => {
    if (this.props.response.data) {
      const list = this.props.response.data;
      return list.map(user => {
        return (
          <List.Item key={user.id}>
            <List.Icon name="user"></List.Icon>
            <List.Content>
              <List.Header>{user.title}</List.Header>
              <List.Description>{user.body}</List.Description>
              <List.List>
                <UserHeader uid={user.userId} />
              </List.List>
            </List.Content>
          </List.Item>
        );
      });
    }
  };

  render() {
    return (
      <div>
        <List relaxed>{this.renderUserList()}</List>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    response: state.fetch
  };
};

export default connect(mapStateToProps, { getPostsAndUsers })(UserList);
