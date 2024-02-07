import Algorithm from "@/app/ui/Algorithm/Algorithm";
import Song from "@/app/ui/Song/Song";
import { silkscreen, sans } from "@/app/fonts";

export default async function AboutPage() {
  const algoritms: { icon: string; name: string }[] = [
    {
      icon: "bfs",
      name: "BFS",
    },
    {
      icon: "dfs",
      name: "DFS",
    },
    {
      icon: "binary_search",
      name: "Binary Search",
    },
    {
      icon: "two_pointers",
      name: "2 Pointers",
    },
    {
      icon: "backtracking",
      name: "Backtracking",
    },
    {
      icon: "graph",
      name: "Graph",
    },
    {
      icon: "priority_queue",
      name: "Priority Queue",
    },
    {
      icon: "system_design",
      name: "System Design",
    },
    {
      icon: "misc",
      name: "Misc",
    },
  ];
  const songs: {
    name: string;
    artist: string;
    album: string;
    cover: string;
    content: string;
    flipped: boolean;
  }[] = [
    {
      name: "H U N G E R . O N . H I L L S I D E",
      artist: "J. Cole",
      album: "The Off-Season",
      cover: "the_off_season.png",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh viverra non semper suscipit posuere a pede",
      flipped: false,
    },
    {
      name: "The Heart Part 5",
      artist: "Kendrick Lamar",
      album: "Mr. Morale & The Big Steppers",
      cover: "mr-morale-the-big-steppers.webp",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh viverra non semper suscipit posuere a pede",
      flipped: true,
    },
  ];

  return (
    <main>
      <div className="px-1">
        <section className="grid gap-4 mb-12">
          <div className="grid gap-2 md:grid-cols-2">
            <p className={`${silkscreen.className} text-2xl`}>Atlanta, GA</p>
            <div className="md:hidden divider max-w-[200px]"></div>
            <p className={`${silkscreen.className} text-2xl`}>Music Lover</p>
            <div className="md:hidden divider max-w-[100px]"></div>
            <p className={`${silkscreen.className} text-2xl`}>Gamer</p>
            <div className="md:hidden divider max-w-[200px]"></div>
            <p className={`${silkscreen.className} text-2xl`}>
              Black Programmer
            </p>
            <div className="md:hidden divider max-w-[100px]"></div>
          </div>
          <div className="grid gap-4">
            <p className={`${silkscreen.className} text-2xl`}>
              10 years of Javascript
            </p>
            <p className={`${sans.className}`}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
              odio. Quisque volutpat mattis eros. Nullam malesuada erat ut
              turpis. Suspendisse urna nibh viverra non semper suscipit posuere
              a pede
            </p>
          </div>
        </section>
        <section className="mb-24">
          <div className="mb-12 grid gap-4">
            <h1 className={`${silkscreen.className} text-2xl`}>
              Algorithm Progress
            </h1>
            <h2 className={`${silkscreen.className}`}>
              Currently Reading Algomonster
            </h2>
          </div>
          <div>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-y-4">
              {algoritms.map((algo, index) => {
                return (
                  <li className="flex justify-center" key={index}>
                    <Algorithm
                      icon={`/algorithms/${algo.icon}.svg`}
                      name={algo.name}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
        <section>
          <div className="mb-12">
            <h1 className={`${silkscreen.className} text-2xl`}>
              Featured Songs
            </h1>
            <p className={`${sans.className}`}>
              These are some songs that I want to share. These are on my
              rotation
            </p>
          </div>
          <div className="grid gap-4">
            {songs.map((song, index) => {
              return (
                <Song
                  key={index}
                  name={song.name}
                  artist={song.artist}
                  album={song.album}
                  cover={`/albums/${song.cover}`}
                  content={song.content}
                  flipped={song.flipped}
                />
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
