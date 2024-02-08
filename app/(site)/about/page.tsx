import Algorithm from "@/app/ui/Algorithm/Algorithm";
import Song from "@/app/ui/Song/Song";
import { silkscreen, sans } from "@/app/fonts";

export default async function AboutPage() {
  const algoritms: { icon: string; name: string; progress: 0 | 1 | 2 }[] = [
    {
      icon: "bfs",
      name: "BFS",
      progress: 1,
    },
    {
      icon: "dfs",
      name: "DFS",
      progress: 1,
    },
    {
      icon: "binary_search",
      name: "Binary Search",
      progress: 2,
    },
    {
      icon: "two_pointers",
      name: "2 Pointers",
      progress: 0,
    },
    {
      icon: "backtracking",
      name: "Backtracking",
      progress: 0,
    },
    {
      icon: "graph",
      name: "Graph",
      progress: 0,
    },
    {
      icon: "priority_queue",
      name: "Priority Queue",
      progress: 0,
    },
    {
      icon: "system_design",
      name: "System Design",
      progress: 0,
    },
    {
      icon: "misc",
      name: "Misc",
      progress: 0,
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
        "Hunger on hillside is the final track of J. Cole's album The Off-Season, released in 2021. It features Bas and James Fauntleroy, and showcases J. Cole's lyrical skills and motivational message. The song reflects on J. Cole's journey from poverty to fame, and how he never gave up on his dreams despite the challenges and temptations. He also encourages his listeners to believe in themselves and pursue their passions, as he raps: \"God has a plan for you / And all you've got to do is believe, believe, believe\". The song has a smooth and soulful production, with a catchy chorus and a powerful outro.",
      flipped: false,
    },
    {
      name: "The Heart Part 5",
      artist: "Kendrick Lamar",
      album: "Mr. Morale & The Big Steppers",
      cover: "mr-morale-the-big-steppers.webp",
      content:
        "The Heart Pt.5 is the fifth and latest song in Kendrick Lamar's The Heart series, released in 2021. It features a sample of Marvin Gaye's I Want You, and showcases Kendrick's rap skills and social commentary. The song reflects on Kendrick's personal and professional struggles, and how he overcame them with his passion and perseverance. He also addresses the issues of racism, violence, and corruption in the society, and urges his fans to follow their dreams and fight for justice, as he raps: \"I wanna represent for us / New revolution was up and movin'\". The song has a smooth and soulful production, with a catchy chorus and a stunning outro. In the last verse, Kendrick pays tribute to Nipsey Hussle, the LA rapper who was killed in 2019, by speaking from his perspective and offering words of comfort and wisdom to his loved ones, as he raps: \"I completed my mission, wasn't ready to leave / But fulfilled my days, my creator was pleased\". The Heart Pt.5 is a must listen to for anyone who appreciates hip-hop music and inspirational stories.",
      flipped: true,
    },
  ];

  return (
    <main>
      <div className="px-2 sm:px-4 md:px-6">
        <section className="grid gap-12 mb-24 md:grid-cols-2">
          <div className="grid gap-2 md:grid-cols-2 md:order-2">
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
          <div className="grid gap-4 md:order-1">
            <p className={`${silkscreen.className} text-2xl sm:text-3xl`}>
              10 years of Javascript
            </p>
            <p className={`${sans.className}`}>
              Welcome to my portfolio, a chronicle of my 10-year romance with
              JavaScript. This journey, filled with learning and growth, has
              been nothing short of a love story. The challenges faced and the
              triumphs celebrated have only deepened my affection for this
              dynamic language.
            </p>
          </div>
        </section>
        <section className="mb-24">
          <div className="mb-12 grid gap-4">
            <h1 className={`${silkscreen.className} text-2xl sm:text-3xl`}>
              Algorithm Progress
            </h1>
            <h2 className={`${silkscreen.className} sm:text-lg`}>
              Currently Reading Algomonster
            </h2>
            <div className="bg-stone-950 py-4 px-5 max-w-fit">
              <div className="flex flex-col gap-3 md:flex-row md:gap-8">
                <div className="flex gap-2 items-center py-2">
                  <div className="rounded-full bg-green-500 h-6 w-6"></div>
                  <p className="text-white font-bold text-sm">Learned</p>
                </div>
                <div className="flex gap-2 items-center py-2">
                  <div className="rounded-full bg-yellow-500 h-6 w-6"></div>
                  <p className="text-white font-bold text-sm">In Progress</p>
                </div>
                <div className="flex gap-2 items-center py-2">
                  <div className="rounded-full bg-red-500 h-6 w-6"></div>
                  <p className="text-white font-bold text-sm">Not Started</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-4">
              {algoritms.map((algo, index) => {
                return (
                  <li className="flex justify-center" key={index}>
                    <Algorithm
                      icon={`/algorithms/${algo.icon}.svg`}
                      name={algo.name}
                      progress={algo.progress}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
        <section className="mb-24">
          <div className="mb-12 grid gap-4">
            <h1 className={`${silkscreen.className} text-2xl sm:text-3xl`}>
              Featured Songs
            </h1>
            <p className={`${sans.className}`}>
              These are some songs that I want to share. These are on my
              rotation
            </p>
          </div>
          <div className="grid gap-8 md:gap-16">
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
