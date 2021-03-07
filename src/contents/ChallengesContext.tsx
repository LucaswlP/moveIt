import { createContext, ReactNode, useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

//usando o typescript para o retorno da função ser mais inteligente

//formato do nosso challenge
interface Challenge{
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

//para poder ser usado la na funcao de countdown
interface ChallengesContextData {
  level: number;
  currentExperience: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge:() => void;
  completeChallenge:() => void;
  closeLevelUpModal:() => void;
}

//tipo do nosso children usado no parametro do ChallengerProvider
interface ChallengesProviderProps {
  //reactNode porque o nosso children é um componente react
  children: ReactNode;
  level: number,
  currentExperience: number,
  challengesCompleted: number,
}



//aqui vamos usar um contexto para trabalhar com a comunicação entre componentes.
//ChallengesContextData é o formato usado pelo nosso contexto como mencionado na 
//interface acima
export const ChallengeContext = createContext({} as ChallengesContextData);

// usando children la no _app.tsx
//o ...rest é um operador javascript quer dizer que eu ainda tenho 3 props sobrando la no ChallengesProviderProps
export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
  //comecando com o level 1, se o rest.level não existir eu coloco 1
  const [level, setLevel] = useState(rest.level ?? 1);

  //experiencia atual do usuario
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);

  //tanto de desafios que o usuario completou
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

  //estado para armazenar o nosso challenge random, e é iniciado como nulo 
  const [activeChallenge, setActiveChallenge] = useState(null);

  //variavel para armazenar quando de xp falta pro proximo level, baseado no level atual
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2); // o * 4 é o fator de dificuldade, quanto maior mais dificil

  //mudar o modal somente quando o usuario upar de nivel
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);

  //pedir permissão para mandar notificações
  useEffect(() => {
    Notification.requestPermission();

    //quando a gente passa um array vazio no segundo parametro, ele é executado uma unica vez quando o componente é exibido em tela 
  },[])

  //dados que eu vou armazenar nos cookies
  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  },[level, currentExperience, challengesCompleted])

  //funcao para imcrementar o level
  function levelUp() {
    setLevel(level + 1);
    setIsLevelModalOpen(true);
  }

  //funcao para fechar o modal
  function closeLevelUpModal() {
    setIsLevelModalOpen(false);
  }


  //funcao de novo desafio
  function startNewChallenge() {
    //acesso os challenges e faço um random com eles e arredondo o valor retornado 
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    //aqui eu tenho o meu challenge aleatorio
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    //se a permissao foi dada, envia um novo desafio!
    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉🎉',{
        body: `Valendo ${challenge.amount} xp!`
      })
    }
  }

  //funcao para resetar nosso desafio no caso de falha
  function resetChallenge() {
    setActiveChallenge(null);
  }

  //funcao para finalizar o desafio
  function completeChallenge() {
    //se nao tiver desafio ativo eu retorno
    if (!activeChallenge) {
      return;
    }

    //xp do desafio atual que ta ativo
    const { amount } = activeChallenge;

    //experiencia final recebe a experiencia atual mais o xp do desafio atual
    let finalExperience = currentExperience + amount;


    /**
     * Lógica para upar de nivel
     * eu tenho 80 de xp e preciso de 120 pra upar
     * ganho 80 de xp + 80 de xp atual fico com 160 de xp
     * upo de nivel e fico com 160 - 120 que é 40 de xp
     */

     // se meu xp passou o xp final , chamo a funcao levelUp
     if(finalExperience >= experienceToNextLevel){
       finalExperience = finalExperience - experienceToNextLevel;
       levelUp();
     }

     setCurrentExperience(finalExperience); // a experiencia atual fica a experiencia final
     setActiveChallenge(null); // o desafio é encerrado
     setChallengesCompleted(challengesCompleted + 1); //incremento o meu numero de desafios

  }
  
  //funcao com os nossos metodos e variaveis para serem usados por outros componentes
  return (
    // Colocando a aplicação dentro de um contexto
    // para podermos trabalhar com comunicação
    // entre todos os componentes
    // no value consigo mandar diversos valores que podem ser
    // usado la nos componentes
    // e dentro do contexto por ultimo temos o modal de quando a gente upar de level
    <ChallengeContext.Provider 
      value={{ 
        level, 
        currentExperience,
        experienceToNextLevel, 
        challengesCompleted, 
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
      }}>
      {children}
      { isLevelModalOpen && <LevelUpModal />} 
    </ChallengeContext.Provider>
  );
}