import { useState, FormEventHandler, useEffect } from 'react'
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import Image from "next/image"
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import google_svg from "@/assets/google-svg.png"
import Link from "next/link"
import Router, { useRouter } from "next/router"
import { useSession } from "next-auth/react"

const loginAnimation = require("@/assets/lottiefiles/secure-login.json")

function Register() {
  const [usernameAnimated, setisUsernameAnimated] = useState<boolean>(false)
  const [usernameLabel, setisUsernameLabel] = useState<boolean>(false)

  const [emailLabel, setisEmailLabel] = useState<boolean>(false)
  const [emailAnimated, setisEmailAnimated] = useState<boolean>(false)

  const [passwordLabel, setisPasswordLabel] = useState<boolean>(false)
  const [passwordAnimated, setisPasswordAnimated] = useState<boolean>(false)

  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter()
  const { status } = useSession()


  const animateUsername = () => {
    if (usernameAnimated) { // it is turned on so turn it off
      if (username.length > 0) {
        setisUsernameLabel(true)
      } else {
        setisUsernameLabel(false)
      }
      setisUsernameAnimated(false)
    } else { // it is closed so turn it on
      setisUsernameAnimated(true)
      setisUsernameLabel(true)
    }
  }

  const animateEmail = () => {
    if (emailAnimated) { // it is turned on so turn it off
      if (email.length > 0) {
        setisEmailLabel(true)
      } else {
        setisEmailLabel(false)
      }
      setisEmailAnimated(false)
    } else { // it is closed so turn it on
      setisEmailAnimated(true)
      setisEmailLabel(true)
    }
  }

  const animatePassword = () => {
    if (passwordAnimated) {
      if (password.length > 0) {
        setisPasswordLabel(true)
      } else {
        setisPasswordLabel(false)
      }
      setisPasswordAnimated(false)
    } else {
      setisPasswordAnimated(true)
      setisPasswordLabel(true)
    }
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setIsLoading(true);

    fetch("/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username, email, password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setIsLoading(false);
          setError("")
          setSuccess("Account created successfully!")
          router.push("/auth/signin")
        }
        else {
          setIsLoading(false);
          setError(data.message)
        }
      })
      .catch(err => {
        setIsLoading(false);
        setError(err)
        throw new Error(err)
      })
  }

  useEffect(() => {
    if (status === "authenticated") Router.replace("/");
  }, [status])
  return (
    <div className="w-screen min-h-screen bg-gray-100 py-6 md:py-10 px-5 md:px-28">
      <div className="flex items-start justify-center w-full h-full bg-white rounded-lg overflow-hidden">
        <div className='hidden w-full flex-1 p-10 pb-4 bg-[#375DC2] h-full lg:flex flex-col gap-3 items-center justify-center'>
          <Player
            autoplay
            loop
            src={loginAnimation}
            style={{ width: 300, height: 300, borderRadius: "50%" }}
          >
            <Controls visible={false} />
          </Player>
          <div className="w-8/12 flex flex-col justify-center items-center gap-3 flex-1">
            <h3 className="text-2xl text-white font-bold">
              Lobby is easy to navigate
            </h3>
            <small className="text-base text-[#f7f7f7] text-center flex-1">Now you can navigate throught hotels and restaurants fast and find what you are looking for</small>
            {/* <p className="text-center text-[#f7f7f7] text-sm">
              Whether you are travelling on business or pleasure, we know you have a variety of hotels to choose from. We strive to provide you with a room that is clean and comfortable, with friendly attentive service at a value-conscious price
            </p> */}
            <footer className="w-full mt-14">
              <ul className="flex items-center justify-around">
                <li className='text-sm text-zinc-300 cursor-pointer'>Home</li>
                <li className='text-sm text-zinc-300 cursor-pointer'>Contact</li>
                <li className='text-sm text-zinc-300 cursor-pointer'>About us</li>
                <li className='text-sm text-zinc-300 cursor-pointer'>Discord</li>
                <li className='text-sm text-zinc-300 cursor-pointer'>Instagram</li>
              </ul>
            </footer>
          </div>
        </div>
        <form autoComplete='off' onSubmit={handleSubmit}>
          <div className='flex-1 bg-white p-10 h-auto flex flex-col items-center justify-center'>
            <fieldset className='w-80'>
              <header className='flex flex-col justify-center items-center gap-3'>
                {/* logo */}
                <h1 className='text-3xl text-[#375DC2] font-bold font-LeckerliOne'>Lobby</h1>
                <h3 className="font-bold text-xl text-zinc-600">Welcome!</h3>
                <legend className="text-sm text-gray-400 text-center leading-5">
                  Lobby is the best tool for finding hotels and restaurants near you, we have about 10000 different business around the world.
                  {/* Whether you are travelling on business or pleasure, we know you have a variety of hotels to choose from. We strive to provide you with a room that is clean and comfortable, with friendly attentive service at a value-conscious price */}
                </legend>
              </header>
              <div className="w-full flex flex-col justify-start gap-3 mb-2 mt-10">

                {/* messages */}
                {success.length > 0 &&
                  <p className={`w-full h-9 rounded border-2 border-solid border-gren-300 bg-green-600 text-white text-base flex items-center justify-center font-medium mb-4`}>{success}</p>
                }

                {error.length > 0 &&
                  <p className={`w-full h-9 rounded border-2 border-solid border-red-300 bg-red-500 text-white  text-base flex items-center justify-center font-medium mb-4`}>{error}</p>
                }

                <div className='w-full relative p-0 m-0'>
                  <label className={`absolute duration-200 ${usernameLabel ? "-top-2 text-[#375DC2] bg-white" : "top-3 text-zinc-400"}  font-medium text-sm z-10 leading-none mx-3 p-0 w-auto`} htmlFor="username">Username</label>
                  <div className={`flex items-center  border border-solid ${usernameAnimated ? "border-[#375DC2] bg-white shadow-xl" : "border-gray-200 bg-gray-50"} rounded overflow-hidden `}>
                    <input id="username" name="username" type="text" className="bg-transparent text-base border-none outline-none text-zinc-600 flex-1 h-9 px-3" autoComplete='off' onFocus={animateUsername} onBlur={animateUsername} onChange={(e) => setUsername(e.target.value)} />
                    <PersonOutlineOutlinedIcon className={`text-lg ${usernameAnimated ? "text-[#375DC2]" : "text-zinc-500 "} cursor-pointer mx-2`} onClick={animateUsername} />
                  </div>
                </div>

                <div className='w-full relative p-0 m-0'>
                  <label className={`absolute duration-200 ${emailLabel ? "-top-2 text-[#375DC2] bg-white" : "top-3 text-zinc-400"}  font-medium text-sm z-10 leading-none mx-3 p-0 w-auto`} htmlFor="email">Email</label>
                  <div className={`flex items-center  border border-solid ${emailAnimated ? "border-[#375DC2] bg-white shadow-xl" : "border-gray-200 bg-gray-50"} rounded overflow-hidden `}>
                    <input id="email" name="email" type="email" className="bg-transparent text-base border-none outline-none text-zinc-600 flex-1 h-9 px-3" onFocus={animateEmail} autoComplete="new-password" onBlur={animateEmail} onChange={(e) => setEmail(e.target.value)} />
                    <AlternateEmailIcon className={`text-lg ${emailAnimated ? "text-[#375DC2]" : "text-zinc-500 "} cursor-pointer mx-2`} onClick={animateEmail} />
                  </div>
                </div>

                <div className='w-full relative p-0 m-0'>
                  <label className={`absolute duration-200 ${passwordLabel ? "-top-2 text-[#375DC2] bg-white" : "top-3 text-zinc-400"} font-medium text-sm z-10 leading-none mx-3 p-0 w-auto`} htmlFor="new-pas">password</label>
                  <div className={`flex items-center  border border-solid ${passwordAnimated ? "border-[#375DC2] bg-white shadow-xl" : "border-gray-200 bg-gray-50"} rounded overflow-hidden `}>
                    <input type="password" id="password" name="new-pas" className="bg-transparent text-base border-none outline-none text-zinc-600 flex-1 h-9 px-3" autoComplete="new-password" onFocus={animatePassword} onBlur={animatePassword} onChange={(e) => setPassword(e.target.value)} />
                    <LockOutlinedIcon className={`text-lg ${passwordAnimated ? "text-[#375DC2]" : "text-zinc-500 "} cursor-pointer mx-2`} onClick={animatePassword} />
                  </div>
                </div>
              </div>
              <button type="submit" className='mt-8 mb-4 w-full h-10 text-white rounded-md bg-[#375DC2] hover:bg-[var(--lightblue)] outline-none border-none'>
                {isLoading ? <div className="w-5 h-5 mx-auto border-2 border-solid border-white border-r-transparent rounded-full animate-spin"></div> : 'Sign up'}
              </button>
              {/* <button type="button" className='mb-4 w-full h-10 text-zinc-500 border border-solid border-gray-300 rounded-md bg-white flex items-center gap-3 justify-center outline-none'>
                <Image src={google_svg} alt="nona" width={20} height={20} />
                Sign in with google
              </button> */}

              <p className='w-full flex items-center text-sm text-gray-400 justify-center mt-4 gap-2 text-center'>
                <span>Already have an account? </span>
                <Link href="signin" className="text-[#375DC2]">Sign in</Link>
              </p>
            </fieldset>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register