import { h } from 'preact'
import style from './style'

const Home = () => (
  <div>
    <div class={style.background} />
    <div class={style.overlay} />
    <div class={style.content}>
      <div class={style.appname}>
        Streek
      </div>
    </div>
  </div>
)

export default Home
