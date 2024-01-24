import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import AppAuth from "../routes/Auth/AppAuth.jsx";
import MenuNavbar from "../Nav.jsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/AppAuth">
                <AppAuth/>
            </ComponentPreview>
            <ComponentPreview path="/MenuNavbar">
                <MenuNavbar/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews