import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import { fetchUsers } from '../client/actions';
import { connect } from 'react-redux';

const Users = ({ users, fetchUsers }) => {
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      <Helmet>
        <title>Users page</title>
        <meta name="description" content="Users page description" />
      </Helmet>
      <h1>Users component</h1>
      <Link to="/">Back to home page</Link>
      <h2>List of users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export const fetchInitialData = (store) => {
  return store.dispatch(fetchUsers());
}

const mapStateToProps = (state) => {
  return { users: state.users }
}

export default {
  fetchInitialData,
  component:  connect(mapStateToProps, { fetchUsers })(Users)
}