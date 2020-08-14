// import store from '../../store';
// import { changeLoadingStatus } from 'actions/GlobalActions';

// console.log(changeLoadingStatus)
// console.log(store)
// window.store = store;

async function Get(url) {
  let results;
  try {
    // store.dispatch(actions.CONNECT)
    const response = await fetch(url);
    results = response.json();

  } catch (err) {
    throw new Error('Failed to fetch', err)
  }
  // store.dispatch(actions.CONNECT)
  return results
}

export default {
  get: Get
};
