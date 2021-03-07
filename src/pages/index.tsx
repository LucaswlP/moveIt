
// home page da nossa aplicação, essa index vira o home do nosso site
// aqui que o usuario ve quando ele acessa o site

import Head from 'next/head';

//funcao do next para trabalharmos melhor com cookies do lado do servidor
import { GetServerSideProps } from 'next'

//componentes
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperianceBar";
import { Profile } from '../components/Profile';
import { ChallengeBox } from "../components/ChallengeBox";


//styles
import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contents/CountdownContext';
import { ChallengesProvider } from '../contents/ChallengesContext';

//criando interfacr para os nossos props do getServerSideProps para nao ficarem como any
interface HomeProps{
  level: number,
  currentExperience: number,
  challengesCompleted: number,
}

export default function Home(props: HomeProps) {
  console.log(props)
  //mandando os props do nosso getServerSideProps para o nosso challenges provider com a intenção de carregalos ao dar f5
  return (
    <ChallengesProvider level={props.level} currentExperience={props.currentExperience} challengesCompleted={props.challengesCompleted}>
    <div className={styles.container}>
      <Head>
        <title>Inicio | MoveIt </title>
      </Head>
      <ExperienceBar />

      <CountdownProvider>
        <section>
          <div>
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountdownProvider>
    </div>
    </ChallengesProvider>

  )
}

//para manipular quais dados são repassados do next pro front
//com ele vai ser possivel passar alguns dados para o nosso cookie
//e vamos deixar ele salvo la mesmo se a pessoa fechar o navegador
//porque estamos usando os cookies do lado do servidor
export const getServerSideProps: GetServerSideProps = async ( ctx ) => {
  //seek nos cookies
  const {level, currentExperience, challengesCompleted } = ctx.req.cookies;

  //convertendo as strings em numeros
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}


