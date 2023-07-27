import React, { MouseEvent } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

import globalStyles from 'assets/sass/main.scss';
import { useClearTransactionsToSignWithWarning } from 'hooks/transactions/helpers/useClearTransactionsToSignWithWarning';
import { SignModalPropsType } from 'types';
import { ModalContainer } from 'UI/ModalContainer/ModalContainer';
import { PageState } from 'UI/PageState';

import styles from './signWithWalletV2ModalStyles.scss';

export const SignWithWalletV2Modal = ({
  handleClose,
  error,
  transactions,
  sessionId,
  className = 'dapp-walletV2-modal',
  modalContentClassName
}: SignModalPropsType) => {
  const clearTransactionsToSignWithWarning =
    useClearTransactionsToSignWithWarning();

  const classes = {
    wrapper: classNames(styles.modalContainer, styles.walletV2, className),
    icon: globalStyles.textWhite,
    closeBtn: classNames(
      globalStyles.btn,
      globalStyles.btnCloseLink,
      globalStyles.btnDark,
      globalStyles.textWhite,
      globalStyles.mt2
    )
  };

  const description = error
    ? error
    : transactions && transactions.length > 1
    ? 'Check your WalletV2 Crypto Wallet to sign the transactions'
    : 'Check your WalletV2 Crypto Wallet to sign the transaction';

  const close = (event: MouseEvent) => {
    event.preventDefault();
    handleClose();
    clearTransactionsToSignWithWarning(sessionId);
  };

  return (
    <ModalContainer
      onClose={handleClose}
      modalConfig={{
        modalDialogClassName: classes.wrapper
      }}
      modalInteractionConfig={{
        openOnMount: true
      }}
    >
      <PageState
        icon={error ? faTimes : null}
        iconClass={classes.icon}
        className={modalContentClassName}
        iconBgClass={error ? globalStyles.bgDanger : globalStyles.bgWarning}
        iconSize='3x'
        title='Confirm on WalletV2 Crypto Wallet'
        description={description}
        action={
          <button
            id='closeButton'
            data-testid='closeButton'
            onClick={close}
            className={classes.closeBtn}
          >
            Close
          </button>
        }
      />
    </ModalContainer>
  );
};
