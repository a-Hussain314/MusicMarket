const get = (itemName) => {
    return JSON.parse(window.localStorage.getItem(itemName));
}

const set = (itemName, item) => {
    window.localStorage.setItem(itemName, JSON.stringify(item));
}

const clear = () => {
    window.localStorage.clear()
}

const deleteArtistAlbums = (currentArtistId) => {
    let currentSelectedAlbums = get("selectedAlbums");
    if (currentSelectedAlbums) {
        set("selectedAlbums", currentSelectedAlbums.filter(album => album.artistId !== currentArtistId));
    }
}

const deleteArtistSongs = (currentArtistId) => {
    let currentSelectedSongs = get("selectedSongs");
    if (currentSelectedSongs) {
        set("selectedSongs", currentSelectedSongs.filter(song => song.artistId !== currentArtistId));
    }
}

const deleteAlbumsSongs = (currentAlbumId) => {
    let currentSelectedSongs = get("selectedSongs");
    if (currentSelectedSongs) {
        set("selectedSongs", currentSelectedSongs.filter(song => song.albumId !== currentAlbumId));
    }
}

const Ls = {
    get,
    set,
    clear,
    deleteArtistAlbums,
    deleteArtistSongs,
    deleteAlbumsSongs
}

export default Ls;