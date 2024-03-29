import { useCurrentChampionship } from '@/hooks/use-current-championship';
import { useRanking } from '@/hooks/use-ranking';
import { Link } from 'react-router-dom';

export default function RankingPage() {
  const championship = useCurrentChampionship();
  const { players } = useRanking();

  return (
    <div className="mx-auto max-w-5xl mt-6 sm:px-6 lg:px-8">
      <header className="text-center sm:text-left">
        <div>
          <h1 className="text-xl font-semibold leading-tight tracking-tight">
            {championship?.completed
              ? `Abschlusstabelle ${championship.name}`
              : `Aktuelle Tabelle ${championship?.name}`}
          </h1>
          {players.length === 0 && (
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">
              Es sind noch keine Mitspieler angemeldet.
            </p>
          )}
        </div>
      </header>
      {players.length > 0 && (
        <div className="pt-6">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 pl-2 pr-4 sm:px-6">
                  Platz
                </th>
                <th scope="col" className="py-3 px-4 sm:px-6">
                  Name
                </th>
                {championship?.completed === true && (
                  <th scope="col" className="py-3 px-4 sm:px-6">
                    <span className="hidden sm:inline">Zusatzpunkte</span>
                    <span className="sm:hidden">Zusatzpkt</span>
                  </th>
                )}
                <th scope="col" className="py-3 px-4 sm:px-6">
                  {championship?.completed ? (
                    <>
                      <span className="hidden sm:inline">Gesamtpunkte</span>
                      <span className="sm:hidden">Gesamt</span>
                    </>
                  ) : (
                    <span>Punkte</span>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, playerIdx, players) => {
                const currentRank =
                  playerIdx === 0
                    ? '1.'
                    : player.rank !== players[playerIdx - 1].rank
                    ? `${player.rank}.`
                    : '';
                return (
                  <tr
                    key={player.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white"
                  >
                    <td className="px-6 text-right">{currentRank}</td>
                    <td className="py-3 px-6 w-full">
                      <Link
                        to={`../spieler/${player.playerId}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        {player.name}
                      </Link>
                    </td>
                    {championship?.completed === true && (
                      <td className="px-6 text-right">{player.extraPoints}</td>
                    )}
                    <td className="px-6 text-right">{player.totalPoints}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
