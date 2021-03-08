import React, { Component } from 'react';
import { connect } from 'react-redux';
import { readChatUser, sendingMessage, updateMessage } from '../../../actions/chatAction';
import { readUserList } from '../../../actions/userAction';
import CIcon from '@coreui/icons-react';

class Chat extends Component {
    constructor(props){
        super(props);
        this.props.readUserList();
        this.inputMessageRef = React.createRef();
        this.sending = () => {
            let message = this.inputMessageRef.current.value;
            this.props.sendingMessage({
                content: message,
                user_id: this.state.id
            });
            this.inputMessageRef.current.value = "";
        }
        this.readChat = (e, id) => {
            this.setState({id: id});
            this.props.readChatUser(id);
            this.props.updateMessage(id);
        }
       
    }

    renderChats() {
        return this.props.chats.map((chat, index) => {
            if (chat.self === true) {
                return <OutgoingMsg message={chat.content} datetime={chat.created_at} key={index}/>
            }
            else {
                return <IncomingMsg message={chat.content} datetime={chat.created_at} key={index}/>
            }
        });
    }

  

    render() {
        return (
            <div className="container-msg">
                <h3 className=" text-center">Messaging</h3>
                <div className="messaging">
                    <div className="inbox-msg">
                        <div className="inbox-people">
                            <HeadindSrch/>
                            <div className="inbox-chat">
                                {
                                    this.props.users.map((user, index) => {
                                        return  <ChatList username={user.name} 
                                                    seletedUser={(e) =>  this.readChat(e, user.id)} 
                                                    key={index}/>
                                    })
                                }
                            </div>
                        </div>
                        <div className="mesgs">
                            <div className="msg-history">
                                {this.renderChats()}
                            </div>
                            <div className="type-msg">
                                <div className="input-msg-write">
                                    <input type="text" className="write-msg" placeholder="Type a message" ref={this.inputMessageRef}/>
                                    <button className="msg-send-btn" type="button" onClick={this.sending}>
                                        <CIcon name="cil-cursor" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const HeadindSrch = () => {
    return (  
        <div className="headind-srch">
            <div className="recent-heading">
                <h4>Recent</h4>
            </div>
            <div className="srch-bar">
                <div className="stylish-input-group">
                    <input type="text" className="search-bar"  placeholder="Search"/>
                    <span className="input-group-addon">
                        <button type="button"> 
                            <i className="fa fa-search" aria-hidden="true"></i> 
                        </button>
                    </span> 
                </div>
            </div>
        </div>
    );
};

const ChatList = (props) => {
    return(
        <div className="chat-list" onClick={props.seletedUser} 
            onDoubleClick={() => console.log('disable double click')}>
            <div className="chat-people">
                <div className="chat-img"> 
                    <img src="https://ptetutorials.com/images/user-profile.png" alt="chatimg" /> 
                </div>
                <div className="chat-ib">
                    <h5>{props.username} <span className="chat-date"></span></h5>
                    <p>
                    </p>
                </div>
            </div>
        </div>
    );
};

const IncomingMsg = (props) => {
    return (  
        <div className="incoming-msg">
            <div className="incoming-msg-img"> 
                <img src="https://ptetutorials.com/images/user-profile.png" alt="chatimg"/> 
            </div>
            <div className="received-msg">
                <div className="received-withd-msg">
                    <p>
                        {props.message}
                    </p>
                    <span className="time-date"> 
                        {props.datetime}
                    </span>
                </div>
            </div>
        </div>
    );
};

const OutgoingMsg = (props) => {
    return (
        <div className="outgoing-msg">
            <div className="outcoming-msg-img"> 
                <img src="https://ptetutorials.com/images/user-profile.png" alt="chatimg"/> 
            </div>
            <div className="sent-msg">
                <p>
                    {props.message}
                </p>
                <span className="time_date">
                    {props.datetime}
                </span> 
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return { chats : state.chats, users : state.users };
};

export default connect(mapStateToProps, { 
    readChatUser, 
    sendingMessage,
    readUserList,
    updateMessage
})(Chat);
