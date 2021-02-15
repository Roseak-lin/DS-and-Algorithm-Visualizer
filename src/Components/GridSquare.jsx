import React from "react";

export default class Square extends React.Component {

  render() {
    const {x, y, className, id, onClick} = this.props;
    return (
      <div
        className={className}
        onClick={() => onClick(x, y)}
        id={id}
      ></div>
    );
  }
}
