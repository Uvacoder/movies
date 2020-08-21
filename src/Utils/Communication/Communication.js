// TO DO figure out how to add store outisde react component

// import { store }  from '../../store';
import { changeLoadingStatus } from 'actions/GlobalActions';

async function Get(url) {
  let results;
  try {
    // window.store.dispatch(changeLoadingStatus())
    const response = await fetch(url);
    results = response.json();

  } catch (err) {
    throw new Error('Failed to fetch', err)
  }
  return results
}

export default {
  get: Get
};
