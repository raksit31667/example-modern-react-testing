import React from 'react'
import styles from './TransactionCard.module.css'

function TransactionCard({ transaction }) {
  return (
    <li className={styles.item}>
      <div className={styles.info}>
        <span className={styles.description}>{transaction.description}</span>
        <span className={styles.date}>{transaction.date}</span>
      </div>
      <div className={styles.details}>
        <span className={styles.amount}>${transaction.amount.toFixed(2)}</span>
        <span className={`${styles.status} ${styles[transaction.status]}`}>
          {transaction.status}
        </span>
      </div>
    </li>
  )
}

export default TransactionCard
