
import { useContext } from 'react';
import { ChallengeContext } from '../contents/ChallengesContext';
import { CountdownContext } from '../contents/CountdownContext';

import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){
    /**
     * variavel de contexto, esta usando o meu contexto criado em contents
     * vamos iniciar o startNewChallenge a partir do componente Countdown e
     * vamos conseguir obter essas informações aqui no ChallengeBox 
     */

    //variavel do tipo challenge criado la no nosso context
    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengeContext);
    const { resetCountdown } = useContext(CountdownContext);

    /**
     * funcoes para zerar o tempo quando o usuario clicar ou em falhei ou em completeis
     */
    function handleChallengeSucceeded() {
      completeChallenge();
      resetCountdown();
    }

    //quando clicar em falhei eu reseto o desafio e o tempo
    function handleChallengeFailded() {
      resetChallenge();
      resetCountdown(); 
    }

    return (
        <div className={styles.challengeBoxContainer}>
            {/* se o usuario tiver um activeChallenge ele mostra o content do desafio atual  */}
            { activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header> Ganhe {activeChallenge.amount} xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} />
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button 
                            type="button" 
                            className={styles.challengeFailedButton}
                            onClick={handleChallengeFailded}
                            >
                            Falhei
                        </button>
                        <button 
                            type="button" 
                            className={styles.challengeSucceededButton}
                            onClick={handleChallengeSucceeded}
                            >
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                // se nao ele mostra que o desafio nao esta ativo, ou nao foi iniciado 
                <div className={styles.challengeNotActive}>
                <strong>Finalize um cliclo para receber desafios</strong>
                <p>
                    <img src="icons/level-up.svg" alt="Level Up"/>
                    Avance de level completando desafios
                </p>
            </div>
            )}
        </div>
    );
}