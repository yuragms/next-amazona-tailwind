import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { getError } from '../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true };
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };

    default:
      return state;
  }
}

function AdminUsersScreen() {
  const [{ loading, error, users, successDelete, loadingDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      products: [],
      error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/admin/users`);
                dispatch({type: 'FETCH_SUCCESS', payload: data}) 
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) }); 
            }
            if (successDelete) {
                dispatch({type: 'DELETE_RESET'}) 
            } else {
                fetchData();
            }
        }
        },[successDelete]

  return <div>users</div>;
}

AdminUsersScreen.auth = { adminOnly: true };
export default AdminUsersScreen;
