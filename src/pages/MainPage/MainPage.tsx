import Layout from "../Layout"
import styles from "./MainPage.module.scss"

const MainPage = () => {

  return (
    <Layout>
      <div className={styles.content}>
        <h1 className={styles.text}>Банк, который рекомендуют ваши друзья</h1>
        <button>Зарегистрироваться</button>
        <img src="mainpagecard.png" alt="card" />
      </div>
    </Layout>
  )
}

export default MainPage