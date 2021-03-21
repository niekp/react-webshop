import React from 'react';

import './sign-up.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
    }

    handleChange = e => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            createUserProfileDocument(user, { displayName });

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });

        } catch (e) {
            console.error('Error signing up', e);
        }
        
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state;

        return(
            <div className='sign-up'>
                <h2 className='title'>I do not have a account</h2>
                <span>Sign up with your email and password</span>

                <form className='sign-up-form' onSubmit={this.handleSubmit}>

                    <FormInput
                        label='Display Name' 
                        name='displayName' 
                        type='text' 
                        value={displayName} 
                        handleChange={this.handleChange}
                        required 
                    />

                    <FormInput
                        label='Email' 
                        name='email' 
                        type='text' 
                        value={email} 
                        handleChange={this.handleChange}
                        required 
                    />

                    <FormInput 
                        label='Password'
                        name='password' 
                        type='password' 
                        value={password} 
                        handleChange={this.handleChange}
                        required 
                    />
                    
                    <FormInput 
                        label='Confirm password'
                        name='confirmPassword' 
                        type='password' 
                        value={confirmPassword} 
                        handleChange={this.handleChange}
                        required 
                    />

                    <div className='buttons'>
                        <CustomButton type='submit'>Sign up</CustomButton>
                    </div>

                </form>
            </div>
        );
    }

}

export default SignUp;
