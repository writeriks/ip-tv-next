import React from 'react'
import LayoutMain from '../components/layout-main/layout-main'

import { parse } from 'next-useragent'
import { setIsMobile } from '../store/reducers/context-reducer/context-slice'
import { useDispatch } from 'react-redux'

import styles from '../styles/Home.module.scss'

const Home: React.FC<any> = ({ userAgentString }): React.ReactElement => {
  const dispatch = useDispatch()
  if (userAgentString) {
    dispatch(setIsMobile(parse(userAgentString).isMobile))
  } else {
    dispatch(setIsMobile(parse(window.navigator.userAgent).isMobile))
  }

  return (
    <div className={styles.main}>
      <LayoutMain />
    </div>
  )
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      userAgentString: context.req.headers['user-agent'],
    },
  }
}

export default Home
