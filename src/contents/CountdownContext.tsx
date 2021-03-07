/**
 * Contexto criado para ser usado dentro do countdown e para ser acessiveis a outros componentes
 */
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengeContext } from "./ChallengesContext";

/**
 * interface de tipagem do nosso countdown
 */
interface CountdawnContextData {
  minutes: number;
  seconds: number;
  hasFinished: Boolean;
  isActive: Boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
  
}

interface CountdownProviderProps{
  children : ReactNode;
}

export const CountdownContext = createContext({} as CountdawnContextData);

//variavel necessaria para o delay do nosso time
let countdownTimeout : NodeJS.Timeout;

export function CountdownProvider( {children} : CountdownProviderProps) {
  /**
     * variaveis de contexto, esta usando o meu contexto criado em ChallengesContents
  */

  //contexto da funcao de novo desafio
  const { startNewChallenge } = useContext(ChallengeContext);

  //declarando um estado com o meu tempo -- 25 * 60
  const [time, setTime] = useState(25 * 60);

  //estado que armazena se o nosso countdown está ativo ou não, e ele inicia em false
  const [isActive, setIsActive] = useState(false);

  //tem terminado, finalizou
  const [hasFinished, setHasFinished] = useState(false);

  //aqui vou ter os minutos e o Math.floor arredonda para nao vir quebrado.
  const minutes = Math.floor(time / 60);

  //segundos = resto da divisao
  const seconds = time % 60;

  //função para decrementar 1 segundo do nosso tempo
  function startCountdown() {
    setIsActive(true);
    startNewChallenge();
  }

  //função para resetar o timer
  //limpa o delay do segundo com o clearTimeout
  //o botao nao esta mais ativo
  // ele volta o tempo original
  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(25 * 60);
    setHasFinished(false);
  }

  /**
  * useEffect = efeito colateral antes de algo ser executado
  * recebe 2 parametros, uma funcao e o segundo parametro é
  * quando eu quero executar, o momento, ou seja vou executar uma
  * função sempre quando o valor do active mudar.
  */
  useEffect(() => {
    /**
     * se o tempo ta ativo e o time for maior que 0
     * ou seja o tempo ainda nao foi zerado, eu vou
     * fazer um settimeout, ou seja, eu quero que algo
     * aconteça depois de um tempo, vou executar uma fun-
     * ção depois de 1 segundo, que é a função de reduzir
     * o time em 1 segundo. se não se o botao ta ativo e zerou
     * entao terminou e o setIsActive agora é falso porque acabou
     */
    if (isActive && time > 0) {
        countdownTimeout = setTimeout(() => {
            setTime(time -1);
        },1000)
    } else if (isActive && time === 0) {
        setHasFinished(true); //agora terminou o tempo
        setIsActive(false); //acabou , não está mais ativo
        startNewChallenge(); //dou inicio a um novo challenge
    }
  }, [isActive, time])

  return(
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown,
    }}>
      {children}
    </CountdownContext.Provider>
  );
  
}