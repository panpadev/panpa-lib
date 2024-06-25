// MODULES
import React from 'react';

// Keep the context update as minimum as possible during the lifecycle of the application.
const state_init = {
  // UI props
  ui_toasts: [],

  // user props
  user_auth: null,
  user: {
    _id: '',
    name: '',
    username: '',
    email: '',
    email_verified: false,
    role: 'user',
    img: '',
    phone: '',
    ref_code: '',
    ref_from: '',
    api_key: '',
    wallet_address: '',
  },

  // wallet props
  wallet_accounts: [],
  wallet_chain_id: 1,
};

export const Context = React.createContext(state_init);

function reducer(state = state_init, action) {
  return {
    ...action,
  };
}

export function Provider({ children }) {
  const [state, set_state] = React.useReducer(reducer, state_init);

  return (
    <Context.Provider value={{ state, set_state }}>{children}</Context.Provider>
  );
}

export default {
  Provider,
  Context,
};

//////////////////////////////
// USAGE
//////////////////////////////
/*
import React from 'react';

// CONTEXT
import { Context } from '../context';

class Home extends React.Component {
  static contextType = Context; // TODO:

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.context.state); => { ui_toasts: [], user_auth: null }

    const new_state = { ...this.context.state, user_auth: true };

    this.context.set_state({ ...new_state });
  }

  componentDidUpdate() {}

  render() {
    return (
      <>
        <Head title="Panpa.dev" desc="" />

        <EditorLayout>Home</EditorLayout>
      </>
    );
  }
}
*/
