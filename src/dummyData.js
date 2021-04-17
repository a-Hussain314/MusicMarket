const songs = [
    { artistId: "a", artistName: "Amr", albumId: "a1", albumName: "Amr1-album", id: "a1-s1", name: "Amr1-song1", price: 50 },
    { artistId: "a", artistName: "Amr", albumId: "a1", albumName: "Amr1-album", id: "a1-s2", name: "Amr1-song2", price: 60 },
    { artistId: "a", artistName: "Amr", albumId: "a1", albumName: "Amr1-album", id: "a1-s3", name: "Amr1-song3", price: 70 },
    { artistId: "a", artistName: "Amr", albumId: "a2", albumName: "Amr2-album", id: "a2-s1", name: "Amr2-song1", price: 50 },
    { artistId: "a", artistName: "Amr", albumId: "a2", albumName: "Amr2-album", id: "a2-s2", name: "Amr2-song2", price: 60 },
    { artistId: "a", artistName: "Amr", albumId: "a2", albumName: "Amr2-album", id: "a2-s3", name: "Amr2-song3", price: 70 },
    { artistId: "m", artistName: "Mounir", albumId: "m1", albumName: "Mounir1-album", id: "m1-s1", name: "Mounir1-song1", price: 50 },
    { artistId: "m", artistName: "Mounir", albumId: "m1", albumName: "Mounir1-album", id: "m1-s2", name: "Mounir1-song2", price: 60 },
    { artistId: "m", artistName: "Mounir", albumId: "m1", albumName: "Mounir1-album", id: "m1-s3", name: "Mounir1-song3", price: 70 },
    { artistId: "m", artistName: "Mounir", albumId: "m2", albumName: "Mounir2-album", id: "m2-s1", name: "Mounir2-song1", price: 50 },
    { artistId: "m", artistName: "Mounir", albumId: "m2", albumName: "Mounir2-album", id: "m2-s2", name: "Mounir2-song2", price: 60 },
    { artistId: "m", artistName: "Mounir", albumId: "m2", albumName: "Mounir2-album", id: "m2-s3", name: "Mounir2-song3", price: 70 },
    { artistId: "t", artistName: "Tamer", albumId: "t1", albumName: "Tamer1-album", id: "t1-s1", name: "Tamer1-song1", price: 50 },
    { artistId: "t", artistName: "Tamer", albumId: "t1", albumName: "Tamer1-album", id: "t1-s2", name: "Tamer1-song2", price: 60 },
    { artistId: "t", artistName: "Tamer", albumId: "t1", albumName: "Tamer1-album", id: "t1-s3", name: "Tamer1-song3", price: 70 },
    { artistId: "t", artistName: "Tamer", albumId: "t2", albumName: "Tamer2-album", id: "t2-s1", name: "Tamer2-song1", price: 50 },
    { artistId: "t", artistName: "Tamer", albumId: "t2", albumName: "Tamer2-album", id: "t2-s2", name: "Tamer2-song2", price: 60 },
    { artistId: "t", artistName: "Tamer", albumId: "t2", albumName: "Tamer2-album", id: "t2-s3", name: "Tamer2-song3", price: 70 },
]


const getAllArtists = () => {
    let artistsList = [];
    songs.forEach((song) => {
        if (!artistsList.find(artist => artist.artistName === song.artistName)) {
            artistsList.push({
                artistId: song.artistId,
                artistName: song.artistName
            })
        }
    })
    return artistsList;
}

const getAllAlbums = () => {
    let albumsList = [];
    songs.forEach((song) => {
        if (!albumsList.find(albums => albums.albumName === song.albumName)) {
            albumsList.push({
                albumId: song.albumId,
                albumName: song.albumName,
                artistId: song.artistId,
                artistName: song.artistName
            })
        }
    })
    return albumsList;
}

const artists = getAllArtists();
const albums = getAllAlbums();

const getSongsByArtistsIds = (artistIds) => {
    let songsByArtistsIds = [];
    artistIds.forEach((id) => {
        let singleArtistSongs = songs.filter(song => song.artistId === id);
        songsByArtistsIds.push(...singleArtistSongs);
    })
    return songsByArtistsIds;
}

const getAlbumsByArtistsIds = (artistIds) => {
    let albumsByArtistsIds = [];
    artistIds.forEach((id) => {
        let singleArtistAlbums = albums.filter((album) => album.artistId === id);
        albumsByArtistsIds.push(...singleArtistAlbums);
    })
    return albumsByArtistsIds;
}

const getSongsByAlbumsIds = (albumIds) => {
    let songsByAlbumsIds = [];
    albumIds.forEach((id) => {
        let singleAlbumSongs = songs.filter((song) => song.albumId === id);
        songsByAlbumsIds.push(...singleAlbumSongs);
    })
    return songsByAlbumsIds;
}

export default {
    songs,
    albums,
    artists,
    getSongsByArtistsIds,
    getAlbumsByArtistsIds,
    getSongsByAlbumsIds,
}


