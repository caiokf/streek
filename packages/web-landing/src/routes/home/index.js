import { h } from 'preact'
import styled from 'styled-components'

const Home = () => (
  <div>
    <Background />
    <Overlay />
    <Content>
      <AppName>
        Streek
      </AppName>
    </Content>
  </div>
)

const Background = styled.div`
  background: url('/assets/streek-metrics-tracker-running.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
`
const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  background-image: linear-gradient(120deg, rgba(132, 250, 176, 1) 20%, rgba(143, 211, 244, 0.5) 70%);
`
const Content = styled.div`
  z-index: 2;
  font-family: 'Helvetica Neue';
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
  width: 40vw;
  padding: 100px;
`
const AppName = styled.div`
  font-size: 64px;
  font-weight: bold;
  color: white;
`

export default Home
