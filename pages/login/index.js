import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import {useEffect, useState} from 'react'
import styles from './Login.module.css'
import { useRouter } from "next/router";
import {magic} from "@/lib/magic-client";

export default function Index() {
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [userMsg, setUserMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const handleOnChangeEmail = (e) => {
    setUserMsg('')
    console.log('event', e)
    const email = e.target.value
    setEmail(email)
  }

  const handleLoginWithEmail = async (e) => {
    e.preventDefault()
    setIsLoading(true);

    if (email) {
      if (email === 'hloic@outlook.com') {
        //  login a user by their email
        try {
          const didToken = await magic.auth.loginWithMagicLink({
            email,
          })
          console.log({ didToken })
          if (didToken) {
            setIsLoading(false);
            router.push("/");
          }
        } catch (error) {
          // Handle errors if required!
          console.error("Something went wrong logging in", error);
          setIsLoading(false);
        }
      } else {
        // show user message
        setIsLoading(false);
        setUserMsg('Enter a valid email address')
      }
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix SignIn</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link className={styles.logoLink} href="/" legacyBehavior>
            <a>
              <div className={styles.logoWrapper}>
                <Image
                  src="/assets/netflix.svg"
                  alt="Netflix logo"
                  width="128"
                  height="32"
                />
              </div>
            </a>
          </Link>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>

          <input
            type="text"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
          />

          <p className={styles.userMsg}></p>
          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </main>
    </div>
  )
}
