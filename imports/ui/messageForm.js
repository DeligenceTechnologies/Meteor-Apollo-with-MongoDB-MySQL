import React, { Component, PropTypes } from 'react';

export class MessageForm extends Component {

    constructor(props) {
        super(props);

        // bind event handlers to this
        this.submitMessage = this.submitMessage.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        // initialize component refs
        this.messageInput = null;

        // initialize the state
        this.state = {
            message: null,
            database: null
        };
    }

    render() {
        return (
            <div className="row">
                <form className="input-field col s12" onSubmit={this.submitMessage}>
                    <p>
                        <input name="database" type="radio" id="mysql" value="mysql" />
                        <label htmlFor="mysql">MySQL</label>
                    </p>

                    <p>
                        <input name="database" type="radio" id="mongodb" value="mongodb" />
                        <label htmlFor="mongodb">MongoDB</label>
                    </p>
                    
                    <p>
                        <input ref={(c) => this.messageInput = c} placeholder="Message" id="message" type="text" className="form-control" className="validate" onChange={this.handleMessageChange} required />
                    </p>
                </form>
            </div>
        )
    }

    handleMessageChange(event) {
        this.setState({message: event.target.value})
    }

    submitMessage(event) {
        event.preventDefault()
        let databaseName = $("[name='database']:checked").val()
        if(databaseName=="mysql"){           
            this.props.MySQLsubmit(this.state.message);//Invoking mutatiton
            this.messageInput.value = "";
        }else if(databaseName=="mongodb"){           
            this.props.MongoDBsubmit(this.state.message);//Invoking mutatiton
            this.messageInput.value = "";
        }else{
            alert("Please select any one database..!");
        }
    }

}

MessageForm.propTypes = {
    MySQLsubmit: PropTypes.func.isRequired,
    MongoDBsubmit: PropTypes.func.isRequired
};