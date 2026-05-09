import React from 'react'
import { render, screen } from '@testing-library/react'
import TransactionCard from './TransactionCard'

describe('TransactionCard', () => {
  const mockTransaction = {
    id: 'txn_1',
    description: 'Payment to vendor',
    amount: 1500.00,
    status: 'completed',
    date: '2024-01-15',
  }

  it('renders transaction description', () => {
    render(<TransactionCard transaction={mockTransaction} />)
    
    expect(screen.getByText('Payment to vendor')).toBeInTheDocument()
  })

  it('renders transaction date', () => {
    render(<TransactionCard transaction={mockTransaction} />)
    
    expect(screen.getByText('2024-01-15')).toBeInTheDocument()
  })

  it('renders formatted amount', () => {
    render(<TransactionCard transaction={mockTransaction} />)
    
    expect(screen.getByText('$1500.00')).toBeInTheDocument()
  })

  it('renders transaction status', () => {
    render(<TransactionCard transaction={mockTransaction} />)
    
    expect(screen.getByText('completed')).toBeInTheDocument()
  })

  it('formats amount with two decimal places', () => {
    const transaction = {
      ...mockTransaction,
      amount: 99.5,
    }
    
    render(<TransactionCard transaction={transaction} />)
    
    expect(screen.getByText('$99.50')).toBeInTheDocument()
  })

  it('renders pending status correctly', () => {
    const transaction = {
      ...mockTransaction,
      status: 'pending',
    }
    
    render(<TransactionCard transaction={transaction} />)
    
    expect(screen.getByText('pending')).toBeInTheDocument()
  })

  it('renders failed status correctly', () => {
    const transaction = {
      ...mockTransaction,
      status: 'failed',
    }
    
    render(<TransactionCard transaction={transaction} />)
    
    expect(screen.getByText('failed')).toBeInTheDocument()
  })

  it('renders as a list item', () => {
    const { container } = render(<TransactionCard transaction={mockTransaction} />)
    
    const listItem = container.querySelector('li')
    expect(listItem).toBeInTheDocument()
  })

  it('displays all transaction information', () => {
    const transaction = {
      id: 'txn_2',
      description: 'Salary deposit',
      amount: 5000.00,
      status: 'completed',
      date: '2024-01-14',
    }
    
    render(<TransactionCard transaction={transaction} />)
    
    expect(screen.getByText('Salary deposit')).toBeInTheDocument()
    expect(screen.getByText('2024-01-14')).toBeInTheDocument()
    expect(screen.getByText('$5000.00')).toBeInTheDocument()
    expect(screen.getByText('completed')).toBeInTheDocument()
  })
})
