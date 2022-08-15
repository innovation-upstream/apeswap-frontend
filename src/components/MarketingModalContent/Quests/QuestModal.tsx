/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import useIsMobile from 'hooks/useIsMobile'
import MarketingSwipper from './MarketingSwipper'
import CardView from './CardView'
import { SET_DEFAULT_MODAL_KEY, SHOW_DEFAULT_MODAL_KEY } from 'config/constants'

// HOW TO IMPLEMENT GENKI MODAL
// - Create a custom hook that pushes “?modal=tutorial” to history.search if localStorage item “displayModal” is true.
// - Call this hook in homepage
// - Add a checkbox for “Please don’t show this modal again” to the GENKI modal
// - On click of the checkbox, get location item “displayModal” and set it to false
// - Now when the user visits the homepage again with same browser, the modal won’t be displayed
// - If modal doesn’t display on first load (set localStorage item “displayModal” to true on first load of homepage”

// User visits homepage
// Has default modal been set before??
// -> YES (Not first time user is visiting homepage) -> Read the `isShowDefaultModal` preference and display modal accordingly
// -> NO (User visiting homepage for the first time) ->
// Display the modal

const QuestModal: React.FC<{ onDismiss: () => void }> = ({ onDismiss }) => {
  const isMobile = useIsMobile()
  const [defaultShow, setDefaultShow] = useState(false)

  const setDefaultNoShow = () => {
    localStorage.setItem(SET_DEFAULT_MODAL_KEY, JSON.stringify('TRUE'))
    localStorage.removeItem(SHOW_DEFAULT_MODAL_KEY)
    setDefaultShow(!defaultShow)
  }

  return isMobile ? (
    <MarketingSwipper onDismiss={onDismiss} setDefaultNoShow={setDefaultNoShow} defaultShow={defaultShow} />
  ) : (
    <CardView onDismiss={onDismiss} />
  )
}

export default React.memo(QuestModal)
