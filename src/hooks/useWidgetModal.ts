import { useContext } from 'react'
import { WidgetModalContext } from 'contexts/WidgetModalContext'

const useWidgetModal = () => {
  const { open, widget, widgetProps, setWidgetState, modalProps } = useContext(WidgetModalContext)

  return {
    open,
    widget,
    widgetProps,
    setWidgetState,
    modalProps,
  }
}

export default useWidgetModal
