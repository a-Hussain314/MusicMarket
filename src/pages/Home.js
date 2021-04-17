import React, { useEffect, useState, useCallback } from 'react';
import Ls from "../utilities/LocalStorageHandler";

// reuseable components
import StepsLine from '../Components/steps/StepsLine';
import Invoice from '../Components/invoice/Invoice';
import SelcetSingers from "../Components/stepsForms/SelcetSingers";
import SelcetAlbums from "../Components/stepsForms/SelcetAlbums";
import SelcetSongs from "../Components/stepsForms/SelcetSongs";
import SubmitRequest from "../Components/stepsForms/SubmitRequest";

// style module
import styles from "./Home.module.scss";

const stepsComponents = [
  SelcetSingers,
  SelcetAlbums,
  SelcetSongs,
  SubmitRequest
]

const stepsData = [
  { name: "Select Singers", isComplete: true },
  { name: "Select Albums", isComplete: false },
  { name: "Select Songs", isComplete: false },
  { name: "Submit Request", isComplete: false }
]

function Home() {
  // initiate cart Songs state with an empty array.
  const [catrSongs, setCartSongs] = useState([])

  // initiate the "steps" state with the steps array saved previously in local storage if any.
  const [steps, setSteps] = useState(Ls.get("steps") || stepsData);

  // initiate the "currentStepIndex" state with the currentStepIndex saved previously in local storage if any.
  const [currentStepIndex, setCurrentStepIndex] = useState(Ls.get("currentStepIndex") || 0)

  useEffect(() => {
    Ls.set("steps", steps);
    Ls.set("currentStepIndex", currentStepIndex);
  }, [steps, currentStepIndex])

  const stepsNavigate = {
    next: useCallback(() => {
      // function to reset the (steps state & current step index state) accordig to the current step.
      let newSteps = steps;
      newSteps[currentStepIndex + 1].isComplete = true;
      setSteps(newSteps);
      setCurrentStepIndex(currentStepIndex + 1)
    }, [steps, currentStepIndex])
    ,
    previous: useCallback(() => {
      // function to reset the (steps state & current step index state) accordig to the current step.
      let newSteps = steps;
      newSteps[currentStepIndex].isComplete = false;
      setSteps(newSteps);
      setCurrentStepIndex(currentStepIndex - 1)
    }, [steps, currentStepIndex]),
  }


  const submit = useCallback((user, totalPrice) => {
    // function to reset the (steps state & current step index state) accordig to the current step.
    console.log({ user, catrSongs, totalPrice });
    Ls.clear();
    setCurrentStepIndex(0)
    let newSteps = steps.map((step, index) => {
      if (index > 0) {
        return { ...step, isComplete: false }
      }
      return step;
    });
    setSteps(newSteps);
    window.alert("check the console");
  }, [steps, catrSongs])

  const withProps = (SomeComponent, props) => {
    // to render any component with a given props. 
    return <SomeComponent {...props} />
  }

  return (
    <section className={styles.home}>

      <StepsLine steps={steps} />
      <div className="container">
        <div className={styles.homeContainer}>
          <div className={styles.formsBox}>
            {withProps(stepsComponents[currentStepIndex], {
              catrSongs,
              setCartSongs,
              stepsNavigate,
              submit
            })
            }
          </div>
          <div className={styles.InvoiceBox}>
            <Invoice catrSongs={catrSongs} />
          </div>
        </div>
      </div>

    </section>
  )

}
export default Home;