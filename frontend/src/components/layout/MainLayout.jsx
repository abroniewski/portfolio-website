import PropTypes from 'prop-types';

import styles from './MainLayout.module.css';

const MainLayout = ({ children }) => {
  return (
    <main className={styles.mainLayout}>
      <h1 className={styles.title}>Interactive Portfolio</h1>
      <div className={styles.content}>{children}</div>
    </main>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
