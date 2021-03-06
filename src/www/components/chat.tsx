import * as React from 'react';
import { Container } from 'react-fbmessenger';
import { connect, Dispatch } from 'react-redux';

import { State, Conversations } from '../redux/store';
import { sendText, sendPostback } from '../redux/actions';

interface Props {
  conversation: Conversations;
  userid: string;
  token: string;
  sendText: (userid: string, token: string, text: string) => void;
  sendPostback: (userid: string, token: string, payload: string) => void;
}

const mapStateToProps = function(store: State) {
  return {
    userid: store.userid,
    token: store.token,
    conversation: store.conversation,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<State>) => {
  return {
    sendText: (userid: string, token: string, text: string) => sendText(userid, token, text)(dispatch),
    sendPostback: (userid: string, token: string, payload: string) => sendPostback(userid, token, payload)(dispatch),
  };
};

class Chat extends React.Component<Props, undefined> {
  constructor(props: Props) {
    super(props);
    this.sendText = this.sendText.bind(this);
    this.sendPostback = this.sendPostback.bind(this);
  }

  private sendText(text: string) {
    this.props.sendText(this.props.userid, this.props.token, text);
  }

  private sendPostback(payload: string, text: string) {
    this.props.sendPostback(this.props.userid, this.props.token, payload);
  }

  public render() {
    return (
      <Container
        page_id={'0'}
        conversation = {this.props.conversation}
        persistentMenu = {null}
        postbackCallback = {this.sendPostback}
        userTextCallback = {this.sendText}
        textFocusCallback = {defaultFocusCallback}
        textBlurCallback = {defaultBlurCallback}
      />
    );
  }
}

export const defaultPostbackCallback = (payload: string, text: string) => {
  return;
};
export const defaultFocusCallback = () => {
  return;
};
export const defaultBlurCallback = () => {
  return;
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
