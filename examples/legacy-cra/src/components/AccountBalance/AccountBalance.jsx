import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAccountBalance } from '../../redux/actions/accountActions'
import styles from './AccountBalance.module.css'

class AccountBalance extends Component {
  componentDidMount() {
    this.props.fetchAccountBalance()
  }

  render() {
    const { balance, loading, error } = this.props

    if (loading) {
      return (
        <div className={styles.container}>
          <div className={styles.loading}>Loading balance...</div>
        </div>
      )
    }

    if (error) {
      return (
        <div className={styles.container}>
          <div className={styles.error}>Error: {error}</div>
        </div>
      )
    }

    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Account Balance</h2>
        <p className={styles.amount}>${balance.toFixed(2)}</p>
        <p className={styles.subtitle}>Available Balance</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  balance: state.account.balance,
  loading: state.account.loading,
  error: state.account.error,
})

const mapDispatchToProps = {
  fetchAccountBalance,
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountBalance)
