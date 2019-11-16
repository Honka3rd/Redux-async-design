import JsonPlaceholder from "../apis/JsonPlaceholder";
import _ from "lodash";

export const fetchPost = () => {
	// after add middleware, action creators can return functions
	// then call the function
	return async function(dispatch) {
		// get a promise object: data will be gotten in the future
		const response = await JsonPlaceholder.get("/posts");
		// the store.dispatch and store.getState (optional) will be passed as parameters
		// after promise is done, the data will be dispatched
		dispatch({
			type: "FETCH_POST",
			payload: response
		});
	};
};

export const getUser = (id) => {
	return async (dispatch) => {
		const user = await JsonPlaceholder.get(`/users/${id}`);
		dispatch({
			type: "FETCH_A_USER",
			payload: user.data || null
		});
	};
};

/* const _fetchUser = _.memoize(async function(id, dispatch) {
	const user = await JsonPlaceholder.get(`/users/${id}`);
	dispatch({
		type: "FETCH_A_USER",
		payload: user.data || null
	});
}); */

export const getPostsAndUsers = () => {
	// dispatch the dispatched result of fetchPost, otherwise the result cannot be dispatched;
	// should await first, then execute the next line of code
	return async (dispatch, getState) => {
		await dispatch(fetchPost());

		// get data from store
		// console.log(getState().fetch.data);

		// get value of userId key
		// const userIds = _.map(getState().fetch.data, "userId");
		// console.log(userIds);

		// get unique ids
		// const uniqIds = _.uniq(userIds);
		// console.log(uniqIds);

		// fetch only the user with the unique id, and keep the inside store
		/* uniqIds.forEach((uid) => {
			dispatch(getUser(uid));
		}); */

		_.chain(getState().fetch.data)
			.map("userId")
			.uniq()
			.forEach((uid) => {
				dispatch(getUser(uid));
			})
			.value();
	};
};
