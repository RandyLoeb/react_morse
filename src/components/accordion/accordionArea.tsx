import { PropsWithChildren } from "react"

const AccordionArea = (props:PropsWithChildren<any>) => {
    return (
        <div className="col">
                <div className="accordion" id="accordionExample">
                {props.children}
                </div>
        </div>
    )
}

export default AccordionArea