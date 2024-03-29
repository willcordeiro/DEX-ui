import React, { useRef } from 'react'
//import { Blockchain } from '@oneverseswap/sdk'
//import { Send, Code, MessageSquare, BarChart2, Book, Twitter, Repeat } from 'react-feather'

import { ReactComponent as MenuIcon } from '../../assets/images/menu.svg'
import styled from 'styled-components'
//import CoinGeckoLogo from '../../assets/images/CoinGecko-32x32.png'

import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useToggleModal } from '../../state/application/hooks'

import { ExternalLink } from '../../theme'
//import { ButtonPrimary } from '../Button'

//import useGovernanceToken from '../../hooks/tokens/useGovernanceToken'
//import useBlockchain from '../../hooks/useBlockchain'
//import { ANALYTICS_URLS, DOCS_URLS, BRIDGE_URLS } from '../../constants'

const StyledMenuIcon = styled(MenuIcon)`
  path {
    stroke: ${({ theme }) => theme.text1};
  }
`

const StyledMenuButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg2};

  padding: 0.15rem 0.5rem;
  border-radius: 5px;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
`

const StyledMenu = styled.div`
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`

const MenuFlyout = styled.span`
  min-width: 8.75rem;
  background-color: ${({ theme }) => theme.bg5};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 5px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 4rem;
  right: 0rem;
  z-index: 100;
  text-align: center;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    top: -17.25rem;
  `};
`

const MenuItem = styled(ExternalLink)`
  flex: 1;
  padding: 1rem 1rem;
  color: ${({ theme }) => theme.text2};
  text-decoration: none;
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 8px;
  }
`

export default function Menu() {
  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.MENU)
  const toggle = useToggleModal(ApplicationModal.MENU)
  useOnClickOutside(node, open ? toggle : undefined)

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      <StyledMenuButton onClick={toggle}>
        <StyledMenuIcon />
      </StyledMenuButton>

      {open && (
        <MenuFlyout>
          <MenuItem id="link" href={'https://oneverse.one/'}>
            Website
          </MenuItem>

          <MenuItem id="link" href={'https://oneverse.gitbook.io/oneverse/oneverse/what-is-oneverse'}>
            GitBook
          </MenuItem>

          <MenuItem id="link" href={'https://discord.com/invite/oneverse'}>
            Discord
          </MenuItem>

          <MenuItem id="link" href={'https://twitter.com/oneverseone'}>
            Twitter
          </MenuItem>

          <MenuItem id="link" href={'https://www.facebook.com/oneverse.one/'}>
            Facebook
          </MenuItem>

          <MenuItem id="link" href={'https://t.me/ONEverseONEoff'}>
            Telegram
          </MenuItem>
        </MenuFlyout>
      )}
    </StyledMenu>
  )
}
