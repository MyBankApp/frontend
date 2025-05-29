import { useNavigate } from "react-router-dom"
import Layout from "../Layout"
import styles from "./MainPage.module.scss"

const MainPage = () => {
  const navigation = useNavigate()


  return (
    <Layout>
      <div className={styles.content}>
        <h1 className={styles.text}>Банк, который рекомендуют ваши друзья</h1>
        <button onClick={() => navigation("/register")}>Зарегистрироваться</button>
        <img src="mainpagecard.png" alt="card" />
      </div>
    </Layout>
  )
}

export default MainPage