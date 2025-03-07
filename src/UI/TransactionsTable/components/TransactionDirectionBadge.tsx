import React from 'react';
import classNames from 'classnames';

import globalStyles from 'assets/sass/main.scss';
import { WithTransactionType } from '../../../UI/types';

import styles from './transactionsTable.styles.scss';

export const TransactionDirectionBadge = ({
  transaction
}: WithTransactionType) => (
  <div className={globalStyles.dFlex}>
    <span
      className={classNames(
        styles.directionBadge,
        transaction.transactionDetails.direction?.toLowerCase()
      )}
    >
      {transaction.transactionDetails.direction?.toUpperCase()}
    </span>
  </div>
);
