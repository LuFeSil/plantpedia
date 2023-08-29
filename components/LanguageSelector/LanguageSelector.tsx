import React, { useState } from 'react'
import { Button } from '@ui/Button'
import { useRouter } from 'next/router'

const LanguageSelector = () => {
  const { locales, locale } = useRouter()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  if (locales === undefined || locale === undefined) {
    return null
  }

  return (
    <div className="flex flex-col">
      <Button
        id="dropdownAvatarNameButton"
        variant="text"
        className="flex text-sm font-medium text-gray-900 hover:text-blue-600  md:mr-0 px-4 py-2 focus:outline-none items-center"
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <img
          className="w-8 h-8 mr-2"
          src={
            locale === 'en-US'
              ? './united-states-of-america.png'
              : './spain.png'
          }
          alt="language-icon"
        />
        {locale}
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </Button>

      {/* <!-- Dropdown menu --> */}
      <div
        id="dropdownAvatarName"
        className={`z-10 absolute ${
          dropdownOpen ? 'flex' : 'hidden'
        } bg-white divide-y divide-gray-100 rounded-md w-auto`}
        style={{ bottom: '-6rem' }}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
        >
          {locales.map((loc) => {
            return (
              <li key={loc}>
                <form action="/api/language" method="POST">
                  <input name="preferredLocale" value={loc} type="hidden" />
                  <Button
                    type="submit"
                    className="flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white items-center"
                  >
                    <img
                      className="w-8 h-8 mr-2"
                      src={
                        loc === 'en-US'
                          ? './united-states-of-america.png'
                          : './spain.png'
                      }
                      alt="language-icon"
                    />
                    {loc}
                  </Button>
                </form>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default LanguageSelector
