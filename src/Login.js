import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Field, reduxForm } from 'redux-form'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    this.formLogin = this.formLogin.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  formLogin(v) {
    alert(v)
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(this.formLogin)}>
                <div>
                    <label>First Name</label>
                    <div>
                    <Field
                        name="firstName"
                        component="input"
                        type="text"
                        placeholder="First Name"
                    />
                    </div>
                </div>
                <Button color="primary" >login</Button>{' '}

        </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default reduxForm({
    form: 'simple' // a unique identifier for this form
  })(Login)