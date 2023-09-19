import { ITags } from '../../types';
import styles from './tag.module.scss';

export const Tag = ({ tag, tagsCount }: ITags) => {
  const [colorTag] = tag.split(' ');

  return (
    <>
      <span className={`${styles.tag} ${styles[colorTag]} `}>{tag}</span>
      {tagsCount > 1 && (<span className={styles.multiple}>+{tagsCount - 1}</span>)}
    </>
  )
}
