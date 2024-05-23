import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Country from '../components/country'

test('Load and displays Country', async () => {
  render(<Country />)
  expect(await screen.findByText('Country')).toBeVisible()
})

test('Enter prefix and load matching countries', async() => {
  const user = userEvent.setup()
  render(<Country />)
  const countryNameField = screen.getByPlaceholderText('Country')

  await user.type(countryNameField, 'Aus')

  expect(countryNameField).toHaveValue('Aus')
  const austriaButton = await screen.findByText('Austria')
  expect(austriaButton).toBeInTheDocument()
})