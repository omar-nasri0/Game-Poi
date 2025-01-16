'use client';
import { SearchIcon } from 'lucide-react';
import React, { useEffect, useState, useMemo } from 'react';
import TypeGame from './../../../lib/TypeGame';
import { GetGame } from '../getGame/GetGame';
import { useRouter } from 'next/navigation';

function Search() {
  const [games, setGames] = useState<TypeGame[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter(); // استخدام useRouter للتوجيه

  useEffect(() => {
    async function getGame() {
      try {
        const response = await GetGame({ platform: [21, 4, 187], page_size: 40 });
        setGames(response.results || []);
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setIsLoading(false);
      }
    }
    getGame();
  }, []);

  // فلترة الألعاب بناءً على المدخل
  const filteredGames = useMemo(() => {
    return games.filter((game) =>
      game.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [games, search]);

  const handleGameClick = () => {
    setSearch(''); 
    router.push(`/category/4`); // التوجيه إلى المسار الجديد
  };

  return (
    <section className="flex flex-col w-[70%]">
      {/* حقل البحث */}
      <div className="group flex items-center gap-2 justify-between border border-input w-[60%] rounded-xl bg-[#333839] py-2 px-4">
        <input
          className="bg-transparent text-gray-50 border-none w-full active:outline-none ring-0 placeholder:text-gray-400 focus:outline-none focus:border-none"
          type="text"
          placeholder="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <div>
          <SearchIcon className="cursor-pointer group-hover:text-rose-500 duration-200" />
        </div>
      </div>

      {/* عرض النتائج فقط عند كتابة نص */}
      {search && (
        <div
          className="w-[60%] max-h-[150px] py-3 pl-3 rounded-xl overflow-y-auto flex flex-col gap-2 bg-gray-800"
          style={{ maxHeight: '150px' }}
        >
          {isLoading ? (
            <p>Loading games...</p>
          ) : filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <div
                key={game.id}
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-600 cursor-pointer"
                onClick={() => handleGameClick()} // توجيه إلى المنصة الأولى
              >
                <img
                  src={game.background_image}
                  alt={game.name}
                  className="w-30 h-20 object-contain rounded-lg"
                />
                <h3 className="text-gray-50">{game.name}</h3>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No games found.</p>
          )}
        </div>
      )}
    </section>
  );
}

export default Search;
