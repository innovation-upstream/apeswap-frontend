import { useContext } from 'react'
import { WidgetModalContext } from 'contexts/WidgetModalContext'

const useWidgetModal = () => {
  const { open, widget, widgetProps, setWidgetState } = useContext(WidgetModalContext)

  return {
    open,
    widget,
    widgetProps,
    setWidgetState,
  }
}

export default useWidgetModal
