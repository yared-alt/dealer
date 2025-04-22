import ContactUs from "@/components/Contact/ContactUs";
import type { Metadata } from 'next';


import React from 'react'

export const metadata:Metadata={
  title: "Contact"
}
function page() {
  return (
    <div>
      {/* <ContactHero/> */}
      <ContactUs/>
    </div>
  )
}

export default page
