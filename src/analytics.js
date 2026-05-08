import ReactGA from 'react-ga4'

export const initGA = () => {
  ReactGA.initialize('G-G77DNBHF5F') // replace with your ID
}

export const trackPageView = (path) => {
  ReactGA.send({ hitType: 'pageview', page: path })
}