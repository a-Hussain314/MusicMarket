import React, { useState, useEffect, useCallback } from 'react';
import CustomCheckbox from "./CustomCheckbox";
import PrimaryButton from '../Button/PrimaryButton';
import dummyData from "../../dummyData";
import Ls from "../../utilities/LocalStorageHandler";
import styles from "./from.module.scss";

export default function SelcetSingers({ stepsNavigate, setCartSongs }) {

    // initiate the "selectedArtists" state with the selected atrists array saved previously in local storage if any.  
    const [selectedArtists, setselectedArtists] = useState(Ls.get("selectedArtists") || []);


    const updateLocalStorage = useCallback(() => {
        // this function updates the "selectedArtists" array in local storage
        // acoridng to the current "selectedArtists" state.
        Ls.set("selectedArtists", selectedArtists);
    }, [selectedArtists])


    useEffect(() => {

        // to update the "selectedArtists" array in local storage
        // whenever "selectedArtists" state updates.
        updateLocalStorage()

        // to keep the cart songs state updated, whenever "selectedArtists" state updates.
        const selectedArtistsIds = selectedArtists.map(artist => artist.artistId);
        setCartSongs(dummyData.getSongsByArtistsIds(selectedArtistsIds))

    }, [selectedArtists, updateLocalStorage, setCartSongs])


    const isSelectedAtrist = useCallback(currentArtistId => {
        // checks if the artist is previously selected. 
        return selectedArtists.find(artist => artist.artistId === currentArtistId)
    }, [selectedArtists])


    const toggleArtistSelection = useCallback(currentArtist => {
        // toggle artist selection
        if (isSelectedAtrist(currentArtist.artistId)) {

            // remove him from the "selectedArtists" state, which triger "updateLocalStorage" with the new "selectedArtists"
            setselectedArtists(selectedArtists.filter(artist => artist.artistId !== currentArtist.artistId));

            // also remove his selceted albums from local storage if any.
            Ls.deleteArtistAlbums(currentArtist.artistId)

            // also remove his selceted songs from local storage if any.
            Ls.deleteArtistSongs(currentArtist.artistId)

        }
        else {
            // add him to the "selectedArtists" state, which triger "updateLocalStorage" with the new "selectedArtists"
            setselectedArtists([...selectedArtists, currentArtist])
        }
    }, [isSelectedAtrist, selectedArtists])

    return (
        <>
            <form className={styles.form}>
                {/* renders all the artist from at the beginning */}

                {dummyData.artists.map((artist) => {
                    return (
                        <CustomCheckbox
                            key={artist.artistId}
                            type="checkbox"
                            // make sure that only previously selected artists are "checked" by default. 
                            defaultChecked={isSelectedAtrist(artist.artistId)}
                            onChange={() => toggleArtistSelection(artist)}
                            id={artist.artistName}
                            name={artist.artistName}
                        />
                    )
                })}
            </form>
            <div className={styles.buttonsBox}>
                <PrimaryButton disabled={true}>Previous</PrimaryButton>
                {/* disable the "next button when no artist is selected" */}
                <PrimaryButton disabled={!selectedArtists.length} onClick={stepsNavigate.next}>Next</PrimaryButton>
            </div>
        </>
    )
}
