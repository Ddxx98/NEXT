import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <div>
      <p>&copy; 2023 My E-commerce Store</p>
      <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Footer;
