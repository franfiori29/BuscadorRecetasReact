import { createStore, applyMiddleware, compose } from "redux";
import reducer from "../reducer";
import thunk from "redux-thunk";
import { Reducer } from "react";

export const store = createStore(
	reducer as Reducer<any, any>,
	compose(
		applyMiddleware(thunk),
		(window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
			(window as any).__REDUX_DEVTOOLS_EXTENSION__()
	)
);
