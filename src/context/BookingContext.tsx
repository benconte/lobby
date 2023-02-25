import React, { useState, createContext, useEffect } from 'react'
import Router, { useRouter } from "next/router"
import { SnackbarOrigin } from '@mui/material/Snackbar';
import validator from 'validator';

export const BookContext = createContext<any>({})

export interface State extends SnackbarOrigin {
  open: boolean;
}

function BookingContext({ children }: { children: any }) {
  const [hotel, setHotel] = useState<any>()
  const [firstname, setFirstname] = useState<any>('')
  const [lastname, setLastname] = useState<any>('')
  const [email, setEmail] = useState<any>('')
  const [phone, setPhone] = useState<any>()
  const [cardName, setCardName] = useState<any>()
  const [cardNumber, setCardNumber] = useState<any>()
  const [Cardcvv, setCardCvv] = useState()
  const [cardExpiry, setCardExpiry] = useState()
  const [add1, setAddr1] = useState<any>()
  const [add2, setAddr2] = useState<any>()
  const [cardState, setCardState] = useState<any>()
  const [cardProvince, setCardProvince] = useState<any>()
  const [country, setCountry] = useState<any>()
  const [checkInDate, setCheckInDate] = useState<any>()
  const [checkOutDate, setCheckOutDate] = useState<Date>()
  const [price, setPrice] = useState<any>(250)
  const [error, setError] = useState("")
  const [tabIndex, setTabIndex] = useState(1)
  const [success, setSuccess] = useState<any>()

  const router = useRouter()

  const bookHotel = async () => {
    // handle booking logic here
    // and save data to db
    if (!validator.isLength(firstname, { min: 3 }) || !validator.isLength(lastname, { min: 3 }) || !validator.isEmail(email)) {
      setError("Please fill out all the fields")
      alert("Please fill out all the fields")
      return
    }

    fetch("/api/bookHotel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hotel,
        firstname,
        lastname,
        email,
        phone
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.success) {
          setError("")
          setSuccess("Hotel booked sucessfully!")
          router.push("/success")
        }
        else {
          setError(data.message)
          console.log(error)
        }
      })
      .catch(err => {
        setError(err)
        throw new Error(err)
      })
  }

  return (
    <BookContext.Provider value={{
      hotel,
      price,
      setPrice,
      setHotel,
      firstname,
      setFirstname,
      lastname,
      setLastname,
      email,
      setEmail,
      phone,
      setPhone,
      cardName,
      setCardName,
      cardNumber,
      setCardNumber,
      Cardcvv,
      setCardCvv,
      cardExpiry,
      setCardExpiry,
      add1,
      setAddr1,
      add2,
      setAddr2,
      cardState,
      setCardState,
      cardProvince,
      setCardProvince,
      country,
      setCountry,
      checkOutDate,
      setCheckOutDate,
      checkInDate,
      setCheckInDate,
      bookHotel
    }}>
      {children}
    </BookContext.Provider>
  )
}

export default BookingContext