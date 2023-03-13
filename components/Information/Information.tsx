import React from 'react'
import AdminList from '../Admin/AdminList'
import BloodRequest from '../BloodRequest/BloodRequest'
import Donors from '../Donors/Donors'
import CauseInfo from './CauseInfo'
import SaveInfo from './SaveInfo'

export default function Information() {
  return (
    <React.Fragment>
        <SaveInfo/>
        <CauseInfo/>
        <BloodRequest/>
        <Donors/>
        <AdminList/>
    </React.Fragment>
  )
}
