import licwlogoPng from '../assets/CW-Club-logo-clear400-300x300.png'
import githubSvg from 'bootstrap-icons/icons/github.svg'
import { IMorseStoreProps } from "./IMorseStoreProps";
import { observer } from "mobx-react-lite";

export const TitleHeader =observer(({morseStore}:IMorseStoreProps) => {
    
        return <div className="col">
                <div className="row row-cols-2 justify-content-md-center">
                    <div className="col col-md-auto">
                        <img src={licwlogoPng} alt="licwlogo" id="logoImage" height="200px" width="200px" />

                    </div>
                    <div className="col col-md-auto">
                        <h1>Morse Practice Page</h1>
                        <h3>by KN4YRM with assistance from AB5TN, N1CC, VK5PL, and WO6W</h3>
                        <h6>Inspired by and adapted from the <a href="https://morsecode.world/">SC Phillips</a> <a
                                href="https://github.com/scp93ch/morse-pro">morse-pro</a> library.</h6>
                        <h6>To report bugs, request features, view source and more, please go to our <a
                                href="https://github.com/LongIslandCW/morsebrowser/">github<img src={githubSvg} alt="githubimage" id="githubImage"/>
                                repository.</a></h6>
                        { morseStore.isDev &&
                        <h4 data-bind="if: isDev()">WARNING: You are using the BETA (unstable) version. For the latest
                            stable release please <a href="../">click here.</a></h4>
                        }
                    </div>
                </div>

            </div>
    
})

