import { Popover } from 'antd';
import clsx from 'clsx';
import { LanguagesIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import languages from '@/i18n/languages.ts';
import { setLanguage } from '@/libs/storage';

export const Language = () => {
  const { i18n } = useTranslation();

  function changeLanguage(lng: string) {
    if (i18n.language === lng) return;

    i18n.changeLanguage(lng);
    setLanguage(lng);
  }

  const content = (
    <>
      {languages.map((lng) => (
        <div
          key={lng.key}
          className={clsx(
            'flex cursor-pointer select-none items-center space-x-1 rounded px-5 py-1',
            i18n.language === lng.key ? 'text-blue-500' : 'text-white hover:bg-neutral-700'
          )}
          onClick={() => changeLanguage(lng.key)}
        >
          {lng.name}
        </div>
      ))}
    </>
  );

  return (
    <Popover content={content} placement="bottomLeft" trigger="click" arrow={false}>
      <div className="flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded text-neutral-300 hover:bg-neutral-700/70 hover:text-white">
        <LanguagesIcon size={18} />
      </div>
    </Popover>
  );
};
