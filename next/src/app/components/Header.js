import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  return (
    <header>
      <h1>My E-commerce Store</h1>
      <Image src="/bird_2.jpg" alt="Store Logo" width={100} height={100} />
      <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
