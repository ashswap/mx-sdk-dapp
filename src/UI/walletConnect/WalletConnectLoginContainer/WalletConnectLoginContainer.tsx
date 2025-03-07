import React, { useRef } from 'react';

import { useWalletConnectV2Login } from 'hooks/login/useWalletConnectV2Login';
import { ModalContainer } from 'UI/ModalContainer';

import { WalletConnectLoginModalPropsType } from './types';
import styles from './walletConnectLoginContainerStyles.scss';
import { WalletConnectLoginContent } from './WalletConnectLoginContent';

export const WalletConnectLoginContainer = (
  props: WalletConnectLoginModalPropsType
) => {
  const {
    onClose,
    className,
    showLoginContent,
    wrapContentInsideModal,
    callbackRoute,
    token,
    nativeAuth,
    onLoginRedirect,
    logoutRoute
  } = props;

  const canLoginRef = useRef<boolean>(true);

  const [, , { cancelLogin }] = useWalletConnectV2Login({
    callbackRoute,
    token,
    nativeAuth,
    onLoginRedirect,
    logoutRoute,
    canLoginRef
  });

  const onCloseModal = async () => {
    await cancelLogin();
    onClose?.();
  };

  if (showLoginContent === false) {
    return null;
  }

  if (!wrapContentInsideModal) {
    return <WalletConnectLoginContent {...props} canLoginRef={canLoginRef} />;
  }

  return (
    <ModalContainer
      className={className}
      modalConfig={{
        headerText: 'Login using the xPortal App',
        showHeader: true,
        modalContentClassName: styles.xPortalModalDialogContent,
        modalHeaderClassName: styles.xPortalModalHeader,
        modalHeaderTextClassName: styles.xPortalModalHeaderText,
        modalCloseButtonClassName: styles.xPortalModalCloseButton,
        modalBodyClassName: styles.xPortalModalBody,
        modalDialogClassName: styles.xPortalLoginContainer
      }}
      onClose={onCloseModal}
    >
      <WalletConnectLoginContent {...props} canLoginRef={canLoginRef} />
    </ModalContainer>
  );
};
