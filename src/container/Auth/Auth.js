import React, { useState}  from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../shared/utility';
import * as actions from '../../store/actions/index';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.scss';

const Auth = props=> {
      const [authForm, setAuthForm] = useState({
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Mail Address'
          },
          value: '',
          validation: {
            required: true,
            isEmail: true
          },
          valid: false,
          touched: false
        },
        password: {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'Password'
          },
          value: '',
          validation: {
            required: true,
            minLength: 6
          },
          valid: false,
          touched: false
        }
      });
      const [nameForm, setNameForm] = useState({
        username: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Username'
          },
          value: '',
          validation: {
            required: true,
            minLength: 3
          },
          valid: false,
          touched: false
        }
      });

      const inputChangedHandler = (event, controlName) => {
        if (controlName === 'username') {
          const updatedControls = {
            ...nameForm,
            ...{[controlName]: {
              ...nameForm[controlName],
              ...{value: event.target.value,
                   valid: checkValidity(
                  event.target.value,
                  nameForm[controlName].validation
                ),
                touched: true}}
            }
          };
          setNameForm(updatedControls);
        } else {
          const updatedControls = {
            ...authForm,
            ...{[controlName]: {
              ...authForm[controlName],
              ...{value: event.target.value,
                   valid: checkValidity(
                  event.target.value,
                  authForm[controlName].validation
                ),
                touched: true}}
            }
          };
          setAuthForm(updatedControls);
        };
      };

      const submitHandler = event => {
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value,
                                      props.isSignup, nameForm.username.value);
      };


      const formElementsArray = [];
      if (props.isSignup) {
        formElementsArray.push({
            id: "username",
            config: nameForm["username"]
          });
      };

      for (let key in authForm) {
        formElementsArray.push({
          id: key,
          config: authForm[key]
        });
      }

      let form = formElementsArray.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={event => inputChangedHandler(event, formElement.id)}
        />
      ));

      if (props.loading) {
        form = <Spinner size={"Big"}/>;
      }

      let errorMessage = null;

      if (props.error) {
        errorMessage = <p>{props.error.message}</p>;
      }

      let authRedirect = null;
      if (props.isLogined) {
        authRedirect = <Redirect to={props.authRedirectPath} />;
      }

      return (
        <div className={classes.Auth}>
          {authRedirect}
          <form onSubmit={submitHandler}>
            {form}
            {props.loading? null: <Button btnType="Auth">{props.isSignup? "Signup" : "Login"}</Button>}
          </form>
          {errorMessage}
        </div>
      );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isLogined: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup, name=null) =>
      dispatch(actions.auth(email, password, isSignup, name)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);