import { Fragment, useCallback, useEffect, useState } from 'react';
import { FolderIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import { Championship } from 'lib';
import { useChampionships } from '@/hooks/use-championships';
import { useMatches, useNavigate } from 'react-router-dom';
import { classNames } from '@/utils/class-names';

export default function ChampionshipSwitcher() {
  const championships = useChampionships();

  const childPath =
    useMatches().find((route) => route.handle?.childPath !== undefined)?.handle
      ?.childPath || '';

  const navigate = useNavigate();

  const [query, setQuery] = useState('');

  const [open, setOpen] = useState(false);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === 'k' && event.ctrlKey) {
      event.preventDefault();
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const filteredChampionships =
    query === ''
      ? championships
      : championships?.filter((championship) =>
          championship.name.toLowerCase().includes(query.toLowerCase())
        ) || [];

  function switchChampionship(championship: Championship) {
    setOpen(false);
    navigate(`/${championship.id + childPath}`);
  }

  return (
    <>
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
        >
          <MagnifyingGlassIcon className="w-5 h-5" aria-hidden="true" />
          <span className="sr-only">Turnier</span>
        </button>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="hidden md:flex items-center gap-x-2 p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700"
        >
          <MagnifyingGlassIcon className="w-5 h-5" aria-hidden="true" />
          <span>Turnier</span>
        </button>
      </div>
      <Transition.Root
        show={open}
        as={Fragment}
        afterLeave={() => setQuery('')}
        appear={true}
      >
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-25 dark:bg-gray-700 dark:bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="mx-auto max-w-xl transform rounded-xl bg-white dark:bg-gray-800 p-2 shadow-2xl ring-1 ring-black dark:ring-gray-800 ring-opacity-5 transition-all">
                <Combobox onChange={switchChampionship}>
                  <Combobox.Input
                    className="w-full rounded-md border-0 bg-gray-100 dark:bg-gray-700 px-4 py-2.5 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Turnier"
                    onChange={(event) => setQuery(event.target.value)}
                  />
                  {filteredChampionships.length > 0 && (
                    <Combobox.Options
                      static={true}
                      className="-mb-2 max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800 dark:text-gray-300"
                    >
                      {filteredChampionships.map((championship) => (
                        <Combobox.Option
                          key={championship.id}
                          value={championship}
                          className={({ active }) =>
                            classNames(
                              'cursor-default select-none rounded-md px-4 py-2',
                              active && 'bg-indigo-600 text-white'
                            )
                          }
                        >
                          {championship.name}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  )}

                  {query !== '' && filteredChampionships.length === 0 && (
                    <div className="py-14 px-4 text-center sm:px-14">
                      <FolderIcon
                        className="mx-auto h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                      <p className="mt-4 text-sm text-gray-900 dark:text-gray-200">
                        Kein Turnier passt zu der Suche.
                      </p>
                    </div>
                  )}
                </Combobox>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
