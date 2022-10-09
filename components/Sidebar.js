import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import useSpotify from '../hooks/useSpotify'
import { playlistIdState } from '../atoms/playlistAtom'

function Sidebar() {
  const listSidebar = [
    {
      icon: <HomeIcon className="h-5 w-5" />,
      lable: 'Home',
    },
    {
      icon: <SearchIcon className="h-5 w-5" />,
      lable: 'Search',
    },
    {
      icon: <LibraryIcon className="h-5 w-5" />,
      lable: 'Your Library',
    },

    {
      icon: <PlusCircleIcon className="h-5 w-5" />,
      lable: 'Create Playlist',
    },
    {
      icon: <HeartIcon className="h-5 w-5" />,
      lable: 'Liked Songs',
    },
    {
      icon: <RssIcon className="h-5 w-5" />,
      lable: 'Your episodes',
    },
  ]

  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [playlists, setPlaylists] = useState([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)
  //console.log('you picked', playlistId)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items)
      })
    }
  }, [session, spotifyApi])

  //console.log('picked', playlistId)
  //console.log(playlists)

  return (
    <div className="hidden border-r  border-gray-900 p-5 pb-36 text-xs text-gray-500 sm:max-w-[12rem] md:inline-flex lg:max-w-[15rem] lg:text-sm">
      <div className="space-y-4">
        {listSidebar.map((item, index) => (
          <div key={index} className="space-y-4">
            <button className="flex items-center space-x-2 hover:text-white">
              {item.icon}
              <p>{item.lable}</p>
            </button>

            {(index === 2 || index === 5) && (
              <hr className="border-t-[0.1px] border-gray-900" />
            )}
          </div>
        ))}

        {playlists.map((playlist) => (
          <p
            key={playlist.id}
            className="cursor-pointer hover:text-white"
            onClick={() => setPlaylistId(playlist.id)}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
