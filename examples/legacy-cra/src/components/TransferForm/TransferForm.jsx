import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createTransaction } from '../../redux/actions/transactionActions'
import styles from './TransferForm.module.css'

function TransferForm({ creating, createError, createTransaction }) {
  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    
    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Amount must be positive'
    }
    
    if (!recipient || recipient.trim() === '') {
      newErrors.recipient = 'Recipient is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validate()) return
    
    createTransaction({
      amount: parseFloat(amount),
      recipient: recipient.trim(),
      description: description.trim() || 'Transfer',
    })
    
    // Reset form on success
    if (!creating && !createError) {
      setAmount('')
      setRecipient('')
      setDescription('')
      setErrors({})
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Transfer Funds</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="amount" className={styles.label}>
            Amount
          </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={styles.input}
            disabled={creating}
          />
          {errors.amount && (
            <span className={styles.errorText}>{errors.amount}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="recipient" className={styles.label}>
            Recipient
          </label>
          <input
            id="recipient"
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className={styles.input}
            disabled={creating}
          />
          {errors.recipient && (
            <span className={styles.errorText}>{errors.recipient}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="description" className={styles.label}>
            Description (Optional)
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.input}
            disabled={creating}
          />
        </div>

        <button
          type="submit"
          disabled={creating}
          className={styles.button}
        >
          {creating ? 'Processing...' : 'Transfer'}
        </button>

        {createError && (
          <div className={styles.error}>
            Transfer failed: {createError}
          </div>
        )}
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  creating: state.transactions.creating,
  createError: state.transactions.createError,
})

const mapDispatchToProps = {
  createTransaction,
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferForm)
