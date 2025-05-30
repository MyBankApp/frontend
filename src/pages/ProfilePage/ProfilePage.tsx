import { useEffect } from "react"
import { userStore } from "../../store/UserStore"
import styles from './ProfilePage.module.scss'
import { observer } from "mobx-react-lite"
import { Link, useNavigate } from "react-router-dom"
import { CircleUserRound } from "lucide-react"

const ProfilePage = () => {
  const navigation = useNavigate()

  useEffect(() => {
    const loadUser = async () => {
      if (!userStore.isAuthenticated) {
        navigation('/login')
        return
      }

      try {
        await userStore.fetchUser()
      } catch (error) {
        navigation('/login')
      }
    }

    loadUser()
  }, [])

  return (
    <div className={styles.page}>
      <h1 className={styles.text}>Добрый день</h1>

      <div className={styles.menu}>
        <Link to={''}>Все транзакции</Link>
        <Link to={''}>Перевод средств</Link>
      </div>

      <div className={styles.account}>
        <CircleUserRound width={40} height={40} />
        <div className={styles.info}>
          <div className={styles.email}>Email: {userStore.user?.email}</div>
          <div className={styles.username}>Username: {userStore.user?.username}</div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.wrapper}>
          <img src="rubble.png" alt="rubble" />
        </div>
        <div className={styles.balance}>
          {userStore.user?.balance} ₽
        </div>
      </div>

    </div>
  )
}

export default observer(ProfilePage)