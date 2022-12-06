import React from 'react'
import HomePage from '../components/home-page/home-page'
import { parse } from 'next-useragent'
import { setIsMobile } from '../store/reducers/context-reducer/context-slice'
import { useDispatch } from 'react-redux'

const Home: React.FC<any> = ({ userAgentString }): React.ReactElement => {
  const dispatch = useDispatch()
  if (userAgentString) {
    dispatch(setIsMobile(parse(userAgentString).isMobile))
  } else {
    dispatch(setIsMobile(parse(window.navigator.userAgent).isMobile))
  }

  return (
    <div>
      <HomePage />
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
