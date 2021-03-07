import { useContext } from 'react';
import { CountdownContext } from '../contents/CountdownContext';
import styles from '../styles/components/Countdown.module.css';


export function  Countdown() {
    const { 
      minutes, 
      seconds, 
      hasFinished, 
      resetCountdown, 
      startCountdown, 
      isActive
    } = useContext(CountdownContext);

    /**
     * Converter o valor em string ex: 25 se torna '25'
     * o split separa o '25' em '2' '5'
     * PadStart caso o minuto n tenha 2 caracteres ele vai preencher
     * o restante com 0 ex '5' se torna '05'
     */

    /**
     * essa parte nao foi pro contexto porque nao faz parte da regra
     * da aplicacao. Quem exige esse calculo é o layout.
     */
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [seconsLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    

    return(
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{seconsLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            {
                /* caso tenha terminado, mostrar o botao desabilitado,
                se nao mostrar os botoes de iniciar ciclo e posteriormente 
                abandonar ciclo 
                */
            }

            { hasFinished ? (
                <button
                disabled 
                className={styles.countdownButton}
                >
                Ciclo Encerrado!
                </button>
            ) : (
                <>
                    { isActive ? (
                    <button 
                        type="button" 
                        className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                        onClick={resetCountdown}>
                        Abandonar ciclo
                    </button>
                    ) : (
                    <button 
                        type="button" 
                        className={styles.countdownButton}
                        onClick={startCountdown}>
                        Iniciar um ciclo
                    </button>
                    )}
                </>
            )}
        </div>
    );
}