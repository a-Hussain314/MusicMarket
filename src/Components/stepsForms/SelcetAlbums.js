import React, { useEffect, useState, useCallback } from 'react';
import CustomCheckbox from "./CustomCheckbox";
import PrimaryButton from '../Button/PrimaryButton';
import dummyData from "../../dummyData";
import Ls from "../../utilities/LocalStorageHandler";
import styles from "./from.module.scss";

export default function SelcetAlbums({ stepsNavigate, setCartSongs }) {

    // get all the IDs of the selected artists if any. 
    // then use these IDs to get all of the selected albums if any.
    const selectedArtists = Ls.get("selectedArtists") || [];
    const selectedArtistsIds = selectedArtists.map(artist => artist.artistId);
    const initialSelectedAlbums = Ls.get("selectedAlbums")?.length ?
        Ls.get("selectedAlbums")
        :
        dummyData.getAlbumsByArtistsIds(selectedArtistsIds);

    // initiate the "selectedAlbums" state with the selected albums array saved previously in local storage if any.  
    const [selectedAlbums, setSelectedAlbums] = useState(initialSelectedAlbums);


    const updateLocalStorage = useCallback(() => {
        // this function updates the "selectedAlbums" array in local storage
        // acoridng to the current "selectedAlbums" state.
        Ls.set("selectedAlbums", selectedAlbums);
    }, [selectedAlbums])


    useEffect(() => {

        // to update the "selectedAlbums" array in local storage
        // whenever "selectedAlbums" state updates.
        updateLocalStorage()

        // to keep the cart songs state updated, whenever "selectedAlbums" state updates.
        const selectedAlbumsIds = selectedAlbums.map(album => album.albumId);
        setCartSongs(dummyData.getSongsByAlbumsIds(selectedAlbumsIds))

    }, [selectedAlbums, updateLocalStorage, setCartSongs])


    const isSelectedAlbum = useCallback((currentAlbumId) => {
        // checks if the album is selected
        return selectedAlbums.find(album => album.albumId === currentAlbumId);
    }, [selectedAlbums])


    const toggleAlbumSelection = (currentAlbum) => {
        // toggle album selection
        if (isSelectedAlbum(currentAlbum.albumId)) {

            // remove it from the "selectedAlbums" state, which triger "updateLocalStorage" with the new "selectedAlbums"
            setSelectedAlbums(selectedAlbums.filter(album => album.albumId !== currentAlbum.albumId));

            // also remove its selceted songs from local storage if any.
            Ls.deleteAlbumsSongs(currentAlbum.albumId)

        }
        else {
            // add it to the "selectedAlbums" state, which triger "updateLocalStorage" with the new "selectedAlbums"
            setSelectedAlbums([...selectedAlbums, currentAlbum]);
        }
    }

    return (
        <>
            <form className={styles.form}>
                {dummyData.getAlbumsByArtistsIds(selectedArtistsIds).map((album) => {
                    return (
                        <CustomCheckbox
                            key={album.albumId}
                            type="checkbox"
                            defaultChecked={isSelectedAlbum(album.albumId)}
                            onChange={() => toggleAlbumSelection(album)}
                            id={album.albumName}
                            name={album.albumName}
                        />
                    )
                })}
            </form>
            <div className={styles.buttonsBox}>
                <PrimaryButton onClick={stepsNavigate.previous}>Previous</PrimaryButton>
                {/* disable the "next button when no album is selected" */}
                <PrimaryButton disabled={!selectedAlbums.length} onClick={stepsNavigate.next}>Next</PrimaryButton>
            </div>
        </>
    )
}
