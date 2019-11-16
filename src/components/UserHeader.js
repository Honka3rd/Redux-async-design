import React, { Component } from "react";
import { connect } from "react-redux";
import { List } from "semantic-ui-react";

class UserHeader extends Component {

	// no need to fetch singular user each time
	// unique users has been stored inside the store
	render() {
		const user = this.props.uinfo;
		if (user) {
			return (
				<List.Item>
					<List.Content>
						<List.Header>{user.name}</List.Header>
						<List.Description as='a'>{user.email}</List.Description>
					</List.Content>
				</List.Item>
			);
		}

		return <div></div>;
	}
}

const mapStateToProps = (state, props) => {
	// get all unique users inside store
	// find the user object by passed uid inside props, then distruct it.
	return {
		uinfo: state.fetchUsers.find((u) => {
			return u.id === props.uid;
		})
	};
};

export default connect(mapStateToProps)(UserHeader);
