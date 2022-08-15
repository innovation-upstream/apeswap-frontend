/** @jsxImportSource theme-ui */
import React from 'react'
import useIsMobile from 'hooks/useIsMobile'
import MarketingSwipper from './MarketingSwipper'
import CardView from './CardView'

// HOW TO IMPLEMENT GENKI MODAL
// - Create a custom hook that pushes “?modal=tutorial” to history.search if localStorage item “displayModal” is true.
// - Call this hook in homepage
// - Add a checkbox for “Please don’t show this modal again” to the GENKI modal
// - On click of the checkbox, get location item “displayModal” and set it to false
// - Now when the user visits the homepage again with same browser, the modal won’t be displayed
// - If modal doesn’t display on first load (set localStorage item “displayModal” to true on first load of homepage”

const QuestModal: React.FC<{ onDismiss: () => void }> = ({ onDismiss }) => {
  const isMobile = useIsMobile()

  return isMobile ? <MarketingSwipper onDismiss={onDismiss} /> : <CardView onDismiss={onDismiss} />
}

export default React.memo(QuestModal)
