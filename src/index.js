import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Main from "./App";
import bundledReducers from "./reducers";

const App = () => {
	return (
		<div>
			<Main />
		</div>
	);
};

ReactDOM.render(
	<Provider store={createStore(bundledReducers, applyMiddleware(thunk))}>
		<App />
	</Provider>,
	document.querySelector("#root")
);
