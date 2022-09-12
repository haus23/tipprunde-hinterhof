import { Disclosure } from '@headlessui/react';
import {
  ChevronDownIcon,
  PencilSquareIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';

import Button from '@/components/button';
import TextField from '@/components/form/text-field';
import { Player } from '@/model/domain/player';
import AppCard from '@/components/layout/app-card';

const players: Player[] = [
  { id: '1', name: 'Wolfgang', slug: 'wolfgang', email: '' },
  { id: '2', name: 'Birgit', slug: 'Birgit', email: '' },
  { id: '3', name: 'Marko', slug: 'Marko', email: '' },
  { id: '4', name: 'Kerstin', slug: 'Kerstin', email: '' },
  { id: '5', name: 'Christian', slug: 'wolfgang', email: '' },
  { id: '6', name: 'Anna', slug: 'Anna', email: '' },
  { id: '7', name: 'Thomas', slug: 'Thomas', email: '' },
  { id: '8', name: 'Olli', slug: 'Olli', email: '' },
  { id: '9', name: 'Chris', slug: 'Chris', email: '' },
  { id: '10', name: 'Micha', slug: 'micha', email: 'micha@haus23.net' },
];

export default function PlayersView() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Spieler</h2>
      <div className="mt-5">
        <Disclosure
          as="div"
          className="shadow sm:overflow-hidden rounded-md bg-white"
        >
          <Disclosure.Button className="w-full flex items-center justify-between px-4 py-2 font-semibold">
            <span>Neuer Spieler</span>
            <ChevronDownIcon className="h-5 w-5 ui-open:rotate-180 ui-open:transform" />
          </Disclosure.Button>
          <Disclosure.Panel>
            <form noValidate>
              <div className="space-y-4 p-4">
                <TextField label="Name" required />
                <TextField label="Kennung" required />
                <TextField label="Email" />
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6 space-x-4">
                <Disclosure.Button as={Button}>Abbrechen</Disclosure.Button>
                <Button primary type="submit">
                  Speichern
                </Button>
              </div>
            </form>
          </Disclosure.Panel>
        </Disclosure>
      </div>
      <AppCard>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="w-12 pl-4 pr-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                >
                  Nr
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="hidden sm:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Kennung
                </th>
                <th
                  scope="col"
                  className="hidden sm:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pr-6 lg:pr-8"
                >
                  Email
                </th>
                <th scope="col" className="py-3.5 pl-3 sm:pl-6 lg:pl-8">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white pr-1">
              {players.map((p) => (
                <tr key={p.id}>
                  <td className="whitespace-nowrap text-right pr-3 py-4 text-sm font-medium text-gray-900">
                    {p.id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {p.name}
                  </td>
                  <td className="hidden sm:table-cell whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {p.slug}
                  </td>
                  <td className="hidden sm:table-cell whitespace-nowrap py-4 pl-3 pr-4 text-sm text-gray-500 sm:pr-6 lg:pr-8">
                    {p.email}
                  </td>
                  <td className="text-right pr-3">
                    <Button>
                      <PencilIcon className="h-4 w-4 text-indigo-600 hover:text-indigo-900" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AppCard>
    </div>
  );
}