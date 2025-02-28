import AddTaskModal from "./AddTask";
import Home from "./Tasks";
import Settings from "./Settings";



interface SideBarProps {
  activeTab: string;
  data: string
}
function SideBar({ activeTab, data }: SideBarProps) {
  return (
    <>
      <div className="tab-content">
        <div
          className={
            activeTab === "home" ? "tab-pane fade show active" : "tab-pane fade"
          }
          id="list-home"
          role="tabpanel"
          aria-labelledby="list-home-list"
        >
          <Home/>
        </div>
        <div
          className={
            activeTab === "settings"
              ? "tab-pane fade show active"
              : "tab-pane fade"
          }
          id="list-messages"
          role="tabpanel"
          aria-labelledby="list-messages-list"
        >
          <Settings id={data} />
        </div>
        <div
          className={
            activeTab === "addTask"
              ? "tab-pane fade show active"
              : "tab-pane fade"
          }
          id="list-addTask"
          role="tabpanel"
          aria-labelledby="list-addTask-list"
        >
          <AddTaskModal/>
        </div>
      </div>
    </>
  );
}

export default SideBar;
