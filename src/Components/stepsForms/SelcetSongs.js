import React, { useState, useEffect, useCallback } from 'react';
import CustomCheckbox from "./CustomCheckbox";
import PrimaryButton from '../Button/PrimaryButton';
import dummyData from "../../dummyData";
import Ls from "../../utilities/LocalStorageHandler";
import styles from "./from.module.scss";

export default function SelcetSongs({ stepsNavigate, setCartSongs }) {

    // get all the IDs of the selected albums. 
    // then use these IDs to get all of the selected songs if any.
    const selectedAlbums = Ls.get("selectedAlbums") || [];
    const selectedAlbumsIds = selectedAlbums.map(album => album.albumId);
    const initialSelectedSong = Ls.get("selectedSongs")?.length ?
        Ls.get("selectedSongs")
        :
        dummyData.getSongsByAlbumsIds(selectedAlbumsIds);

    // initiate the "selectedSongs" state with the selected songs array saved previously in local storage if any.  
    const [selectedSongs, setSelectedSongs] = useState(initialSelectedSong);


    const updateLocalStorage = useCallback(() => {

        // this function updates the "selectedAlbums" array in local storage
        // acoridng to the current "selectedAlbums" state.
        Ls.set("selectedSongs", selectedSongs);
    }, [selectedSongs])


    useEffect(() => {

        // to update the "selectedSongs" array in local storage
        // whenever "selectedSongs" state updates.
        updateLocalStorage();

        // to keep the cart songs state updated.
        setCartSongs(selectedSongs);

    }, [selectedSongs, updateLocalStorage, setCartSongs])


    const isSelectedSong = useCallback((currentSongId) => {
        // checks if the song is selected
        return selectedSongs.find(song => song.id === currentSongId);
    }, [selectedSongs])


    const toggleSongSelection = useCallback((currentSong) => {
        // toggle album selection
        if (isSelectedSong(currentSong.id)) {
            // remove it from the "selectedAlbums" state, which triger "updateLocalStorage" with the new "selectedAlbums"
            setSelectedSongs(selectedSongs.filter(song => song.id !== currentSong.id))
        }
        else {
            // add it to the "selectedAlbums" state, which triger "updateLocalStorage" with the new "selectedAlbums"
            setSelectedSongs([...selectedSongs, currentSong])
        }
    }, [selectedSongs, isSelectedSong])

    return (
        <>
            <form className={styles.form}>
                {dummyData.getSongsByAlbumsIds(selectedAlbumsIds).map((song) => {
                    return (
                        <CustomCheckbox
                            key={song.id}
                            type="checkbox"
                            defaultChecked={isSelectedSong(song.id)}
                            onChange={() => toggleSongSelection(song)}
                            id={song.name}
                            name={song.name}
                        />
                    )
                })}
            </form>
            <div className={styles.buttonsBox}>
                <PrimaryButton onClick={stepsNavigate.previous}>Previous</PrimaryButton>
                {/* disable the "next button when no song is selected" */}
                <PrimaryButton disabled={!selectedSongs.length} onClick={stepsNavigate.next}>Next</PrimaryButton>
            </div>
        </>
    )
}
