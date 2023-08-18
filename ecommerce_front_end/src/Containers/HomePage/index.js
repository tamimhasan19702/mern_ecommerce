/**
 * Renders the Home component.
 *
 * @return {JSX.Element} The rendered Home component.
 */

import React from 'react'
import Header from '../../Components/Header'
import MenuHeader from '../../Components/MenuHeader'

export default function HomePage() {
  return (
    <div>
        <Header />
        <MenuHeader />
    </div>
  )
}
