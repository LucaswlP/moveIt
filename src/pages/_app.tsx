import '../styles/global.css'

// import { ChallengesProvider } from '../contents/ChallengesContext';

function MyApp({ Component, pageProps }) {
  return(
    //componente contexto
    // <ChallengesProvider>
        <Component {...pageProps} />
    // </ChallengesProvider>
  );
}

export default MyApp

// arquivo pra reaproveitar a estrutura previa entre todas as paginas da nossa aplicação.
