import React, { useMemo, ReactNode } from 'react';

import { SignedTransactionType } from 'types/index';
import { isServerTransactionPending } from 'utils/transactions/transactionStateByStatus';

import {
  TransactionDetailsBody,
  TransactionDetailsBodyPropsType
} from './components';
import styles from './transactionDetails.styles.scss';

export interface TransactionDetailsType {
  title?: ReactNode;
  isTimedOut?: boolean;
  transactions?: SignedTransactionType[];
  className?: string;
}

export const TransactionDetails = ({
  title,
  transactions,
  isTimedOut = false,
  className = 'dapp-transaction-details'
}: TransactionDetailsType) => {
  if (transactions == null) {
    return null;
  }

  const processedTransactionsStatus = useMemo(() => {
    const processedTransactions = transactions.filter(
      (tx) => !isServerTransactionPending(tx?.status)
    );
    const totalTransactions = transactions.length;
    return `${processedTransactions.length} / ${totalTransactions} transactions processed`;
  }, [transactions]);

  return (
    <>
      {title && <div className={styles.title}>{title}</div>}

      <div className={styles.status}>{processedTransactionsStatus}</div>

      {transactions.map(({ hash, status }) => {
        const transactionDetailsBodyProps: TransactionDetailsBodyPropsType = {
          className,
          hash,
          status,
          isTimedOut
        };

        return (
          <TransactionDetailsBody {...transactionDetailsBodyProps} key={hash} />
        );
      })}
    </>
  );
};
