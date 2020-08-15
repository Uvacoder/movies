// TO DO figure out how to add store outisde react component

// import { store }  from '../../store';
// console.log(store)
// import { changeLoadingStatus } from 'actions/GlobalActions';



async function Get(url) {
  let results;
  try {
    // store.dispatch(actions.CONNECT)
    // window.store.dispatch()
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
