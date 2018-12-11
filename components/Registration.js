import React from 'react'
import { connect } from 'react-redux'
import { closeModal, getUser } from '../store'
import history from '../history'
//import CreditCardInput from 'react-credit-card-input';
import MailchimpSubscribe from "react-mailchimp-subscribe"

const mailChimpUrl = "https://hbwevents.us18.list-manage.com/subscribe/post?u=8118fd69874c52c9d1df04277&amp;id=7ff1de4427";

// a basic form
const CustomForm = ({ status, message, onValidated, callback }) => {
    let email, name;
    const submit = () =>
        email &&
        name &&
        email.value.indexOf("@") > -1 &&
        onValidated({
            EMAIL: email.value,
            NAME: name.value
        });

    return (
        <div>
            {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
            {status === "error" && (
                <div
                    style={{ color: "red" }}
                    dangerouslySetInnerHTML={{ __html: message }}
                />
            )}
            {status === "success" && (
                <div
                    style={{ color: "green" }}
                    dangerouslySetInnerHTML={{ __html: message }}
                />
            ) && callback()}
            <input
                ref={node => (name = node)}
                type="text"
                placeholder="Your name"
            />
            <br />
            <input
                ref={node => (email = node)}
                type="email"
                placeholder="Your email"
            />
            <br />
            <button onClick={submit}> Submit </button>
        </div>
    );
};

class Registration extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signup: true,
            payment: false,
            signupFirst: "",
            signupLast: "",
            signupEmail: "",
            signupPassword: "",
            signupPasswordConfirm: "",
            loginName: "",
            loginPassword: "",
            ccNum: "",
            ccExp: "",
            cvc: "",
            billingFirst: "",
            billingLast: "",
            billingAddress: "",
            billingUnit: "",
            billingCity: "",
            billingState: "",
            billingZip: ""
        }
        this.goToPayment = this.goToPayment.bind(this)
        this.goBackToSignup = this.goBackToSignup.bind(this)
        this.login = this.login.bind(this)
        this.escFunction = this.escFunction.bind(this)

        this.handleSignupFirst = this.handleSignupFirst.bind(this)
        this.handleSignupLast = this.handleSignupLast.bind(this)
        this.handleSignupEmail = this.handleSignupEmail.bind(this)
        this.handleSignupPassword = this.handleSignupPassword.bind(this)
        this.handleSignupPasswordConfirm = this.handleSignupPasswordConfirm.bind(this)

        this.handleLoginName = this.handleLoginName.bind(this)
        this.handleLoginPassword = this.handleLoginPassword.bind(this)

        this.handleBillingFirst = this.handleBillingFirst.bind(this)
        this.handleBillingLast = this.handleBillingLast.bind(this)
        this.handleBillingAddress = this.handleBillingAddress.bind(this)
        this.handleBillingUnit = this.handleBillingUnit.bind(this)
        this.handleBillingCity = this.handleBillingCity.bind(this)
        this.handleBillingState = this.handleBillingState.bind(this)
        this.handleBillingZip = this.handleBillingZip.bind(this)

        this.handleCardNumberChange = this.handleCardNumberChange.bind(this)
        this.handleCardExpiryChange = this.handleCardExpiryChange.bind(this)
        this.handleCardCVCChange = this.handleCardCVCChange.bind(this)

        this.checkoutConfirm = this.checkoutConfirm.bind(this)
    }

    componentDidMount() {
        document.addEventListener("keydown", this.escFunction, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }

    escFunction(event) {
        if (event.keyCode === 27) {
            this.props.closeModal()
        }
    }

    goToPayment() {
        this.setState({ payment: true })
    }

    goBackToSignup() {
        this.setState({ payment: false })
    }

    login() {
        this.props.getUser("John")
        this.props.closeModal()
        history.push(`/dashboard`)
    }

    checkoutConfirm() {
        this.login() //temporary usage
        // should do validation here
        let ccInfo = {
            billingFirst: this.state.billingFirst,
            billingLast: this.state.billingLast,
            billingAddress: this.state.billingAddress,
            billingUnit: this.state.billingUnit,
            billingCity: this.state.billingCity,
            billingState: this.state.billingState,
            billingZip: this.state.billingZip,
            ccNum: this.state.ccNum,
            ccExp: this.state.ccExp,
            cvc: this.state.cvc
        }
        //can use axio post
        console.log(ccInfo)
    }

    //Event handlers for sign up
    handleSignupFirst(event) { this.setState({ signupFirst: event.target.value }) }
    handleSignupLast(event) { this.setState({ signupLast: event.target.value }) }
    handleSignupEmail(event) { this.setState({ signupEmail: event.target.value }) }
    handleSignupPassword(event) { this.setState({ signupPassword: event.target.value }) }
    handleSignupPasswordConfirm(event) { this.setState({ signupPasswordConfirm: event.target.value }) }

    //Event handlers for log in
    handleLoginName(event) { this.setState({ loginName: event.target.value }) }
    handleLoginPassword(event) { this.setState({ loginPassword: event.target.value }) }

    //Event handlers for billing address
    handleBillingFirst(event) { this.setState({ billingFirst: event.target.value }) }
    handleBillingLast(event) { this.setState({ billingLast: event.target.value }) }
    handleBillingAddress(event) { this.setState({ billingAddress: event.target.value }) }
    handleBillingUnit(event) { this.setState({ billingUnit: event.target.value }) }
    handleBillingCity(event) { this.setState({ billingCity: event.target.value }) }
    handleBillingState(event) { this.setState({ billingState: event.target.value }) }
    handleBillingZip(event) { this.setState({ billingZip: event.target.value }) }

    //Event handlers for cc info
    handleCardNumberChange(cardNumber) { this.setState({ ccNum: cardNumber }) }
    handleCardExpiryChange(expiry) { this.setState({ ccExp: expiry }) }
    handleCardCVCChange(cvc) { this.setState({ cvc: cvc }) }

    render() {

        self = this;

        return (
            <div id="registration-modal">
                <div id="signup-form" className="sign-up-subscribe">
                    <h5>Sign up</h5>
                    <span className="nl-top-space check"></span>
                    <MailchimpSubscribe
                        url={mailChimpUrl}
                        render={({ subscribe, status, message }) => (
                            <CustomForm
                                status={status}
                                message={message}
                                onValidated={formData => subscribe(formData)}
                                callback={self.login}
                            />
                        )}
                    />
                    {/*<Mailchimp
                        action='https://hbwevents.us18.list-manage.com/subscribe/post?u=8118fd69874c52c9d1df04277&amp;id=7ff1de4427'
                        fields={[
                            {
                                name: 'FNAME',
                                placeholder: 'name',
                                type: 'text',
                                required: true
                            },
                            {
                                name: 'EMAIL',
                                placeholder: 'info@hbwevents.com',
                                type: 'email',
                                required: true
                            }
                        ]}
                    />*/}
                    <div className="exit-btn" onClick={this.props.closeModal}>X</div>
                </div>
                {/*{
                    !this.state.payment &&
                    <div id="signup-form">
                        <div className="btn-container">
                            <button className={this.state.signup ? "signup-tab" : "signup-tab-inactive"} type="submit" onClick={() => this.setState({ signup: true })}>Sign Up</button>
                            <button className={this.state.signup ? "signup-tab-inactive" : "signup-tab"} type="submit" onClick={() => this.setState({ signup: false })}>Log In</button>
                        </div>
                        {
                            this.state.signup ?
                                <div className="input-container">
                                    <p>You'll be able to execute tradings after you create your account</p>
                                    <input type="text" value={this.state.signupFirst} placeholder="First Name" onChange={this.handleSignupFirst} />
                                    <input type="text" value={this.state.signupLast} placeholder="Last Name" onChange={this.handleSignupLast} />
                                    <input type="text" value={this.state.signupEmail} placeholder="Email" onChange={this.handleSignupEmail} />
                                    <input type="text" value={this.state.signupPassword} placeholder="Password" onChange={this.handleSignupPassword} />
                                    <input type="text" value={this.state.signupPasswordConfirm} placeholder="Password Confirmation" onChange={this.handleSignupPasswordConfirm} />
                                    <p className="disclaimer">*By signing up you agree to our Terms and Conditions</p>
                                    <button type="submit" className="start-btn" onClick={this.goToPayment}>SIGN UP</button>
                                    <button type="submit" className="google-btn"><img src="./assets/google-logo.png" />SIGN IN WITH GOOGLE</button>
                                </div>
                                :
                                <div className="input-container">
                                    <p>Welcome Back</p>
                                    <input type="text" value={this.state.loginName} placeholder="Username" onChange={this.handleLoginName} />
                                    <input type="text" value={this.state.loginPassword} placeholder="Password" onChange={this.handleLoginPassword} />
                                    <button type="submit" className="start-btn" onClick={this.login}>LOG IN</button>
                                </div>
                        }
                        <div className="exit-btn" onClick={this.props.closeModal}>X</div>
                    </div>
                }

                {
                    this.state.payment &&
                    <div id="payment-form">
                        <h5>Welcome to Panda Analytics</h5>
                        <h6>Please add a payment method</h6>
                        <p className="disclaimer">* monthly subscription</p>
                        <div className="cc-container">
                            <div>
                                <p>Billing Address</p>
                                <div className="input-container">
                                    <input type="text" value={this.state.billingFirst} placeholder="First Name" onChange={this.handleBillingFirst} />
                                    <input type="text" value={this.state.billingLast} placeholder="Last Name" onChange={this.handleBillingLast} />
                                    <input type="text" value={this.state.billingAddress} placeholder="Address" onChange={this.handleBillingAddress} size="30" />
                                    <input type="text" value={this.state.billingUnit} placeholder="Unit" onChange={this.handleBillingUnit} size="10" />
                                    <input type="text" value={this.state.billingCity} placeholder="City" onChange={this.handleBillingCity} />
                                    <input type="text" value={this.state.billingState} placeholder="State" onChange={this.handleBillingState} />
                                    <input type="text" value={this.state.billingZip} placeholder="Zip Code" onChange={this.handleBillingZip} />
                                </div>
                            </div>
                            <div>
                                <p>Credit Card</p>
                                <CreditCardInput
                                    cardNumberInputProps={{ value: this.ccNum, onChange: this.handleCardNumberChange }}
                                    cardExpiryInputProps={{ value: this.ccExp, onChange: this.handleCardExpiryChange }}
                                    cardCVCInputProps={{ value: this.cvc, onChange: this.handleCardCVCChange }}
                                    fieldClassName="input"
                                />
                            </div>
                        </div>
                        <p className="disclaimer">Include details of payment process. Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                sed diem nonummy nibh euismod tincidunt ut lacreet dolore magna aliguam erat volutpat.
                Ut wisis enim ad minim veniam, quis nostrud exerci tution ullam corper suscipit
                lobortis nisi ut aliquip ex ea commodo consequat.</p>
                        <p className="skip" onClick={this.goBackToSignup}>Go back.</p>
                        <button type="submit" className="start-btn" onClick={this.checkoutConfirm}>CONFIRM</button>
                        <div className="exit-btn" onClick={this.props.closeModal}>X</div>
                    </div>
                }*/}
            </div>
        )
    }
}

const mapState = state => ({})
const mapDispatch = dispatch => {
    return {
        closeModal: () => dispatch(closeModal()),
        getUser: (user) => dispatch(getUser(user))
    }
}

export default connect(mapState, mapDispatch)(Registration);