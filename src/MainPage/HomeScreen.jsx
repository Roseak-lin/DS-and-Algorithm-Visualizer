import React from "react";
import home from "./HomeScreen.module.css";

export default class HomeScreen extends React.Component {
  componentDidMount() {
    let parent = document.querySelector(`.${home.splitscreen}`);
    let leftPanel = parent.querySelector(`.${home.left}`),
      botPanel = parent
        .querySelector(`.${home.right}`)
        .querySelector(`.${home.content}`);

    leftPanel.addEventListener("mouseover", function () {
      leftPanel.style.width = `calc(50vw + 1000px + ${window.innerWidth * 0.05}px)`;
    });

    leftPanel.addEventListener("click", function () {
      window.location.href = "/DS-and-Algorithm-Visualizer/#/data-structure-visualizer";
    });

    botPanel.addEventListener("mouseover", function () {
      leftPanel.style.width = `calc(50vw + 1000px - ${window.innerWidth * 0.05}px)`;
    });

    botPanel.addEventListener("click", function () {
      window.location.href = "/DS-and-Algorithm-Visualizer/#/algorithm-visualizer";
    });
  }

  render() {
    return (
      <div>
        <div className={home.pageHeader}>
          <h1 className={home.headerText}>What Do You Want to See Visualized?</h1>
        </div>
        <div className={home.splitscreen}>
          <div className={`${home.panel} ${home.right}`}>
            <div className={home.content}>
              <div className={home.title}>
                <h2>Algorithms</h2>
              </div>
            </div>
          </div>

          <div className={`${home.panel} ${home.left}`}>
            <div className={home.content}>
              <div className={home.title}>
                <h2>Data Structures</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
