/* 
default

invented

google sign in
*/
// import './button.styles.scss';
import { BaseButton, GoogleSingInButton, InvertedButton } from './button.styles';

// const BUTTON_TYPE_CLASSES = {
//     base: 'base',
//     google: 'google-sign-in',
//     inverted: 'inverted'
// }

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google',
    inverted: 'inverted'
}

const getButton = (buttonType = 'base') => (
    {
        // [BUTTON_TYPE_CLASSES.base] : BaseButton,
        // [BUTTON_TYPE_CLASSES.google] : GoogleSingInButton,
        // [BUTTON_TYPE_CLASSES.inverted] : InvertedButton
        base : BaseButton,
        google : GoogleSingInButton,
        inverted : InvertedButton
    }[buttonType]
);

const Button = ({children, buttonType, ...otherProps}) => {
    const CustomButton = getButton(buttonType);
    // return <CustomButton className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
    return <CustomButton
    {...otherProps}
    >{children}</CustomButton>
};

export default Button;