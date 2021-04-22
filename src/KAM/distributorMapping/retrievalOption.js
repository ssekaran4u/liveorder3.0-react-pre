// import "./styles.css";
import React, { Component } from "react";
// import ReactDOM from "react-dom";
import { ToggleLayer, anchor } from "react-laag";
import Button from "react-bootstrap/Button";
// import { AnimatePresence } from "framer-motion";
// import ResizeObserver from "resize-observer-polyfill";

// import ScrollBox from "./ScrollBox";
// import Description from "./Description";
// import Button from "./Button";
// import composeRefs from "./composeRefs";
// import Menu, { MenuItem } from "./Menu";

class RetrievalOption extends Component {
    render() {
        return (
            <div className="retrieval-option">
                <Button className="retrieval-button">
                    <img src="../../public/assets/images/Path_2093.svg" alt=""/>
                    <div className="button-text">Retrieval Option</div>
                </Button>
            </div>
        )
    }
}

export default RetrievalOption;

// const PopoverMenu = React.forwardRef(function PopoverMenu(props, ref) {
//   return (
//     <ToggleLayer
//       // ResizeObserver={ResizeObserver}
//       renderLayer={props => {
//         function handleClick(item) {
//           return function onClick() {
//             alert(`You clicked on "${item}"`);
//             props.close();
//           };
//         }

//         return (
//           // <AnimatePresence>
//           <div>
//             {props.isOpen ? (
//               <Menu
//                 ref={props.layerProps.ref}
//                 style={props.layerProps.style}
//                 arrowStyle={props.arrowStyle}
//                 layerSide={props.layerSide}
//               >
//                 <MenuItem onClick={handleClick("Item 1")}>Item 1</MenuItem>
//                 <MenuItem onClick={handleClick("Item 2")}>Item 2</MenuItem>
//                 <MenuItem onClick={handleClick("Item 3")}>Item 3</MenuItem>
//                 <MenuItem onClick={handleClick("Item 4")}>Item 4</MenuItem>
//               </Menu>
//             ) : null}
//           </div>
//           // </AnimatePresence>
//         );
//       }}
//       closeOnOutsideClick
//       closeOnDisappear="partial"
//       placement={{
//         anchor: "BOTTOM_CENTER",
//         autoAdjust: true,
//         snapToAnchor: false,
//         triggerOffset: 12,
//         scrollOffset: 16,
//         preferX: "RIGHT"
//       }}
//     >
//       {({ isOpen, triggerRef, toggle }) => (
//         <Button
//           ref={composeRefs(triggerRef, ref)}
//           onClick={toggle}
//         >
//           {isOpen ? "Hide" : "Show"}
//         </Button>
//       )}
//     </ToggleLayer>
//   );
// });

// function App() {
//   return (
//     <div>
//       <ScrollBox>
//         <PopoverMenu />
//       </ScrollBox>
//     </div>
//   );
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
