//impoetando o css la dos componentes
//esse metodo ajuda a separação do css de cada componente 
import { useContext } from 'react';
import { ChallengeContext } from '../contents/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
  
  //pegando o xp atual e o xp para o proximo level la do contexto
  const { currentExperience, experienceToNextLevel } = useContext(ChallengeContext);

  //barra de progresso do nosso level
  const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;
  
    return(
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                {/* a largura da barra de progresso, aumenta de acordo com o nosso %, muito loco */}
                <div style={{ width: `${percentToNextLevel}%` }}/>
                <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>
                    {currentExperience} xp
                </span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    );
}