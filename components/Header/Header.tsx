import { PropsWithChildren } from 'react'
import Link, { LinkProps } from 'next/link'
import { NavBar } from '@ui/NavBar'
import { Button } from '@ui/Button'

import { PreviewModeBanner } from './PreviewModeBanner'
import LanguageSelector from '@components/LanguageSelector/LanguageSelector'
import { useTranslation } from 'next-i18next'

export function Header() {
  const { t } = useTranslation(['common'])
  return (
    <>
      <PreviewModeBanner />
      <div className="mx-auto" style={{ maxWidth: '98%' }}>
        <NavBar title="🌿 Plantpedia">
          <div className="flex gap-4">
            <NavLink href="/search">{t('search')}</NavLink>
            <NavLink href="/top-stories">Top Stories</NavLink>
            <LanguageSelector />
          </div>
        </NavBar>
      </div>
    </>
  )
}

function NavLink({ children, ...linkProps }: PropsWithChildren<LinkProps>) {
  return (
    <Link {...linkProps} passHref>
      <Button color="inherit" variant="text" component="a">
        {children}
      </Button>
    </Link>
  )
}
