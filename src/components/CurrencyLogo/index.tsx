import { getAddress } from 'ethers/lib/utils'
import {
  ChainId,
  Currency,
  Token,
  ETHER,
  DEFAULT_CURRENCIES,
  Blockchain,
  FINDORA,
  GOERLI,
  ANVILTESTNET
} from '@oneverseswap/sdk'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import EthereumLogo from '../../assets/images/ethereum-logo.png'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import Logo from '../Logo'
import baseCurrencies from '../../utils/baseCurrencies'
import useBlockchain from '../../hooks/useBlockchain'
import FindoraLogo from '../../assets/images/FINDORA.png'
export function getTokenLogoURL(token: Token): string {
  const address = getAddress(token.address)

  // const tokenExceptions = TOKEN_LOGO_EXCEPTIONS[token.chainId]

  switch (token.chainId) {
    case ChainId.FINDORA:
      return FindoraLogo

    case ChainId.ANVILTESTNET:
      return FindoraLogo

    case ChainId.GOERLI:
      return EthereumLogo

    default:
      return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`
  }
}

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  background-color: ${({ theme }) => theme.white};
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const blockchain = useBlockchain()
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (currency && DEFAULT_CURRENCIES.includes(currency)) return []

    if (currency instanceof Token) {
      const logoUrlLocation = getTokenLogoURL(currency)

      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, logoUrlLocation]
      }
      return [logoUrlLocation]
    }
    return []
  }, [currency, uriLocations])

  if (currency === ETHER) {
    return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} />
  } else {
    const wrappedCurrency = currency instanceof Token ? baseCurrencies(currency.chainId)[1] : undefined
    if (currency === GOERLI) {
      return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} />
    } else if (currency === FINDORA || (currency === wrappedCurrency && blockchain === Blockchain.FINDORA)) {
      return <StyledEthereumLogo src={FindoraLogo} size={size} style={style} />
    } else if (currency === ANVILTESTNET || (currency === wrappedCurrency && blockchain === Blockchain.ANVILTESTNET)) {
      return <StyledEthereumLogo src={FindoraLogo} size={size} style={style} />
    }
  }
  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
}
