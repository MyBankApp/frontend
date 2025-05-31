import { useEffect } from "react"
import { userStore } from "../../store/UserStore"
import styles from './ProfilePage.module.scss'
import { observer } from "mobx-react-lite"
import { Link, useNavigate } from "react-router-dom"
import { ArrowRight, CreditCard, Send } from "lucide-react"

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
      <div className={styles.header}>
        <h1 className={styles.title}>Ваш профиль</h1>
      </div>

      <div className={styles.balanceCard}>
        <div className={styles.cardHeader}>
          <CreditCard size={24} />
          <span>Основной счёт</span>
        </div>
        <div className={styles.cardBalance}>
          {userStore.user?.balance.toLocaleString('ru-RU')} ₽
        </div>
        <div className={styles.cardFooter}>
          <span>Доступно</span>
          <div className={styles.cardActions}>
            <button className={styles.actionButton}>
              <Send size={18} />
              Перевод
            </button>
          </div>
        </div>
      </div>

      <div className={styles.menu}>
        <Link to={'/transactions'} className={styles.menuItem}>
          <div className={styles.menuIcon}>
            <CreditCard size={20} />
          </div>
          <span>История операций</span>
          <ArrowRight size={20} className={styles.arrow} />
        </Link>

        <Link to={'/'} className={styles.menuItem}>
          <div className={styles.menuIcon}>
            <Send size={20} />
          </div>
          <span>Перевод средств</span>
          <ArrowRight size={20} className={styles.arrow} />
        </Link>
      </div>

      <div className={styles.userInfo}>
        <div className={styles.infoItem}>
          <span>Электронная почта</span>
          <span className={styles.infoValue}>{userStore.user?.email}</span>
        </div>
        <div className={styles.infoItem}>
          <span>Имя пользователя</span>
          <span className={styles.infoValue}>{userStore.user?.username}</span>
        </div>
      </div>
    </div>
  )
}

export default observer(ProfilePage)