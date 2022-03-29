
export enum ConnectorNames {
  Injected = "injected",
  WalletConnect = "walletconnect",
  BSC = "bsc",
  Walletlink = "Walletlink",
}

export type Login = (connectorId: ConnectorNames) => void;

