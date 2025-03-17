import React from "react"
import ReactModal from "react-modal"
import "./src/style/main.scss";

export const onClientEntry = () => {
  ReactModal.setAppElement("#___gatsby")
}
