import React, { ReactNode } from 'react';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { LoginButton } from 'UI/LoginButton/LoginButton';
import {
  useExtensionLogin,
  UseExtensionLoginPropsType
} from '../../../hooks/login/useExtensionLogin';
import { WithClassnameType } from '../../types';
import styles from './extensionLoginButtonStyles.scss';

export interface ExtensionLoginButtonPropsType
  extends UseExtensionLoginPropsType,
    WithClassnameType {
  children?: ReactNode;
  buttonClassName?: string;
  loginButtonText?: string;
  disabled?: boolean;
}

export const ExtensionLoginButton = ({
  token,
  className = 'dapp-extension-login',
  children,
  callbackRoute,
  buttonClassName,
  loginButtonText = 'Maiar DeFi Wallet',
  onLoginRedirect,
  onSignatureReceived,
  disabled
}: ExtensionLoginButtonPropsType) => {
  const [onInitiateLogin] = useExtensionLogin({
    callbackRoute,
    token,
    onLoginRedirect,
    onSignatureReceived
  });

  const isFirefox = navigator.userAgent.indexOf('Firefox') != -1;
  const classes = {
    noExtensionButtonWrapper: classNames(
      styles.noExtensionButtonWrapper,
      className
    ),
    noExtensionButtonContent: styles.noExtensionButtonContent,
    noExtensionButtonTitle: styles.noExtensionButtonTitle,
    noExtensionButtonIcon: styles.noExtensionButtonIcon
  };

  const handleLogin = () => {
    onInitiateLogin();
  };

  return !window.elrondWallet ? (
    <a
      rel='noreferrer'
      href={
        isFirefox
          ? 'https://addons.mozilla.org/en-US/firefox/addon/maiar-defi-wallet/'
          : 'https://chrome.google.com/webstore/detail/dngmlblcodfobpdpecaadgfbcggfjfnm?authuser=0&hl=en'
      }
      target='_blank'
      className={classes.noExtensionButtonWrapper}
    >
      {children || (
        <div className={classes.noExtensionButtonContent}>
          <div className={classes.noExtensionButtonTitle}>
            Maiar DeFi Wallet
          </div>
          <FontAwesomeIcon
            className={classes.noExtensionButtonIcon}
            icon={faArrowRight}
          />
        </div>
      )}
    </a>
  ) : (
    <LoginButton
      onLogin={handleLogin}
      className={className}
      btnClassName={buttonClassName}
      text={loginButtonText}
      disabled={disabled}
    >
      {children}
    </LoginButton>
  );
};
