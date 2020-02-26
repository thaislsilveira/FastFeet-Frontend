import createSagaMiddleware from 'redux-saga';
import createStore from './createStore';

import rootReduter from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor =
  process.env.NODE_ENV === 'delevopment'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleare = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleare];

const store = createStore(rootReduter, middlewares);

sagaMiddleare.run(rootSaga);

export default store;
