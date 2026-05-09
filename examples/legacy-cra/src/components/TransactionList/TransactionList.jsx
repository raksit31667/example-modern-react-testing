import React from 'react'
import { connect } from 'react-redux'
import { fetchTransactions } from '../../redux/actions/transactionActions'
import TransactionCard from '../TransactionCard/TransactionCard'
import styles from './TransactionList.module.css'

class TransactionList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: 'all'
    }
  }

  componentDidMount() {
    this.props.fetchTransactions()
  }

  handleFilterChange = (filterValue) => {
    this.setState({ filter: filterValue })
  }

  getFilteredTransactions() {
    const { transactions } = this.props
    const { filter } = this.state
    
    return filter === 'all'
      ? transactions
      : transactions.filter(transaction => transaction.status === filter)
  }

  render() {
    const { loading, error } = this.props
    const { filter } = this.state
    const filteredTransactions = this.getFilteredTransactions()

    if (loading) {
      return (
        <div className={styles.container}>
          <h2 className={styles.title}>Recent Transactions</h2>
          <div className={styles.loading}>Loading transactions...</div>
        </div>
      )
    }

    if (error) {
      return (
        <div className={styles.container}>
          <h2 className={styles.title}>Recent Transactions</h2>
          <div className={styles.error}>Error: {error}</div>
        </div>
      )
    }

    const filters = [
      { value: 'all', label: 'All' },
      { value: 'pending', label: 'Pending' },
      { value: 'completed', label: 'Completed' },
      { value: 'failed', label: 'Failed' },
    ]

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Recent Transactions</h2>
          <div className={styles.filters}>
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => this.handleFilterChange(f.value)}
                className={`${styles.filterButton} ${
                  filter === f.value ? styles.filterButtonActive : ''
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        {filteredTransactions.length === 0 ? (
          <p className={styles.empty}>No transactions found</p>
        ) : (
          <ul className={styles.list}>
            {filteredTransactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  transactions: state.transactions.list,
  loading: state.transactions.loading,
  error: state.transactions.error,
})

const mapDispatchToProps = {
  fetchTransactions,
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList)
