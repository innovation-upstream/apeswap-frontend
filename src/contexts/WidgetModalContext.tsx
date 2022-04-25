import React, { createContext, useState } from 'react'

export type widgetType = 'liquidity'

interface openProps {
  open?: boolean
  widget?: widgetType
  widgetProps?: Record<string, any>
}

interface WidgetModalContextProps {
  widget: widgetType
  open: boolean
  widgetProps?: Record<string, any>
  setWidgetState: (props: openProps) => void
}

export const WidgetModalContext = createContext<WidgetModalContextProps>({
  open: false,
  widget: 'liquidity',
  widgetProps: {},
  setWidgetState: () => null,
})

const WidgetModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [widget, setWidget] = useState<widgetType>('liquidity')
  const [widgetProps, setWidgetProps] = useState<Record<string, any>>({})

  const setWidgetState = (state: openProps) => {
    if (state?.open !== undefined) {
      setOpen(state.open)
    }
    if (state?.widget) {
      setWidget(state.widget)
    }
    if (state?.widgetProps) {
      setWidgetProps({ ...state.widgetProps })
    }
  }

  return (
    <WidgetModalContext.Provider
      value={{
        open,
        widget,
        widgetProps,
        setWidgetState,
      }}
    >
      {children}
    </WidgetModalContext.Provider>
  )
}

export default WidgetModalProvider
