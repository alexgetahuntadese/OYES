'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { useI18n } from '../../lib/i18n-context';

export function Header() {
  const { t, locale, changeLocale, locales } = useI18n();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            {t('appName')}
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              {t('nav.dashboard')}
            </Link>
            <Link href="/projects" className="text-gray-600 hover:text-gray-900">
              {t('nav.projects')}
            </Link>
            <Link href="/beneficiaries" className="text-gray-600 hover:text-gray-900">
              {t('nav.beneficiaries')}
            </Link>
            <select
              value={locale}
              onChange={(e) => changeLocale(e.target.value as any)}
              className="px-2 py-1 border border-gray-300 rounded text-sm"
            >
              {locales.map((loc) => (
                <option key={loc} value={loc}>
                  {loc.toUpperCase()}
                </option>
              ))}
            </select>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                {t('auth.login')}
              </Button>
              <Button size="sm">{t('auth.signUp')}</Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
