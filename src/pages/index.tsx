import React from 'react';
import styles from './index.less';
import {getCookie} from '@/utils'
const username = getCookie('username')
export default () => {
  if (!username) return '加载中...'
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}
