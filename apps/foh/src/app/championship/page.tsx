import { Navigate } from 'react-router-dom';
import { useCurrentChampionship } from '@/hooks/use-current-championship';
import Card from '@/components/container/card';

export default function ChampionshipPage() {
  const currentChampionship = useCurrentChampionship();

  return currentChampionship ? (
    // v1: Display decent championship page
    // <div>
    //   <header>
    //     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    //       <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
    //         {currentChampionship.name}
    //       </h1>
    //     </div>
    //   </header>
    //   <div>
    //     <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
    //       {/* Replace with your content */}
    //       <div className="px-4 py-8 sm:px-0">
    //         <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
    //       </div>
    //       {/* /End replace */}
    //     </div>
    //   </div>
    // </div>
    <Navigate to="tabelle" />
  ) : (
    <div className="px-2">
      <Card>
        <div className="flex flex-col gap-y-4">
          <h2 className="px-4 text-3xl font-semibold">Haus23 Tipprunde</h2>
          <hr />
          <div className="px-4 text-lg">
            Hier entsteht unsere neue Tipprunde - also zumindest die
            Online-Auswertung. Bis allerdings erste Tabellenstände tatsächlich
            hier auf Abruf stehen, dauert es noch eine kleine Weile.
          </div>
        </div>
      </Card>
    </div>
  );
}
