import { useState, useEffect } from 'react'
import useSpotify from './useSpotify'
import { currentTrackIdState } from '../atoms/songAtom'
import { useRecoilState } from 'recoil'

function useSonginfo() {
  const spotifyApi = useSpotify()

  const [currentIdTrack, setcurrentIdTrack] =
    useRecoilState(currentTrackIdState)
  const [songInfo, setSongInfo] = useState(null)

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentIdTrack) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentIdTrack}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then((res) => res.json())
        setSongInfo(trackInfo)
      }
    }
    fetchSongInfo()
  }, [currentIdTrack, spotifyApi])

  return songInfo
}

export default useSonginfo
