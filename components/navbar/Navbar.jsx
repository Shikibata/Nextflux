import { useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import { magic } from "@/lib/magic-client";

import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { FaArrowDown } from 'react-icons/fa'

const NavBar = (props) => {
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false)
  //const [username, setUsername] = useState("");
  const [didToken, setDidToken] = useState('')
  const router = useRouter()

  useEffect(() => {
    async function getUsername() {
      try {
        const { email } = await magic.user.getMetadata();
        if (email) {
          setUsername(email);
        }
      } catch (error) {
        console.log("Error retrieving email:", error);
      }
    }
    getUsername();
  }, []);


  const handleOnClickHome = (e) => {
    e.preventDefault()
    router.push('')
  }

  const handleOnClickMyList = (e) => {
    e.preventDefault()
    router.push('/browse/my-list')
  }

  const handleShowDropdown = (e) => {
    e.preventDefault()
    setShowDropdown(!showDropdown)
  }

  const handleSignout = async (e) => {
    e.preventDefault();

    try {
      await magic.user.logout();
      console.log(await magic.user.isLoggedIn());
      router.push("/login");
    } catch (error) {
      console.error("Error logging out", error);
      router.push("/login");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
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

        <ul className={styles.navItems}>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button
              className={styles.usernameButton}
              onClick={handleShowDropdown}
            >
              <p className={styles.username}>{username}</p>
              <FaArrowDown />
            </button>

            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <a className={styles.linkName} onClick={handleSignout}>
                    Sign out
                  </a>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default NavBar