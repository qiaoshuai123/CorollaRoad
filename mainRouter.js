import InterworkingHome from './containers/InterworkingHome/InterworkingHome/InterworkingHome'
import SignalStatus from './containers/InterworkingHome/SignalStatus/SignalStatus'
import Regional from './containers/InterworkingHome/Regional/Regional'
import Abnormalwarning from './containers/InterworkingHome/Abnormalwarning/Abnormalwarning'
import Evaluation from './containers/InterworkingHome/Evaluation/Evaluation'
import Regtion from './containers/InterworkingHome/Regtion/Regtion'
import Surveillance from './containers/InterworkingHome/Surveillance/Surveillance'
import Trafficanalysis from './containers/InterworkingHome/Trafficanalysis/Trafficanalysis'
import Monitoring from './containers/InterworkingHome/Monitoring/Monitoring'

const routes =
  [
    // { path: '/404', component: Errors },
    // {
    {
      path: '/',
      exact: true,
      component: InterworkingHome,
    },
    {
      path: '/interworkingHome',
      component: InterworkingHome,
      routes: [
        { path: '/interworkingHome/signalStatus', component: SignalStatus },
        { path: '/interworkingHome/Regional', component: Regional },
        { path: '/interworkingHome/Abnormalwarning', component: Abnormalwarning },
        { path: '/interworkingHome/Evaluation', component: Evaluation },
        { path: '/interworkingHome/Regtion', component: Regtion },
        { path: '/interworkingHome/Surveillance', component: Surveillance },
        { path: '/interworkingHome/Trafficanalysis', component: Trafficanalysis },
        { path: '/interworkingHome/Monitoring', component: Monitoring },
      ],
    },

  ]
export default routes
