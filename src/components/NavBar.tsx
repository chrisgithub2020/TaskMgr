interface NavBarProps {
  tabClick: (text: string) => void;
  activeTab: string;
}

function NavBar({ tabClick, activeTab }: NavBarProps) {
  return (
    <div
      className="list-group list-group-flush m-0 px-3 separate-navbar shadow-lg bg-dark"
      id="list-tab"
      role="tablist"
    >
      <a
        className={
          activeTab === "home"
            ? "list-group-item mt-1 d-flex justify-content-between text-light list-group-item-action navbar-hover no-borders navbar-selected active"
            : "list-group-item mt-1 text-light list-group-item-action navbar-hover bg-dark no-borders"
        }
        id="list-home-list"
        data-toggle="list"
        href="#list-home"
        role="tab"
        aria-controls="home"
        onClick={() => {
          tabClick("home");
        }}
      >
        Tasks
      </a>
      <a
        className={
          activeTab === "addTask"
            ? "list-group-item mt-1 text-light list-group-item-action navbar-hover no-borders navbar-selected active"
            : "list-group-item mt-1 text-light list-group-item-action bg-dark navbar-hover no-borders"
        }
        id="list-profile-list"
        data-toggle="list"
        href="#list-profile"
        role="tab"
        aria-controls="profile"
        onClick={() => {
          tabClick("addTask");
        }}
      >
        Add Task
      </a>
      <a
        className={
          activeTab === "settings"
            ? "list-group-item mt-1 text-light list-group-item-action navbar-hover no-borders navbar-selected active"
            : "list-group-item mt-1 text-light list-group-item-action bg-dark navbar-hover no-borders"
        }
        id="list-settings-list"
        data-toggle="list"
        href="#list-settings"
        role="tab"
        aria-controls="settings"
        onClick={() => {
          tabClick("settings");
        }}
      >
        Settings
      </a>
    </div>
  );
}

export default NavBar;
