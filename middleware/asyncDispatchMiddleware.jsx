

// This middleware will just add the property "async dispatch"
// to actions with the "async" propperty set to true
// http://stackoverflow.com/questions/36730793/dispatch-action-in-reducer
const asyncDispatchMiddleware = store => next => action => {
  let syncActivityFinished = false;
  const actionQueue = [];

  function flushQueue() {
    actionQueue.forEach(a => store.dispatch(a)); // flush queue
  }

  function asyncDispatch(asyncAction) {
    actionQueue.push(asyncAction);

    if (syncActivityFinished) {
      flushQueue();
    }
  }

  const actionWithAsyncDispatch =
    Object.assign({}, action, { asyncDispatch });

  next(actionWithAsyncDispatch);
  syncActivityFinished = true;
  flushQueue();
};

export default asyncDispatchMiddleware